import React, { useState } from 'react';

function AdminDashboard() {
  // 1. Logic: State to track which view to show
  const [activeTab, setActiveTab] = useState('Dashboard');

  const stats = [
    { title: 'Total Revenue', value: '$124,592', growth: '+12.5%', icon: '💰' },
    { title: 'Active Orders', value: '458', growth: '+5.4%', icon: '📦' },
    { title: 'Total Customers', value: '8,249', growth: '+18.2%', icon: '👥' },
    { title: 'Conversion Rate', value: '3.24%', growth: '+2.1%', icon: '📈' },
  ];

  // Dummy Product Data
  const products = [
    { id: 1, name: 'Premium Silk Gown', stock: 12, price: '$299', category: 'Formal' },
    { id: 2, name: 'Cotton Summer Tee', stock: 45, price: '$45', category: 'Casual' },
    { id: 3, name: 'Woolen Overcoat', stock: 8, price: '$180', category: 'Winter' },
  ];

  // 2. Component: Dashboard Content (Your original stats and table)
  const DashboardHome = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-white/5 p-6 rounded-2xl hover:border-indigo-500/30 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">{stat.growth}</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
            <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-indigo-400 transition-colors">{stat.value}</h3>
          </div>
        ))}
      </div>
      <div className="p-10 bg-slate-900 rounded-2xl border border-white/5 text-center">
         <p className="text-slate-400">Recent Orders Table and Activity Feed would appear here...</p>
      </div>
    </div>
  );

  // 3. Component: Products Content
  const ProductsView = () => (
    <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-white">Product Inventory</h3>
        <input type="text" placeholder="Search products..." className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 text-slate-500 text-xs uppercase">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Stock</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-white font-medium">{p.name}</td>
                <td className="px-6 py-4 text-slate-400">{p.category}</td>
                <td className="px-6 py-4 text-slate-400">{p.stock} units</td>
                <td className="px-6 py-4 text-white font-bold">{p.price}</td>
                <td className="px-6 py-4">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-4 text-sm">Edit</button>
                  <button className="text-rose-400 hover:text-rose-300 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // 4. Logic: Render the correct view based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard': return <DashboardHome />;
      case 'Products': return <ProductsView />;
      case 'Orders': return <div className="text-white p-10">Orders View Loading...</div>;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900/50 border-r border-white/5 backdrop-blur-xl hidden lg:flex flex-col p-6 sticky top-0 h-screen">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold text-white">Cloth<span className="text-indigo-400">Shop</span></h1>
          <p className="text-[10px] uppercase text-slate-500 font-bold mt-1 tracking-widest">Admin Control</p>
        </div>

        <nav className="space-y-2 flex-1">
          {['Dashboard', 'Products', 'Orders', 'Customers', 'Deliveries', 'Feedbacks', 'Settings'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)} // 5. Click Handler
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'hover:bg-white/5 hover:text-white text-slate-400'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 space-y-10">
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white">{activeTab}</h2>
            <p className="text-slate-500">Managing your store's {activeTab.toLowerCase()}</p>
          </div>
        </header>

        {/* 6. Dynamic Rendering Area */}
        <div className="mt-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;