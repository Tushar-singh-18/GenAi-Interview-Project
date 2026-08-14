const userModel = require("../Model/user.model");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const blackListModel = require("../Model/blacklist.model");

// Registering a new user 
// Thats why importing the usermodel
// /api/auth/=>regiter/=>auth.controller

async function userRegister(req, res) {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please fill all the columns with valid data"
        })
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ email }, { username }]
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            messsage: "Account already exist with this email and username"
        })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash,
    })

    const token = await jwt.sign({
        id: user._id, username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(201).json({
        message: "New user has been created",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    })


}

async function userLogin(req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!user) {
        return res.status(400).json({
            message: "Incorrect email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Incorrect email or password"
        })
    }

    const token = await jwt.sign({
        id: user._id, username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(200).json({
        message: "User successfully logged in",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

async function userLogOut(req, res) {
    const token = req.cookies.token

    if (token) {
        await blackListModel.create({ token })
    }

    res.clearCookie('token')

    res.status(200).json({
        message: "User has logout successfully"
    })
}

async function userController(req, res) {
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message:"User fetched successfully",
        user: {
            id: user.id,
            username: user.username,
            email: user.email
        }
    })
}



module.exports = { userRegister, userLogin, userLogOut , userController}