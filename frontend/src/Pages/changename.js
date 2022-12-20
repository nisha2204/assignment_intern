import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import "../App.css"
import { useHistory } from 'react-router-dom'

const Changename = () => {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const [user, setUser] = useState('User')

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const authUser = jwt.decode(token)
			if (!authUser) {
				localStorage.removeItem('token')
				history.replace('/login')
			} else {
				setUser(authUser)
			}
		} else {
			alert('Please Login')
			history.replace('/login')
		}
	}, [])


    const changenamefun = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/changename', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email:user.email,
				name,
			}),
		})

		const data = await response.json()

        if (data.user) {
            localStorage.setItem('token', data.user)
            alert('Name changed successfull')
            window.location.href = '/welcome'
        } else {
            alert('Wrong User credentials')
        }
    }

    return (
        <div className="Login">
            <h1>Change Name</h1>
            <form onSubmit={changenamefun}>
                <input 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                />
                <br />
                <input type="submit" value="Change Name" />
            </form>
        </div>
    )
}

export default Changename
