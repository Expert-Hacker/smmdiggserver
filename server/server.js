const { urlencoded } = require('express');
const hbs=require('hbs')
const express = require('express')
const cors=require('cors')
// import express from 'express'
const path=require("path");
const app= express();
const port= process.env.PORT || 5000;
const router=require('./Routers/router.js')
require('./Database/db.js')
const cookieParser = require('cookie-parser');
const fileUpload=require('express-fileupload');
const bodyParser = require('body-parser');
const { ppid } = require('process');
const { default: axios } = require('axios');


app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(cors({
  origin: '*'
}));
// app.use(function(req,res,next){
//   res.header("Access-Control-Allow-Origin", "*")
//   res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
//   next();
// })

//for HBS template engine for mails
app.set('view engine','hbs');

// app.get('/', function (req, res) {
//     res.render('index', {
//         post: {
//             author: 'Janith Kasun',
//             image: 'https://picsum.photos/500/500',
//             comments: []
//         }
//     });
// });





app.use(cookieParser())

app.use(express.json())
//router middleware
app.use(router);
app.use(bodyParser.json())
app.use(fileUpload())


//To server static images for user Uploaded when creating a ticket
let pa=path.join(__dirname,'/client/build')
app.use('/images',express.static(pa))




	//  for priduction
     app.use(express.static("client/build"));

     app.get("*",(req,res)=>{
         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
     })
     
//for Heroku hosting
     if(process.env.NODE_ENV=="production")
     {
        let path12=path.join(__dirname,'/client/build')
         app.use(express.static(path12))
     }


app.listen(port,()=>{
    console.log(`server is Running at Port ${port}`)
})
