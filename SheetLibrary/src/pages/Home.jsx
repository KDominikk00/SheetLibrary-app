import React from 'react';
import Header from '../components/Header';
import Library from '../components/Library';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const fetchLibraryItems = async (userId) => {
  const response = await fetch('http://localhost:8080/sheet', {
    headers: {
      'Content-Type': 'application/json',
      'userId': userId,
    },
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const Home = () => {
  const { user, isLoading: isAuthLoading } = useAuth0();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['library'],
    queryFn: () => fetchLibraryItems(user?.sub),  // Pass the userId here
    enabled: !!user,  // Only run this query if user is available
  });

  const handleEditClick = (item) => {
    navigate(`/edit/${item.id}`);
  };

  if (isAuthLoading || isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading library: {error.message}</div>;

  return (
    <>
      <Header />
      <section className='max-w-library ml-library mt-10'>
          <h2>user &gt; <span className='text-blue-500'>My Library</span></h2>
          <h1 className='text-3xl'>My Library</h1>
      </section>
      <Library data={data} onEditClick={handleEditClick} />
    </>
  );
};

export default Home;
