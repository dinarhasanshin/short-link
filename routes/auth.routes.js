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
      check('email', 'Неверный email').isEmail(),
      check('password', 'Минимальная длинна пароль 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неправильный логин или пароль'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({ email })

        if(candidate){
            return res.status(400).json({ message: 'Этот email уже используется' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({ message: 'Пользователь создан' })

    }catch (e) {
        res.status(500).json({ message: 'Произошла ошибка' })
    }
})

// api/auth/login
router.post(
    '/login',
    [
        check('email', 'Неверный email').normalizeEmail().isEmail(),
        check('password', 'Пароль должен быть введён').isLength({ min: 6 }).exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Неправильный логин или пароль'
                })
            }

            const {email, password} = req.body

            const user = await User.findOne({ email })

            if (!user){
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch){
                return res.status(400).json({ message: 'Неправильный логин или пароль' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' }
            )
            res.json({ token, userId: user.id})

        } catch (e) {
            res.status(500).json({message: 'Произошла ошибка'})
        }
    })


module.exports = router


