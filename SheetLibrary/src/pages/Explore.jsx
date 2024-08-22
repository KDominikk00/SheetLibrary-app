import React from 'react'
import Header from '../components/Header'
import Library from '../components/Library'

const Explore = ({ data }) => {
  return (
    <>
      <Header />
      <section className='max-w-library ml-library mt-10'>
          <h2><span className='text-blue-500'>Find new pieces!</span></h2>
          <h1 className='text-3xl'>Explore</h1>
      </section>
      <Library data={data}/>
    </>
  )
}

export default Explore