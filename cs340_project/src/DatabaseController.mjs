import express from 'express';
const PORT = 3000;
import mysql from 'mysql';
import cors from 'cors';


var connection = mysql.createConnection({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_sheajon',
    password: '4132',
    database: 'cs340_sheajon'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});


const app = express();
app.use(cors());


app.get('/aptFloors', function(req, res)
{
    connection.query("SELECT * FROM `AptFloors`",  {timeout: 40000} , function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        res.json(results);
    });                                                  // an object where 'data' is equal to the 'rows' we
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});