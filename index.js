//import features of express and mysql and cors from their respective modules
import express from "express"
import mysql from "mysql"
import cors from "cors";
//we initialise our application which will entirely be the express function
const app = express();
app.use(cors());
app.use(express.json());

//this snippet is used to establish connection with the database
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"test"
})

//this command avoids the error and hence data can directly be sent to the express server from the client
app.use(express.json());


//the app.get commmand listens for an incoming https request and then through the res.json gives the apt output on the terminal
app.get("/", (req,res)=>{
    res.json("Hello this is the backend")
})

//another app.get command is for returning all books in the database through the api using the sql queries
app.get("/books",(req,res)=>{
    const q = "SELECT * FROM books" //this is the sql query which goes through the req and the resulting output is stored in the res
    //this db.query will help us return the data from the database and will return either an error or the database
    db.query(q,(err,data)=>{
        if (err) return res.json(err)
        return res.json(data)
    })
})

//this app.post command is for the create operaton of the API where we can enter/insert the data of a new book into the database using sql queries
app.post("/books", (req, res) => {
    const q = "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)"; //the INSERT query goes through the req and the resulting output stored in res
    
    //the command in the constt values are the ones used in postman API services which help us generate an HTTPS request easily without reloading the website again, hence helps us take user input
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
    //this db.query will help us return the data from the database which has been been inserted or will return an error otherwise 
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  //this app.delete command is for the delete operaton of the API where we can delete the data of an existing book from the database using sql queries
  app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    //this db.query will help us return the data from the database which has been been deleted or will return an error otherwise 
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  //this app.put command is for the update operaton of the API where we can update the data of an existing book from the database using sql queries
  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    //the command in the constt values are the ones used in postman API services which help us generate an HTTPS request easily without reloading the website again, hence helps us take user input
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];

    //this db.query will help us return the data from the database which has been been updated or will return an error otherwise 
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  

//this app.listen command establishes the connection with the backend
//nodemon is used as allows to make asynchornus changes to the code which reflect on the functionality
app.listen(3306, ()=>{
    console.log("Connected to the backend!")
})
