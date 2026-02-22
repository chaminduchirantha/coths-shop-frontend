import  { useState } from 'react';
import { Search, ShoppingBag, ShoppingCart, ChevronRight } from 'lucide-react';

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Men\'s Wear', 'Women\'s Wear', 'Streetwear', 'Formal', 'Accessories'];

  return (
    <div className="min-h-screen bg-[#0a0c10] text-white pt-24 pb-20 px-4 md:px-8">
      
      {/* Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-500px h-500px bg-indigo-600/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-400px h-400px bg-purple-600/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 italic">
              THE <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">COLLECTION.</span>
            </h1>
            <p className="text-slate-500 font-medium">Elevate your style with our premium curated pieces.</p>
          </div>

          {/* View Orders Button */}
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-indigo-500/50 transition-all group">
            <ShoppingBag size={18} className="text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-[0.2em]">View My Orders</span>
            <ChevronRight size={14} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* --- Search & Filters --- */}
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
          {/* Search Bar */}
          <div className="relative flex-1 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Search for your style..."
              className="w-full bg-slate-900/50 border border-white/5 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all backdrop-blur-xl text-sm placeholder:text-slate-600"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border-transparent' 
                  : 'bg-white/5 border border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* --- Product Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="group relative">
              {/* Product Card */}
              <div className="relative bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 group-hover:-translate-y-2">
                
                {/* Image Area */}
                <div className="h- relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop`} 
                    alt="Product"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">
                      New Arrival
                    </span>
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-white text-lg tracking-tight">Luxury Linen Shirt</h3>
                    <span className="text-indigo-400 font-black tracking-tighter">LKR 4,500</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mb-6 font-medium uppercase tracking-widest italic">Spring Collection 2026</p>
                  
                  {/* Add to Cart Button */}
                  <button className="w-full relative overflow-hidden group/btn bg-white text-slate-950 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg">
                    <div className="absolute inset-0 w-0 bg-indigo-600 transition-all duration-300 group-hover/btn:w-full"></div>
                    <ShoppingCart size={16} className="relative z-10 group-hover/btn:text-white transition-colors" />
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] group-hover/btn:text-white transition-colors">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-20 text-center">
           <button className="text-slate-500 hover:text-indigo-400 text-xs font-black uppercase tracking-[0.4em] transition-colors">
              Discover More Pieces
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;