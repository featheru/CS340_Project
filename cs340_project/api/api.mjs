// api.mjs
import express from 'express'; 
import dotenv from 'dotenv';
dotenv.config({path:'./api/.env'});

const PORT = process.env.PORT;
console.log(PORT);
console.log(process.env.PORT);

var app = express();

app.use(express.json());

// Add headers before the routes are defined  **Borrowed from Stack Overflow **
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9393');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

/* ROUTES */
app.get('/api', function(req, res)                 // This is the basic syntax for what is called a 'route'
    {
        //res.send("The server is running!")
        res.status(200).json({ownerID: "WHOCARES", firstName: "NO", lastName: "ONE", ssn: "65"});
        //,{ownerID: "WHOCARES2", firstName: "NO2", lastName: "ONE2", ssn: "652"}
        //res.status(200);
        //res.send(JSON.stringify({Thing1: 'Server hearing you loud and clear'}));      // This function literally sends the string "The server is running!" to the computer
    });                                         // requesting the web site.

/* LISTENER */
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});