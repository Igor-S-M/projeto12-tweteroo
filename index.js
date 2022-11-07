import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const tweets = []
const contas = []

app.get("/tweets", (req, res) => {

    res.send(tweets.slice(-10).reverse())
})

app.post("/tweets", (req, res) => {

    const tweet = req.body

    if (!tweet.username || !tweet.tweet) {
        res.status(400).send("Todos os campos são obrigatórios!") //BAD REQUEST
        return
    } else {
        tweets.push(tweet)
        res.status(201).send("OK")
    }
})

app.post("/sign-up", (req, res) => {

    const conta = req.body

    if (!conta.username || !conta.avatar) {
        res.status(400).send("Todos os campos são obrigatórios!") //BAD REQUEST
        return
    } else {
        contas.push(conta)
        res.status(201).send("OK")
    }
})

app.listen(5000)

