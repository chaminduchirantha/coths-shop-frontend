import React, { useState } from 'react';
import { ChevronDown, ChevronLeft, ShoppingBag, Truck, CreditCard, MapPin, Mail, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderSave } from '../services/orders';
import { useAuth } from '../context/authContext';


const CheckoutPage: React.FC = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const product = state || {
    itemName: "Unknown Fish",
    price: "0",
    qty: 1,
    image: "",
    description: "",
    size: ""
  };

  const parsePrice = (price: any): number => {
    try {
      if (typeof price === 'number') {
        return isNaN(price) ? 0 : price;
      }
      if (typeof price === 'string') {
        const cleanPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
        return isNaN(cleanPrice) ? 0 : cleanPrice;
      }
      return 0;
    } catch {
      return 0;
    }
  };

  const validPrice = parsePrice(product.price);
  const validQty = parseInt(String(product.qty)) || 1;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    username: user?.username || '',
    address: '',
    apartment: '',
    qty: '',
    orderType: '',
    paymentMethod: '',
    orderDate: new Date().toISOString().split('T')[0],
    amount: 0,
    size: '',
    description: '',
  });

  const currentQty = formData.qty ? parseInt(formData.qty) : validQty;
  const subtotal = validPrice > 0 ? validPrice * currentQty : 0;

  React.useEffect(() => {
    setFormData(prev => ({ ...prev, amount: subtotal }));
  }, [subtotal]);

  const [loading, setLoading] = useState(false);
  // const [ setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => {
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
    if (!formData.email || !formData.username  || !formData.address) {
      // setAlert({ type: 'error', message: 'Please fill all required fields' });
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
        itemName: product.fishName,
        price: validPrice.toString(),
        qty: currentQty,
        status: "pending",
        size:formData.size,
        description: formData.description,
      };

      await OrderSave(orderData);
      // setAlert({ type: 'success', message: 'Order placed successfully!' });

        if (formData.paymentMethod === 'card') {
            navigate('/payment', { state: { amount: subtotal } }); 
        } else if (formData.paymentMethod === 'cod') {
            navigate('/dilivery'); 
        }
    
    } catch (error: any) {
      // setAlert({ type: 'error', message: error.response?.data?.message || 'Failed to place order' });
    } finally {
      setLoading(false);
    }
  };

  return (


    <div className="min-h-screen bg-slate-800 text-white pt-24 pb-12 px-4 md:px-8 relative overflow-hidden">
      
      <div className="fixed top-[-10%] right-[-10%] w-125 h-125 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-100 h-100 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 relative z-10">
        
        <div className="w-full lg:w-[65%] space-y-8 order-2 lg:order-1">
          
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic mb-2">
              SECURE <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">CHECKOUT.</span>
            </h1>
            <p className="text-slate-500 font-medium">Complete your order to elevate your style journey.</p>
          </div>

          <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-xl shadow-2xl">
            
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-indigo-500/20">1</div>
                <h2 className="text-xl font-bold tracking-tight">Contact Information</h2>
              </div>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all cursor-not-allowed"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </section>

            {/* Section 2: Shipping Details */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-indigo-500/20">2</div>
                <h2 className="text-xl font-bold tracking-tight">Shipping Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    disabled
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-slate-400 focus:outline-none cursor-not-allowed"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative group">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input
                    type="text"
                    name="address"
                    placeholder="Shipping Address"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input
                    type="number"
                    name="qty"
                    placeholder="Quantity"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                    value={formData.qty}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="relative group">
                  <select 
                    name="orderType"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 appearance-none text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
                    value={formData.orderType}
                    onChange={handleInputChange}
                  >
                    <option value="Dilivery" className="bg-slate-900 text-white">Home Delivery</option>
                    <option value="Take Away" className="bg-slate-900 text-white">Store Pickup</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-hover:text-indigo-400 transition-colors" size={18} />
                </div>
              </div>
            </section>

            {/* Section 3: Payment Method */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-indigo-500/20">3</div>
                <h2 className="text-xl font-bold tracking-tight">Payment Method</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className={`relative flex items-center p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${formData.paymentMethod === 'card' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}>
                  <input type="radio" name="paymentMethod" value="card" className="hidden" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} />
                  <CreditCard className={`mr-4 ${formData.paymentMethod === 'card' ? 'text-indigo-400' : 'text-slate-500'}`} size={24} />
                  <span className={`font-bold uppercase tracking-widest text-[10px] ${formData.paymentMethod === 'card' ? 'text-white' : 'text-slate-400'}`}>Credit / Debit Card</span>
                  {formData.paymentMethod === 'card' && <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full animate-ping"></div>}
                </label>

                <label className={`relative flex items-center p-6 rounded-3xl border-2 cursor-pointer transition-all duration-300 ${formData.orderType === 'Take Away' ? 'opacity-30 cursor-not-allowed' : ''} ${formData.paymentMethod === 'cod' ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/5 bg-white/5 hover:border-white/20'}`}>
                  <input type="radio" name="paymentMethod" value="cod" className="hidden" disabled={formData.orderType === 'Take Away'} checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
                  <Truck className={`mr-4 ${formData.paymentMethod === 'cod' ? 'text-indigo-400' : 'text-slate-500'}`} size={24} />
                  <span className={`font-bold uppercase tracking-widest text-[10px] ${formData.paymentMethod === 'cod' ? 'text-white' : 'text-slate-400'}`}>Cash on Delivery</span>
                </label>
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5">
              <button 
                className="flex items-center gap-2 text-slate-500 hover:text-white font-black transition-all text-[10px] uppercase tracking-[0.3em] group"
                onClick={() => navigate(-1)}
              >
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Collection
              </button>
              <button 
                onClick={handleOrderSubmit}
                disabled={loading}
                className="w-full md:w-auto relative overflow-hidden group/btn bg-white text-slate-950 px-16 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95 shadow-2xl shadow-white/5"
              >
                <div className="absolute inset-0 w-0 bg-indigo-600 transition-all duration-300 group-hover/btn:w-full"></div>
                <span className="relative z-10 group-hover/btn:text-white transition-colors">
                  {loading ? 'Processing...' : 'Complete Purchase'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary Card */}
        {/* Right Side: Order Summary Card (Updated for larger width) */}
        <aside className="w-full lg:w-[45%] order-1 lg:order-2">
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-10 md:p-12 sticky top-28 backdrop-blur-2xl shadow-3xl">
            
            <h2 className="text-2xl font-black text-white mb-12 flex items-center gap-4">
              <ShoppingBag className="text-indigo-400" size={28} /> 
              Order Summary
            </h2>
            
            {/* Product Card - Larger Version */}
            <div className="flex flex-col sm:flex-row gap-8 mb-12 group p-6 bg-white/5 rounded-2xl border border-white/5 transition-all hover:bg-white/10">
              
              {/* Product Image Area - Scaled up */}
              <div className="relative shrink-0 mx-auto sm:mx-0">
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border border-white/10 bg-slate-800 shadow-2xl">
                  <img 
                    src={product.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={product.itemName} 
                  />
                </div>
                {/* Quantity Badge - Larger */}
                <div className="absolute -top-4 -right-4 bg-indigo-600 text-white text-xs font-black h-10 w-10 flex items-center justify-center rounded-2xl shadow-2xl border-4 border-[#0a0c10]">
                  {currentQty}
                </div>
              </div>

              {/* Product Details - More prominent */}
              <div className="flex flex-col justify-center flex-1">
                <h3 className="text-2xl font-black text-white tracking-tight leading-tight mb-3">
                  {product.itemName}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-3 line-clamp-2 italic">
                  {product.desciption}
                </p>
                
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-300">
                    Size: {product.size}
                  </span>
                </div>

                <p className="text-indigo-400 text-xl font-black tracking-tighter">
                  LKR {validPrice.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Calculation Section (මෙහි පරණ code එකම ලොකුවට දිස්වේවි) */}
            <div className="space-y-6 mb-10 px-2">
              <div className="flex justify-between text-slate-400 text-base font-medium">
                <span>Subtotal</span>
                <span className="text-white font-bold tracking-tighter text-lg">
                  LKR {subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
                </span>
              </div>
              
              <div className="flex justify-between text-slate-400 text-sm font-medium">
                <span>Shipping Estimate</span>
                <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">Calculated Next</span>
              </div>

              <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent"></div>

              <div className="flex justify-between items-end pt-4">
                <div>
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-1">Grand Total</p>
                  <p className="text-slate-600 text-[9px] uppercase font-bold tracking-widest italic text-left">All Taxes Included</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-white tracking-tighter leading-none drop-shadow-lg">
                    LKR {subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </p>
                </div>
              </div>
            </div>

            {/* Small Note */}
            <p className="text-[10px] text-slate-600 text-center font-medium uppercase tracking-[0.2em] mt-8">
              100% SECURE & ENCRYPTED TRANSACTION
            </p>

          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;