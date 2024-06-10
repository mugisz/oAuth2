import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtSecret");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthService = {
  handleLogin: async () => {
    try {
      const response = await apiClient.post("/oauth/token", {
        username: "user",
        password: "password",
      });
      localStorage.setItem("jwtSecret", response.data.access_token);
      return true;
    } catch (error) {
      console.error("Error during login", error);
      return false;
    }
  },

  searchAccount: async (accountId) => {
    try {
      const response = await apiClient.get(`/api/account/${accountId}`);
      return response.data;
    } catch (error) {
      console.error("Error searching account", error);
      return null;
    }
  },

  editAccount: async (id, newAddress) => {
    try {
      const response = await apiClient.put(`/api/account/${id}`, {
        address: newAddress,
      });
      alert("Address changed");
      return response.data;
    } catch (error) {
      console.error("Error updating account", error);
      return null;
    }
  },
};
