import React from 'react';
import { Link } from 'react-router-dom';

function ItemCads({ item }) {
    const { _id, name, description, photos, caution, status, price  } = item;

    // if (status !== 'Available') {
    //     // If status is not 'available', you can return null or a placeholder
    //     return null; // This will prevent rendering anything for non-'available' items
    // }

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
        </div>
    );
}

export default ItemCads;
