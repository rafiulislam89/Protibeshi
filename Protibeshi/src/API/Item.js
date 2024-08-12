export const postItem = (data) => {
    fetch('http://localhost:5000/items', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(d => console.log(d))
}

export const getAllItems = async () => {
    const res = await fetch('http://localhost:5000/items')
    return await res.json()
}

export const getUserItems = async (email) => {
    const res = await fetch(`http://localhost:5000/items/${email}`)
    return await res.json()
}

export const getBorrowItems = async (email) => {
    
    const res = await fetch(`http://localhost:5000/borrowings/${email}`)
    return await res.json()
}