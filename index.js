import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const tweets = []
const contas = []

app.get("/tweets", (req, res) => {

    const {page} = req.query

    if(page == 1){
        res.send(tweets.slice(-10).reverse())
        return
    }else if(page > 1){
        res.send(tweets.slice(-10 * page,-10 * (page -1)).reverse())
        return
    }else{
        res.status(400).send("Informe uma página válida!")
        return
    }

})

app.get("/tweets/:USERNAME", (req, res) => {

    const username = req.params.USERNAME

    let tweetsFiltrados = tweets.filter( i => i.username === username )

    if(tweetsFiltrados.length !== 0){
        res.send(tweetsFiltrados.reverse())
    }else{
        res.sendStatus(400)
    }
})

app.post("/tweets", (req, res) => {

    const {user} = req.headers
    const avatar = contas.find(i=>i.username === user).avatar


    if (!user|| !req.body.tweet) {
        res.status(400).send("Todos os campos são obrigatórios!") //BAD REQUEST
        return
    } else {

        const tweet = {tweet : req.body.tweet,
            avatar : avatar,
            username: user
        }

        tweets.push(tweet)
        res.status(201).send("OK")
    }
})

app.post("/sign-up", (req, res) => {

    let conta = req.body

    if (!conta.username || !conta.avatar) {
        res.status(400).send("Todos os campos são obrigatórios!") //BAD REQUEST
        return
    } else {
        contas.push(conta)
        res.status(201).send("OK")
    }
})

app.listen(5000)

