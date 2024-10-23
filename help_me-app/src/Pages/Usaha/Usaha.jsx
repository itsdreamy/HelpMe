import React, { useEffect, useState, useCallback } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // Import DataTables styling
import { mockDataMitra, useStoreProblem } from '../../api/mockData'; // API hook for delete action
import Preloader from "../../components/Preloader"; // Preloader component
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export default function Usaha() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Fetch Data from API
  const fetchData = useCallback(async () => {
    try {
      const response = await mockDataMitra();
      if (response) {
        const numberedData = response.data.map((item, index) => ({
          ...item,
          no: index + 1,
          problem_id: item.id, // Adjust according to your data structure
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
  }, []);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!loading && data.length > 0) {
      // Destroy the previous DataTable instance if it exists
      if ($.fn.dataTable.isDataTable('#Usaha')) {
        $('#Usaha').DataTable().destroy();
      }

      $('#Usaha').DataTable({
        data: data,
        columns: [
          { title: "No", data: "no" },
          { title: "Mitra ID", data: "id" },
          { title: "Owner Identifier", data: "owner_identifier" },
          { title: "Name", data: "name" },
          { title: "Saldo", data: "saldo" },
          { title: "Latitude", data: "latitude" },
          { title: "Longitude", data: "longitude" },
          { title: "Kategori", data: "category" },
          {
            title: "Actions",
            data: null,
            render: (data, type, row) => {
              return `
                <button class="action-button" 
                        style="background-color: ${row.is_active ? 'red' : 'green'}; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                  ${row.is_active ? 'Ban' : 'Unban'}
                </button>
              `;
            },
          },
        ],
        paging: true,
        searching: true,
        ordering: true,
        responsive: true,
        destroy: true, // Allow the DataTable to be reinitialized
      });

      // Handle delete button clicks after DataTable has been initialized
      $('#Usaha tbody').on('click', '.delete-button', function() {
        const id = $(this).data('id'); // Get ID from data-id attribute
        setSelectedId(id); // Save the ID to delete
        setOpenDialog(true); // Show confirmation dialog
      });
    }
  }, [loading, data]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Kelola Usaha Mitra</h2>

      {loading ? (
        <Preloader loading={loading} />
      ) : error ? (
        <div>{error}</div>
      ) : !Array.isArray(data) || data.length === 0 ? ( // Check for no data
        <div className="text-gray-700">No Data</div>
      ) : (
        <div className="overflow-x-auto">
          <table id="Usaha" className="min-w-full table-auto display compact stripe hover">
            <thead className="bg-gray-200">
              <tr>
                <th>No</th>
                <th>Mitra ID</th>
                <th>Owner Identifier</th>
                <th>Name</th>
                <th>Saldo</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Kategori</th>
              </tr>
            </thead>
          </table>
        </div>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {/* Handle Delete Action */}} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
