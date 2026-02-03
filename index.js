const express = require('express')
const db = require('./db/db')
const ArticleRoutes = require('./router/ArticleRoutes')
const ProductRoutes = require('./router/ProductRoutes')
const AuthRoutes = require('./router/AuthRoutes')
const { savePushToken } = require('./controllers/AuthController')
const auth = require('./middleware/auth')

const app = express()
const port = 4000

db.on('error', (error) => console.log(error))
db.on('connected', () => console.log('MongoDB connected'))

app.use(express.json())


app.get('/', (req, res) => {
    res.send({ name: "John Doe", age: 30 })
})

app.use('/api', ArticleRoutes)
app.use('/api', ProductRoutes)

app.use('/api', AuthRoutes)

app.post('/api/save-push-token', auth, savePushToken)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


