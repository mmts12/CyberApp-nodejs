const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
// const cookieParser = require('cookie-parser')

const app = express()
const http = require('http').createServer(app)
const port = process.env.PORT || 3030;

// app.use(cookieParser())
app.use(express.urlencoded({ extended: true })) //body parser

if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.resolve(__dirname, 'public')))
    app.use(express.static('public'));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const attackRoutes = require('./api/attack/attack.routes');
app.use('/api/attack', attackRoutes);

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

http.listen(port, () => {
    console.log(`Attacks app listening at http://localhost:${port}`)
})