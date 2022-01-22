const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");

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

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const passwordHash = bcrypt.hashSync(password, 10);
  const userRole = 'user'



  db.query(
    "INSERT INTO users (user_email, user_password, user_role) VALUES (?,?,?)",
    [email, passwordHash,userRole],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("User created");
      }
    }
  );
});


app.post('/login', (req,res)=>{
  const email = req.body.email
  const password = req.body.password;

  db.query("SELECT * FROM users WHERE email = ? AND password = ?",
  [email, password],    
  (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("User logged");
    }
  } )


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