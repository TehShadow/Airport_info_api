const express = require('express')
const app = express();
const morgan = require('morgan')
const mongoose  = require("mongoose")

const airportRoutes = require("./api/routes/airport")

mongoose.connect('mongodb://localhost:27017/Airplane_tickets_app', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Oring, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods',"PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({});
    }
    next();
})


app.use('/airports',airportRoutes)

app.use((req,res,next)=>{
    const error = new Error("Not Found")
    error.status = 404;
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:{
            message : error.message
        }
    })
})

module.exports = app;