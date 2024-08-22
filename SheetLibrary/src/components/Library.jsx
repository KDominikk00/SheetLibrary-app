import React from 'react'

const Library = ({ data = [] }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as "DD/MM/YYYY"
  };

  return (
    <section className='max-w-library ml-library'>

      <div className='flex flex-wrap'>
          {data.map(item => (
            <div key={item.id} className='border-solid border-black border bg-white cursor-pointer m-12 ml-0 rounded'>
              <img className='border-solid border-black border m-4 h-50 rounded' src={item.sheetthumb} alt={item.title} width={250} />
              <h4 className='ml-4 font-bold'>{item.title}</h4>
              <p className='ml-4'>{item.author}</p>
              <p className='ml-4 mb-4'>Uploaded: {formatDate(item.uploadedAt)}</p>
            </div>
          ))}
      </div>
    </section>
  )
}

export default Library