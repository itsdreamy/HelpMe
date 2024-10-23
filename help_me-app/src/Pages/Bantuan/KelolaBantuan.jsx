import React, { useEffect, useState, useCallback } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import ReactModal from 'react-modal'; // Import React Modal
import { listCategory } from '../../api/mockData'; // API hook for delete action
import Preloader from "../../components/Preloader"; // Preloader component

ReactModal.setAppElement('#root'); // For accessibility

export default function KelolaBantuan() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [categoryName, setCategoryName] = useState(''); // Form state

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
              return `
                <button class="action-button bg-red-600 text-white py-1 px-2 rounded-lg shadow hover:bg-red-800 transition duration-300"
                style="cursor: pointer;">
                    Delete
                </button>
              `;
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCategoryName(''); // Reset form
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Category Name:", categoryName);
    // Add category submission logic here
    handleCloseModal();
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Kelola Kategori Bantuan</h2>
      <button
        onClick={handleOpenModal}
        className="bg-neutral-500 hover:bg-neutral-600 text-white py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-neutral-300"
      >
        Tambah Kategori
      </button>

      {loading ? (
        <Preloader loading={loading} />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table
            id="Client"
            className="min-w-full table-auto display compact stripe hover"
          >
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

        <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Tambah Kategori"
        className="bg-white rounded-lg p-6 shadow-lg mx-auto my-20"
        style={{ content: { width: '800px' } }} // Set custom width in pixels
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
        <h2 className="text-xl font-bold mb-4">Tambah Kategori Baru</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nama Kategori
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Masukkan nama kategori"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleCloseModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </ReactModal>
    </div>
  );
}
