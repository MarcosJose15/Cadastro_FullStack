import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express()
app.use(express.json())
//Ambiente de testes
app.use(cors())

//POST
//Função Assincrona
app.post('/users', async (req, res) => {

    //Promisse -> Função Assincrona
    await prisma.user.create({
        data: {
            name:  req.body.name,   
            email:  req.body.email,
            age:   req.body.age,
        },
    })

    res.status(201).json(req.body)
})

//PUT
app.put('/users/:id', async (req, res) => {

    await prisma.user.update({
        //condição
        where:{
            id: req.params.id
        },
        data: {
            name:  req.body.name,   
            email:  req.body.email,
            age:   req.body.age
        }
    })

    res.status(201).json(req.body)
})

//DELETE
app.delete('/users/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: "Usuário deletado com sucesso!"})
})

//GET
app.get('/users', async (req, res) => {

    let users = []
    if(req.query){

        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })

    } else {
        users = await prisma.user.findMany()
    }

    res.status(200).json(users)
})

app.listen(3000)
/*
    1) Tipo de Rota / Método HTTP
    2) Endereço

    www.lojadoseuzé.com/produtos
*/