// src/controllers/LoginController.js

import axios from 'axios';

const API_URL = 'https://104e-2001-448a-302c-13d2-12e-2169-4f82-2f90.ngrok-free.app/api';  // Ganti dengan API login kamu

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + '/login', {
      username: username,
      password: password,
    });

    // Jika login berhasil, misal response ada token
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);  // Simpan token ke localStorage
      return response.data;
    }
    
    return null; // Jika tidak ada token, login gagal

  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
};
