const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

mongoose.connect(
    //process.env.MONGO_URL
    'mongodb://127.0.0.1:27017/test'
);


//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/user',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts/',postRoute);


app.listen(8800,()=>{
    console.log('Server is running at http://localhost:'+8800);
})
