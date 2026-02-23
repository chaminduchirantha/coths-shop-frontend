import { useEffect, useState, useRef } from 'react';
import { getMyDetails } from '../services/auth';
import { User, LayoutDashboard, LogOut, ChevronDown, Menu, X } from 'lucide-react';

interface UserData {
  username: string;
  email: string;
  role: string[];
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await getMyDetails();
          setUser(response.data);
        }
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Product', href: '/product' },
    { name: 'Feedbacks', href: '/feedbacks' },
    { name: 'Collection', href: '/collection' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed w-full z-100 top-0 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <a href="/home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
            <span className="text-white font-black text-xl">C</span>
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">
            Cloth<span className="text-indigo-500">Shop</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[13px] font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 pr-4 rounded-full hover:bg-white/10 transition-all active:scale-95"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-black shadow-inner">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:block text-xs font-bold text-slate-200 uppercase tracking-tight">
                  {user.username}
                </span>
                <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${openDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {openDropdown && (
                <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                  <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Signed in as</p>
                    <p className="text-sm font-bold text-white truncate">{user.email}</p>
                  </div>
                  <div className="p-2">
                    <a href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white rounded-xl transition-all">
                      <LayoutDashboard size={16} /> Dashboard
                    </a>
                    <a href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm text-slate-300 hover:bg-indigo-600 hover:text-white rounded-xl transition-all">
                      <User size={16} /> Profile Settings
                    </a>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all mt-1"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <a href="/register">
              <button className="hidden md:flex bg-white text-slate-950 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5">
                Get Started
              </button>
            </a>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:bg-white/5 rounded-xl transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-slate-950 border-b border-white/5 p-6 animate-in slide-in-from-top duration-300">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="text-lg font-bold text-slate-300 hover:text-indigo-400 block">{link.name}</a>
              </li>
            ))}
            {!user && (
              <li className="pt-4">
                <a href="/register" className="block w-full bg-indigo-600 text-white text-center py-3 rounded-xl font-bold">Get Started</a>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;