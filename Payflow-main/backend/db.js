require('dotenv').config();  

const mongoose = require('mongoose');
const MONGODB_URL = process.env.MONGODB_URL;

async function connection ()
{
    try 
    {
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to MongoDB");
    }
    catch (e)
    {
        console.error(e);
    }
}

connection();

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    }
})

const User = mongoose.model('User', userSchema);

const accountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})

const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}