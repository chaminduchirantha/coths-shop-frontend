import { useEffect, useState } from 'react';
import { getMyDetails } from '../services/auth';

function Header() {

  interface UserData {
    username: string;
    email: string;
    role: string[];
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // හෝ ඔබ ටෝකනය තබා ගන්නා තැන
        if (token) {
          const response = await getMyDetails();
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="fixed w-full z-50 top-0 start-0 border-b border-white/10 bg-slate-700 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3 ">
        
        <a href="/home" className="flex items-center rtl:space-x-reverse">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-white tracking-tight">
            Cloth<span className="text-indigo-400">Shop</span>.
          </span>
        </a>

        <div className="flex md:order-2 space-x-3 items-center">
          {user ? (
          <div className="relative">
            {/* Avatar */}
            <div
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center gap-3 bg-white/5 border border-white/10 p-1 pr-4 rounded-full cursor-pointer hover:bg-white/10 transition"
            >
              <div className="w-9 h-9 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm font-medium text-slate-200">
                {user.username}
              </span>
            </div>

            {/* Dropdown */}
            {openDropdown && (
              <div className="absolute right-0 mt-3 w-44 bg-slate-900 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                {/* <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
                >
                  Profile
                </a> */}
                <a
                  href="/home"
                  className="block px-4 py-2 text-sm text-slate-200 hover:bg-white/5"
                >
                  Dashboard
                </a>  
                <a
                  href='/login'
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        ) : (
          <a href="/register">
            <button
              type="button"
              className="hidden md:block text-slate-900 bg-white hover:bg-slate-100 font-medium rounded-full text-sm px-5 py-2.5 transition-all shadow-lg cursor-pointer  hover:shadow-indigo-500/20 scale-100"
            >
              Get Started
            </button>
          </a>
        )}
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-400 rounded-lg md:hidden hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>

        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-slate-700 rounded-lg bg-slate-800/50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <a href="/home" className="block py-2 px-3 text-white bg-indigo-600 rounded md:bg-transparent md:text-indigo-400 md:p-0" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/about" className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-700 md:hover:bg-transparent md:hover:text-white md:p-0 transition-colors duration-300">About</a>
            </li>
            <li>
              <a href="/services" className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-700 md:hover:bg-transparent md:hover:text-white md:p-0 transition-colors duration-300">Services</a>
            </li>
            <li>
              <a href="/product" className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-700 md:hover:bg-transparent md:hover:text-white md:p-0 transition-colors duration-300">Product</a>
            </li>
             <li>
              <a href="/feedbacks" className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-700 md:hover:bg-transparent md:hover:text-white md:p-0 transition-colors duration-300">Feedbacks</a>
            </li>
            <li>
              <a href="/collection" className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-700 md:hover:bg-transparent md:hover:text-white md:p-0 transition-colors duration-300">Collection</a>
            </li>
            <li>
              <a href="/contact" className="block py-2 px-3 text-slate-300 rounded hover:bg-slate-700 md:hover:bg-transparent md:hover:text-white md:p-0 transition-colors duration-300">Contact</a>
            </li>
            <li className="md:hidden mt-2">
                 <a href="/register" className="block w-full text-center py-2 px-3 text-slate-900 bg-white rounded font-bold">Get Started</a>
            </li>
          </ul>
        </div>

      </nav>
    </header>
  )
}

export default Header