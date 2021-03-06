const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "fermine",
});

app.post("/dashboard/create", (req, res) => {
  const post_content = req.body.content;
  const post_img = req.body.img;


  db.query(
    "INSERT INTO posts (post_content, post_img) VALUES (?,?)",
    [post_content, post_img],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get('/articles', (req, res) => {
   db.query('SELECT * FROM posts', (err, result)=>{
     if(err){
       console.log(err)
       
     } else {
       res.send(result)
     }
   })
})

app.get('/brands', (req, res) => {
  db.query('SELECT * FROM brands', (err, result)=>{
    if(err){
      console.log(err)
      
    } else {
      res.send(result)
    }
  })
})



/* app.put('/update', (req, res) => {
const id = req.body.id;
const wage = req.body.wage;
db.query('UPDATE employees SET wage = ? WHERE id = ?', [wage, id], (err,result) => {
  if (err){
    console.log(err)
  } else {
    res.send(result);
  }
})
})



app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query('DELETE from employees WHERE id = ?', id, (err, result)=>{
    if (err){
      console.log(err)
    } else {
      res.send(result);
    }
  })
}) */

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});