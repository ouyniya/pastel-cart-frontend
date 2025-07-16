import axiosInstance from "../utils/axiosInstance";

export const addCategory = async (form) =>
  await axiosInstance.post(`/api/category`, form);

export const getCategory = async () => await axiosInstance.get(`/api/category`);

export const removeCategory = async (categoryId) =>
  await axiosInstance.delete(`/api/category/${categoryId}`);
