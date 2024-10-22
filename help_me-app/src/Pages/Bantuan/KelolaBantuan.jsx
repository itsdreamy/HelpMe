import React, { useEffect, useState, useCallback } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { listCategory } from '../../api/mockData'; // API hook for delete action
import Preloader from "../../components/Preloader"; // Preloader component

export default function KelolaBantuan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await listCategory();
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
    if (!loading && data.length > 0) {
      if ($.fn.dataTable.isDataTable('#Client')) {
        $('#Client').DataTable().destroy();
      }

      $('#Client').DataTable({
        data: data,
        columns: [
          { title: "No", data: "no" },
          { title: "Category ID", data: "id" },
          { title: "Name", data: "name" },
          {
            title: "Actions",
            data: null,
            render: (data, type, row) => {
              return (
                <button
                  onClick={() => handleSubmit(row.id)}
                  style={{
                    backgroundColor: row.is_active ? "red" : "green",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {row.is_active ? "Ban" : "Unban"}
                </button>
              );
            },
          },
        ],
        paging: true,
        searching: true,
        ordering: true,
        responsive: true,
        destroy: true,
      });
    }
  }, [loading, data]);

  const handleSubmit = async (id) => {
    console.log("Toggle user status for ID:", id);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Kelola Bantuan</h2>
      {loading ? (
        <Preloader loading={loading} />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table id="Client" className="min-w-full table-auto display compact stripe hover">
            <thead className="bg-gray-200">
              <tr>
                <th>No</th>
                <th>Category ID</th>
                <th>Name</th>
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
