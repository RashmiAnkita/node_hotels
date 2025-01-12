const express = require('express');
const app = express();

const db = require('./db');                             // 1 db connection
const bodyParser =  require('body-parser');             // 3 data send by client that formated in request body
app.use(bodyParser.json());     // req.body



app.get('/', function(req, res){
    res.send('Welcome');
});

const personRoutes = require('./routes/personRoutes');
app.use('/person', personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu', menuRoutes);






app.listen(3000,()=>{
    console.log("listening on port 3000");
})