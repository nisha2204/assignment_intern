import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

import User from './models/user.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/login-register-mern')

app.get('/', (req, res) => {
    res.send('Welcome to the system')
})

app.post('/register', async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
        })
        res.json({ 
            status: 'OK' 
        })
    } catch (err) {
        res.json({ 
            status: 'error',
            error: err.message
        })
    }
})

app.post('/login', async (req, res) => {
    const user = await User.findOne({ 
        email: req.body.email
    })

    if (!user) return { status: 'error', error: 'Invalid Login' }
    
    const isPasswordValid = await bcrypt.compare(
        req.body.password, 
        user.password
    )


    if (isPasswordValid) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            'secret123'
        )

        return res.json({
            status: 'OK',
            user: token
        })
    } else {
        return res.json({
            status: 'error', 
            user: false
        })
    }
})

app.post('/changepassword', async (req, res) => {
    const newpassword = await bcrypt.hash(req.body.password, 10)
    const filter = { email: req.body.email };
    const update = { password: newpassword };
    let user = await User.findOneAndUpdate(filter, update, {
        new: true
      });

    if (!user) return { status: 'error', error: 'Invalid Login' }
    

    if (user.password==newpassword) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            'secret123'
        )

        return res.json({
            status: 'OK',
            user: token
        })
    } else {
        return res.json({
            status: 'error', 
            user: false
        })
    }
})
app.post('/changename', async (req, res) => {
    const filter = { email: req.body.email };
    const update = { name: req.body.name};
    let user = await User.findOneAndUpdate(filter, update, {
        new: true
      });

    if (!user) return { status: 'error', error: 'Invalid Login' }
    

    if (user.name==req.body.name) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            'secret123'
        )

        return res.json({
            status: 'OK',
            user: token
        })
    } else {
        return res.json({
            status: 'error', 
            user: false
        })
    }
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
