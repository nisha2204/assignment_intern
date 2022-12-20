import React, { useState } from 'react'
import "./style.css"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})

		const data = await response.json()

        if (data.user) {
            localStorage.setItem('token', data.user)
            alert('Login successful')
            window.location.href = '/welcome'
        } else {
            alert('Wrong User credentials')
        }
    }

    return (
        <div className='body'>
            <div className='form'>
                <h1>Login</h1>
                <form onSubmit={loginUser}>
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
                <input type="submit" value="Login" />
                </div>
                <div>Don't have account? <a href='/register'>Register</a></div>
                </form>
            </div>
        </div>
        // <div className="Login">
        //     <h1>Login</h1>
        //     <form onSubmit={loginUser}>
        //         <input 
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //             type="email"
        //             placeholder="Email"
        //         />
        //         <br />
        //         <input 
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //             type="password"
        //             placeholder="Password"
        //         />
        //         <br />
        //         <input type="submit" value="Login" />
        //         <div>Don't have account? <a href='/register'>Register</a></div>
        //     </form>
        // </div>
    )
}

export default Login
