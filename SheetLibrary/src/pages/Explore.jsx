import React from 'react';
import Header from '../components/Header';
import Library from '../components/Library';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

const fetchAllSheets = async () => {
  const response = await fetch('http://localhost:8080/sheet');
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const Explore = () => {
  const { user } = useAuth0();
  const { data, error, isLoading } = useQuery({
    queryKey: ['exploreSheets'],
    queryFn: fetchAllSheets,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading sheet music: {error.message}</div>;

  return (
    <>
      <Header />
      <section className='max-w-library ml-library mt-10'>
        <h2>Explore</h2>
        <h1 className='text-3xl'>All Sheet Music</h1>
      </section>
      <Library data={data} isExplorePage={true} currentUserId={user?.sub} />
    </>
  );
};

export default Explore;