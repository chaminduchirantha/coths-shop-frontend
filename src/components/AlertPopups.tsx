import { Link } from "react-router-dom";
import { LockKeyhole } from "lucide-react"; // Icons පාවිච්චි කිරීම Premium පෙනුමක් ලබා දෙයි

export default function AlertPopups() {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"></div>

      <div className="relative bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-10 w-full max-w-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-pop overflow-hidden">
        
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-600/20 blur-[50px] rounded-full"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <LockKeyhole className="text-indigo-400" size={32} />
          </div>

          <h2 className="text-2xl font-black text-white tracking-tight mb-3">
            Authentication <span className="text-indigo-400">Required</span>
          </h2>

          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            To access the exclusive collection and premium features, please sign in to your account.
          </p>

          <div className="w-full space-y-3">
            <Link
              to="/login"
              className="group relative flex items-center justify-center w-full bg-white text-slate-950 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 w-0 bg-indigo-600 transition-all duration-300 group-hover:w-full"></div>
              <span className="relative group-hover:text-white transition-colors">Sign In Now</span>
            </Link>

            <Link
              to="/register"
              className="flex items-center justify-center w-full bg-slate-800/50 border border-white/5 text-white py-3.5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all active:scale-95"
            >
              Create New Account
            </Link>
          </div>

          {/* Footer Link */}
          <Link to="/home" className="mt-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest hover:text-indigo-400 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pop {
          0% { transform: scale(0.9) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        .animate-pop {
          animation: pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
}