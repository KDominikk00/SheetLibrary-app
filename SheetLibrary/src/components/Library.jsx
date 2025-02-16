import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const addPieceToLibrary = async (piece, userId) => {
  if (!userId) throw new Error('User ID is required.');

  const response = await fetch('http://localhost:8080/sheet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'userId': userId,
    },
    body: JSON.stringify(piece),
  });

  if (response.ok) {
    return response.json();
  } else {
    const errorData = await response.json();
    if (errorData.message === 'Piece already in library') {
      throw new Error('Piece already in library');
    }
    throw new Error(`Failed to add piece to library: ${errorData.message}`);
  }
};

const deletePieceFromLibrary = async (pieceId, userId) => {
  if (!userId) throw new Error('User ID is required.');

  const response = await fetch(`http://localhost:8080/sheet/${pieceId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'userId': userId,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to delete piece from library: ${errorData.message}`);
  }

  if (response.status === 204) {
    return;
  }

  return response.json();
};

const Library = ({ data = [], onEditClick = () => {} }) => {
  const { user } = useAuth0();
  const [activeMenu, setActiveMenu] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedPieceId, setSelectedPieceId] = useState(null);
  const menuRefs = useRef([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: handleAddPieceMutation } = useMutation({
    mutationFn: (piece) => addPieceToLibrary(piece, user?.sub),
    onSuccess: () => {
      queryClient.invalidateQueries(['userLibrary']);
    },
    onError: (error) => {
      console.error('Error adding piece:', error);
      alert('Failed to add piece to library.');
    },
  });

  const { mutate: handleDeletePieceMutation } = useMutation({
    mutationFn: (pieceId) => deletePieceFromLibrary(pieceId, user?.sub),
    onSuccess: () => {
      queryClient.invalidateQueries(['userLibrary']);
      setShowAlert(false);
    },
    onError: (error) => {
      console.error('Error deleting piece:', error);
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleMenuClick = (id) => setActiveMenu(activeMenu === id ? null : id);

  const handleEdit = (item, event) => {
    event.stopPropagation(); 
    if (typeof onEditClick === 'function') {
      onEditClick(item);
    } else {
      console.warn('onEditClick is not a function');
    }
  };

  const handleAddToLibrary = (item, event) => {
    event.stopPropagation();
    if (!item.id) {
      alert('Invalid item. Unable to add to library.');
      return;
    }

    handleAddPieceMutation(item);
  };

  const handleDelete = (pieceId, event) => {
    event.stopPropagation(); 
    setSelectedPieceId(pieceId);
    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    handleDeletePieceMutation(selectedPieceId);
    setSelectedPieceId(null);
  };

  const handleCancelDelete = () => {
    setShowAlert(false);
    setSelectedPieceId(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRefs.current.every(ref => ref && !ref.contains(event.target))) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePieceClick = (item) => {
    navigate(`/sheet/${item.id}`);
  };

  const handleEllipsisClick = (event, item) => {
    event.stopPropagation();
    handleMenuClick(item.id);
  };

  return (
    <section className='max-w-library ml-library'>
      {data.length === 0 ? (
        <div className='flex flex-col items-center mt-44 justify-center mr-middle'>
          <p className='text-2xl mb-4'>Start filling your library now!</p>
          <button
            onClick={() => navigate('/upload')}
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
          >
            Go to Upload
          </button>
        </div>
      ) : (
        <div className='flex flex-wrap'>
          {data.map((item, index) => (
            <div
              key={item.id}
              className='relative border-solid border-black border bg-white cursor-pointer m-12 ml-0 rounded'
              onClick={(e) => handlePieceClick(item)} // Handle piece click
            >
              <img className='border-solid border-black border m-4 h-50 rounded' src={item.sheetthumb} alt={item.title} width={250} />

              <h4
                className='font-bold text-xl absolute right-3 top-17 cursor-pointer p-2 pt-0'
                onClick={(e) => handleEllipsisClick(e, item)}
              >
                ⋮
              </h4>
              {activeMenu === item.id && (
                <div
                  ref={(el) => (menuRefs.current[index] = el)}
                  className='absolute bg-white border border-black ml-52 rounded shadow-lg'
                >
                  <ul>
                    <li
                      className='p-2 hover:bg-gray-200 cursor-pointer'
                      onClick={(e) => handleEdit(item, e)}
                    >
                      Edit
                    </li>
                    <li
                      className='p-2 hover:bg-gray-200 cursor-pointer'
                      onClick={(e) => handleDelete(item.id, e)}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}

              <h4 className='ml-4 font-bold'>{item.title}</h4>
              <p className='ml-4'>{item.author}</p>
              <p className='ml-4 mb-4'>Uploaded: {formatDate(item.uploadedAt)}</p>
            </div>
          ))}
        </div>
      )}

      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs w-full">
            <p className="text-lg mb-4">Are you sure you want to delete this piece?</p>
            <div className="flex justify-around z-50">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Library;