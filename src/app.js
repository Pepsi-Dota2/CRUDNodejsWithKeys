const express = require('express');
const { config } = require("dotenv");
const { rounter } = require('./router');
const bodyParser = require('body-parser');
config();
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.urlencoded({extends: true}));
app.use('/', rounter )


//use Body-parder to 
app.listen(process.env.NODE_PORT, ()=>{
  console.log("Sever is running",  process.env.NODE_PORT);
})