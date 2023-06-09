// config inicial e inicializxação do arquivo express
const express = require('express')
const mongoose = require('mongoose')
const app = express()


// forma de leitura do .Json / middlewares 
app.use(
    express.urlencoded({
        express: true,
    }),
)

app.use(express.json())

// rotas API
const rotasPerson = require('./rotas/rotasPerson')

app.use('/person', rotasPerson)

// rota inicial / endpoint
app.get('/', (req, res) => {

    // mostrar req

    res.json({message: 'Oi Express!'})

})


// entrada da porta do express
const User = 'erick'
const PassWord = encodeURIComponent('Panter@1985')

mongoose.connect(
    `mongodb+srv://${User}:${PassWord}@cluster0.zcgsc9u.mongodb.net/?retryWrites=true&w=majority`
    )
.then(() => {
    console.log("MongoDB conectado!")
    app.listen(3000)

})
.catch((error) => console.log(error))


