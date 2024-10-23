import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { mockDataCategory } from '../../api/mockData';
import { useStoreProblem } from '../../api/problemApi';
import Preloader from "../../components/Preloader";
import { useParams, useNavigate } from 'react-router-dom'; 
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

export default function Mitra() {
  const [data, setData] = useState([]);
  const { category } = useParams();
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [successAlertVisible, setSuccessAlertVisible] = useState(false); // Define this state
  const { deleteProblem, storeProblem } = useStoreProblem();
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await mockDataCategory(category);
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
  }, [category]);
  
  useEffect(() => {
    if (!loading && !error) {
      if ($.fn.dataTable.isDataTable('#Bantuan')) {
        $('#Bantuan').DataTable().destroy();
      }

      const table = $('#Bantuan').DataTable({
        data: data,
        columns: [
          { 
            title: "No", 
            data: null,
            render: (data, type, row, meta) => meta.row + 1
          },
          { title: "Problem ID", data: "id" },
          { title: "Name", data: "name" },
          {
            title: "Actions",
            data: null,
            render: (data, type, row) => {
              return `
                <button class="delete-button bg-red-600 text-white py-1 px-2 rounded-lg shadow hover:bg-red-800 transition duration-300"
                  data-id="${row.id}" style="cursor: pointer;">
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

      $('#Bantuan tbody').on('click', '.delete-button', function() {
        const id = $(this).data('id');
        setSelectedId(id); 
        setDeleteModalOpen(true); 
      });
    }
  }, [loading, data, error]);
  
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCategoryName(''); 
  };

  const handleConfirmDelete = async () => {
    setDeleteModalOpen(false); 
    setLoading(true); 
    try {
      await deleteProblem(selectedId); 
      setData(data.filter((item) => item.id !== selectedId)); 
    } catch (err) {
      console.error("Failed to delete problem:", err);
    } finally {
      setLoading(false); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await storeProblem(categoryName, category); // Store problem using categoryName
    setLoading(false);

    if (result) {
        setSuccessAlertVisible(true); // Show success alert
        setTimeout(() => {
          setSuccessAlertVisible(false); // Hide after a delay
          navigate(`/new-route`); // Navigate to a new route if needed
        }, 1500);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{`Kelola Bantuan ${category.charAt(0).toUpperCase() + category.slice(1)}`}</h2>
      
      <button 
        onClick={handleOpenModal} 
        className="bg-neutral-500 hover:bg-neutral-600 text-white py-2 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-neutral-300 mb-4"
      >
        Tambah Kategori
      </button>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Tambah Kategori"
        className="bg-white rounded-lg p-6 shadow-lg mx-auto my-20"
        style={{ content: { width: '800px' } }}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h3 className="text-lg font-bold mb-4">Tambah Opsi Masalah {`untuk ${category.charAt(0).toUpperCase() + category.slice(1)}`}</h3>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Problem Name:
            <input 
              type="text" 
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)} 
              className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
              required
            />
          </label>
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
          >
            Add Category
          </button>
          <button 
            type="button" 
            onClick={handleCloseModal} 
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg ml-2"
          >
            Cancel
          </button>
        </form>
      </ReactModal>

      <ReactModal
        isOpen={deleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        contentLabel="Confirm Delete"
        className="bg-white rounded-lg p-6 shadow-lg mx-auto my-20"
        style={{ content: { width: '400px' } }}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
        <p>Are you sure you want to delete this category?</p>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => setDeleteModalOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700  py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button 
            type="button" 
            onClick={handleConfirmDelete} 
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </ReactModal>
      
      {loading ? <Preloader /> : (
        <table id="Bantuan" className="display">
          <thead></thead>
        </table>
      )}
      
      {successAlertVisible && (
        <div className="alert alert-success">Problem added successfully!</div>
      )}
      {error && <div className="alert alert-error">{error}</div>}
    </div>
  );
}
