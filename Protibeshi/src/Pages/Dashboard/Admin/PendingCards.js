import React from 'react'
import { Link } from 'react-router-dom';

function PendingCards({ item, setReload }) {
    const { _id, name, description, photos, caution, status } = item;

    const handleAccept = () => {
        const setStatus = {
            status: "Available"
          }
          fetch(`http://localhost:5000/details/${_id}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(setStatus),
          })
            .then(res => res.json())
            .then(data => setReload(true))
      
        
      }

      const handleReject = () => {
        const setStatus = {
            status: "Rejected"
          }
          fetch(`http://localhost:5000/details/${_id}`, {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(setStatus),
          })
            .then(res => res.json())
            .then(data => console.log(data))
      
        setReload(true)
        
      }

  return (
    <div className="flex flex-col justify-center bg-white shadow-xl rounded-xl hover:scale-105 duration-300">
            <Link to={`/details/${_id}`}>
                <div className='p-5 overflow-hidden'>
                    <img className='h-72 m-auto' src={photos} alt='open'></img>
                    <p className='font-normal text-[#00B8A8] mb-1'>{status}</p>
                    <p className='my-2 text-xl font-bold'>{name}</p>
                    <p className='mb-4'>{description}</p>
                    <hr></hr>
                    <p className='font-bold text-xl my-2'>${caution}</p>
                    <p className='font-light text-[#00B8A8] mb-1'>Safety Money</p>
                </div>   
            </Link>
            {
            status === "Admin aproval" ? (
              <div className='flex'>
                <button
                  onClick={handleAccept}
                  className='text-center text-[#0B08AE] mx-4 mt-8 h-[30px] w-[100px] border-2 border-[#0B08AE]'>
                  Accept
                </button>
                <button
                  onClick={handleReject}
                  className='text-center text-[#FF0000] mx-4 mt-8 h-[30px] w-[100px] border-2 border-[#FF0000]'>
                  Reject
                </button>
              </div>
            ): null
          }
        </div>
  )
}

export default PendingCards
