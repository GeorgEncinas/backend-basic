const express = require("express")

const sample = express()

const array = [
    "string",
    false,
    {
        sub_id: 5
    }
]

sample.get('/hello', function (req, res) {
    res.status(200).json({
        msg: 'world'
    })
})

sample.get('/info/?id', function (req, res) {
    const sub_id = req.query.subId
    const echo = req.query.echo
    const echo2 = req.query.echo2
    const echo3 = req.query.echo3
    const element = array[req.params.id]

    res.status(200).json({
        msg: 'ok',
        element,
        sub_id,
        echo,
        echo2,
        echo3
    })
})

const PORT = 9090
sample.listen(PORT, function () {
    console.log('listen at http://localhost:' + PORT) 
})
