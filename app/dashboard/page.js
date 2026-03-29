'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const CATEGORIES = ['Sneakers', 'Formal', 'Sports', 'Sandals', 'Slippers', 'Boots', 'Heels', 'Loafers', 'Flats'];
const GENDERS = ['Men', 'Women', 'Kids'];

const styles = {
  heading: { fontFamily: "'Barlow Condensed', sans-serif" },
  input: { width: '100%', border: '2px solid #eee', borderRadius: 4, padding: '10px 12px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: "'Barlow', sans-serif", color: '#111', background: '#fff' },
  label: { fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 4 },
};

const emptyForm = { name: '', price: '', gender: 'Men', category: 'Sneakers', sizes: '', image_url: '', is_active: true };

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);
  const [analytics, setAnalytics] = useState({ today: 0, week: 0, total: 0 });

  useEffect(() => { fetchProducts(); fetchAnalytics(); }, []);

  async function fetchAnalytics() {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7).toISOString();

    const { count: total } = await supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('event', 'catalog_open');
    const { count: today } = await supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('event', 'catalog_open').gte('created_at', todayStart);
    const { count: week } = await supabase.from('analytics').select('*', { count: 'exact', head: true }).eq('event', 'catalog_open').gte('created_at', weekStart);

    setAnalytics({ today: today || 0, week: week || 0, total: total || 0 });
  }

  async function fetchProducts() {
    setLoading(true);
    const { data } = await supabase.from('products').select('*').order('id');
    setProducts(data || []);
    setLoading(false);
  }

  function showMessage(text, type = 'success') {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('product-images').upload(fileName, file);
    if (error) {
      showMessage('Error uploading image', 'error');
      setUploading(false);
      return;
    }
    const { data: urlData } = supabase.storage.from('product-images').getPublicUrl(fileName);
    setForm(f => ({ ...f, image_url: urlData.publicUrl }));
    setUploading(false);
    showMessage('Image uploaded!');
  }

  async function handleSave() {
    if (!form.name || !form.price || !form.sizes || !form.image_url) {
      showMessage('Please fill in all fields and upload an image', 'error');
      return;
    }
    setSaving(true);
    const payload = {
      name: form.name,
      price: parseInt(form.price),
      gender: form.gender,
      category: form.category,
      sizes: form.sizes,
      image_url: form.image_url,
      is_active: form.is_active,
    };
    if (editingId) {
      const { error } = await supabase.from('products').update(payload).eq('id', editingId);
      if (error) showMessage('Error updating product', 'error');
      else showMessage('Product updated!');
    } else {
      const { error } = await supabase.from('products').insert(payload);
      if (error) showMessage('Error: ' + error.message, 'error');
      else showMessage('Product added!');
    }
    setSaving(false);
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    fetchProducts();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return;
    await supabase.from('products').delete().eq('id', id);
    showMessage('Product deleted');
    fetchProducts();
  }

  async function toggleActive(product) {
    await supabase.from('products').update({ is_active: !product.is_active }).eq('id', product.id);
    fetchProducts();
  }

  function handleEdit(product) {
    setForm({
      name: product.name,
      price: product.price,
      gender: product.gender,
      category: product.category,
      sizes: product.sizes,
      image_url: product.image_url,
      is_active: product.is_active,
    });
    setEditingId(product.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancel() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', fontFamily: "'Barlow', sans-serif" }}>

      <div style={{ background: '#111', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ ...styles.heading, color: '#fff', fontSize: 24, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>
            👟 Dashboard
          </h1>
          <p style={{ color: '#888', fontSize: 12, margin: '2px 0 0' }}>{products.length} products · {analytics.today} opens today · {analytics.week} this week · {analytics.total} total</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <a href="/dashboard/qr" style={{ background: '#fff', color: '#111', padding: '10px 18px', fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, textDecoration: 'none', fontFamily: "'Barlow Condensed', sans-serif" }}>
            QR Code
          </a>
          <button
            onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }}
            style={{ background: '#FF3A00', color: '#fff', border: 'none', padding: '10px 18px', fontSize: 13, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {showForm ? '✕ Close' : '+ Add Product'}
          </button>
        </div>
      </div>

      {message && (
        <div style={{ background: message.type === 'error' ? '#FF3A00' : '#22c55e', color: '#fff', padding: '12px 20px', fontSize: 13, fontWeight: 700, textAlign: 'center' }}>
          {message.text}
        </div>
      )}

      <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>

        {showForm && (
          <div style={{ background: '#fff', borderRadius: 4, padding: 20, marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <h2 style={{ ...styles.heading, fontSize: 20, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 16px', color: '#111' }}>
              {editingId ? '✏️ Edit Product' : '➕ New Product'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

              <div>
                <label style={styles.label}>Product Name</label>
                <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Classic White Sneakers" style={styles.input} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={styles.label}>Price (₹)</label>
                  <input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} placeholder="e.g. 1299" style={styles.input} />
                </div>
                <div>
                  <label style={styles.label}>Gender</label>
                  <select value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} style={styles.input}>
                    {GENDERS.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label style={styles.label}>Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={styles.input}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={styles.label}>Sizes (comma separated)</label>
                <input value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })} placeholder="e.g. 6,7,8,9,10" style={styles.input} />
              </div>

              <div>
                <label style={styles.label}>Product Photo</label>
                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#f5f5f5', border: '2px dashed #ddd', borderRadius: 4, padding: '16px', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: '#555' }}>
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
```
                  {uploading ? '⏳ Uploading...' : '📷 Take Photo or Choose from Gallery'}
                </label>
                {form.image_url && (
                  <div style={{ marginTop: 10, position: 'relative' }}>
                    <img src={form.image_url} alt="preview" style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 4 }} />
                    <button onClick={() => setForm(f => ({ ...f, image_url: '' }))} style={{ position: 'absolute', top: 8, right: 8, background: '#FF3A00', color: '#fff', border: 'none', borderRadius: '50%', width: 28, height: 28, cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>✕</button>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} id="is_active" style={{ width: 18, height: 18, cursor: 'pointer' }} />
                <label htmlFor="is_active" style={{ fontSize: 13, fontWeight: 600, color: '#555', cursor: 'pointer' }}>Active — visible in catalog</label>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <button onClick={handleSave} disabled={saving || uploading} style={{ flex: 1, background: '#111', color: '#fff', border: 'none', padding: '14px 0', fontSize: 14, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif", opacity: (saving || uploading) ? 0.6 : 1 }}>
                  {saving ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
                </button>
                <button onClick={handleCancel} style={{ background: '#fff', color: '#111', border: '2px solid #ddd', padding: '14px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', borderRadius: 4 }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <p style={{ textAlign: 'center', color: '#999', marginTop: 40, fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 2 }}>Loading...</p>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: 60 }}>
            <p style={{ fontSize: 48 }}>👟</p>
            <p style={{ ...styles.heading, fontSize: 20, fontWeight: 800, color: '#111', textTransform: 'uppercase' }}>No products yet</p>
            <p style={{ color: '#999', fontSize: 13 }}>Click "+ Add Product" to get started</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {products.map(product => (
              <div key={product.id} style={{ background: '#fff', borderRadius: 4, padding: 14, display: 'flex', gap: 14, alignItems: 'center', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', opacity: product.is_active ? 1 : 0.5 }}>
                <img src={product.image_url} alt={product.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 4, background: '#f5f5f5', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: '#111', margin: 0 }}>{product.name}</p>
                  <p style={{ fontSize: 11, color: '#999', margin: '2px 0 0' }}>{product.gender} · {product.category}</p>
                  <p style={{ ...styles.heading, fontSize: 16, fontWeight: 800, color: '#111', margin: '4px 0 0' }}>₹{product.price?.toLocaleString()}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                  <button onClick={() => toggleActive(product)} style={{ background: product.is_active ? '#f0fdf4' : '#fef2f2', color: product.is_active ? '#16a34a' : '#dc2626', border: 'none', padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', borderRadius: 4 }}>
                    {product.is_active ? 'Active' : 'Inactive'}
                  </button>
                  <button onClick={() => handleEdit(product)} style={{ background: '#f5f5f5', color: '#111', border: 'none', padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', borderRadius: 4 }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(product.id)} style={{ background: '#fff0f0', color: '#FF3A00', border: 'none', padding: '5px 10px', fontSize: 11, fontWeight: 700, cursor: 'pointer', borderRadius: 4 }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}