import { useEffect, useState } from "react";
import { getAllOrder, updateOrderStatus } from "../services/orders";

interface OrderFishList {
  _id: string;
  email: string;
  username: string;
  address: string;
  paymentMethod: string;
  amount: string;
  orderType: string;
  orderDate: string;
  itemName: string;
  price: string;
  qty: number;
  size:string;
  status: string;
}

export default function FishOrders() {
  const [orderFishList, setOrderFishList] = useState<OrderFishList[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Table ekak nisa limit eka poddak wadi karoth hodai wage. (Kalain 3 thibbe)

  const loadData = async () => {
    try {
      const res = await getAllOrder(page, limit);
      setOrderFishList(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      await updateOrderStatus(id, newStatus);
      alert("Order status updated successfully!");
      loadData(); // refresh list
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="mt-5 p-4 md:p-6 min-h-screen">
      
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => window.open("http://localhost:5000/api/v1/report/pdf", "_blank")}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow cursor-pointer hover:bg-blue-700 transition"
        >
          Download Report
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-slate-200 rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                <th className="p-4 border-b">Customer Info</th>
                <th className="p-4 border-b">Order Details</th>
                <th className="p-4 border-b">Item & Price</th>
                <th className="p-4 border-b">Total Amount</th>
                <th className="p-4 border-b">Status</th>
                <th className="p-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orderFishList.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  
                  {/* Customer Info */}
                  <td className="p-4 align-top">
                    <p className="font-semibold text-gray-900">{order.username} </p>
                    <p className="text-md font-bold text-gray-700 mt-1 line-clamp-2 max-w-50">
                      {order.itemName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{order.email}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 max-w-50" title={order.address}>
                      {order.address}
                    </p>
                    
                     
                  </td>

                  {/* Order Details */}
                  <td className="p-4 align-top">
                    <p className="text-sm text-gray-700 mt-1"><strong>Pay:</strong> {order.paymentMethod}</p>
                    <p className="text-xs text-gray-700 mt-4"><strong>Date:</strong> {order.orderDate}</p>
                    <p className="text-xs text-gray-700 mt-4"><strong>Size:</strong> {order.size}</p>
                  </td>

                  {/* Item & Price */}
                  <td className="p-4 align-top">
                    <p className="font-medium text-gray-800">{order.itemName}</p>
                    <p className="text-sm text-gray-600 mt-1">Rs {order.price}.00 x {order.qty}</p>
                  </td>

                  {/* Total Amount */}
                  <td className="p-4 align-top font-bold text-green-700 text-lg">
                    Rs {order.amount}.00
                  </td>

                  {/* Status Badge */}
                  <td className="p-4 align-top">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full uppercase tracking-wide ${
                        order.status === "pending"
                          ? "bg-yellow-500"
                          : order.status === "success"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Action (Select Dropdown) */}
                  <td className="p-4 align-top">
                    <select
                      defaultValue={order.status}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      className="border border-gray-300 text-sm p-2 rounded-md bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="success">Success</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                    <hr className="text-black" />
                </tr>
              ))}
              

              {orderFishList.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          disabled={page === 1}
          className="px-4 py-2 bg-black border border-gray-300 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium transition"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>
        <span className="font-semibold text-gray-700">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          className="px-4 py-2 bg-black border border-gray-300 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 font-medium transition"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

    </div>
  );
}