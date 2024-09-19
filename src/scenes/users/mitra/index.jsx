import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { mockDataMitra } from '../../../api/mockData'
import { useEffect, useState } from "react";

const Mitra = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]); // Menggunakan state untuk menyimpan data

  useEffect(() => {
    const fetchData = async () => {
      const response = await mockDataMitra(); // Panggil fungsi mockDataMitra
      if (response) {
        console.log("Mitra data:", response.data);
        setData(response.data); // Simpan data ke state
      } else {
        console.log("No data found");
      }
    };
    fetchData(); // Jalankan fungsi fetch data
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
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Mitra;