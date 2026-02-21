import api from "./api";

export const createProduct = async(data: any)=>{
     const res = await api.post("/cloths/createCloths", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return res.data
}

export const getAllProduct = async (page: number, limit: number) => {
  const res = await api.get(`/cloths/all?page=${page}&limit=${limit}`);
  return res.data;
};


export const updateProduct = async (id: string, data: any) => {
  const res = await api.put(`/cloths/updateCloths/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
  return res.data;
};

export const searchProduct = async (page: number, limit: number, category: string, search: string) => {
  const res = await api.get(`/cloths/search?page=${page}&limit=${limit}&category=${category}&query=${search}`);
  return res.data;
};


export const deleteProduct = async (id: string) => {
  const res = await api.delete(`/cloths/deleteCloths/${id}`);
  return res.data;
};