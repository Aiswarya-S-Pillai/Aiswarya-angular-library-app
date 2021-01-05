const express = require('express');

const ProductData = require('./src/model/Productdata');
const AuthorData = require('./src/model/Authordata');
const SignupData=require('./src/model/Signupdata');
//const user = require('./src/model/user');
const cors = require('cors');
var bodyparser=require('body-parser');
const jwt = require('jsonwebtoken')
var app = new express();
app.use(cors());
app.use(bodyparser.json());
username='admin';
password='1234';


function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
      return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
      return res.status(401).send('Unauthorized request')    
    }
    req.userId = payload.subject
    next()
  }

app.post('/insert',verifyToken,function(req,res){
   
    console.log(req.body);
   
    var product = {       
        productId : req.body.product.productId,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageUrl : req.body.product.imageUrl,
   }       
   var product = new ProductData(product);
   product.save();
});
////////////////////////////////////
app.post('/insertauthor',verifyToken,function(req,res){
   
  console.log(req.body);
 
var author = {       
            authorId : req.body.author.authorId,
            authorName : req.body.author.authorName,
            book : req.body.author.book,
            genre: req.body.author.genre,
            country : req.body.author.country,
            price : req.body.author.price,
            starRating : req.body.author.starRating,
            imageUrl : req.body.author.imageUrl,
}       
var author = new AuthorData(author);
author.save();
});
////////////////////////////////////////////
app.post('/insertsignup',function(req,res){
   
  console.log(req.body);
 
var signup = {       
            name : req.body.signup.name,
            email : req.body.signup.email,
            password : req.body.signup.password,
            confirmPassword: req.body.signup.confirmPassword,
            username : req.body.signup.username,
            
}       
var signup = new SignupData(signup);
signup.save();
});
///////////////////////////////////////
app.get('/products',function(req,res){
    
    ProductData.find()
                .then(function(products){
                    res.send(products);
                });
});
//////////////////////////////////////////
app.get('/signups',function(req,res){
    
  SignupData.find()
              .then(function(signups){
                  res.send(signups);
              });
});
////////////////////////////////////////

app.get('/authors',function(req,res){

AuthorData.find()
          .then(function(authors){
              res.send(authors);
          });
});

/////////////////////////////////
app.get('/:id',  (req, res) => {
  
  const id = req.params.id;
    ProductData.findOne({"_id":id})
    .then((product)=>{
        res.send(product);
    });
})


app.post('/login', (req, res) => {
    let userData = req.body
    
      
        if (!username) {
          res.status(401).send('Invalid Username')
        } else 
        if ( password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: username+password}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      
    })
// ////////////////////////////////////////////////
//////////////////////////////////////


//////////////////////////////////////////////////
    app.put('/update',(req,res)=>{
      console.log(req.body)
      id=req.body._id,
      productId= req.body.productId,
      productName = req.body.productName,
      productCode = req.body.productCode,
      releaseDate = req.body.releaseDate,
      description = req.body.description,
      price = req.body.price,
      starRating = req.body.starRating,
      imageUrl = req.body.imageUrl
     ProductData.findByIdAndUpdate({"_id":id},
                                  {$set:{"productId":productId,
                                  "productName":productName,
                                  "productCode":productCode,
                                  "releaseDate":releaseDate,
                                  "description":description,
                                  "price":price,
                                  "starRating":starRating,
                                  "imageUrl":imageUrl}})
     .then(function(){
         res.send();
     })
   })
   //////////////////////////////////////////////////
   app.get('/author/:id',  (req, res) => {

    const id = req.params.id;
    AuthorData.findOne({"_id":id})
    .then((author)=>{
      res.send(author);
    });
    })
    /////////////////////////////////////////
    
    /////////////////////////////////////////////////
    app.put('/updateauthor',(req,res)=>{
      console.log(req.body)
      id=req.body._id,
            authorId= req.body.authorId,
            authorName = req.body.authorName,
            book = req.body.book,
            genre= req.body.genre,
            country = req.body.country,
            price = req.body.price,
            starRating = req.body.starRating,
            imageUrl = req.body.imageUrl
      AuthorData.findByIdAndUpdate({"_id":id},
      {$set:{"authorId":authorId,
      "authorName":authorName,
      "book":book,
      "genre":genre,
      "country":country,
      "price":price,
      "starRating":starRating,
      "imageUrl":imageUrl}})
      .then(function(){
         res.send();
      })
      })
      //////////////////////////////////////////////
      

app.delete('/remove/:id',(req,res)=>{
   
     id = req.params.id;
     ProductData.findByIdAndDelete({"_id":id})
     .then(()=>{
         console.log('success')
         res.send();
     })
   })
     
// // ////////////////////////////////////////

app.delete('/removeauthor/:id',(req,res)=>{

  id = req.params.id;
  AuthorData.findByIdAndDelete({"_id":id})
  .then(()=>{
     console.log('success')
     res.send();
  })
  })





// // ////////////////////////////////////////////
app.listen(3000, function(){
    console.log('listening to port 3000');
});

