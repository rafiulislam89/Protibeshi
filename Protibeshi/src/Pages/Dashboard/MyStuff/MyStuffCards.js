import { data } from 'autoprefixer';
import { reload } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { postProfile } from '../../../API/Prof';

function MyStuffCards({ item, setReload }) {
  const { _id, name, description, photos, caution, status, pin, userEmail } = item;
  const [verified, setVerified] = useState(false)
  console.log(userEmail)

  const handleAccept = () => {
    const setStatus = {
      status: "Confirmed",
      pin: Math.floor(100000 + Math.random() * 900000)
    }
    fetch(`http://localhost:5000/details/${_id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(setStatus),
    })
      .then(res => res.json())
      .then(data => {
        fetch(`http://localhost:5000/borrowing/${_id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(setStatus),
        })
          .then(res => res.json())
          .then(data => setReload(true))

      })

    

    fetch(`http://localhost:5000/borrowItem/${_id}`)
      .then(res => res.json())
      .then(data => {
        fetch(`http://localhost:5000/users/${data.borrowEmail}`)
          .then(res => res.json())
          .then(user => {
            const result = user.credit - caution
            const updatecred = {
              credit: result,
            }
            postProfile(data.borrowEmail, updatecred);
          })
      })
  }


  const handleReject = () => {
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
      .then(data => console.log(data))

    setReload(true)
  }

  function generateRandomNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  const randomSixDigitNumber = generateRandomNumber();

  const handlePin = (e) => {
    const enteredPin = parseInt(e.target.value);
  
  
    if (enteredPin === pin) {
        setVerified(true);
        console.log('Verified');
    } else {
        setVerified(false);
    }
  };

  const handlePinSubmit = () => {
    const setStatus = {
        status: "Returned",
    }
    fetch(`http://localhost:5000/borrowing/${_id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(setStatus),
    })
        .then(res => res.json())
        .then(data => {
          fetch(`http://localhost:5000/details/${_id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(setStatus),
    })
        .then(res => res.json())
        .then(data => {
          fetch(`http://localhost:5000/borrowItem/${_id}`)
      .then(res => res.json())
      .then(data => {
          fetch(`http://localhost:5000/users/${data.borrowEmail}`)
            .then(res => res.json())
            .then(user => {
              const result = user?.credit + caution*0.8
              const updatecred = {
                credit: result,
              }
              postProfile(data.borrowEmail, updatecred);
            })
          })
            fetch(`http://localhost:5000/users/${userEmail}`)
            .then(res => res.json())
            .then(user => {
              const result = user?.reward + caution*0.2
              const updatecred = {
                reward : result,
              }
              postProfile(userEmail, updatecred);
            })

        })
        })

        setReload(true)
}
const handleAvailable = () => {
  const setStatus = {
      status: "Available",
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


  return (
    <div className="flex flex-col justify-center bg-white shadow-xl rounded-xl hover:scale-105 duration-300">

      <div className='p-5 overflow-hidden'>
        <Link to={`/details/${_id}`}>
          <img className='h-72 m-auto' src={photos} alt='open'></img>
          <p className='font-normal text-[#00B8A8] mb-1'>{status}</p>
          <p className='my-2 text-xl font-bold'>{name}</p>
          <p className='mb-4'>{description}</p>
        </Link>
        <hr></hr>
        <div className='flex justify-between'>
          <div>
            <p className='font-bold text-xl my-2'>${caution}</p>
            <p className='font-light text-[#00B8A8] mb-1'>Safety Money</p>
          </div>
          {
            status === "Pending" ? (
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
            ) : status === "Confirmed" ? (
              <div>{pin}</div>
            ) : status === "Return Pending" ? (
              <div><input type='number' id='pin' className="bg-[#ffffff] ml-[80px] w-[200px]  mt-2 font-semibold px-6 py-3 rounded-full hover:bg-[#ffffff]" onChange={handlePin}></input>
                                <button disabled={!verified} onClick={handlePinSubmit}className="bg-[#4E3CB8] mt-2 ml-40 text-white font-semibold px-6 py-3 rounded-full hover:bg-[#3f308f]">Submit</button>
              </div>
            ) : status === "Returned" ? (
              <button onClick={handleAvailable} className="bg-[#4E3CB8] mt-2 ml-40 text-white font-semibold px-6 py-3 rounded-full hover:bg-[#3f308f]">Make Item Available</button>
            ): null
          }


          {/* <button>Reject</button> */}
        </div>

      </div>

    </div>
  )
}

export default MyStuffCards