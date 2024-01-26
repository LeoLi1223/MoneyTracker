const express = require('express')
const cors = require('cors')
require('dotenv').config()
const Transaction = require('../models/Transaction.js')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/test', (req, resp) => { resp.json('test ok') })

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL)
    const { name, date, description, price } = req.body
    const transaction = await Transaction.create({ name, price, date, description })
    res.json(transaction)
})

app.get('/api/alltransactions', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await Transaction.find({})
    res.json(transactions)
})

// app.get('/api/deletetransaction', async (req, res) => {
//     await mongoose.connect(process.env.MONGO_URL)
//     const {name, date, description} = req.body
//     await Transaction.remove({name, date, description})
// })

app.listen(4000)

