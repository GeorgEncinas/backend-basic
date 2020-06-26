import express from 'express'
import { userRoute } from "./routes/user";
import { userRouteN } from "./routes/userN";

const sample = express()

sample.use(express.json()) // for parsing application/json
sample.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const array = [
    "string",
    false,
    {
        sub_id: 5
    }
]

sample.get('/hello', (req, res) => {
    res.status(200).json({
        msg: 'world'
    })
})

sample.get('/info/:id', (req, res) => {
    const { subId } = req.query
    const echo = req.query.echo
    const echo2 = req.query.echo2
    const echo3 = req.query.echo3
    const element = array[req.params.id]

    res.status(200).json({
        msg: 'ok',
        element,
        subId,
        echo,
        echo2,
        echo3
    })
})

sample.post('/array/:id', (req, res) => {
    array[req.params.id] = req.body
    res.status(200).json(array)
})

sample.put('/array/:id', (req, res) => {
    delete array[req.params.id]
    res.status(200).json(array)
})

sample.patch('/array/:id', (req, res) => {
    array.push(req.body)
    res.status(200).json(array)
})

const PORT = 9090
sample.listen(PORT, () => {
    console.log('listen at http://localhost:' + PORT)
})


// routes
sample.use('/user', userRoute)
sample.use('/userN', userRouteN)