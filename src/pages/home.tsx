
function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center font-sans">
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
        
        <div className="flex-1 text-center md:text-left space-y-8">
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-600 leading-tight tracking-tight">
              Elevate Your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-700 to-cyan-400">
                Everyday Style
              </span>
            </h2>
            
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
              Your one-stop destination for the latest fashion trends and quality clothing. 
              Explore our diverse collection and find the perfect fit for your personality.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="/product" className="group">
              <button className="w-full sm:w-auto px-8 py-4 bg-black text-white cursor-pointer rounded-full font-semibold hover:bg-slate-700 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]">
                Shop Now
              </button>
            </a>
            <a href="/collection" className="group">
              <button className="w-full sm:w-auto cursor-pointer px-8 py-4 border border-slate-900 text-black rounded-full font-medium hover:border-black hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2">
                View Collection
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </a>
          </div>
        </div>

        {/* Right Side*/}
        <div className="flex-1 w-full max-w-lg lg:max-w-xl relative">
          <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full -z-10"></div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="row-span-2 relative group overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800" 
                alt="Fashion Model 1" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition duration-500"></div>
            </div>

            <div className="h-48 md:h-56 relative group overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D" 
                alt="Fashion Model 2" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
              />
            </div>

            <div className="h-48 md:h-56 relative group overflow-hidden rounded-2xl">
              <img 
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800" 
                alt="Fashion Model 3" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
              />
            </div>
            
          </div>
          
          <div className="absolute -bottom-6 -right-6 bg-white text-slate-900 p-4 rounded-xl shadow-xl hidden md:block animate-bounce-slow">
             <p className="font-bold text-lg">50% OFF</p>
             <p className="text-xs text-slate-500">Summer Sale</p>
          </div>
        </div>

      </section>
    </div>
  )
}

export default Home