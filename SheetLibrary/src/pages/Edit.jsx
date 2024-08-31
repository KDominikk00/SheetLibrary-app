import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';

const updateSheet = async (data) => {
  const response = await fetch(`http://localhost:8080/sheet/${data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'userId': data.userId,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Update failed');
  }

  return response.json();
};

const Edit = () => {
  const { user } = useAuth0();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('1');
  const [sheetthumb, setSheetThumb] = useState('');
  const [sheeturl, setSheetUrl] = useState('');
  const [notification, setNotification] = useState(null);

  const { data: item, error, isLoading } = useQuery({
    queryKey: ['sheet', id],
    queryFn: async () => {
      const response = await fetch(`http://localhost:8080/sheet/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
  });

  useEffect(() => {
    if (item) {
      setTitle(item.title);
      setAuthor(item.author);
      setDescription(item.description);
      setDifficulty(item.difficulty);
      setSheetThumb(item.sheetthumb);
      setSheetUrl(item.sheeturl);
    }
  }, [item]);

  const { mutate: handleUpdate } = useMutation({
    mutationFn: () =>
      updateSheet({
        id,
        userId: user?.sub,
        title,
        author,
        description,
        difficulty,
        sheetthumb,
        sheeturl,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['library'] });
      setNotification('Piece updated successfully!');
      setTimeout(() => {
        navigate('/');
      }, 1500); // Delay navigation by 1.5 seconds
    },
    onError: (error) => {
      console.error('Error updating item:', error);
      setNotification('An error occurred while updating the item. Please try again.');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching item: {error.message}</div>;

  return (
    <>
      <Header />
      <div className="flex justify-center mt-40 ml-20">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl mb-6 text-center">Edit Sheet</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xl mb-2">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-xl mb-2">Author:</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border p-2 w-full"
                required
              />
            </div>
            <div>
              <label className="block text-xl mb-2">Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 w-full h-32 resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-xl mb-2">Difficulty Level:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="border p-2 w-full"
                required
              >
                <option value="1">1 - Easy</option>
                <option value="2">2 - Medium</option>
                <option value="3">3 - Hard</option>
              </select>
            </div>
            <div>
              <label className="block text-xl mb-2">Thumbnail URL:</label>
              <input
                type="text"
                value={sheetthumb}
                onChange={(e) => setSheetThumb(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <div>
              <label className="block text-xl mb-2">Piece URL (PDF ONLY):</label>
              <input
                type="text"
                value={sheeturl}
                onChange={(e) => setSheetUrl(e.target.value)}
                className="border p-2 w-full"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition-all"
            >
              Save
            </button>
          </form>
        </div>
      </div>

      {notification && (
        <div className="fixed top-32 left-[calc(50%+3vw)] transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg mt-4 z-50">
          {notification}
        </div>
      )}
    </>
  );
};

export default Edit;