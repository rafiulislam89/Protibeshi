import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Providers/AuthProviders';
import { getBorrowItems } from '../../../API/Item';
import ItemsCards from '../../Home/ItemCads';
import MyBorrowingCards from './MyBorrowingCards';


function MyBorrowings() {
  const { user } = useContext(AuthContext);
  console.log(user)

  const [data, setData] = useState([])
  const [seeAll, setSeeAll] = useState(false)
  const [search, setSearch] = useState('')
  const [reload, setReload] = useState(false)

  useEffect(() => {
    getBorrowItems(user?.email)
      .then(borrowData => {
        console.log(borrowData)
        setData(borrowData)
      })
  }, [user, reload])

  return (
    <div className='grid w-full grid-cols-4 gap-8 justify-center items-center bg-[#F4F5F6] mt-8 ml-8'>
      {data.map(item=>
        <MyBorrowingCards key={item._id} item={item} setReload={setReload}></MyBorrowingCards>)
        
      }
      
    </div>
  )
}

export default MyBorrowings