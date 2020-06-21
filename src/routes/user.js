// http://localhost:9090/user*****

import { Router } from "express";
import { User } from "../models";

const userRoute = Router()

userRoute.get('/:id', (req, res) => {
    const { id } = req.query
    User.findOne({ id })
        .then(userFound => {
            if (userFound)
                res.status(200).json(userFound)
            else
                res.status(404).json({msg: 'User not found'})
        })
        .catch(err => {
            console.warn(err)
            res.status(500).json(err)
        })
})

// userRoute.post()
// userRoute.put()
// userRoute.patch()

export {userRoute}