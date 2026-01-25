
function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24">
      {/* --- Hero Section --- */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <span className="text-indigo-400 font-semibold tracking-widest uppercase text-sm">Our Story</span>
        <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
          Redefining Fashion <br /> Through <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">Quality & Care</span>
        </h1>
        <p className="max-w-2xl mx-auto text-slate-400 text-lg leading-relaxed">
          Founded in 2024, Cloth Shop began with a simple mission: to provide high-quality, sustainable fashion that makes people feel confident every single day.
        </p>
      </section>

      {/* --- Image & Text Section (The Journey) --- */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-indigo-500/20 blur-2xl rounded-full"></div>
            <img 
              src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=1000" 
              alt="Our Workshop" 
              className="relative rounded-3xl shadow-2xl border border-slate-700 object-cover h-125 w-full"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Craftsmanship First</h2>
            <p className="text-slate-400 leading-relaxed">
              Every piece in our collection is hand-picked and checked for durability. We believe that fashion shouldn't be "fast"—it should be lasting. Our designers work with ethical factories to ensure that your style doesn't come at the cost of the environment.
            </p>
            <ul className="space-y-4">
              {['Ethically Sourced Materials', 'Premium Fabric Quality', 'Carbon Neutral Shipping'].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-indigo-400"></div>
                  <span className="text-slate-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      

      {/* --- Final CTA --- */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Want to see our latest work?</h2>
        <a href="/collection">
          <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full font-bold transition-all shadow-lg hover:shadow-indigo-500/20">
            Browse the Collection
          </button>
        </a>
      </section>
    </div>
  );
}

export default About;