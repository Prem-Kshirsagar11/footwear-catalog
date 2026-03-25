'use client';
import { useState } from 'react';

const products = [
  { id: 1, name: 'Classic White Sneakers', price: 1299, category: 'Men', type: 'Casual', sizes: [6, 7, 8, 9, 10], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
  { id: 2, name: 'Black Formal Shoes', price: 2499, category: 'Men', type: 'Formal', sizes: [7, 8, 9, 10], image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400' },
  { id: 3, name: 'Pink Sports Shoes', price: 1799, category: 'Women', type: 'Sports', sizes: [4, 5, 6, 7], image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
  { id: 4, name: 'Kids Blue Sneakers', price: 899, category: 'Kids', type: 'Casual', sizes: [1, 2, 3, 4], image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400' },
  { id: 5, name: 'Brown Loafers', price: 1999, category: 'Men', type: 'Formal', sizes: [7, 8, 9], image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400' },
  { id: 6, name: 'Red Heels', price: 2199, category: 'Women', type: 'Formal', sizes: [4, 5, 6], image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400' },
];

const categories = ['All', 'Men', 'Women', 'Kids'];
const types = ['All', 'Casual', 'Formal', 'Sports'];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [wantedProduct, setWantedProduct] = useState(null);

  const filtered = products.filter(p => {
    return (selectedCategory === 'All' || p.category === selectedCategory) &&
           (selectedType === 'All' || p.type === selectedType);
  });

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <button onClick={() => setSelectedProduct(null)} className="mb-4 text-blue-600 font-semibold">← Back</button>
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow p-4">
          <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover rounded-xl mb-4" />
          <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
          <p className="text-gray-500">{selectedProduct.category} · {selectedProduct.type}</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">₹{selectedProduct.price}</p>
          <div className="mt-4">
            <p className="font-semibold mb-2">Available Sizes:</p>
            <div className="flex gap-2 flex-wrap">
              {selectedProduct.sizes.map(size => (
                <span key={size} className="border rounded-lg px-3 py-1 text-sm">{size}</span>
              ))}
            </div>
          </div>
          <button
            onClick={() => { setWantedProduct(selectedProduct); setSelectedProduct(null); }}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg"
          >
            ✋ I Want This
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-blue-600">👟 ShopCatalog</h1>
        <p className="text-gray-500 text-sm">Browse and pick your footwear</p>
      </div>

      {wantedProduct && (
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 mx-4 mt-4 rounded-xl flex justify-between items-center">
          <span>✅ Show <strong>{wantedProduct.name}</strong> to the shopkeeper!</span>
          <button onClick={() => setWantedProduct(null)} className="text-green-600 font-bold">✕</button>
        </div>
      )}

      <div className="p-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border ${selectedCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300'}`}>
              {cat}
            </button>
          ))}
          <div className="w-px bg-gray-300 mx-1"></div>
          {types.map(type => (
            <button key={type} onClick={() => setSelectedType(type)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border ${selectedType === type ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-300'}`}>
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {filtered.map(product => (
            <div key={product.id} onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition">
              <img src={product.image} alt={product.name} className="w-full h-36 object-cover" />
              <div className="p-3">
                <p className="font-semibold text-sm leading-tight">{product.name}</p>
                <p className="text-xs text-gray-400 mt-0.5">{product.category} · {product.type}</p>
                <p className="text-blue-600 font-bold mt-1">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-400 mt-20">No products found for this filter.</div>
        )}
      </div>
    </div>
  );
}