// ./database/db-connector.js
// Russell Feathers
// CS 340: Databases
// Date: 1/9/21

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_featheru',
    password        : '0067',
    database        : 'cs340_featheru'
})

// Export it for use in our applicaiton
module.exports.pool = pool;