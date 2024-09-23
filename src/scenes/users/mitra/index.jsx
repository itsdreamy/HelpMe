import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { mockDataMitra } from '../../../api/mockData';
import { useEffect, useState } from "react";
import Preloader from '../../../components/Preloader'; // Import your Preloader component

const Mitra = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);  // State for storing data
  const [loading, setLoading] = useState(true);  // State for loading status

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Start loading
      const response = await mockDataMitra();  // Fetch data
      if (response) {
        console.log("Mitra data:", response.data);
        setData(response.data);  // Set the fetched data
      } else {
        console.log("No data found");
      }
      setLoading(false);  // Stop loading after data is fetched
    };
    fetchData();  // Fetch the data
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 1, type: "number" },
    { field: "owner_id", headerName: "Owner ID", flex: 1, type: "number" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "saldo",
      headerName: "Saldo",
      flex: 1,
      type: "number",
    },
    {
      field: "latitude",
      headerName: "Latitude",
      flex: 1,
    },
    {
      field: "longitude",
      headerName: "Longitude",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      {loading && <Preloader loading={loading} />} {/* Show Preloader if loading */}

      <Header title="Mitra" subtitle="Managing the Team Members" />
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
        {!loading && <DataGrid rows={data} columns={columns} />} {/* Show DataGrid if not loading */}
      </Box>
    </Box>
  );
};

export default Mitra;
