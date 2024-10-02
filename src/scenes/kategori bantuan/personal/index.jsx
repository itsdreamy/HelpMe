import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { mockDataPersonal } from "../../../api/mockData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use Link for navigation
import Preloader from "../../../components/Preloader"; // Import a Preloader if available

const Personal = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await mockDataPersonal();
        console.log(response.data);
        if (response) {
          // Tambahkan properti `no` untuk nomor urut
          const numberedData = response.map((item, index) => ({
            ...item,
            no: index + 1, // Menambahkan nomor urut (index dimulai dari 0, jadi +1)
          }));
          setData(numberedData);
        } else {
          console.error("No data found");
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  const columns = [
    { field: 'no', headerName: 'No', flex: 0.5 }, // Kolom nomor urut
    { field: "id", headerName: "Problem ID", flex: 1 }, // Kolom ID kategori
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <Box mt="3px" ml="20px">
      <Header title="Personal" subtitle="Sub Category dari Personal" />
      <Box className="btn-create">
        <a href="/personal/create" className="create-problem">
          Create New Problem
        </a>
      </Box>

      {loading ? (
        <Preloader loading={loading} /> // Preloader during loading
      ) : error ? (
        <Typography color="error">{error}</Typography> // Display error message if any
      ) : (
        <Box
          m="24px 0 0 0"
          height="73vh"
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
      )}
    </Box>
  );
};

export default Personal;
