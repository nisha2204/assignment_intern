import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./style.css"

const Register = () => {
    const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    

    const registerUser = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})

		const data = await response.json()

        if (data.status === 'OK') {
            history.push('/')
        }
    }

    return (
        <div className='body'>
            <div className='form'>
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <div className='input-container ic2'>
                <input 
                    className='input'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Name"
                />
                </div>
                <div className='input-container ic2'>
                <input 
                    className='input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                </div>
                <div className='input-container ic2'>
                <input 
                    className='input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                />
                </div>
                <div className='input-container ic2'>
                <input type="submit" value="Register" />
                </div>
            </form>
            </div>
        </div>
    )
}

export default Register
