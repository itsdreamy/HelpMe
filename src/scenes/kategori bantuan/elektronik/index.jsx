import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { mockDataElektronik } from "../../../api/mockData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use Link for internal routing
import Preloader from "../../../components/Preloader"; // If you have a preloader component

const Elektronik = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await mockDataElektronik();
        if (response) {
          setData(response);
        } else {
          throw new Error('No data found');
        }
      } catch (err) {
        setError('er' + err.message);
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };
    fetchApi();
  }, []);

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
      <Header title="Elektronik" subtitle="Sub Category dari Elektronik" />
      <Box className="btn-create">
        <a href="/elektronik/create" className="create-problem">
          Create New Problem
        </a>
      </Box>

      {loading ? (
        <Preloader loading={loading} /> // Display a preloader if loading
      ) : error ? (
        <Typography color="error">{error}</Typography> // Display error message
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

export default Elektronik;
