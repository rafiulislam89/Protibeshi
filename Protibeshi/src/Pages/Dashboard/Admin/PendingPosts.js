import React, { useEffect, useState } from 'react'
import { getAllItems } from '../../../API/Item'
import PendingCards from './PendingCards'

function PendingPosts() {
  const [data, setData] = useState([])
    const [seeAll, setSeeAll] = useState(false)
    const [search, setSearch] = useState('')
    const [reload, setReload] = useState(false)

    useEffect(() => {
        getAllItems()
            .then(data => {
                const result = data.filter(item => item.status === "Admin aproval")
                setData(result)
            })
    }, [reload])

  return (
    <div className='grid w-full grid-cols-4 gap-8 justify-center items-center bg-[#F4F5F6]'>
                        {
                            data.filter((item) => {
                                return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)
                            }).slice(0, seeAll ? 40 : 8).map(item =>
                                <PendingCards key={item._id} item={item} setReload={setReload}></PendingCards>

                                )
                        }
                    </div>
  )
}

export default PendingPosts
