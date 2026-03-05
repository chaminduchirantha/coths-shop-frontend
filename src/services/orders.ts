import api from "./api"

type OrderFishList = {
    email : string,
    username : string,
    address:string,
    paymentMethod:string,
    orderDate : string,
    itemName : string,
    amount:string,
    price : string,
    qty : number,
    size : string,
    description : string,
    status : string,
}

export const fishOrderSave = async (data: OrderFishList) => {
  const res = await api.post("/cloths/saveOrders", data)
  return res.data
}

// export const getAllFishOrder = async (page: number, limit: number) => {
//   const res = await api.get(`/orders/allOrders?page=${page}&limit=${limit}`);
//   return res.data;
// };

// export const updateFishOrderStatus = async (id: string, status: string) => {
//   const res = await api.put(`/orders/updateStatus/${id}`, { status });
//   return res.data;
// };


// export const getUserOrders = async (email: string) => {
//   const res = await api.get(`/orders/viewOrder/${email}`);
//   return res.data;
// };