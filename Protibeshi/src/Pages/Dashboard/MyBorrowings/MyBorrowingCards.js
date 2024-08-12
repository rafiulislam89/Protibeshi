import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function MyBorrowingCards({ item, setReload }) {
    const { _id, name, description, photos, caution, status, pin } = item;

    const [verified, setVerified] = useState(false)
    const [statuss, setStatus] = useState("Pending");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [textareaValue, setTextareaValue] = useState("");



    const openModal = async() => {
        
        const { value: text } = await Swal.fire({
            input: 'textarea',
            inputLabel: 'Message',
            inputPlaceholder: 'Type your message here...',
            inputAttributes: {
              'aria-label': 'Type your message here'
            },
            showCancelButton: true
          })
          
          if (text) {
            const setFeedback = {
                feedback : text
            }    
            Swal.fire("Thanks for your feedback")

            fetch(`http://localhost:5000/feedback/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(setFeedback),
        })
            .then(res => res.json())
            .then(data => {
                const setStatus = {
                    status: "Available",
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
                        const setStatus = {
                            status: "Returned",
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
                    })

            })
          }
        
      };
    
    
    
      const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
      };

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
            status: "Picked Up",
        }
        fetch(`http://localhost:5000/borrowing/${_id}`, {
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

    const handleReturn = () => {
        const setStatus = {
          status: "Return Pending",
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

        }

        const handleAvailable = () => {
            const setStatus = {
                status: "Picked Up",
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
                        status === "Confirmed" ? (
                            <div><input type='number' id='pin' onChange={handlePin} className="bg-[#ffffff] ml-[80px] w-[200px]  mt-2 font-semibold px-6 py-3 rounded-full hover:bg-[#ffffff]"></input>
                                <button disabled={!verified} onClick={handlePinSubmit} className="bg-[#4E3CB8] mt-2 ml-40 text-white font-semibold px-6 py-3 rounded-full hover:bg-[#3f308f]">Submit</button>
                            </div>

                        ) : status === "Picked Up" ? (
                            <button onClick={handleReturn}
                                className='text-center text-[#0B08AE] mx-4 mt-8 h-[30px] w-[100px] border-2 border-[#0B08AE]'>
                                Return
                            </button>
                          ) : status === "Return Pending" ? (
                            <div>{pin}</div>
                          ): null 
                    }

        <div>
            {/* Your other UI components */}
            
            {/* Check the status and conditionally render the modal */}
            {status === "Returned" && (
                <button className="bg-[#4E3CB8] mt-2 ml-40 text-white font-semibold px-6 py-3 rounded-full hover:bg-[#3f308f]" onClick={openModal}>Open Modal</button>
            )}
            
            
            </div>
                    


                    {/* <button>Reject</button> */}
                </div>

            </div>

        </div>
    )
}

export default MyBorrowingCards