import express from 'express';
const PORT = 6363;
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


app.get('/GET/aptFloors', function(req, res)
{
    connection.query("SELECT * FROM `AptFloors`",  {timeout: 40000} , function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        res.json(results);
    });                                                 
});

app.post('/POST/aptFloors', function(req, res)
{
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO AptFloors (floorNum, fireExits) VALUES (?,?)";
    let {floorNum, fireExits} = req.body;
    //var jsonDecode = JSON.parse(req.body);
    //console.log(jsonDecode)
    var inserts = [floorNum, fireExits];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            res.status(400);
            console.log(JSON.stringify(error))
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.status(201);
            res.end();
        }
    });
});


app.listen(PORT, () => {
    console.log("Express started on http://localhost:"+PORT+"; press Ctrl-C to terminate.");
});