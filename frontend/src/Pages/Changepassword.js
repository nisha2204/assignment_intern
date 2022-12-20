import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
// import axios from 'axios'
import "../App.css"
import { useHistory } from 'react-router-dom'

const Changepassword = () => {
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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


    const changepasswordfun = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/changepassword', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: user.email,
				password,
			}),
		})

		const data = await response.json()

        if (data.user) {
            localStorage.setItem('token', data.user)
            alert('Password changed successfull')
            window.location.href = '/welcome'
        } else {
            alert('Wrong User credentials')
        }
    }

    return (
        <div className="Login">
            <h1>Change Password</h1>
            <form onSubmit={changepasswordfun}>
                <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                <br />
                <input type="submit" value="Change Password" />
            </form>
        </div>
    )
}

export default Changepassword
