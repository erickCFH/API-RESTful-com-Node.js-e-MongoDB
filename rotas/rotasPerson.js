const router = require('express').Router()
const Person = require('../modelos/Person')

router.post('/', async (req, res) => {

    const {nome, salario, aprovado} = req.body

    if(!nome) {
        res.status(422).json({error: 'O nome é obrigatorio!'})
        return
    }

    const person = {
        nome,
        salario,
        aprovado,
    }

    // criação dos dados pelo Moogose

    try {

      await Person.create(person)  

      res.status(201).json({message: 'Pessoa inserida com sucesso!'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// leitura de dados
router.get('/', async (req, res) => {
    try {

        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

router.get('/:id', async (req, res) => {

    const id = req.params.id

    try {

        const person = await Person.findOne({_id: id })

        if(!person) {
            res.status(422).json({message: 'Usuario não encontrado!'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

//  atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {nome, salario, aprovado} = req.body

    const person = {
        nome,
        salario,
        aprovado,
    }

    try {

        const updatedPerson = await Person.updateOne({_id: id}, person)

        if(updatedPerson.matchedCount === 0) {
            res.status(422).json({message: 'Usuario não encontrado!'})
            return
        }

        res.status(200).json(person)

    } catch(error) {
        res.status(500).json({error: error})
    }

})

// Deletar dados
router.delete('/:id', async (req, res) => {

    const id = req.params.id

    const person = await Person.findOne({_id: id })

    if(!person) {
        res.status(422).json({message: 'Usuario não encontrado!'})
        return
    }

    try {

        await Person.deleteOne({_id: id})

        res.status(200).json({message: 'Usuario removido com sucesso!'})

    } catch(error) {
        res.status(500).json({error: error })
    }

})

module.exports = router

