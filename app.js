const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require("path");
const app = express();

dotenv.config({path :'./config.env'});
app.use(express.json());

            
//serving the frontend 

app.use(express.static(path.join(__dirname,"./client/build")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"./client/build"));
})

app.use(require('./router/auth'));
require('./db/conn');

const PORT =  9000 ;
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
})
