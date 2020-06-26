// http://localhost:9090/user*****

import { Router } from "express";
import { UserN } from "../models";
import { hash } from "../services/hashPasswords";

const userRouteN = Router()

userRouteN.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const userFound = await UserN.findById(id)
        if (userFound)
            res.status(200).json(userFound)
        else
            res.status(404).json({ msg: 'User not found' })
    } catch (err) {
        console.warn(err)
        if (err.error.Symbol("mongoose: validatorError"))
            res.status(405).json(err)
        else 
            res.status(500).json(err)
    }
})

userRouteN.post('/', async (req, res) => {
    try {
        if (req.body?.password)
            req.body.password = hash(req.body.password)
        
        const userCreated = await UserN.create(req.body)
        if (userCreated) {
            res.status(201).json(userCreated)
        }
    } catch (err) {
        console.warn(err)
        res.status(500).json(err)
    }
})

userRouteN.put('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const userFound = await UserN.findById(id)
        if (userFound) {
            const userDeleted = await userFound.destroy()
            res.status(200).json(userDeleted)
        } else
            res.status(404).json({ msg: 'User not found and not deleted' })
    } catch (err) {
        console.warn(err)
        res.status(500).json(err)
    }
})

userRouteN.patch('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const userFound = await UserN.findById(id)
        if (userFound) {
            const userUpdated = await userFound.update(req.body)
            res.status(200).json(userUpdated)
        } else
            res.status(404).json({ msg: 'User not found and not updated' })
    } catch (err) {
        console.warn(err)
        res.status(500).json(err)
    }
})

export { userRouteN }