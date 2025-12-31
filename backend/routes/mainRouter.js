const express = require('express');
const zod = require('zod');
const {userRouter} = require('./userRouter');
const {accountRouter} = require('./accounRouter');
const {authMiddleware} = require('../middleware');

const mainRouter = express.Router();

mainRouter.use('/user', userRouter);
mainRouter.use('/account', accountRouter);

const updateBody = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})

mainRouter.put('/', authMiddleware, async (req, res) => {
    const body = req.body;

    const {success} = updateBody.safeParse(body);

    if (!success)
    {
        res.json({
            message : "Error while updating information"
        });
    }

    await User.updateOne(body, {
        id : User.userId
    });

    res.json({
        message : "Updated successfully"
    });
});

module.exports = {mainRouter};