const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const { createPostService } = require("./posts/post-service");
const { createPostController } = require("./posts/post-controller");
const { LOG } = require("./common/logger");
const { createUserService } = require("./user/user-service");
const { createUserController } = require("./user/user-controller");
const { createAuthService } = require("./common/security/auth-service");
const { createAuthController } = require("./common/security/auth-contoller");
const { createAuthenticationMiddleware } = require("./common/security/auth-midleware");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "fermine",
});

const authService = createAuthService(db);
const authController = createAuthController(authService);
app.use('/auth', authController);


const auth = createAuthenticationMiddleware(authService);

const postService = createPostService(db);
const postController = createPostController(auth, postService);
app.use('/posts', postController);

const userService = createUserService(db);
const userController = createUserController(userService);
app.use('/users', userController);

app.post("/dashboard/create", (req, res) => {
  const post_content = req.body.content;
  const post_img = req.body.img;


  db.query(
    "INSERT INTO posts (post_content, post_img) VALUES (?,?)",
    [post_content, post_img],
    (err, _) => {
      if (err) {
        res.status(500).send({
          message: "technical exception"
        });
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
       res.status(500).send({
        message: "technical exception"
      });
     } else {
       res.send(result)
     }
   })
})

app.get('/brands', (req, res) => {
  db.query('SELECT * FROM brands', (err, result)=>{
    if(err){
      console.log(err)
      res.status(500).send({
        message: "technical exception"
      });
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

const PORT = 3001;

app.listen(PORT, () => {
  LOG.info(`Server running on port ${PORT}`)
});