import ProductsCardUser from '../components/ProductsCardUser';

const ProductPage = () => {
  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-20 px-4 md:px-8">
      
      {/* Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-500px h-500px bg-indigo-600/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-400px h-400px bg-purple-600/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <ProductsCardUser/>

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