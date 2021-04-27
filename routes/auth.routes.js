const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

// api/auth/register
router.post(
    '/register',
    [
      check('email', 'Email dont valid').isEmail(),
      check('password', 'Min password length 6 symbols').isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Not valid email or password'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({ email })

        if(candidate){
            return res.status(400).json({ message: 'This email is already in use!' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({ message: 'User created!' })

    }catch (e) {
        res.status(500).json({ message: 'Some error' })
    }
})

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Email dont valid').normalizeEmail().isEmail(),
        check('password', 'The password must be entered').isLength({ min: 6 }).exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Not valid email or password'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if (!user){
                return res.status(400).json({ message: 'User is not found' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch){
                return res.status(400).json({ message: 'Invalid username or password' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            res.json({ token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Some error'})
        }
    })


module.exports = router


