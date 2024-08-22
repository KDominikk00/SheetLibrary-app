import React from 'react'
import Header from '../components/Header'
import Library from '../components/Library'

const Home = ({ data }) => {
  return (
    <>
        <Header />
        <section className='max-w-library ml-library mt-10'>
          <h2>user &gt; <span className='text-blue-500'>My Library</span></h2>
          <h1 className='text-3xl'>My Library</h1>
        </section>
        <Library data={data}/>
    </>

  )
}

export default Home