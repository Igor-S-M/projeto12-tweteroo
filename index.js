import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const tweets = []
const contas = []

app.get("/tweets", (req, res) => {

    res.send(tweets)
})

app.post("/tweets", (req, res) => {

    const {tweet} = req.body

    tweets.push(tweet)

    res.send(tweet)
})

app.post("/sign-up", (req, res) => {
    
    const conta = req.body

    contas.push(conta)
    
    res.send(conta)
})

app.listen(5000)

