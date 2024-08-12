import React, { useContext, useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Providers/AuthProviders';


function ItemDetails() {
    const [isVisible, setIsVisible] = useState(false);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const data = useLoaderData();
    const { _id, caution, name, age, contact, photos, condition, price, description, map, userName, userImage, apartment, building, area, city, status, feedback } = data

    const handleRent = () => {

        const borrow = {
            _id,
            name,
            description,
            condition,
            photos,
            caution,
            borrowEmail : user.email,
        }

        const setStatus = {
            status: "Pending"
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

        fetch('http://localhost:5000/borrowings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(borrow)
        })
            .then(res => res.json())
            .then(d => console.log(d))

            navigate('/');
    }


    return (
        <>
            <div className='flex w-[100%] border-[#243c5a] bg-[#F4F5F7]'>
                <div className="ml-[30%] flex flex-col w-[328px] justify-center bg-white shadow-xl rounded mt-[20px]">

                    <div className='p-5'>
                        <img src={photos} alt='open'></img>
                        <p className='mb-4 font-bold my-8'>{name}</p>
                        <p className='font-light mb-4'>{description}</p>
                        <hr></hr>
                        {/* <p className='font-bold'>{condition}</p> */}
                        {/* <p className='font-bold'>{age}</p> */}
                        <p className='font-bold'>{caution}</p>
                        <p className='font-light text-[#00B8A8] mb-1'>Safety Money</p>
                        <p className='mb-4 font-bold my-8'>Address</p>
                        <p className='font-light mb-4'>{apartment}</p>
                        <p className='font-light mb-4'>{building}</p>
                        <p className='font-light mb-4'>{area}</p>
                        <p className='font-light mb-4'>{city}</p>


                    </div>



                </div>
                <div>
                    <div className='justify-center w-[328px] bg-white shadow-xl rounded ml-[30px] mt-[20px]'>
                        <p className='font-medium mx-24 mt-8 mb-4'>Rent for {caution} BDT</p>
                        <hr className='w-[80%] ml-8'></hr>
                        <p className='font-bold text-2xl mx-4 my-4'>Choose Date</p>

                        <div>
                            <div className='flex justify-evenly'>
                                <input className='text-center h-[93px] w-[150px] border-2 border-[#EEEEEE]' placeholder='From'>
                                </input>
                                <input className='text-center h-[93px] w-[150px] border-2 border-[#EEEEEE]' placeholder='To'>
                                </input>
                            </div>
                            <div>
                                <button onClick={handleRent}
                                    className='text-center text-[#0B08AE] mx-4 mt-8 h-[93px] w-[300px] border-2 border-[#0B08AE]'>
                                    Rent for {caution}
                                </button>

                            </div>
                            


                            <div className='my-4'>
                                <div className='flex justify-center items-center space-x-8'>
                                    <img className='rounded-full' src={userImage} alt=''></img>
                                    <p>{userName}</p>
                                </div>
                                <div className="contact-info mt-8 ml-20">
                                    {isVisible ? (
                                        <button className=" text-center text-[#0B08AE] p-6  border-2 border-[#0B08AE] mb-8">{contact}</button>
                                    ) : (
                                        <button className='text-center text-[#0B08AE]   border-2 p-6 border-[#0B08AE] mb-8' onClick={() => setIsVisible(true)}>Show Phone Number</button>
                                    )}

                                </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>

                </div>
                <div className='justify-center w-[600px] bg-white shadow-xl rounded ml-[30px] mt-[20px]'>
                    <p className='font-bold text-2xl mx-4 my-4'>Feedback</p>
                    <hr></hr>
                    {/* <p>{borrowEmail}</p> */}
                    <p>{feedback}</p>
                </div>

            </div>
            <div className='ml-[33%] w-[609px] px-5 py-5 shadow-xl'>
                <iframe title={_id} src={map} width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </>
    )
}

export default ItemDetails