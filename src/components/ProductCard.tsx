import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import {getAllProduct, deleteProduct } from "../services/product";
import { Edit2, Trash2 } from "lucide-react";

interface Fish {
  _id: string;
  itemName: string;
  price: string;
  description: string;
  itemCategory: string;
  imageUrl: string;
  size: string;
}

interface PrductCardProps {
  onEditClick?: (fish: Fish) => void;
  onDeleteSuccess?: () => void;
}

export interface ProductCardHandle {
  refreshData: () => void;
}

const ProductCard = forwardRef<ProductCardHandle, PrductCardProps>(({ onEditClick,onDeleteSuccess}, ref) => {
  const [productList, setProductList] = useState<Fish[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 4;

  const loadData = async () => {
    const res = await getAllProduct(page, limit);
    setProductList(res.data);
    setTotalPages(res.totalPages);
  };

   const handleDelete = async (id: string) => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this product?"
      );
      if (!confirmDelete) return;

      try {
        await deleteProduct(id);
        alert("Product deleted successfully!");
        loadData();
        onDeleteSuccess?.();
      } catch (err) {
        alert("Failed to delete product.");
      }
    };

  useImperativeHandle(ref, () => ({
    refreshData: () => {
      loadData();
    }
  }));

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <div className="mt-10 space-y-12">
  {/* --- Product Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productList.map((product) => (
            <div
                key={product._id}
                className="group relative bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/5 overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-2xl shadow-black/20"
            >
                <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-5 group-hover:translate-y-0">
                <button
                    onClick={() => onEditClick?.(product)}
                    className="bg-indigo-500/20 backdrop-blur-md border border-indigo-400/30 text-indigo-400 p-2.5 rounded-xl hover:bg-indigo-500 hover:text-white transition-all shadow-lg"
                    title="Edit"
                >
                    <Edit2 size={18} />
                </button>
                <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-rose-500/20 backdrop-blur-md border border-rose-400/30 text-rose-400 p-2.5 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-lg"
                    title="Delete"
                >
                    <Trash2 size={18} />
                </button>
                </div>

                {/* Product Image Container */}
                <div className="relative h-60 overflow-hidden">
                <img
                    src={product.imageUrl}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt={product.itemName}
                />
                <div className="absolute inset-0 bg-linear-to-r from-slate-950 via-transparent to-transparent opacity-60"></div>
                
                {/* Category Tag on Image */}
                <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    {product.itemCategory}
                    </span>
                </div>
                </div>

                {/* Details Section */}
                <div className="p-6 space-y-3">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-white font-bold text-lg leading-tight group-hover:text-indigo-400 transition-colors">
                    {product.itemName}
                    </h3>
                    <span className="text-indigo-400 font-black text-lg">
                    {product.price}
                    </span>
                </div>
                
                <p className="text-slate-500 text-sm line-clamp-2 font-medium">
                    {product.description}
                </p>

                <div className="space-y-2">
                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Available Sizes</p>
                    <div className="flex flex-wrap gap-3.5">
                        <span className="w-8 h-8 flex items-center justify-center bg-slate-800/50 border border-white/5 rounded-xl text-[10px] font-bold text-slate-400 group-hover:bg-slate-800 transition-all">
                            {product.size}
                        </span>
                    </div>
                </div>
                
                {/* Product Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">
                    In Stock / New Arrival
                    </span>
                    <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                    </div>
                </div>
                </div>
            </div>
            ))}
        </div>

        {/* --- Premium Pagination --- */}
        <div className="flex items-center justify-center gap-6 mt-12 py-6 border-t border-white/5">
            <button
            disabled={page === 1}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 border border-white/5 text-slate-400 rounded-xl hover:text-white hover:border-indigo-500/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
            onClick={() => setPage((p) => p - 1)}
            >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Previous
            </button>

            <div className="flex items-center gap-2">
            <span className="w-10 h-10 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20">
                {page}
            </span>
            <span className="text-slate-600 font-bold">/</span>
            <span className="w-10 h-10 flex items-center justify-center bg-slate-900 text-slate-400 font-bold rounded-xl border border-white/5">
                {totalPages}
            </span>
            </div>

            <button
            disabled={page === totalPages}
            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 border border-white/5 text-slate-400 rounded-xl hover:text-white hover:border-indigo-500/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed group"
            onClick={() => setPage((p) => p + 1)}
            >
            Next <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
