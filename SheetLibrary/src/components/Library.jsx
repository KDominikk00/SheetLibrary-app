import React from 'react'

const Library = ({ data = [] }) => {
  return (
    <section className='max-w-library ml-library mt-10'>
      <h2>user &gt; <span className='text-blue-500'>My Library</span></h2>
      <h1 className='text-3xl'>My Library</h1>

      <div className='flex flex-wrap'>
          {data.map(item => (
            <div key={item.id} className='border-solid border-black border bg-white cursor-pointer m-12 ml-0'>
              <img className='border-solid border-black border' src={item.sheeturl} alt={item.title} width={250} />
              <h4>{item.title}</h4>
              <p>{item.author}</p>
              <p>Uploaded x minutes ago</p>
            </div>
          ))}
      </div>
    </section>
  )
}

export default Library