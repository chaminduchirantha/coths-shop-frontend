import { Truck, RotateCcw, ShieldCheck, Gem, Shirt, Scissors } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: <Gem className="text-indigo-400" size={32} />,
      title: "Premium Quality",
      desc: "We source only the finest fabrics and materials to ensure every piece feels as luxurious as it looks."
    },
    {
      icon: <Truck className="text-indigo-400" size={32} />,
      title: "Islandwide Delivery",
      desc: "Fast and secure delivery to your doorstep within 2-3 working days, anywhere in Sri Lanka."
    },
    {
      icon: <RotateCcw className="text-indigo-400" size={32} />,
      title: "Easy Returns",
      desc: "Not the perfect fit? No worries. Our 7-day hassle-free return policy has you covered."
    },
    {
      icon: <Scissors className="text-indigo-400" size={32} />,
      title: "Custom Tailoring",
      desc: "Get your outfits custom-fitted by our expert tailors for that perfect, bespoke silhouette."
    },
    {
      icon: <ShieldCheck className="text-indigo-400" size={32} />,
      title: "Secure Payments",
      desc: "Shop with confidence using our encrypted payment gateway supporting all major cards."
    },
    {
      icon: <Shirt className="text-indigo-400" size={32} />,
      title: "Personal Styling",
      desc: "Book a session with our fashion consultants to curate a wardrobe that defines you."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-32 pb-20 px-6">
      
      {/* Background Decor */}
      <div className="fixed top-20 left-[-10%] w-500px h-500px bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">
            Our Commitment
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            ELEVATING YOUR <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">EXPERIENCE.</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Beyond clothing, we provide a seamless service journey designed for the modern fashion enthusiast.
          </p>
        </div>

        {/* --- Services Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative p-10 bg-slate-900/40 border border-white/5 rounded-[2.5rem] backdrop-blur-sm transition-all duration-500 hover:border-indigo-500/30 hover:bg-slate-900/60 shadow-2xl shadow-black/20"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/20 transition-all duration-500">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-slate-500 leading-relaxed text-sm font-medium">
                {service.desc}
              </p>

              {/* Decorative Corner Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        {/* --- Footer Call to Action --- */}
        <div className="mt-24 p-12 bg-linear-to-br from-slate-900 to-indigo-950/30 border border-white/5 rounded-[3rem] text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Have a special requirement?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">Our support team is available 24/7 to assist you with any inquiries or custom orders.</p>
            <button className="bg-white text-slate-950 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-white/5">
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServicesPage;