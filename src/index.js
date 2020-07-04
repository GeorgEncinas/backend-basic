import express from 'express'
import { userRoute } from "./routes/user";
import { userRouteN } from "./routes/userN";
import { verify } from "./services/tokenService";
import cors from 'cors'
import { sign } from 'jsonwebtoken';

const sample = express()

sample.use(cors({
    origin: [
        'http://localhost:4200',
        'http://editor.swagger.io',
        'https://editor.swagger.io'
    ]
}))

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

const login = {
    user: 'test',
    password: '1234'
}

sample.post('/info/login', async (req, res) => {
    try {
        if (
            login.user === req.body.user &&
            login.password === req.body.password
        )
            res.status(200).send(await sign(req.body))
        else
            res.status(403).json({ msg: 'Invalid username or password' })
    } catch (e) {
        console.error(e)
        res.status(409).json({ msg: 'Error in sing', e })
    }
})


sample.get('/info/:id', async (req, res, next) => {
    const token = req.get('X-Token')
    if (token)
        try {
            const decoded = await verify(token)
            console.dir({ decoded }, { colors: true })
            next()
        } catch (err) {
            console.log('token catch> ', token)
            if (err.name === 'TokenExpiredError')
                res.status(401).json({ msg: err.message })
            else
                res.status(401).json({ msg: 'Invalid token' })
            next(false)
        }
    else {
        res.send(401).json({ msg: 'Invalid token' })
        next(false)
    }
}, (req, res) => {
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