import axiosInstance from "../utils/axiosInstance";

export const addProduct = async (form) =>
  await axiosInstance.post(`/api/product`, form);

export const getProducts = async (page, limit) =>
  await axiosInstance.get(`/api/products?page=${page}&limit=${limit}`);

export const getOneProduct = async (productId) =>
  await axiosInstance.get(`/api/product/${productId}`);

export const updateProduct = async (productId, form) => {
  await axiosInstance.put(`/api/product/${productId}`, form);
};

export const removeProduct = async (productId) => {
  await axiosInstance.delete(`/api/product/${productId}`);
};

export const getProductBy = async (form) => {
  await axiosInstance.post(`/api/product`, form);
};
