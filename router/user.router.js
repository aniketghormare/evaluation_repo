const express = require("express")
const { userModel } = require("../model/user.model")
const bcrypt = require("bcrypt")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
require("dotenv").config()
userRouter.post("/register", async (req, res) => {
    const { name, email, gender, password, age, city, is_married } = req.body

    const data =  userModel.findOne({ email })

    if (data.email == email) {
        res.json({ msg: "User already exist, please login" })
    }

    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            
             if (err) {
                res.json({ msg: err })
            } else {
                const user = await userModel({ name, email, gender, password: hash, age, city, is_married })
                await user.save()
                res.json({ msg: "user registered" })
            }
        })

    } catch (error) {
        res.json({ msg: error })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userId: user._id, name: user.name }, process.env.secretkey)

                    res.json({ msg: "login successful", token })

                }
            })
        } else {
            res.json({ msg: "user not found" })
        }
    } catch (error) {
        res.json({ msg: error })
    }
})

module.exports = {
    userRouter
}