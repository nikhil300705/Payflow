const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const {hashPassword, verifyPassword} = require('../passwordHashing');
const { User, Account } = require('../db');
const JWT_SECRET = process.env.JWT_SECRET;

const userRouter = express.Router();

const signupSchema = zod.object({
    userName : zod.string().email(),
    password : zod.string().min(6),
    firstName : zod.string().min(1),
    lastName : zod.string().min(1)
})

userRouter.post('/signup', async (req, res) => {
    const body = req.body;

    const {success} = signupSchema.safeParse(body);

    if (!success)
    {
        return res.json({
            message : "Incorrect inputs"
        });
    }

    const user = await User.findOne({
        userName : body.userName
    });

    if (user)
    {
        return res.json({
            message : "Email already taken"
        });
    }

    body.password = await hashPassword(body.password);

    const dbUser = await User.create(body);
    const userId = dbUser._id;

    await Account.create({
        userId,
        balance : Math.floor(1 + Math.random() * 10000)
    })

    res.json({
        message : "User created successfully",
    });
});

const signinSchema = zod.object({
    userName : zod.string().email(),
    password : zod.string().min(6)
});

userRouter.post('/signin', async (req, res) => {
   const body = req.body;

    const {success} = signinSchema.safeParse(body);

    if (!success)
    {
        return res.json({
            message : "Invalid Inputs"
        });
    }

   const dbUser = await User.findOne({
    userName : body.userName
   });

   if (dbUser == null)
   {
    return res.json({
        message : "Invalid userName"
    });
   }

   const isTrue = await verifyPassword(dbUser.password, body.password);

   if (!isTrue)
   {
    return res.json({
        message : "Invalid password"
    });
   }

   const token = jwt.sign({
    userId : dbUser._id
   }, JWT_SECRET);

   res.json({
    message : "Logged in",
    token : token
   });
});

userRouter.get('/bulk', async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or : [
            {firstName : {
                '$regex' : filter,
                '$options' : 'i'
            }},
            {lastName : {
                '$regex' : filter,
                '$options' : 'i'
            }}
        ]
    });

    if (users.length < 1)
    {
        return res.json({
            message : "No users found"
        })
    }

    res.json({
        user : users.map(user => ({
            userName : user.userName,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    });
});

module.exports = {userRouter};