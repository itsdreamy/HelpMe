import { tokens } from "../theme";
import axios from "axios";
import { API_URL } from "./api";

export const mockDataMitra = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return [];
  }

  try {
    const response = await axios.get(API_URL + "/mitras", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return [];
  }
};

export const mockDataUsers = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return [];
  }
  try {
    const response = await axios.post(API_URL + "/users", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return [];
  }
};

export const mockDataSerabutan = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return [];
  }
  try {
    const response = await axios.get(
      API_URL + "/categories/problems?category=serabutan",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return [];
  }
};

export const mockDataKendaraan = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return [];
  }
  try {
    const response = await axios.get(
      API_URL + "/categories/problems?category=kendaraan",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return [];
  }
};

export const mockDataRumah = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return [];
  }
  try {
    const response = await axios.get(
      API_URL + "/categories/problems?category=rumah",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return [];
  }
};

export const mockDataElektronik = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return [];
  }
  try {
    const response = await axios.get(
      API_URL + "/categories/problems?category=elektronik",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return [];
  }
};

export const mockDataPersonal = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return [];
  }
  try {
    const response = await axios.get(
      API_URL + "/categories/problems?category=personal",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return [];
  }
};


export const listCategory = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return [];
  }

  try {
    const response = await axios.get(API_URL + "/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching data from API:", err);
    return [];
  }
};

export const fetchClientAndMitraStats = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.post(API_URL + "/users?stats=client-mitra", {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('USER' + response);
    return response.data;
  } catch (error) {
    console.error("Error fetching client and mitra stats:", error);
    return null;
  }
};

export const fetchUserStatsByGranularity = async (
  granularity,
  startDate,
  endDate
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.post(
      API_URL + "/user?stats=granularity",
      {
        granularity: granularity,
        start_date: startDate,
        end_date: endDate,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log('USER' + response);
    return response;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return null;
  }
};

export const orderStats = async () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const response = await axios.get(API_URL + "/orders", {
    // const response = await axios.get(API_URL + "/orders?status=complete", {
    // const response = await axios.get(API_URL + "/orders?status=pending", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log('ORDER' + response);
    return response.data;
  } catch (error) {
    console.error("Error fetching order stats:", error);
    return null;
  }
}