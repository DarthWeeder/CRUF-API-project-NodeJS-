//import features of express and mysql from their respective modules
import express from "express"
import mysql from "mysql"
//we initialise our application which will entirely be the express function
const app = express();

//this snippet is used to establish connection with the database
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"test"
})

//the app.get commmand listens for an incoming https request and then through the res.json gives the apt output on the terminal
app.get("/", (req,res)=>{
    res.json("Hello this is the backend")
})

//this app.listen command establishes the connection with the backend
//nodemon is used as allows to make asynchornus changes to the code which reflect on the functionality
app.listen(8800, ()=>{
    console.log("Connected to the backend!")
})
