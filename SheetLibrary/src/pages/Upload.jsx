import React, { useState } from 'react';
import Header from '../components/Header';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('1');
  const [sheetthumb, setSheetThumb] = useState('');
  const [sheeturl, setSheetUrl] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();

    const data = {
      title,
      author,
      description,
      difficulty,
      sheetthumb,
      sheeturl,
    };

    try {
      const response = await fetch('http://localhost:8080/sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      alert('Upload successful!');
      // Handle success: Clear the form or redirect
      setTitle('');
      setAuthor('');
      setDescription('');
      setDifficulty('1');
      setSheetThumb('');
      setSheetUrl('');
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('An error occurred during the upload. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <div className='flex justify-center mt-40 ml-20'>
        <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
          <h1 className='text-3xl mb-6 text-center'>Upload a New Piece</h1>
          <form onSubmit={handleUpload} className='space-y-6'>
            <div>
              <label className='block text-xl mb-2'>Title:</label>
              <input 
                type='text' 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border p-2 w-full'
                required 
              />
            </div>
            <div>
              <label className='block text-xl mb-2'>Author:</label>
              <input 
                type='text' 
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className='border p-2 w-full'
                required 
              />
            </div>
            <div>
              <label className='block text-xl mb-2'>Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='border p-2 w-full h-32 resize-none'
                required
              />
            </div>
            <div>
              <label className='block text-xl mb-2'>Difficulty Level:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className='border p-2 w-full'
                required
              >
                <option value='1'>1 - Easy</option>
                <option value='2'>2 - Medium</option>
                <option value='3'>3 - Hard</option>
              </select>
            </div>
            <div>
              <label className='block text-xl mb-2'>Thumbnail URL:</label>
              <input 
                type='text' 
                value={sheetthumb}
                onChange={(e) => setSheetThumb(e.target.value)}
                className='border p-2 w-full'
              />
            </div>
            <div>
              <label className='block text-xl mb-2'>Piece URL (PDF ONLY):</label>
              <input 
                type='text' 
                value={sheeturl}
                onChange={(e) => setSheetUrl(e.target.value)}
                className='border p-2 w-full'
              />
            </div>
            <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-all'>
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Upload;