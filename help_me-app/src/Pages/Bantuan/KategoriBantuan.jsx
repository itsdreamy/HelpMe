import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css'; // Import DataTables styling
import { mockDataCategory } from '../../api/mockData'; // API hook for delete action
import Preloader from "../../components/Preloader"; // Preloader component
import { useParams } from 'react-router-dom';

export default function Mitra() {
  const [data, setData] = useState([]);
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Dynamically set the document title based on the category
//   useEffect(() => {
//     if (category) {
//       document.title = `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}`;
//     }
//   }, [category]);

  // Fetch Data from API
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);  // Set loading to true when starting the fetch
      setError(null);    // Clear any previous errors
      try {
        const response = await mockDataCategory(category); // Parameter dinamis
        if (response && response.data) {
          setData(response.data);
        } else {
          throw new Error("No data found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };
    fetchApi();
  }, [category]); // Re-run the fetch whenever category changes

  useEffect(() => {
    if (!loading && !error) {
      // Destroy the previous DataTable instance if it exists
      if ($.fn.dataTable.isDataTable('#Bantuan')) {
        $('#Bantuan').DataTable().destroy();
      }

      $('#Bantuan').DataTable({
        data: data,
        columns: [
          { 
            title: "No", 
            data: null,  // Set data to null because it doesn't come from the API
            render: (data, type, row, meta) => meta.row + 1 // Generates row number
          },
          { title: "Problem ID", data: "id" },
          { title: "Name", data: "name" },
          {
            title: "Actions",
            data: null,
            render: (data, type, row) => (
              <button
                onClick={() => handleSubmit(row.id)} // Call handleSubmit with user id
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
            ),
          },
        ],
        paging: true,
        searching: true,
        ordering: true,
        responsive: true,
        destroy: true, // Allow the DataTable to be reinitialized
      });
    }
  }, [loading, data, error]); // Re-run the table setup when loading is complete and no error occurs

  const handleSubmit = async (id) => {
    console.log("Toggle user status for ID:", id);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{`Kelola Bantuan ${category.charAt(0).toUpperCase() + category.slice(1)}`}</h2>

      {loading ? (
        <Preloader loading={loading} />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table id="Bantuan" className="min-w-full table-auto display compact stripe hover">
            <thead className="bg-gray-200">
              <tr>
                <th>No</th>
                <th>Problem ID</th>
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
