import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, ShoppingBag, Truck, CreditCard, 
  MapPin, Mail, User, ShieldCheck, ChevronRight, 
  ArrowLeft 
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderSave } from '../services/orders';
import { useAuth } from '../context/authContext';

const CheckoutPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Product data with fallbacks
  const product = state || {
    itemName: "Unknown Item",
    fishName: "Unknown Fish", // Added to match your orderData logic
    price: "0",
    qty: 1,
    image: "",
    description: "",
    size: ""
  };

  // Utility to clean price strings
  const parsePrice = (price: any): number => {
    try {
      if (typeof price === 'number') return isNaN(price) ? 0 : price;
      if (typeof price === 'string') {
        const cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
        return isNaN(cleanPrice) ? 0 : cleanPrice;
      }
      return 0;
    } catch { return 0; }
  };

  const validPrice = parsePrice(product.price);
  const validQty = parseInt(String(product.qty)) || 1;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    username: user?.username || '',
    address: '',
    apartment: '',
    qty: validQty.toString(),
    orderType: 'Dilivery',
    paymentMethod: 'card',
    orderDate: new Date().toISOString().split('T')[0],
    amount: 0,
    size: product.size || '',
    description: product.description || '',
  });

  const [loading, setLoading] = useState(false);

  // Subtotal calculation
  const currentQty = formData.qty ? parseInt(formData.qty) : validQty;
  const subtotal = validPrice * currentQty;

  useEffect(() => {
    setFormData(prev => ({ ...prev, amount: subtotal }));
  }, [subtotal]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prev => {
      // Special logic: If Take Away is selected, force Card payment
      if (name === 'orderType' && value === 'Take Away') {
        return {
          ...prev,
          orderType: value,
          paymentMethod: 'card'
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleOrderSubmit = async () => {
    if (!formData.email || !formData.username || !formData.address || !formData.paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const orderData = {
        email: formData.email,
        username: formData.username,
        address: formData.address,
        paymentMethod: formData.paymentMethod,
        amount: subtotal.toString(),
        orderType: formData.orderType,
        orderDate: formData.orderDate,
        itemName: product.itemName || product.fishName, // Ensures name is captured
        price: validPrice.toString(),
        qty: currentQty,
        status: "pending",
        size: formData.size,
        description: formData.description,
      };

      await OrderSave(orderData);

      if (formData.paymentMethod === 'card') {
        navigate('/payment', { state: { amount: subtotal } });
      } else {
        navigate('/dilivery');
      }
    } catch (error: any) {
      console.error("Order failed:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-800 text-white pt-24 pb-12 px-4 md:px-8 relative overflow-hidden font-sans">
      
      {/* Background Blurs */}
      <div className="fixed top-[-5%] right-[-5%] w-125 h-125 bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="fixed bottom-[-5%] left-[-5%] w-100 h-100 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-[60%] space-y-6 order-2 lg:order-1">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              Finalize <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 uppercase italic">Order.</span>
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded-full"></div>
          </div>

          <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-2xl shadow-2xl">
            
            {/* Step 1: Contact */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/20">1</span>
                <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-wider">Contact Information</h2>
              </div>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-4 pl-12 pr-6 text-slate-400 cursor-not-allowed outline-none"
                />
              </div>
            </section>

            {/* Step 2: Shipping */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/20">2</span>
                <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-wider">Shipping Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    disabled
                    className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-4 pl-12 pr-6 text-slate-400 cursor-not-allowed outline-none"
                  />
                </div>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400" size={20} />
                  <input
                    type="text"
                    name="address"
                    placeholder="Delivery Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 pl-12 pr-6 text-white focus:ring-2 focus:ring-indigo-500/30 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <input
                    type="number"
                    name="qty"
                    placeholder="Qty"
                    value={formData.qty}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 px-6 text-white focus:ring-2 focus:ring-indigo-500/30 transition-all outline-none"
                  />
                </div>
                <div className="relative group">
                  <select 
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl py-4 px-6 appearance-none text-slate-300 cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500/30"
                  >
                    <option value="Dilivery" className="bg-slate-900">Home Delivery</option>
                    <option value="Take Away" className="bg-slate-900">Store Pickup</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-hover:text-indigo-400 transition-colors" size={20} />
                </div>
              </div>
            </section>

            {/* Step 3: Payment */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white text-sm font-bold shadow-lg shadow-indigo-500/20">3</span>
                <h2 className="text-lg font-semibold text-slate-200 uppercase tracking-wider">Payment</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`group relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${formData.paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-slate-950/30 hover:border-white/20'}`}>
                  <input type="radio" name="paymentMethod" value="card" className="hidden" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} />
                  <div className={`p-3 rounded-lg mr-4 transition-colors ${formData.paymentMethod === 'card' ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-500'}`}>
                    <CreditCard size={20} />
                  </div>
                  <span className={`font-bold text-[10px] uppercase tracking-widest ${formData.paymentMethod === 'card' ? 'text-white' : 'text-slate-400'}`}>Online Payment</span>
                </label>

                <label className={`group relative flex items-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${formData.orderType === 'Take Away' ? 'opacity-30 cursor-not-allowed' : ''} ${formData.paymentMethod === 'cod' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-slate-950/30 hover:border-white/20'}`}>
                  <input type="radio" name="paymentMethod" value="cod" className="hidden" disabled={formData.orderType === 'Take Away'} checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
                  <div className={`p-3 rounded-lg mr-4 transition-colors ${formData.paymentMethod === 'cod' ? 'bg-indigo-500 text-white' : 'bg-white/5 text-slate-500'}`}>
                    <Truck size={20} />
                  </div>
                  <span className={`font-bold text-[10px] uppercase tracking-widest ${formData.paymentMethod === 'cod' ? 'text-white' : 'text-slate-400'}`}>Cash on Delivery</span>
                </label>
              </div>
            </section>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                Back to store
              </button>
              
              <button 
                onClick={handleOrderSubmit}
                disabled={loading}
                className="w-full sm:w-auto bg-white text-slate-950 px-12 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Complete Purchase <ChevronRight size={16} /></>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <aside className="w-full lg:w-[40%] order-1 lg:order-2">
          <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-8 sticky top-28 backdrop-blur-3xl shadow-3xl">
            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <ShoppingBag className="text-indigo-400" size={24} /> Summary
            </h2>
            
            <div className="bg-white/5 border border-white/5 rounded-2xl p-5 mb-8 flex gap-5">
              <div className="relative">
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-800 border border-white/10">
                  <img src={product.image} className="w-full h-full object-cover" alt={product.itemName} />
                </div>
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-[10px] font-bold h-6 w-6 flex items-center justify-center rounded-lg shadow-xl">
                  {currentQty}
                </span>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-bold text-white mb-1 leading-tight">{product.itemName}</h3>
                <p className="text-slate-400 text-xs italic mb-2 line-clamp-1">{product.description}</p>
                <span className="text-indigo-400 font-bold">LKR {validPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="space-y-4 px-1">
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Subtotal</span>
                <span className="text-white font-bold">LKR {subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-sm">
                <span>Shipping</span>
                <span className="text-indigo-400 text-[9px] font-bold uppercase tracking-wider bg-indigo-500/10 px-2 py-1 rounded">Calculated Next</span>
              </div>
              <div className="h-px bg-white/5 my-4"></div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total</p>
                  <p className="text-[9px] text-slate-600">All Taxes Included</p>
                </div>
                <p className="text-3xl font-black text-white tracking-tighter">
                  LKR {subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 opacity-30">
              <ShieldCheck size={14} />
              <span className="text-[9px] font-bold uppercase tracking-widest text-center">100% Secure & Encrypted Transaction</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;