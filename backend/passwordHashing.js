const argon2 = require('argon2');

async function hashPassword (password) 
{
    try
    {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    }
    catch (e)
    {
        console.error(e);
    }
}

async function verifyPassword (hashedPassword, password)
{
    try
    {
        if (await argon2.verify(hashedPassword, password))
        {
            return true;
        }
        
        return false;
    }
    catch (e)
    {
        console.error(e);
    }
}

module.exports = {
    hashPassword,
    verifyPassword
}