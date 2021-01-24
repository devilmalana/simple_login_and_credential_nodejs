'use strict';
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// secret key
const accessTokenSecret = 'secretkeytokenaccess';
const refreshTokens = [];
//expired token
const expired = '1h';

// import function from another file
const db = require("./utils/config");
let dir_path = require("./utils/config");
dir_path = dir_path.path;
const md5 = require('md5');

// post login
app.post(dir_path+'/login', (req, res) => {
    console.log("testss");
    let email =  req.body.email;
    let password = md5(req.body.password);
    
    db.get_login(email, password, function(results){
      if (results.length!=0) {
          const accessToken = jwt.sign({ email: results[0].email, role: results[0].role, id:results[0].id }, accessTokenSecret, { expiresIn: expired });
          refreshTokens.push(accessToken);
  
          res.json({
              accessToken,
          });
      } else {
          res.send('Username or password incorrect');
      }
    });  
  });
  const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
  
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
  
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
  };
  
  
  //get credential
app.get(dir_path+'/credential', (req, res) => {
    let token = req.headers.authorization;
    if(token){
        db.token_decode(token,function(results){
            token = results;
            let sql = "SELECT * FROM users where id="+token.id
            db.query(sql,function(result){
                let x = [];
                let data = {
                    name:result[0].name,
                    email:result[0].email,
                }
                res.json({"status": 200,"results":data});
            });
        });
    }else{
        res.sendStatus(401);
    }
});



//Server listening run on port 3000
app.listen(3000,() =>{
    console.log('Server started on port 3000...');
});