import axiosInstance from "./utils/axiosInstance";

export const currentUser = async () =>
  await axiosInstance.get(`/api/current-user`);

export const currentAdmin = async () =>
  await axiosInstance.get(`/api/current-admin`);
