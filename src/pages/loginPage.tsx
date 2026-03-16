import { useState, type FormEvent } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { getMyDetails, login } from "../services/auth";

function LoginPage() {
   const navigate = useNavigate();

  const { setUser } = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async (e:FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      alert("Missing Fields, Please fill all required fields.");
      return
    }

    try {
      const res = await login(email, password)
      console.log(res.data.accessToken)

      if (!res.data.accessToken) {
        alert("Invalid email or password.");
        return
      }

      await localStorage.setItem("accessToken", res.data.accessToken)

      const detail = await getMyDetails()

      const userData = ({
        ...detail.data,
        roles: detail.data.role    
      })

      setUser(userData);

      localStorage.setItem("user", JSON.stringify(detail.data))

      alert(`Welcome Back Login Successful`);

      setTimeout(() => {
        if (userData.roles?.includes("ADMIN")) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (err :any) {
      console.error(err)

      if (err.response?.status === 401 || err.response?.status === 400) {
       alert("Invalid email or password.");
      } else {
       alert("Error,Something went wrong. Try again.");
      }
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 md:p-10 pt-28">
      <div className="max-w-6xl w-full bg-slate-800 backdrop-blur-xl rounded-4xl border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl">
        
        <div className="w-full md:w-1/2 p-8 md:p-14 order-2 md:order-1"> 
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
            <p className="text-slate-400 text-sm">Sign in to continue your journey with us.</p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-600"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center text-sm">
                <input 
                  type="checkbox" 
                  className="mr-2 accent-sky-600" 
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  disabled={loading}
                />
                Show Password
              </label>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/20 active:scale-[0.98]">
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#1e293b] px-2 text-slate-500">Or login with</span>
              </div>
            </div>

            <button className="w-full bg-transparent border border-slate-700 hover:bg-slate-800 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
              Sign in with Google
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account? <a href="/register" className="text-indigo-400 font-semibold hover:text-indigo-300">Register Here</a>
          </p>
        </div>

        <div className="hidden md:block md:w-1/2 relative order-1 md:order-2"> {/* order-1 සහ md:order-2 මගින් mobile වලදී text මුලින් ද, desktop වලදී රූපය මුලින් ද පෙන්වයි */}
          <img 
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // New image for a different feel
            alt="Login Illustration" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
          <div className="absolute bottom-10 left-10 right-10">
            <h3 className="text-3xl font-bold text-white mb-2">Exclusive Access.</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Login to manage your profile, track orders, and explore personalized deals just for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;