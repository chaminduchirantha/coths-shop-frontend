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

  const availableSizes = product.size ? product.size.trim().split(/\s+/) : [];

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
    size: availableSizes.length > 0 ? availableSizes[0] : '', 
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

  const handleSizeSelect = (selectedSize: string) => {
    setFormData(prev => ({ ...prev, size: selectedSize }));
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
    <div className="min-h-screen bg-white text-black pt-24 pb-12 px-4 md:px-8 relative overflow-hidden font-sans">
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 relative z-10">
        
        {/* Left Side: Form */}
        <div className="w-full lg:w-[60%] space-y-6 order-2 lg:order-1">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
              SECURE <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 uppercase italic">Checkout.</span>
            </h1>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">Complete your order to elevate your style journey.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm">
            
            {/* Step 1: Contact */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-bold text-black border border-black rounded-full h-5 w-5 flex items-center justify-center">1</span>
                <h2 className="text-sm font-semibold text-black uppercase tracking-wider">Contact Information</h2>
              </div>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black transition-colors" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg py-4 pl-12 pr-6 text-slate-600 cursor-not-allowed outline-none"
                />
              </div>
            </section>

            {availableSizes.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-xs font-bold text-black border border-black rounded-full h-5 w-5 flex items-center justify-center">2</span>
                  <h2 className="text-sm font-semibold text-black uppercase tracking-wider">Select Size</h2>
                </div>
                
                <div className="w-full flex border border-slate-300 bg-slate-50 overflow-hidden divide-x divide-slate-300 rounded-xl shadow-sm">
                    {availableSizes.map((sizeLabel: string, index: number) => (
                    <button 
                      key={index}
                      type="button" 
                      onClick={() => handleSizeSelect(sizeLabel)}
                      className={`flex-1 py-4 text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                      formData.size === sizeLabel 
                        ? 'bg-black text-white shadow-inner' 
                        : 'text-slate-500 hover:bg-slate-200 hover:text-black'
                      }`}
                    >
                      {sizeLabel}
                    </button>
                    ))}
                </div>
              </section>
            )}

            {/* Step 2: Shipping */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-bold text-black border border-black rounded-full h-5 w-5 flex items-center justify-center">2</span>
                <h2 className="text-sm font-semibold text-black uppercase tracking-wider">Shipping Details</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black" size={20} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    disabled
                    className="w-full bg-slate-100 border border-slate-300 rounded-lg py-4 pl-12 pr-6 text-slate-600 cursor-not-allowed outline-none"
                  />
                </div>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-black" size={20} />
                  <input
                    type="text"
                    name="address"
                    placeholder="Delivery Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-300 rounded-lg py-4 pl-12 pr-6 text-black focus:ring-1 focus:ring-black/10 focus:border-black transition-all outline-none"
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
                    className="w-full bg-white border border-slate-300 rounded-lg py-4 px-6 text-black focus:ring-1 focus:ring-black/10 focus:border-black transition-all outline-none"
                  />
                </div>
                <div className="relative group">
                  <select 
                    name="orderType"
                    value={formData.orderType}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-slate-300 rounded-lg py-4 px-6 appearance-none text-black cursor-pointer outline-none focus:ring-1 focus:ring-black/10 focus:border-black"
                  >
                    <option value="Dilivery" className="bg-white">Home Delivery</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-black transition-colors" size={20} />
                </div>
              </div>
            </section>

            {/* Step 3: Payment */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-xs font-bold text-black border border-black rounded-full h-5 w-5 flex items-center justify-center">3</span>
                <h2 className="text-sm font-semibold text-black uppercase tracking-wider">Payment</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className={`group relative flex items-center p-5 rounded-lg border cursor-pointer transition-all duration-300 ${formData.paymentMethod === 'card' ? 'border-black bg-slate-100' : 'border-slate-300 bg-white hover:border-black'}`}>
                  <input type="radio" name="paymentMethod" value="card" className="hidden" checked={formData.paymentMethod === 'card'} onChange={handleInputChange} />
                  <div className={`p-3 rounded-md mr-4 transition-colors ${formData.paymentMethod === 'card' ? 'bg-black text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <CreditCard size={20} />
                  </div>
                  <span className={`font-bold text-[10px] uppercase tracking-widest ${formData.paymentMethod === 'card' ? 'text-black' : 'text-slate-400'}`}>Online Payment</span>
                </label>

                <label className={`group relative flex items-center p-5 rounded-lg border cursor-pointer transition-all duration-300 ${formData.orderType === 'Take Away' ? 'opacity-30 cursor-not-allowed' : ''} ${formData.paymentMethod === 'cod' ? 'border-black bg-slate-100' : 'border-slate-300 bg-white hover:border-black'}`}>
                  <input type="radio" name="paymentMethod" value="cod" className="hidden" disabled={formData.orderType === 'Take Away'} checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
                  <div className={`p-3 rounded-md mr-4 transition-colors ${formData.paymentMethod === 'cod' ? 'bg-black text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Truck size={20} />
                  </div>
                  <span className={`font-bold text-[10px] uppercase tracking-widest ${formData.paymentMethod === 'cod' ? 'text-black' : 'text-slate-400'}`}>Cash on Delivery</span>
                </label>
              </div>
            </section>

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 border-t border-slate-200">
              <button 
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-black transition-colors text-[10px] font-black uppercase tracking-widest group"
              >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                Back to store
              </button>
              
              <button 
                onClick={handleOrderSubmit}
                disabled={loading}
                className="w-full sm:w-auto bg-black text-white px-16 py-5 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-black/90 transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Complete Purchase <ChevronRight size={16} /></>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <aside className="w-full lg:w-[40%] order-2 lg:order-2">
          {/* h-full saha flex flex-col damma left height ekata match wenna */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-lg h-full flex flex-col">
            
            <h2 className="text-xl font-bold text-black mb-6 flex items-center gap-3">
              <ShoppingBag className="text-black" size={24} /> <span className="uppercase tracking-wide">Summary</span>
            </h2>
            
            {/* Loku Image Section */}
            <div className="relative w-full  sm:aspect-square bg-slate-100 rounded-xl overflow-hidden mb-6 border border-slate-200">
              <img src={product.image} className="w-full h-full object-cover" alt={product.itemName} />
              <span className="absolute top-4 right-4 bg-black text-white text-sm font-bold h-8 w-8 flex items-center justify-center rounded-xl shadow-xl">
                {currentQty}
              </span>
            </div>

            {/* Product Details - Image Eka Yatin */}
            <div className="flex flex-col mb-8">
              <h3 className="text-2xl font-black text-black mb-2 leading-tight uppercase">{product.itemName}</h3>
              <p className="text-slate-500 text-sm italic mb-5 line-clamp-2">{product.desciption}</p>
              
              {/* Size & Price Box */}
              <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                {formData.size && (
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Selected Size</span>
                    <span className="text-base text-black font-black uppercase">{formData.size}</span>
                  </div>
                )}
                <div className="flex flex-col text-right ml-auto">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Unit Price</span>
                  <div className="text-sm text-slate-600 font-medium">
                    LKR <span className="text-xl text-black font-bold tracking-tight">{validPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Totals Section - mt-auto nisa card eke yatatama thallu wenawa */}
            <div className="space-y-4 pt-6 border-t border-slate-200 mt-auto">
              <div className="flex justify-between text-slate-600 text-xs font-bold uppercase tracking-wider">
                <span>Subtotal</span>
                <span className="text-black text-sm">LKR {subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-xs font-bold uppercase tracking-wider items-center">
                <span>Shipping Estimate</span>
                <span className="text-slate-400 text-[9px] font-bold uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">Calculated Next</span>
              </div>
              
              <div className="h-px bg-slate-200 my-4"></div>
              
              <div className="flex justify-between items-end pt-2">
                <div>
                  <p className="text-sm text-black font-extrabold uppercase tracking-wide italic">GRAND TOTAL</p>
                  <p className="text-[10px] text-slate-600 uppercase italic mt-1">All Taxes Included</p>
                </div>
                <div className="text-xs text-slate-600 font-medium">LKR <span className="text-3xl md:text-4xl text-black font-black tracking-tighter">{subtotal.toLocaleString(undefined, {minimumFractionDigits: 2})}</span></div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mt-8 pt-6 flex items-center justify-center gap-2 opacity-40 grayscale border-t border-slate-100">
              <ShieldCheck size={14} className="text-slate-700" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">100% Secure & Encrypted</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CheckoutPage;