import express from 'express';
const PORT = 6363;
import mysql from 'mysql';
import cors from 'cors';
import bodyParser from 'body-parser';

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//APT FLOORS
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

app.get('/GET/aptFloors/:id', function(req, res)
{
    connection.query(`SELECT * FROM AptFloors WHERE floorNum = ${req.params.id}`,  {timeout: 40000} , function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        console.log('Success!')
        res.json(results);
    });
});

app.get('/GET/aptOwners', function(req, res)
{
    connection.query("SELECT * FROM `AptOwners`",  {timeout: 40000} , function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        res.json(results);
    });                                                 
});

app.get('/GET/apts', function(req, res)
{
    connection.query("SELECT * FROM `Apts`",  {timeout: 40000} , function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        res.json(results);
    });                                                 
});

app.get('/GET/priceHistory', function(req, res)
{
    connection.query("SELECT * FROM `PriceHistory`",  {timeout: 40000} , function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        res.json(results);
    });                                                 
});

app.get('/GET/rodents', function(req, res)
{
    connection.query("SELECT * FROM `Rodents`",  {timeout: 40000} , function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        res.json(results);
    });                                                 
});

app.get('/GET/rodentsToFloors', function(req, res)
{
    connection.query("SELECT * FROM `RodentsToFloors`",  {timeout: 40000} , function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        res.json(results);
    });                                                 
});

app.post('/POST/aptFloors', function(req, res)
{
    var sql = "INSERT INTO AptFloors (floorNum, fireExits) VALUES (?,?)";
    var inserts = [req.body.floorNum, req.body.fireExits];
    connection.query(sql,inserts,function(error, results, fields){
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

app.post('/POST/aptOwners', function(req, res)
{
    var sql = "INSERT INTO AptOwners (firstName, lastName, ssn) VALUES (?,?,?)";
    var inserts = [req.body.firstName, req.body.lastName, req.body.ssn];
    connection.query(sql,inserts,function(error, results, fields){
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

app.post('/POST/apts', function(req, res)
{
    var sql = "INSERT INTO Apts (aptNum, sqFeet, floorNum) VALUES (?,?,?)";
    var inserts = [req.body.aptNum, req.body.sqFeet, req.body.floorNum];
    connection.query(sql,inserts,function(error, results, fields){
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

app.post('/POST/priceHistory', function(req, res)
{
    var sql = "INSERT INTO PriceHistory (sellerID, buyerID, aptNum, dateSale, price) VALUES (?,?,?,?,?)";
    var inserts = [req.body.sellerID, req.body.buyerID, req.body.aptNum, req.body.dateSale, req.body.price];
    connection.query(sql,inserts,function(error, results, fields){
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


app.post('/POST/rodents', function(req, res)
{
    var sql = "INSERT INTO Rodents (rodentName) VALUES (?)";
    var inserts = [req.body.rodentName];
    connection.query(sql,inserts,function(error, results, fields){
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

app.post('/POST/rodentsToFloors', function(req, res)
{
    var sql = "INSERT INTO RodentsToFloors (rodentID,floorNum) VALUES (?)";
    var inserts = [req.body.rodentID, req.body.floorNum];
    connection.query(sql,inserts,function(error, results, fields){
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