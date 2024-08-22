import React, { useState } from 'react';
import Header from '../components/Header';

const Upload = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('')
  const [file, setFile] = useState(null);
  const [difficulty, setDifficulty] = useState('1');

  const handleUpload = (e) => {
    e.preventDefault();
    // Handle the file upload logic here
    console.log('Title:', title);
    console.log('Author:', author);
    console.log('File:', file);
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
              <label className='block text-xl mb-2'>Upload File:</label>
              <input 
                type='file' 
                onChange={(e) => setFile(e.target.files[0])}
                className='border p-2 w-full'
                required 
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