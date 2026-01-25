import  { useState } from 'react';

function Collection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Winter', 'Summer', 'Formal', 'Accessories'];

  const products = [
    { id: 1, name: 'Silk Evening Gown', price: '$299', category: 'Formal', img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800' },
    { id: 2, name: 'Woolen Overcoat', price: '$180', category: 'Winter', img: 'https://images.unsplash.com/photo-1539533318280-3d233f20364b?auto=format&fit=crop&q=80&w=800' },
    { id: 3, name: 'Linen Summer Shirt', price: '$85', category: 'Summer', img: 'https://images.unsplash.com/photo-1598033129183-c4f50c7176c8?auto=format&fit=crop&q=80&w=800' },
    { id: 4, name: 'Leather Handbag', price: '$450', category: 'Accessories', img: 'https://images.unsplash.com/photo-1584917033904-71649987f223?auto=format&fit=crop&q=80&w=800' },
    { id: 5, name: 'Velvet Blazer', price: '$220', category: 'Formal', img: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800' },
    { id: 6, name: 'Cashmere Scarf', price: '$120', category: 'Winter', img: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800' },
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Curated <span className="text-indigo-400">Collection</span></h1>
          <p className="text-slate-400 mt-2">Discover our 2026 signature pieces.</p>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeCategory === cat 
                ? 'bg-indigo-600 border-indigo-600 text-white' 
                : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-3xl bg-slate-800 aspect-3/4">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
                
                <span className="absolute top-4 left-4 bg-slate-900/60 backdrop-blur-md text-xs py-1 px-3 rounded-full border border-white/10">
                  {product.category}
                </span>
              </div>

              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold group-hover:text-indigo-400 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">Limited Edition</p>
                </div>
                <span className="text-xl font-bold text-white">
                  {product.price}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-slate-500 text-xl">No items found in this category.</p>
          </div>
        )}
      </section>

      <div className="max-w-7xl mx-auto px-6 mt-20">
        <div className="bg-linear-to-r from-indigo-900/40 to-slate-800 border border-slate-700 p-12 rounded-[3rem] text-center">
          <h2 className="text-2xl font-bold mb-4">Join the Club</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Get early access to drops and members-only pricing.</p>
          <div className="flex max-w-sm mx-auto gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-slate-900 border border-slate-700 rounded-full px-6 py-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-indigo-500 transition-colors">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collection;