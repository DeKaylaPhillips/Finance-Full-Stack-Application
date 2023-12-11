// The service handles API calls for authentication.
import axiosInstance from "./axiosInstance";

export const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post(`/sign_in/`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to login.");
      }
    } catch (error) {
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await axiosInstance.post(`/signOut/`);
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to logout.");
      }
    } catch (error) {
      throw error;
    }
  },
  register: async (firstName, lastName, email, password) => {
    try {
      const response = await axiosInstance.post(`/create_account/`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to create account.");
      }
    } catch (error) {
      throw error;
    }
  },
};
