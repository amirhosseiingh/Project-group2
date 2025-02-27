import axios from "axios";
import { IProduct } from "../interfaces/Iproduct";

const API_BASE_URL = "http://api.alikooshesh.ir:3000/api";
const PRODUCTS_BASE_URL = "http://api.alikooshesh.ir:3000/api/records/products";
const API_KEY = "siashoppanel";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    api_key: API_KEY,
    "Content-Type": "application/json",
  },
});

// Add request interceptor for debugging
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for debugging
apiClient.interceptors.response.use((response) => {
  if (response.status === 401 && response.config.url !== "/users/login") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
  }
  return response;
});

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post<LoginResponse>(
      "/users/login",
      credentials
    );
    return response;
  },
  logout: async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};

export const productsAPI = {
  getProducts: async () => {
    const response = await apiClient.get(PRODUCTS_BASE_URL);
    return response;
  },
  createProduct: async ({ title, price, imageURL, inventory }: IProduct) => {
    try {
      const response = await apiClient.post(PRODUCTS_BASE_URL, {
        title,
        price,
        imageURL,
        inventory,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
};
