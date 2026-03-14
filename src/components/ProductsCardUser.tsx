import { getAllProduct, searchProduct } from "../services/product";
import { useState, useEffect } from "react";
import { Search, ShoppingBag, ShoppingCart, ChevronRight, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  itemName: string;
  price: string;
  description: string;
  itemCategory: string;
  imageUrl: string;
  size: string;
}


const parsePrice = (price: any): number => {
  try {
    if (typeof price === 'number') return price;
    if (typeof price === 'string') {
      const cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
      return isNaN(cleanPrice) ? 0 : cleanPrice;
    }
    return 0;
  } catch {
    return 0;
  }
};

function ProductsCardUser() {
  // Cloth Shop Categories
  const categories = [
    { label: "All", value: "all" },
    { label: "Men's Wear", value: "Men's Wear" },
    { label: "Women's Wear", value: "Women's Wear" },
    { label: "Kids", value: "Kids Collection" },
    { label: "Streetwear", value: "Streetwear" },
    { label: "Accessories", value: "Accessories" },
  ];

  const [selected, setSelected] = useState("all");
  const [productList, setProductList] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const limit = 12;

  const loadData = async () => {
    try {
      setLoading(true);
      if (search) {
        const res = await searchProduct(page, limit, "", search);
        setProductList(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else if (selected !== "all") {
        const res = await searchProduct(page, limit, selected, "");
        setProductList(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else {
        const res = await getAllProduct(page, limit);
        setProductList(res.data || []);
        setTotalPages(res.totalPages || 1);
      }
    } catch (error) {
      console.error("Failed to load products:", error);
      setProductList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    loadData();
  }, [selected, search]);

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-20 px-4 md:px-8">
      {/* Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-500px h-500px bg-indigo-600/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 -mt-20">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 italic">
              THE <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">COLLECTION.</span>
            </h1>
            <p className="text-slate-500 font-medium tracking-wide">Premium curated pieces for your unique style.</p>
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-slate-800 border border-white/10 rounded-2xl hover:bg-black text-white hover:border-indigo-500/50   transition-all group">
            <ShoppingBag size={18} className="text-indigo-400" />
            <span className="text-xs font-bold uppercase text-white  tracking-[0.2em]">My Orders</span>
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
              className="w-full bg-white border border-black rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all backdrop-blur-xl text-sm placeholder:text-slate-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelected(cat.value)}
                className={`whitespace-nowrap px-6 py-3.5 rounded-xl text-[10px] cursor-pointer font-black uppercase tracking-widest hover:translate-y-2 transition-all duration-300 ${
                  selected === cat.value 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border-transparent' 
                  : 'bg-white/5 border border-black text-slate-600 hover:border-black'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* --- Loading State --- */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="animate-spin text-indigo-500" size={40} />
            <p className="text-slate-500 animate-pulse uppercase text-xs tracking-[0.3em]">Curating Style...</p>
          </div>
        ) : (
          /* --- Product Grid --- */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productList.length > 0 ? (
              productList.map((product) => (
                <div key={product._id} className="group relative bg-slate-950/80  rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-indigo-500 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="h-72 relative overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.itemName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest">
                        {product.itemCategory}
                      </span>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-white text-lg tracking-tight line-clamp-1">{product.itemName}</h3>
                      <span className="text-black font-black tracking-tighter">LKR {product.price}</span>
                    </div>
                    <p className="text-slate-900 text-[11px] mb-6 line-clamp-2 font-medium">
                      {product.description}
                    </p>
                    
                    {/* Premium Size Selection Section */}
                    <div className="w-full mb-8">
                      <p className="text-sm text-center font-black uppercase tracking-[0.3em] text-black mb-4 ml-1">
                        Available Sizes
                      </p>
                      
                      <div className="w-full flex border rounded-xl border-black bg-slate-200 overflow-hidden divide-x divide-black backdrop-blur-md shadow-2xl">
                        {product.size && product.size.split(' ').map((sizeLabel, index) => (
                          <button 
                            key={index} 
                            className="flex-1 py-5 text-[14px] font-black text-slate-900 uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white/5 hover:text-white active:bg-indigo-500/20"
                          >
                            {sizeLabel}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full relative overflow-hidden group/btn bg-white text-slate-950 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer">
                      <div className="absolute inset-0 w-0 bg-indigo-600 transition-all duration-300 group-hover/btn:w-full"></div>
                      <ShoppingCart size={16} className="relative z-10 group-hover/btn:text-white transition-colors" />
                      <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] group-hover/btn:text-white transition-colors">Add to Cart</span>
                    </button>

                    <Link
                      to="/orders"
                      state={{
                        itemName: product.itemName,
                        price: parsePrice(product.price),
                        qty: 1,
                        image: product.imageUrl,
                        desciption: product.description,
                        size: product.size
                      }}
                    >
                      <button className="w-full relative overflow-hidden group/btn bg-indigo-400 text-slate-950 py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 mt-2 cursor-pointer">
                        <div className="absolute inset-0 w-0 bg-indigo-600 transition-all duration-300 group-hover/btn:w-full"></div>
                        <ChevronRight size={16} className="relative z-10 group-hover/btn:text-white transition-colors" />
                        <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.2em] group-hover/btn:text-white transition-colors">Order Now</span>
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-slate-500 uppercase tracking-widest">No products found in this category.</p>
              </div>
            )}
          </div>
        )}

        {/* --- Pagination --- */}
        {!loading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-16">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-6 py-2 bg-white/5 border border-white/5 rounded-xl disabled:opacity-20 hover:border-indigo-500 transition-all text-xs font-bold"
            >
              PREV
            </button>
            <span className="text-indigo-400 font-bold tracking-widest text-sm">{page} <span className="text-slate-700">/</span> {totalPages}</span>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-6 py-2 bg-white/5 border border-white/5 rounded-xl disabled:opacity-20 hover:border-indigo-500 transition-all text-xs font-bold"
            >
              NEXT
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsCardUser;