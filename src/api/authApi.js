// src/controllers/LoginController.js

import axios from "axios";

const API_URL = "https://024240ea974e34267725f5761285885f.serveo.net/api/auth";

export const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + "/login?app_type=admin", {
      username: username,
      password: password,
    });

    // Jika login berhasil, misal response ada token
    if (response.data.token) {
      localStorage.setItem("token", response.data.token); // Simpan token ke localStorage
      // console.log(response);
      return response.data;
    }

    return null; // Jika tidak ada token, login gagal
  } catch (error) {
    console.error("Login failed:", error.response.data);
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
      console.log(response);
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
      return response.data;

    } catch (error) {
      console.error('Error during logout:', error);
    }
  } else {
    console.log('No token found'); // Jika token tidak ditemukan
  }
};

// export const changePassword = async () => {

// }

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(API_URL + '/forgot-password', {
      email: email,
    });
    console.log('Reset password response:', response);
    return response;
  } catch (err) {
    console.error('Error during reset password:', err);
    return null;
  }
}

export const resetPassword = async (token, email, password, confirmPassword) => {
  try {
    const response = await axios.post(API_URL + '/reset-password', {
      token: token,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    });
    console.log('Reset password response:', response);
    return response;
  } catch (err) {
    // console.error('Error during reset password:', err.response.data.errors);
    return err; 
  }
}
