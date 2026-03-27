'use client';
import { useState, useEffect } from 'react';

const products = [
  { id: 1, name: 'Classic White Sneakers', price: 1299, gender: 'Men', category: 'Sneakers', sizes: [6, 7, 8, 9, 10], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
  { id: 2, name: 'Black Oxford Shoes', price: 2499, gender: 'Men', category: 'Formal', sizes: [7, 8, 9, 10], image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400' },
  { id: 3, name: 'Running Sports Shoes', price: 1799, gender: 'Men', category: 'Sports', sizes: [6, 7, 8, 9], image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
  { id: 4, name: 'Leather Loafers', price: 1999, gender: 'Men', category: 'Loafers', sizes: [7, 8, 9, 10], image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400' },
  { id: 5, name: 'Casual Sandals', price: 699, gender: 'Men', category: 'Sandals', sizes: [6, 7, 8, 9, 10], image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400' },
  { id: 6, name: 'Ankle Boots', price: 2999, gender: 'Men', category: 'Boots', sizes: [7, 8, 9], image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400' },
  { id: 7, name: 'Home Slippers', price: 399, gender: 'Men', category: 'Slippers', sizes: [6, 7, 8, 9, 10], image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400' },
  { id: 8, name: 'Pink Running Shoes', price: 1599, gender: 'Women', category: 'Sports', sizes: [4, 5, 6, 7], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
  { id: 9, name: 'Block Heels', price: 2199, gender: 'Women', category: 'Heels', sizes: [4, 5, 6, 7], image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400' },
  { id: 10, name: 'Pointed Formal Heels', price: 2799, gender: 'Women', category: 'Formal', sizes: [4, 5, 6], image: 'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?w=400' },
  { id: 11, name: 'Flat Ballerinas', price: 999, gender: 'Women', category: 'Flats', sizes: [4, 5, 6, 7], image: 'https://images.unsplash.com/photo-1554062614-6da4fa11f50a?w=400' },
  { id: 12, name: 'Strappy Sandals', price: 1299, gender: 'Women', category: 'Sandals', sizes: [4, 5, 6, 7, 8], image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400' },
  { id: 13, name: 'Casual Sneakers', price: 1199, gender: 'Women', category: 'Sneakers', sizes: [4, 5, 6, 7], image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400' },
  { id: 14, name: 'Women Loafers', price: 1699, gender: 'Women', category: 'Loafers', sizes: [4, 5, 6, 7], image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400' },
  { id: 15, name: 'Kids Sneakers', price: 799, gender: 'Kids', category: 'Sneakers', sizes: [1, 2, 3, 4, 5], image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400' },
  { id: 16, name: 'Kids School Shoes', price: 999, gender: 'Kids', category: 'Formal', sizes: [1, 2, 3, 4, 5], image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400' },
  { id: 17, name: 'Kids Sports Shoes', price: 899, gender: 'Kids', category: 'Sports', sizes: [1, 2, 3, 4], image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400' },
  { id: 18, name: 'Kids Sandals', price: 499, gender: 'Kids', category: 'Sandals', sizes: [1, 2, 3, 4, 5], image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400' },
];

const genders = ['All', 'Men', 'Women', 'Kids'];
const allCategories = ['Sneakers', 'Formal', 'Sports', 'Sandals', 'Slippers', 'Boots', 'Heels', 'Loafers', 'Flats'];
const categoryIcons = { Sneakers: '👟', Formal: '👞', Sports: '🏃', Sandals: '🩴', Slippers: '🥿', Boots: '🥾', Heels: '👠', Loafers: '🥿', Flats: '👣' };

const styles = {
  heading: { fontFamily: "'Barlow Condensed', sans-serif" },
};

export default function Home() {
  const [selectedGender, setSelectedGender] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wantedProduct, setWantedProduct] = useState(null);
  const [search, setSearch] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const availableCategories = ['All', ...allCategories.filter(cat =>
    products.some(p =>
      (selectedGender === 'All' || p.gender === selectedGender) && p.category === cat
    )
  )];

  const filtered = products.filter(p => {
    const matchesGender = selectedGender === 'All' || p.gender === selectedGender;
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = search === '' ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.gender.toLowerCase().includes(search.toLowerCase()) ||
      p.name.toLowerCase().includes(search.toLowerCase());
    return matchesGender && matchesCategory && matchesSearch;
  });

  const cardImageHeight = isMobile ? 160 : 200;
  const gridColumns = isMobile ? '1fr 1fr' : '1fr 1fr 1fr';
  const headerPadding = isMobile ? '10px 14px 0' : '14px 20px 0';

  if (selectedProduct) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff' }}>
        <div style={{ background: '#111', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 0, zIndex: 10 }}>
          <button
            onClick={() => setSelectedProduct(null)}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: '50%', cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            ←
          </button>
          <span style={{ ...styles.heading, color: '#fff', fontSize: 18, fontWeight: 800, letterSpacing: 1, textTransform: 'uppercase' }}>
            Product Detail
          </span>
        </div>

        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <div style={{ position: 'relative', background: '#f5f5f5' }}>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: '100%', height: isMobile ? 280 : 320, objectFit: 'cover', display: 'block', mixBlendMode: 'multiply' }}
            />
            <div style={{ position: 'absolute', top: 12, left: 12, background: '#FF3A00', color: '#fff', fontSize: 10, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', padding: '4px 10px', borderRadius: 2 }}>
              {selectedProduct.category}
            </div>
          </div>

          <div style={{ padding: isMobile ? '18px 16px' : '24px 20px' }}>
            <p style={{ color: '#999', fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>
              {selectedProduct.gender}'s Collection
            </p>
            <h2 style={{ ...styles.heading, fontSize: isMobile ? 26 : 32, fontWeight: 800, color: '#111', margin: '6px 0 0', textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1.1 }}>
              {selectedProduct.name}
            </h2>
            <p style={{ ...styles.heading, fontSize: isMobile ? 28 : 36, fontWeight: 800, color: '#FF3A00', margin: '10px 0 0' }}>
              ₹{selectedProduct.price.toLocaleString()}
            </p>

            <div style={{ height: 1, background: '#eee', margin: '16px 0' }} />

            <p style={{ fontSize: 11, fontWeight: 700, color: '#999', letterSpacing: 2, textTransform: 'uppercase', margin: '0 0 10px' }}>
              Available Sizes
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {selectedProduct.sizes.map(size => (
                <div key={size} style={{ border: '2px solid #111', borderRadius: 4, padding: '8px 14px', fontSize: 13, fontWeight: 700, color: '#111', cursor: 'pointer' }}>
                  {size}
                </div>
              ))}
            </div>

            <button
              onClick={() => { setWantedProduct(selectedProduct); setSelectedProduct(null); }}
              style={{ marginTop: 24, width: '100%', background: '#111', color: '#fff', border: 'none', padding: '16px 0', fontSize: 15, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, ...styles.heading }}
            >
              ✋ I WANT THIS
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      {/* Top Header */}
      <div style={{ background: '#111', position: 'sticky', top: 0, zIndex: 20 }}>
        <div style={{ padding: headerPadding }}>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <h1 style={{ ...styles.heading, color: '#fff', fontSize: isMobile ? 22 : 28, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>
              👟 ShopCatalog
            </h1>
            <span style={{ background: '#FF3A00', color: '#fff', fontSize: 10, fontWeight: 800, padding: '3px 8px', borderRadius: 2, letterSpacing: 1 }}>
              {filtered.length} ITEMS
            </span>
          </div>

          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: 10 }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#888', fontSize: 13 }}>🔍</span>
            <input
              type="text"
              placeholder="Search sneakers, heels, boots..."
              value={search}
              onChange={e => { setSearch(e.target.value); setSelectedCategory('All'); setSelectedGender('All'); }}
              style={{ width: '100%', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: 4, padding: '10px 36px 10px 36px', fontSize: 13, fontWeight: 500, outline: 'none', boxSizing: 'border-box', fontFamily: "'Barlow', sans-serif" }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: 16 }}>✕</button>
            )}
          </div>

          {/* Gender Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #333' }}>
            {genders.map(g => (
              <button
                key={g}
                onClick={() => { setSelectedGender(g); setSelectedCategory('All'); setSearch(''); }}
                style={{ flex: 1, background: 'none', border: 'none', borderBottom: selectedGender === g ? '3px solid #FF3A00' : '3px solid transparent', color: selectedGender === g ? '#fff' : '#888', padding: '9px 0', fontSize: isMobile ? 11 : 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", marginBottom: -1 }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Wanted Banner */}
      {wantedProduct && (
        <div style={{ background: '#fff', borderLeft: '4px solid #FF3A00', margin: '12px 12px 0', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: 4 }}>
          <div>
            <p style={{ ...styles.heading, fontSize: 9, fontWeight: 800, color: '#FF3A00', letterSpacing: 2, textTransform: 'uppercase', margin: 0 }}>Show to Shopkeeper</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#111', margin: '2px 0 0' }}>✅ {wantedProduct.name}</p>
          </div>
          <button onClick={() => setWantedProduct(null)} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: 18 }}>✕</button>
        </div>
      )}

      <div style={{ padding: isMobile ? 10 : 16 }}>

        {/* Category Filter Chips */}
        {!search && (
          <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 10, marginBottom: 4 }}>
            {availableCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? '#111' : '#fff',
                  color: selectedCategory === cat ? '#fff' : '#555',
                  border: selectedCategory === cat ? '2px solid #111' : '2px solid #ddd',
                  borderRadius: 4,
                  padding: isMobile ? '6px 12px' : '7px 16px',
                  fontSize: isMobile ? 11 : 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {cat !== 'All' && categoryIcons[cat]} {cat}
              </button>
            ))}
          </div>
        )}

        {/* Product Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: gridColumns, gap: isMobile ? 8 : 12 }}>
          {filtered.map(product => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              style={{ background: '#fff', borderRadius: 4, overflow: 'hidden', cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
            >
              <div style={{ background: '#f5f5f5', height: cardImageHeight, overflow: 'hidden' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply' }}
                />
              </div>
              <div style={{ padding: isMobile ? '8px 10px 10px' : '10px 12px 12px', background: '#fff' }}>
                <p style={{ fontSize: 9, color: '#999', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', margin: '0 0 3px' }}>
                  {product.gender} · {product.category}
                </p>
                <p style={{ fontSize: isMobile ? 12 : 13, fontWeight: 700, color: '#111', margin: 0, lineHeight: 1.3 }}>{product.name}</p>
                <p style={{ ...styles.heading, fontSize: isMobile ? 15 : 17, fontWeight: 800, color: '#111', margin: '6px 0 0' }}>
                  ₹{product.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: 80 }}>
            <p style={{ fontSize: 48, margin: 0 }}>🔍</p>
            <p style={{ ...styles.heading, fontSize: 22, fontWeight: 800, color: '#111', textTransform: 'uppercase', letterSpacing: 1, marginTop: 16 }}>Nothing Found</p>
            <p style={{ fontSize: 13, color: '#999', marginTop: 6 }}>Try a different category or filter</p>
            <button
              onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedGender('All'); }}
              style={{ marginTop: 20, background: '#111', color: '#fff', border: 'none', padding: '12px 28px', fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}