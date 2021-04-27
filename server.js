const express = require('express')
const config = require('config')
const path = require('path')
const mongoose = require('mongoose')

const server = express()

server.use(express.json({extended: true}))

server.use('/api/auth', require('./routes/auth.routes'))
server.use('/api/link', require('./routes/link.routes'))
server.use('/t', require('./routes/redirect.routes'))

if (process.env.NODE_ENV === 'production') {
    server.use('/', express.static(path.join(__dirname, "/client/build")))

    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    server.get('/', (req, res) => {
        res.send("Api run")
    })

    const PORT = process.env.PORT || 5000

    async function start() {
        try {
            await mongoose.connect(process.env.MONGODB_URI || config.get('mongoUri'), {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            })
            // mongoose.connection.on('connected', () => {
            //     console.log('Mongoose')
            // })
            server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
        } catch (e) {
            console.log('Server Error', e.message)
            process.exit(1)
        }
    }
}

start()

