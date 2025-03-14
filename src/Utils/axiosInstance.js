import axios from "axios";

// console.log(import.meta.env.VITE_LOCALHOST_URL);

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_DEPLOYED_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// axiosInstance.request.use(
//   (config) => config,
//   async (error) => {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error)
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        console.log("No token user should log out");
        // logout()

        // window.location.href = "/login";
        return Promise.reject(error);
      }
    return Promise.reject(error);
  }
);
export const login = async (payload) => {
  // console.log(payload);

  return await axiosInstance.post("/auth/login", payload);
};
export const signUp = async (payload) => {
  return await axiosInstance.post("/auth/register", payload);
};
export const getUser = async () => {
  return await axiosInstance.get("/auth/check-auth");
};
