import React, { useEffect, useState, useCallback } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // Import DataTables styling
import { mockDataUsers } from '../../api/mockData'; // API hook for delete action
import { toggleStatusUser } from '../../api/adminApi'; // API call for toggle status
import Preloader from "../../components/Preloader"; // Preloader component

export default function Client() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false); // State for action (ban/unban) loading

  // Fetch Data from API
  const fetchData = useCallback(async () => {
    try {
      const response = await mockDataUsers('client');
      if (response && response.data) {
        const numberedData = response.data.map((item, index) => ({
          ...item,
          no: index + 1,
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
    if (!loading) {
      // Destroy the previous DataTable instance if it exists
      if ($.fn.dataTable.isDataTable('#Client')) {
        $('#Client').DataTable().destroy();
      }

      const table = $('#Client').DataTable({
        data: data,
        columns: [
          { title: "No", data: "no" },
          { title: "User ID", data: "id" },
          { title: "Identifier", data: "identifier" },
          { title: "Name", data: "full_name" },
          { title: "Nomor Telepon", data: "phone_number" },
          { title: "Username", data: "username" },
          { title: "Role", data: "role" },
          {
            title: "Is Active",
            data: "is_active",
            render: (data, type, row) => {
              return row.is_active ? "Active" : "Inactive";
            },
          },
          {
            title: "Actions",
            data: null,
            render: (data, type, row) => {
              return `
                <button class="action-button" 
                        data-id="${row.id}" 
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

      // Add click event listener to dynamically created buttons
      $('#Client tbody').on('click', '.action-button', async function () {
        const userId = $(this).data('id');
        const isActive = $(this).text().trim() === 'Ban';
        handleSubmit(userId, isActive); // Call handleSubmit with user ID and current status
      });
    }
  }, [loading, data]);

  // Ban/Unban Function
  const handleSubmit = async (id, isActive) => {
    setActionLoading(true);
    try {
      const response = await toggleStatusUser(id);
      if (response && response.status === 200) {
        // Update the UI after successful API call
        setData(data.map(user =>
          user.id === id ? { ...user, is_active: !isActive } : user
        ));
      }
    } catch (err) {
      console.error("Failed to toggle user status:", err);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Kelola Akun Client</h2>

      {loading || actionLoading ? (
        <Preloader loading={loading || actionLoading} />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table id="Client" className="min-w-full table-auto display compact stripe hover">
            <thead className="bg-gray-200">
              <tr>
                <th>No</th>
                <th>User ID</th>
                <th>Identifier</th>
                <th>Name</th>
                <th>Nomor Telepon</th>
                <th>Username</th>
                <th>Role</th>
                <th>Is Active</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* DataTable will populate rows here */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
