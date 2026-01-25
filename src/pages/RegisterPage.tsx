
function Register() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 md:p-10 pt-28">
      <div className="max-w-6xl w-full bg-slate-800/40 backdrop-blur-xl rounded-4xl border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl">
        
        <div className="hidden md:block md:w-1/2 relative">
          <img 
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Fashion Model" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10">
            <h3 className="text-3xl font-bold text-white mb-2">Join the Elite.</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Create an account to access exclusive drops, personalized style recommendations, and members-only events.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-14">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-slate-400 text-sm">Welcome! Please enter your details.</p>
          </div>

          <form className="space-y-6" onClick={(e) => e.preventDefault()}>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Confirm Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>

            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 active:scale-[0.98]">
              Create Account
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1e293b] px-2 text-slate-500">Or register with</span>
              </div>
            </div>

            <button className="w-full bg-transparent border border-slate-700 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
              Sign up with Google
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account? <a href="/login" className="text-indigo-400 font-semibold hover:text-indigo-300">Log in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;