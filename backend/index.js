const express = require('express');
const cors = require('cors');
const {mainRouter} = require('./routes/mainRouter');
require('dotenv').config();  


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1', mainRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});