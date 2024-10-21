import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Preloader from "../../components/Preloader";
import Header from "../../components/Header";
import { mockDataCategory } from "../../api/mockData"; // Pastikan mockDataCategory bisa menerima kategori

const KategoriBantuan = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { category } = useParams(); // Ambil kategori dari URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        // Fetch data berdasarkan kategori dari URL
        const response = await mockDataCategory(category); // Parameter dinamis
        if (response && response.data) {
          setData(response.data);
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [category]); // Re-fetch jika kategori berubah

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  ];

  return (
    <Box mt="4px" ml="20px">
      <Header title={category} subtitle={`Sub Category dari ${category}`} />
      <Box
        m="40px 0 0 0"
        height="75vh"
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
        {loading ? <Preloader /> : <DataGrid rows={data} columns={columns} />}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Box>
  );
};

export default KategoriBantuan;
