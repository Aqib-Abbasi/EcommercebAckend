var prop = require('./db_properties');
var mysql=require('mysql2');
module.exports={
    getConnection:()=>{
        return mysql.createConnection(prop)
    }
}