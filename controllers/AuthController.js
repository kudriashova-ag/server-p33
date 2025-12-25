// Підключаємо модель користувача (Mongoose)
const User = require("../models/User")

// bcrypt використовується для перевірки хешованого пароля
const bcrypt = require('bcrypt')

// jsonwebtoken потрібен для створення JWT-токенів
const jwt = require('jsonwebtoken')


// =====================
// РЕЄСТРАЦІЯ КОРИСТУВАЧА
// =====================
const register = async (req, res) => {
    try {
        // Дістаємо дані з тіла запиту
        const { name, email, password } = req.body

        // Перевіряємо, чи існує користувач з таким email
        const candidate = await User.findOne({ email })

        // Якщо користувач вже є — реєстрацію зупиняємо
        if (candidate) {
            return res.status(400).json({
                error: {
                    message: 'User already exists'
                }
            })
        }

        // Створюємо нового користувача
        // (пароль має хешуватися у схемі User)
        const user = new User({ name, email, password })

        // Зберігаємо користувача в базу даних
        await user.save()

        // Повертаємо успішну відповідь
        res.status(201).json({
            message: 'User created'
        })
    }
    catch (error) {
        // Обробка помилки під час реєстрації
        return res.status(400).json({
            error: {
                message: 'Registration error'
            }
        })
    }
}


// ==============
// ЛОГІН КОРИСТУВАЧА
// ==============
const login = async (req, res) => {
    try {
        // Отримуємо email та пароль з body
        const { email, password } = req.body

        // Шукаємо користувача за email
        const user = await User.findOne({ email })

        // Якщо користувача не знайдено
        if (!user) {
            return res.status(400).json({
                error: {
                    message: 'User not found'
                }
            })
        }

        // Порівнюємо введений пароль з хешем у БД
        const isValidPassword = await bcrypt.compare(password, user.password)

        // Якщо пароль неправильний
        if (!isValidPassword) {
            return res.status(400).json({
                error: {
                    message: 'Invalid password'
                }
            })
        }

        // Створюємо JWT-токен
        const token = jwt.sign(
            { id: user._id }, // payload — ідентифікатор користувача
            'secret',         // секретний ключ (у реальних проєктах .env)
            { expiresIn: '24h' } // термін дії токена
        )

        // Повертаємо токен і базові дані користувача
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    }
    catch (error) {
        // Помилка під час логіну
        return res.status(500).json({
            error: {
                message: 'Login error'
            }
        })
    }
}


// =================================
// ОТРИМАННЯ АВТОРИЗОВАНОГО КОРИСТУВАЧА
// =================================
const getAuthUser = async (req, res) => {
    try {
        // req.user.id приходить з auth middleware (JWT)
        const user = await User.findById(req.user.id)

        // Повертаємо дані користувача
        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    }
    catch (error) {
        // Помилка отримання користувача
        return res.status(500).json({
            error: {
                message: 'Get user error'
            }
        })
    }
}


// Експортуємо контролери
module.exports = { register, login, getAuthUser }
