import React, { useState, useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'
import '../App.css'

const Welcome = () => {
	const history = useHistory()
	const [user, setUser] = useState('User')

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			const authUser = jwt.decode(token)
			if (!authUser) {
				localStorage.removeItem('token')
				history.replace('/')
			} else {
				setUser(authUser)
			}
		} else {
			alert('Please Login')
			history.replace('/login')
		}
	}, [])

	const logoutUser = () => {
		alert('Logged Out')
		localStorage.removeItem('token')
		history.replace('/')
	}
	const changepassword = () => {
		history.replace('/changes')
	}
	const changename = () => {
		history.replace('/changename')
	}

	return (
		<div>
			<h1>Welcome {user.name}</h1>
			<h3>{user.email}</h3>
			<input type="submit" value="Logout" onClick={logoutUser} />
			<input type="submit" value="change password" onClick={changepassword} />
			<input type="submit" value="change name" onClick={changename} />
		</div>
	)
}

export default Welcome
