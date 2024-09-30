import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataUsers } from "../../../api/mockData";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import Preloader from "../../../components/Preloader"; // Import Preloader
import { toggleStatusUser } from "../../../api/adminApi";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mockDataUsers();
        if (response) {
          console.log("Data Users :", response.data)
          setData(response.data);
        } else {
          setError("No data found");
        }
      } catch (err) {
        setError("Failed to fetch users data");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (id) => {
    try {
      const response = await toggleStatusUser(id);
      if (response && response.status === 200) {
        // Update status in UI after success
        setData(
          data.map((user) =>
            user.id === id ? { ...user, is_active: !user.is_active } : user
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle user status:", err);
    }
  };

  const columns = [
    // { field: "id", headerName: "ID", flex: 1, type: "number" },
    {
      field: "identifier",
      headerName: "Identifier",
      flex: 1,
    },
    {
      field: "full_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "identifier",
      headerName: "Identifier",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
    },
    {
      field: "is_active",
      headerName: "Is Active",
      flex: 1,
      valueFormatter: (params) => {
        return params === 1 ? "Active" : "Inactive";
      },
    },
    {
      field: "actions",
      headerName: "Ban",
      flex: 1,
      renderCell: (params) => {
        // console.log('params: ' + params.row.id);
        return (
          <button
            onClick={() => handleSubmit(params.row.id)} // Memanggil handleSubmit dengan id pengguna
            style={{
              backgroundColor: params.row.is_active ? "red" : "green",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {params.row.is_active ? "Ban" : "Unban"}
          </button>
        );
      },
    },
  ];

  if (loading) {
    return <Preloader loading={loading} />; // Show Preloader when loading
  }

  if (error) {
    return (
      <Box m="20px">
        <Header title="Error" subtitle="Failed to load user data" />
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box m="20px">
      <Header title="Users" subtitle="Users List" />
      <Box
        m="40px 0 0 0"
        height="77vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Users;
