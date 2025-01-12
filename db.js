const mongoose = require('mongoose');
//Define the MongoDb URL 
// const mongoUrl= process.env.MONGODB_LOCAL_URL;   //LOcal MongoDb uRL
const mongoUrl = process.env.MONGODB_URL;            //Server MongoDb URL
//MongoDB connection
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDb server');
    })
    .catch((err) => {
        console.log('MongoDb connection error:', err);
    });
//Get default connection (Mongoose maintains a default connection object representing the Mongo connection )
const db = mongoose.connection;
// Event listners
// db.on('connected',()=>{
//     console.log('Connected to MongoDb server');
// })
// db.on('error',(err)=>{
//     console.log('MongoDb conection error ', err);
// })
db.on('disconnected',()=>{
    console.log('MongoDb disconnected');
})
//Export the db connect
module.exports = db;