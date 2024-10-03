import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { mockDataRumah } from "../../../api/mockData";
import Preloader from "../../../components/Preloader";
import { Link } from "react-router-dom"; // Use Link for navigation

const Rumah = ({ isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const response = await mockDataRumah();
        if (response) {
          const numberedData = response.map((item, index) => ({
            ...item,
            no: index + 1, // Add a sequential number
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

  const handleDeleteClick = (id) => {
    setSelectedId(id); // Store ID of the item to delete
    setOpenDialog(true); // Show confirmation dialog
  };

  const handleConfirmDelete = async () => {
    setOpenDialog(false); // Close the dialog immediately after clicking delete
    setLoading(true); // Show preloader during the delete operation
    try {
      // Simulate delete operation (replace with your delete logic)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setData(data.filter((item) => item.id !== selectedId)); // Remove deleted item from state
    } catch (err) {
      console.error("Failed to delete item:", err);
    } finally {
      setLoading(false); // Hide preloader when delete is done
    }
  };

  const columns = [
    { field: 'no', headerName: 'No', flex: 0.5 },
    { field: "id", headerName: "Problem ID", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDeleteClick(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  const rumahStyle = {
    width: isCollapsed ? "calc(100% - 50px)" : "calc(100% - 77px)", // Adjust based on sidebar size
    marginLeft: isCollapsed ? "50px" : "50px", // Adjust based on sidebar size
    transition: "width 2s ease", // Smooth transition when the sidebar is toggled
  }

  return (
    <Box style={rumahStyle} m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Rumah" subtitle="Sub Category dari Rumah" />
      </Box>

      <Box className="btn-create" mb="20px">
        <Link to="/rumah/create" className="create-problem">
          Create New Problem
        </Link>
      </Box>

      {loading ? (
        <Preloader loading={loading} />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box
          marginTop="24px"
          height="73vh"
          width={isCollapsed ? "calc(100% - 70px)" : "calc(100% - 0px)"} // Adjust DataGrid width
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              width: "100%", // Ensure DataGrid takes up full width
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

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this problem?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: "white", backgroundColor: "transparent" }}
          >
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Rumah;
