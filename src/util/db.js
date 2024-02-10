const mysql      = require('mysql2');
const {config} = require("dotenv");
config();
const Mysqlclient = mysql.createPool({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE,
  port : process.env.MYSQL_PORT,

});

// if you use Pool you sould use getConnection 

Mysqlclient.getConnection(function(err) {
    if (err) {
      console.error('error connecting: ', err);
      return;
    }
  
    console.log('connected my sql Successfuly ');
  });

// promise can use async and await if you don't this method you can't use async and await
module.exports = {
    Mysqlclient : Mysqlclient.promise(),
};