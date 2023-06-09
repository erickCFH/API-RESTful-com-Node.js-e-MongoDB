const mongoose = require('mongoose')

// Criação de Colections no banco
const Person = mongoose.model('Person', {
    nome: String,
    salario: Number,
    aprovado: Boolean,
})

// Exportar o modulo
module.exports = Person