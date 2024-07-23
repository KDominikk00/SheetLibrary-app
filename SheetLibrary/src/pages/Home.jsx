import React from 'react'
import Header from '../components/Header'
import Library from '../components/Library'

const Home = ({ data }) => {
  return (
    <>
        <Header />
        <Library data={data}/>
    </>

  )
}

export default Home