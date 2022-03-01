const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_sheajon',
    password        : '4132',
    database        : 'cs340_sheajon'
});
module.exports.pool = pool;