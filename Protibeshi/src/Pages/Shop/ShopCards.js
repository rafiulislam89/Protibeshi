import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { postProfile } from '../../API/Prof';
import { AuthContext } from '../../Providers/AuthProviders';

function ShopCards({item, setReload}) {
    const { _id, name, description, photos, caution, status, price, userEmail  } = item;

    const { user } = useContext(AuthContext)
    console.log(user)
    console.log(price)

    const handlePurchase = () => {
      const setStatus = {
          status: "Purchased",
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
              console.log(data)

              fetch(`http://localhost:5000/users/${user?.email}`)
              .then(res => res.json())
              .then(user => {

                const result = user?.reward - price
                const updatecred = {
                  reward : result,
                }
                postProfile(user?.email, updatecred);
                setReload(true)
                console.log(user)
              })
  
          })

  
          
  }
    

  return (
      <div className="flex flex-col justify-center m-8 bg-white shadow-xl rounded-xl hover:scale-105 duration-300">
            <Link to={`/details/${_id}`}>
                <div className='p-5 overflow-hidden'>
                    <img className='h-72 m-auto' src={photos} alt='open'></img>
                    <p className='font-normal text-[#00B8A8] mb-1'>{status}</p>
                    <p className='my-2 text-xl font-bold'>{name}</p>
                    <p className='mb-4'>{description}</p>
                    <hr></hr>
                    <p className='font-bold text-xl my-2'>RP: {price}</p>
                    <button
                  onClick={handlePurchase}
                  className='text-center text-[#0B08AE] ml-40  h-[30px] w-[100px] border-2 border-[#0B08AE]'>
                  Purcahse
                </button>
                </div>
            </Link>
        </div>
  )
}

export default ShopCards
