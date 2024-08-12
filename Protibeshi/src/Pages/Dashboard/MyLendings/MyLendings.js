import React, { useContext, useEffect, useState } from 'react'
import ItemsCards from '../../Home/ItemCads'
import { getAllItems, getUserItems } from '../../../API/Item'
import { AuthContext } from '../../../Providers/AuthProviders';


function MyLendings({ item }) {

  const { user } = useContext(AuthContext);
  console.log(user)

  // const {userEmail} = item;
  const [data, setData] = useState([])
  const [seeAll, setSeeAll] = useState(false)
  const [search, setSearch] = useState('')

  // useEffect(() => {
  //   getUserItems(user.email)
  //     .then(data => {
  //       const result = data.filter(item => item.status === "Pending")
  //       setData(result)
  //     })
  // }, [user])


  // if (item.userEmail !== user.email) {
  //   // If status is not 'available', you can return null or a placeholder
  //   return null; // This will prevent rendering anything for non-'available' items
  // }

  return (
    <div className='grid w-full grid-cols-4 gap-8 justify-center items-center bg-[#F4F5F6] mt-8 ml-8'>
      {
        data.filter((item) => {
          return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
        }).slice(0, seeAll ? 40 : 8).map(item =>
          <ItemsCards key={item._id} item={item}></ItemsCards>
        )
      }
    </div>
  )
}

export default MyLendings