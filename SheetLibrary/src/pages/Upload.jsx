import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '../components/Header';

const uploadSheet = async (data) => {
  const response = await fetch('http://localhost:8080/sheet', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'userId': data.userId,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Upload failed');
  }
  return response.json();
};

const Upload = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('1');
  const [sheetthumb, setSheetThumb] = useState('');
  const [sheeturl, setSheetUrl] = useState('');
  const [notification, setNotification] = useState(null);

  if (!isAuthenticated) {
    loginWithRedirect({
      authorizationParams: {
        redirect_uri: window.location.origin + '/',
      },
    });
    return null;
  }

  const { mutate: handleUpload, isLoading } = useMutation({
    mutationFn: (data) => uploadSheet(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['sheets']);
      setNotification('Upload successful!');
      setTimeout(() => {
        setNotification(null);
        navigate('/'); 
      }, 1500); 
    },
    onError: (error) => {
      console.error('Error uploading data:', error);
      setNotification('An error occurred during the upload. Please try again.');
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to upload sheet music');
      return;
    }

    handleUpload({
      title,
      author,
      description,
      difficulty,
      sheetthumb,
      sheeturl,
      userId: user.sub, // Add userId here
    });
  };

  return (
    <>
      <Header />
      <div className='flex justify-center mt-40 ml-20'>
        <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
          <h1 className='text-3xl mb-6 text-center'>Upload a New Piece</h1>
          <form onSubmit={handleFormSubmit} className='space-y-6'>
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
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-all'
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>

      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          {notification}
        </div>
      )}
    </>
  );
};

export default Upload;