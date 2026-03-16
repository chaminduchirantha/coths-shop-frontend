import { Instagram, Twitter, Linkedin, Facebook, Mail, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#0a0c10] pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Identity */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tighter italic text-white">
              CLOTH <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">STUDIO.</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Elevating your daily style with premium craftsmanship and modern aesthetics. Designed for the bold and the visionary.
            </p>
            <div className="flex gap-4 pt-2">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Navigation</h3>
            <ul className="space-y-4">
              {['New Arrivals', 'Best Sellers', 'Collections', 'Our Story'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 text-sm font-bold hover:text-white transition-colors flex items-center group">
                    <span className="w-0 group-hover:w-4 h-px bg-indigo-500 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div>
            <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8">Support</h3>
            <ul className="space-y-4">
              {['Shipping Policy', 'Returns & Exchanges', 'Privacy Policy', 'Terms of Service'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 text-sm font-bold hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-6">Stay Connected</h3>
              <div className="relative group">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white hover:bg-indigo-500 transition-colors">
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-500 text-xs">
                <MapPin size={14} className="text-indigo-400" />
                <span>Colombo, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-xs">
                <Mail size={14} className="text-indigo-400" />
                <span>hello@clothstudio.lk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">
            © 2026 CLOTH STUDIO. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Developed with passion in</span>
            <span className="text-[10px] text-white font-black uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md border border-white/10">Sri Lanka 🇱🇰</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;