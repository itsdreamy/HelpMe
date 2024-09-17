// src/controllers/LoginController.js

import axios from "axios";

export const API_URL =
  "http://192.168.1.32:8888/api/auth"; // Ganti dengan API login kamu
  // "https://99d6-2001-448a-302e-332d-4894-d527-fb87-3db4.ngrok-free.app/api/auth"; // Ganti dengan API login kamu

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "/login", {
      username: username,
      password: password,
    });

    // Jika login berhasil, misal response ada token
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Simpan token ke localStorage
      console.log(response);
      return response.data;
    }

    return null; // Jika tidak ada token, login gagal
  } catch (error) {
    console.error("Login failed:", error);
    return null;
  }
};

export const aboutMe = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const response = await axios.get(API_URL + "/me", {
        headers: {
          Authorization: `Bearer ${token}`,
       },
      });
      return response.data;
    }

    console.log('No token found')
    return null;
  } catch (e) {
    console.error("Error fetching about me:", e);
    return null;
  }
};

export const logout = async () => {
  const token = localStorage.getItem("token"); // Ambil token dari localStorage

  if (token) {
    try {
      const response = await axios.post(API_URL + '/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Kirim token di header Authorization
        },
      });

      // Jika logout berhasil, hapus token dari localStorage
      localStorage.removeItem("token");
      console.log('Logout successful', response.data);

    } catch (error) {
      console.error('Error during logout:', error);
    }
  } else {
    console.log('No token found'); // Jika token tidak ditemukan
  }
};