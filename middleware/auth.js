// Підключаємо бібліотеку jsonwebtoken для роботи з JWT
const jwt = require("jsonwebtoken")

// Опис middleware-функції для авторизації
const auth = async (req, res, next) => {
    try {
        // Отримуємо заголовок Authorization
        // Очікуваний формат: "Bearer TOKEN"
        const token = req.headers.authorization.split(' ')[1]

        // Перевіряємо, чи токен існує
        if (token) {

            // Перевіряємо токен і декодуємо його
            // 'secret' — секретний ключ, яким токен був підписаний
            const decoded = await jwt.verify(token, 'secret')

            // Зберігаємо розшифровані дані користувача в req
            // Тепер req.user доступний у наступних middleware / контролерах
            req.user = decoded

            // Передаємо керування далі
            next()
        }
    }
    catch (error) {
        // Якщо токен відсутній, зламаний або недійсний —
        // повертаємо помилку
        return res.status(400).json({
            error: {
                message: 'Invalid token'
            }
        })
    }
}

// Експортуємо middleware для використання в роутерах
module.exports = auth
