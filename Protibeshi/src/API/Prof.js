export const postProfile = (email,data) => {
    console.log(email)
    console.log(data)
    fetch(`http://localhost:5000/users/${email}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(d => console.log(d))
}
