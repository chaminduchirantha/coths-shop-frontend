import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Twitter } from 'lucide-react';

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ඔබේ message sending logic එක මෙතනට
    alert("Message Sent Successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-32 pb-20 px-6 overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="fixed top-[10%] right-[-5%] w-400px h-400px bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[10%] left-[-5%] w-400px h-400px bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block animate-pulse">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            WE'D LOVE TO <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">HEAR FROM YOU.</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed">
            Have a question about our collection or need assistance with an order? Reach out to our concierge team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* --- Left Side: Contact Information --- */}
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Info Cards */}
              {[
                { icon: <Phone size={24}/>, title: "Call Us", detail: "+94 77 123 4567", sub: "Mon-Fri, 9am - 6pm" },
                { icon: <Mail size={24}/>, title: "Email Us", detail: "hello@clothshop.com", sub: "Online support 24/7" },
                { icon: <MapPin size={24}/>, title: "Visit Us", detail: "No 123, Fashion Avenue,", sub: "Colombo 07, Sri Lanka" },
                { icon: <Clock size={24}/>, title: "Working Hours", detail: "09:00 AM - 08:00 PM", sub: "Open Daily" }
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-white/5 border border-white/5 rounded-2xl hover:border-indigo-500/30 transition-all group">
                  <div className="text-indigo-400 mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="font-bold text-white mb-1 uppercase tracking-wider text-xs">{item.title}</h3>
                  <p className="text-slate-200 font-semibold mb-1">{item.detail}</p>
                  <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{item.sub}</p>
                </div>
              ))}
            </div>

            {/* Social Connect */}
            <div className="p-8 bg-linear-to-br from-indigo-600/10 to-transparent border border-indigo-500/20 rounded-2xl">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-6">Follow Our Journey</h3>
              <div className="flex gap-4">
                {[<Instagram/>, <Facebook/>, <Twitter/>].map((icon, i) => (
                  <button key={i} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-xl">
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* --- Right Side: Contact Form --- */}
          <div className="relative">
            <div className="bg-slate-900/40 border border-white/5 p-8 md:p-12 rounded-2xl h-full backdrop-blur-xl shadow-2xl relative overflow-hidden">
              {/* Form Decor */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all text-sm" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all text-sm" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Subject</label>
                  <select className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all text-sm appearance-none text-slate-400">
                    <option>General Inquiry</option>
                    <option>Order Support</option>
                    <option>Returns & Exchanges</option>
                    <option>Bulk Orders</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-4">Your Message</label>
                  <textarea rows={4} placeholder="Write your message here..." className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all text-sm resize-none" required></textarea>
                </div>

                <button type="submit" className="w-full group relative overflow-hidden bg-white text-slate-950 py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all active:scale-95 flex items-center justify-center gap-3">
                  <div className="absolute inset-0 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></div>
                  <Send size={16} className="relative z-10 group-hover:text-white transition-colors" />
                  <span className="relative z-10 group-hover:text-white transition-colors">Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;