import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';

const Piece = () => {
  const { id } = useParams(); // Get the piece ID from URL
  const [piece, setPiece] = useState(null);

  useEffect(() => {
    const fetchPieceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/sheet/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPiece(data);
        } else {
          console.error('Failed to fetch piece details');
        }
      } catch (error) {
        console.error('Error fetching piece details:', error);
      }
    };

    fetchPieceDetails();
  }, [id]);

  if (!piece) return <p className='text-center mt-4 text-gray-600'>Loading...</p>;

  return (
    <>
      <Header />
      <div className='flex flex-col lg:flex-row items-center lg:items-start p-4 lg:p-6 space-y-6 lg:space-y-0 lg:space-x-6'>
        <div className='flex-1 w-full'>
          <iframe
            src={piece.sheeturl} // Assuming the PDF URL is stored in the piece object
            title="PDF Preview"
            className='w-full h-[calc(100vh-10rem)] lg:h-[calc(100vh-12rem)] border-0'
          />
        </div>
        <div className='flex-1 pt-6 lg:pt-64 space-y-10 text-center lg:text-left'>
          <h1 className='text-2xl lg:text-3xl font-bold text-gray-900'>{piece.title}</h1>
          <h4 className='text-lg font-semibold text-gray-700'>Author: {piece.author}</h4>
          <p className='text-base text-gray-600 border-2 border-blue-500 p-4 rounded-lg shadow-md'>
            {piece.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default Piece;