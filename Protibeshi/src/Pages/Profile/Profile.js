import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Providers/AuthProviders';
import { postProfile } from '../../API/Prof';

function Profile() {
    const { user } = useContext(AuthContext)
    const [photoURL, setPhotoURL] = useState('');
    const [userData , setUserData] = useState([])

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        const form = e.target;

        const phone = form.contact.value;
        const address = form.address.value;

        const data = {
            phone,
            address,    
        }
        console.log(data)
        postProfile(user.email,data);
    }

    useEffect(() => {
        fetch(`http://localhost:5000/users/${user?.email}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(saad => setUserData(saad))
        .catch(error => console.error('Error:', error));
    }, [user])
    console.log(userData)

    return (
        <div className='ml-[500px] bg-[#F4F5F6] pr-4'>
            <form onSubmit={handleSubmitProfile}>
                <h1 className="text-4xl ml-[200px] font-bold mt-12">
                    Profile
                </h1>
                <div className="text-base ml-[200px] font-bold mt-4">
                    <label>General Details</label>
                </div>
                <div className='flex ml-[200px] mt-[40px]'>
                    <div>
                        <img className='rounded-xl' src={user.photoURL} alt="" />
                    </div>
                    <div className='ml-[100px]'>
                        <h1>Available Credits: {userData.credit}</h1>
                        <h1 className='mt-4'>Available Reward Points: {userData.reward} </h1>
                    </div>
                </div>
                <div className='ml-[200px]'>
                    <input className="w-96 bg-[#ffffff] border-none rounded mt-4" type="text" name="username" placeholder={user.displayName} disabled></input>
                </div>
                <div className='ml-[200px]'>
                    <input className="w-96 bg-[#ffffff] border-none rounded mt-3" type="email" name="usermail" placeholder={user.email} disabled></input>
                </div>
                <div className="text-base font-bold mt-4 mb-2 ml-[200px]">
                    <label>Contact & Address Details</label>
                </div>
                <div className='ml-[200px]'>
                    <input className="w-96 bg-[#ffffff] border-none rounded mt-4" type="text" name="contact" placeholder="Phone Number"></input>
                </div>
                <div className='ml-[200px] mt-4'>
                    <textarea className="w-96 bg-[#ffffff] border-none rounded" rows="4" cols="50" name="address" placeholder='Your Address'></textarea>
                </div>
                <div className="bg-[#444AC4] ml-[200px] w-[100px] text-white border-none rounded-lg text-center py-2 px-6 mt-8">
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )

}

export default Profile