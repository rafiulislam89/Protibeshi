import React, { useContext, useEffect, useState } from 'react'
import { getAllItems } from '../../API/Item'
import ShopCards from './ShopCards'

function Shop() {
    const [data, setData] = useState([])
    const [seeAll, setSeeAll] = useState(false)
    const [search, setSearch] = useState('')
    const [reload, setReload] = useState(false)
    

    useEffect(() => {
        getAllItems()
            .then(data => {
                const result = data.filter(item => item.status === "Gift Card")
                setData(result)
                console.log(result)
            })
    }, [reload])

  return (
    <div className='grid w-full grid-cols-4 gap-8 justify-center items-center bg-[#F4F5F6]'>
                        {
                            data.filter((item) => {
                                return search.toLowerCase() === 'Available' ? item : item.name.toLowerCase().includes(search)
                            }).slice(0, seeAll ? 40 : 8).map(item =>
                                <ShopCards key={item._id} item={item} setReload={setReload}></ShopCards>
                            )
                        }
                    </div>
  )
}

export default Shop
