const express= require('express');
const router= express.Router();

const fetch=require('node-fetch')
// import fetch from 'node-fetch'
const User = require('../Scheema/userScheema')
const cors = require('cors');
const Service = require('../Scheema/serviceScheema');
let data=require('../data')
const uniqid=require('uniqid');
const bcrypt=require('bcryptjs')
const generateAuthtoken=require('../Scheema/userScheema');
const authenticateUser = require('../auth');
const checksum_lib=require('../paytm/paytm/lib/checksum')
const Rozarpay=require('razorpay');
const uniqueId=require('uniqid');
const Order = require('../Scheema/orderScheema');
const Preference=require('../Scheema/Preferences');
const Ticket =require('../Scheema/TicketScheema');
const Message = require('../Scheema/messageScheema');
const multer = require('multer');

const hbs=require('hbs')
// const axios = require('axios')
let mongoose=require('mongoose')
let path=require('path')
require('../Scheema/model')
let File=mongoose.model('file')

const Trashservice= require('../Scheema/Trashservicescheena')

const dotenv= require('dotenv')

dotenv.config({path:'.env'})

let crypto = require('crypto')

const nodeMailer=require('nodemailer');
const sendGridTransport=require('nodemailer-sendgrid-transport');
const TransactionLogs = require('../Scheema/TransactionLogsScheema');
const Service2 = require('../Scheema/Service2_scheema');
const Osservice = require('../Scheema/Service2_scheema');
const { default: axios } = require('axios');



let transporter=nodeMailer.createTransport(sendGridTransport({
    auth:{
        api_key:process.env.MAIL_KEY
    }
}))

// Rendering HBS for password reset email

  function renderHtml(res)
  {
    res.render('index', {
        post: {
            author: 'Janith Kasun',
            image: 'https://picsum.photos/500/500',
            comments: []
        }
    
});
  }



router.use(express.urlencoded({
    extended: false
  }));
const razorpay=new Rozarpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
})

router.post('/order',(req,res)=>{
    let amt=req.body.amount;
    let format=/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if(format.test(amt))
        {
            return res.status(400).send({resp:"Invalid Amount"})
        }

    let options={
        amount:req.body.amount*100,
        currency:"INR",
        receipt:uniqueId()
    }
    razorpay.orders.create(options,(err,order)=>{
       console.log("ORDER1", order)
        res.send(order)
    })
    
})


router.post('/register',async (req,res)=>{
    try
    {
        const {name,email,phone, password,cpassword}=req.body;

        let resp=await User.findOne({email:email})
        if(resp)
        {
            return  res.status(400).send({resp:"This email ID already exist"}) //done
        }
        if(phone.trim().length<10 || phone.trim().length>10)
        {
            return  res.status(400).send({resp:"Please enter valid phone number(without +91)"})
        }

        if(!isNaN(name.trim()))
        {
            return res.status(400).send({resp:"Invalid Name"})
        }
        let format=/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if(format.test(name))
        {
            return res.status(400).send({resp:"Invalid Name"})
        }

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if(!validateEmail)
        {
          return  res.status(400).send({resp:"Please enter valid emial ID"})
        }

        if(!name || !email || !phone || ! password || !cpassword)
        {
            return  res.status(400).send({resp:"Please fill all the inputs"}) 
        }
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
        
        if(!strongPassword.test(password))
        {
            return res.status(400).send({resp:"Password must contain at least one number and one uppercase and lowercase letter, special character and at least 8 or more characters"})
        }

        if(password!==cpassword)
        {
            return  res.status(400).send({resp:"Both passwords should be matched"}) //done
        }
        else
        {
            let result=new User({
                name,email,phone, password,cpassword
            })
            //hash password
            await result.save();
            transporter.sendMail({
                to:result.email,
                from:"keerthan@smmdigg.in",
                cc:"keerthanachar95@gmail.com",
                subject:"WELCOME",
                html:`<html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome</title>
                </head>
                
                <body>
                    <div class="forgrtPassdiv" style="border: 1px dotted black;padding:10px 10px 20px 10px;background-color:rgb(255, 255, 255);font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;border-radius: 5px;">
                        <h1 style="font-weight:900;">Welcome ${result.name},</h1>
                        <p style="padding: 0px 0px 20px 0px;">Thanks for sigining up with smmdigg!</p>
                        <p>Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place, Instantly.</p>
                        <p>🥇 We have Multiple Payment options Like GooglePay, PhonePay, PayTm, Cards accepted and automatically added into your Account.</p>
                        <p>😋 We provide 24*7 support to all our customers on the ticket system and also on WhatsApp</p>
                        <div style="padding: 10px 0px 0px 0px;">
                            <h3>How to get Started?</h3>
                                <p>1. Create an Free account</p>
                                <p>2. Add fund via Razorpay[Phonepay, GooglePay, PayTm, Cards, Etc available]</p>
                                <p>3. Place New order and wait for mins/hours.</p>
                                <p>4 .Order Auto Completetd by system.</p>
                        </div>
                        <div style="display: flex;flex-direction:column;justify-content:first baseline;">
                            <p class="" style="margin-bottom: 0px;padding:0px;">Thank you,</p>
                            <p style="margin-bottom: 0px;padding:0px;">smmdigg Team | <a href="https://www.smmdigg.in">smmdigg.in</a></p>
                            
                        </div>
                    </div>
                </body>
                </html>`
            })
            res.status(201).send(result)
        }
    }catch(err)
    {
        return  res.status(400).send({resp:"Unable to create account, Please check your internet connection!"})
    }
})

//Register without mail sending
router.post('/registerWithoutMail',async (req,res)=>{
    try
    {
        const {name,email,phone, password,cpassword}=req.body;

        let resp=await User.findOne({email:email})
        if(resp)
        {
            return  res.status(400).send({resp:"This email ID already exist"}) //done
        }
        if(phone.trim().length<10 || phone.trim().length>10)
        {
            return  res.status(400).send({resp:"Please enter valid phone number(without +91)"})
        }

        if(!isNaN(name.trim()))
        {
            return res.status(400).send({resp:"Invalid Name"})
        }
        let format=/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        if(format.test(name))
        {
            return res.status(400).send({resp:"Invalid Name"})
        }

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if(!validateEmail)
        {
          return  res.status(400).send({resp:"Please enter valid emial ID"})
        }

        if(!name || !email || !phone || ! password || !cpassword)
        {
            return  res.status(400).send({resp:"Please fill all the inputs"}) 
        }
        let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
        
        if(!strongPassword.test(password))
        {
            return res.status(400).send({resp:"Password must contain at least one number and one uppercase and lowercase letter, special character and at least 8 or more characters"})
        }

        if(password!==cpassword)
        {
            return  res.status(400).send({resp:"Both passwords should be matched"}) //done
        }
        else
        {
            let result=new User({
                name,email,phone, password,cpassword
            })
            //hash password
            await result.save();
          
            res.status(201).send(result)
        }
    }catch(err)
    {
        return  res.status(400).send({resp:"Unable to create account, Please check your internet connection!"})
    }
})

//end
    
router.post('/login',async(req,res)=>{
    try {
        const{email,password}=req.body;
                let user=await User.findOne({email})
               let hashedPasswrd = await bcrypt.compare(password,user.password)
               
                if(user.email)
                {
                    
                    if(hashedPasswrd)
                    {
                       
                        let gen_token=await user.generateAuthtoken();
                        res.cookie('USER_AUTH_LOG',gen_token)
                       
                        // transporter.sendMail({
                        //     to:user.email,
                        //     from:"keerthanachar95@gmail.com",
                        //     subject:"Login Successfull",
                        //     html:`Hii ${user.name}, <h1>Login successfull</h1> Thanks and Regards, keerthan owner/ceo of https`
                        // })
                        res.status(200).send(user)
                    }
                    else
                    {
                        res.status(400).send(user)
                    }
                }
                else
                {
                    res.status(400).send(user)
                }


    } catch (error) {
        res.status(400).send("Invalid Credentials")
    }
})
//bulk add
// router.post('/addServiceeee',async(req,res)=>{
   

//     for(let i=0;i<=services.service.length;i++)
//     {
//         let resp=await new Service({
//             service: services.service[i].service,
//             name: services.service[i].name,
//             category: services.service[i].category,
//             rate: services.service[i].rate,
//             min: services.service[i].min,
//             max: services.service[i].max,
//             type: "package",
//         desc: services.service[i].desc,
//         dripfeed: 0 
//         })
//         await resp.save();
//     }
    
//     res.status(201).send("Service Added to DataBase")
// })

router.post('/addServiceeee2',async(req,res)=>{
   
let len=data.serviceeee.length;

    // for(let i=0;i<=data.serviceeee.length;i++)
    // {
    //     let resp=await new Osservice({
    //         serviceNum: data.serviceeee[i].service,
    //         name: data.serviceeee[i].name,
    //         category: data.serviceeee[i].category,
    //         rate: data.serviceeee[i].rate,
    //         min: data.serviceeee[i].min,
    //         max: data.serviceeee[i].max,
    //         type: "package",
    //         desc: data.serviceeee[i].desc,
    //         dripfeed: 0 
    //     })
    //     await resp.save();
    // }
    // console.log(len)
    res.status(200).send({"hii":len})
})
router.get('/fetchService',async(req,res)=>{
    // let resp=await Service.distinct("category");


    // for https://officialsmm.in/ service
    let resp=await Osservice.distinct("category");

    res.status(200).send(resp)
})  
router.get('/fetchServicepage',async(req,res)=>{
  try {      
        // let resp=await Service.find({})
        let resp=await Osservice.find({})
        res.status(200).send(resp)
  } catch (error) {
      res.status(400).send("Unable to fetch service")
  }
}) 

router.get("/searchOrderbyid/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        console.log(id)
        let data=await Order.findById({_id:id});
        if(data)
        {
            res.status(200).send(data)
        }
        else
        {
            res.status(400).send({resp:"No result found"})
        } 
        
    } catch (error) {
        res.status(400).send("Unable to fetch order details.")
    }
})

router.get('/fetchServiceByDeatemodified',async(req,res)=>{
    // let resp=await Service.distinct("category");
 let resp=await Osservice.find().sort({createdAt:-1})
    res.status(200).send(resp)
}) 
//MODIFED ON LATEST
router.get('/fetchserviceName/:id',async(req,res)=>{

    let category=req.params.id;
    // const resp=await Service.find({category:category}); //backup
    const resp=await Osservice.find({category:category});
    res.status(200).send(resp)
})

// router.get("/foo",async (req,res)=>{
//  fetch("https://smmdigg.herokuapp.com/fetchServicepage")
//  .then(res=>res.json())
//  .then(json=>{
//      console.log(json[0])
//      res.send(json[0])
//  })
// })

router.get('/fetchName/:id',async(req,res)=>{
    let name=req.params.id;

    const resp=await Osservice.find({name:name});
    res.status(200).send(resp)
})
router.get('/logout',(req,res)=>{
    res.clearCookie('USER_AUTH_LOG');
    res.status(200).send("Logout success")
})
router.get('/authUser',authenticateUser,(req,res)=>{
    res.send(req.root_user)
})
router.get('/getprofileInfo',authenticateUser,(req,res)=>{
 
    res.send(req.root_user)
})

router.patch('/updateuser',authenticateUser,(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let {name,email,phone}=req.body;
    let resp= User.findByIdAndUpdate({_id:user_id},{name,email,phone},function(err,doc){
        if(err)
        {
         
        }
        else
        {
            res.status(200).send("updated")
        }
    });
    
})

router.post('/check-payment-status',authenticateUser,async(req,res)=>{
  try
  {
    let user_id=req.root_user[0]._id.toString();
    let prev_balance=req.root_user[0].balance.toString();
  
    let respp=await razorpay.payments.fetch(req.body.razorpay_payment_id);
    let {id,amount,method,email,captured}=respp
    console.log("PAYMENT DETAILS", respp)

    let savedData=await new TransactionLogs({
        paymentID:id,
        amount,
        method,
        email,
        status:captured,
        user:user_id
    })
    savedData.save();


        

        if(respp.status=="captured")
        {
            
            let balance=respp.amount/100;
            let total=Number(prev_balance)+Number(balance);
           
            
           
            let resp= User.findByIdAndUpdate({_id:user_id},{balance:total},function(err,doc){
                if(err)
                {
                   
                }
                else
                {    
                   return res.redirect('/transaction-status')
                //     res.redirect("/transaction-status")
                //   res.status(201).send("Payment successfull, balance updated and details stored in Data Base")
                   
                }
            }); 
        }
        else
        {
        
            res.status(400).send("Payment not successfull!");
        }
  }catch(err)
  {
    res.status(400).send("Something went wrong while adding fund");
  }

})
router.get("/getTransactionByID/:id",async(req,res)=>{
        try {
            let u_id=req.params.id;
            let resp=await TransactionLogs.find({user:u_id})
            res.status(200).send(resp);
        } catch (error) {
            res.status(400).send({resp:"No result found"});
        }
})

router.post('/createorder',authenticateUser,async(req,res)=>{
   try {
       
        let user_id=req.root_user[0]._id.toString();
        let {category,service,link,qty,price,total,ID}=req.body;
        
        console.log(req.root_user[0].balance.toString())
        if(req.root_user[0].balance.toString()<0)
        {
            return res.status(400).send({resp:"You have negetive balance!. we could not proceed further. Please contact support"})
        }
        
        
        if(!link)
        {
            return res.status(400).send({resp:"Please Enter the Link"})
        }
        if(qty<1)
        {
            return res.status(400).send({resp:"Please Enter the Minimum Quantity!"})
        }
        if(qty==0)
        {
            return res.status(400).send({resp:"Please Enter the Minimum Quantity!"})
        }
        if(!qty)
        {
            return res.status(400).send({resp:"Please enter the Quantity"})
        }
        if(total==0)
        {
            return res.status(400).send({resp:"Total charge must be non-zero!"})
        }

        function preB(x) {
            return Number.parseFloat(x).toFixed(2);
        }
        let prev_blnc=req.root_user[0].balance.toString();
        let Twodigit_prev_balance=preB(prev_blnc);
       

        function tot(x) {
            return Number.parseFloat(x).toFixed(2);
        }
        let TwodigitTotal=tot(total);
      
 
          if(Twodigit_prev_balance<TwodigitTotal)
          {
            return res.status(400).send({resp:"Insufficient Fund!"})
          }
   
        let updated_balance=Number(Twodigit_prev_balance)-Number(TwodigitTotal);

        let resp=await new Order({
            category,service,link,ID,qty,price,total,user:user_id
        })
        
        resp.save();
        let update_doc= User.findByIdAndUpdate({_id:user_id},{balance:updated_balance},function(err,doc)
        {
            if(err)
            {
              
            }
            else
            {
               
            }
        })
        
        res.status(201).send(resp)
   } catch (error) {
       res.status(400).send({resp:"Unable to create order!"})
   }
})

router.get('/fetchorder',authenticateUser,async(req,res)=>{
    try {
        let user_id=req.root_user[0]._id.toString();
        let resp=await Order.find({user:user_id}).sort({orderedAt:-1});
        res.status(200).send(resp)
    } catch (error) {
        console.log("Unable to fetch")
    }
    
})

router.get('/filterby_ordered',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({user:user_id,status:'Ordered'})
    res.status(200).send(resp)
})
router.get('/filterby_pending',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({user:user_id,status:'Pending'})
    res.status(200).send(resp)
})
router.get('/filterby_inprogress',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({user:user_id,status:'inprogress'})
    res.status(200).send(resp)
})
router.get('/filterby_cancelled',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({user:user_id,status:'cancelled'})
    res.status(200).send(resp)
})
router.get('/filterby_cancelledandrefunded',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({user:user_id,status:'cancelledandferunded'})
    res.status(200).send(resp)
})
router.get('/completed',authenticateUser,async(req,res)=>{
    let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({user:user_id,status:'completed'})
    res.status(200).send(resp)
})
router.get("/fetchallUsers",async(req,res)=>{
   try {
    let resp=await User.find().sort({createdAt:-1})
    res.status(200).send(resp)
   } catch (error) {
       res.status(400).send("unable to fetch all users")
   }
})

router.get("/fetchAllorders1",async(req,res)=>{
    try {
        let resp=await Order.find().sort({orderedAt:-1})
        res.status(200).send(resp)
    } catch (error) {
        res.status(400).send("unable to fetch all oredrs")
    }
 })

 router.get("/fetchTicketBystatus/:id",authenticateUser,async(req,res)=>{
     try {
        let status=req.params.id
        let resp= await Ticket.find({status});
        res.status(200).send(resp)
     } catch (error) {
         res.status(400).send("ticket not found")
     }
 })


 router.get('/fetchAllorders/:id',authenticateUser,async(req,res)=>{
     let ord_status=req.params.id.toString();
     console.log("ORDER ID", )
    // let user_id=req.root_user[0]._id.toString();
    let resp= await Order.find({status:ord_status})
    res.status(200).send(resp)
})
router.get('/searchuserByID/:id',authenticateUser,async(req,res)=>{
   try {
    let user_id=req.params.id

    // let resp= await User.findOne({'name': {'$regex': `${user_id}`, '$options': 'i'}})
    // let resp= await User.findOne({$or: [{'name': {'$regex': `${user_id}`, '$options': 'i'}},{'email': {'$regex': `${user_id}`, '$options': 'i'}}]})
    resp= await User.findOne({$or: [{name:`${user_id}`},{email:`${user_id}`},{_id:`${user_id}`}]})
    if(!resp)
    {
      return  res.status(400).send("No users found")
    }
    res.status(200).send([resp])
   } catch (error) {
       res.status(400).send(["User not found"])
       
   }
})

router.get('/searchUserbyEmail/:id',authenticateUser,async(req,res)=>{
    try {
     let user_id=req.params.id
 
     // let resp= await User.findOne({'name': {'$regex': `${user_id}`, '$options': 'i'}})
     // let resp= await User.findOne({$or: [{'name': {'$regex': `${user_id}`, '$options': 'i'}},{'email': {'$regex': `${user_id}`, '$options': 'i'}}]})
     resp= await User.findOne({email:user_id})
     if(!resp)
     {
       return  res.status(400).send("No users found")
     }
     res.status(200).send([resp])
    } catch (error) {
        res.status(400).send(["User not found"])
        
    }
 })

router.get('/ad_filterby_ordered',authenticateUser,async(req,res)=>{
    let resp= await Order.find({status:'Ordered'})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    res.status(200).send(resp)
})
router.get('/ad_filterby_cacelandrefunded',authenticateUser,async(req,res)=>{
    let resp= await Order.find({status:'cancelledandferunded'})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    res.status(200).send(resp)
})
router.get('/ad_filterby_pending',authenticateUser,async(req,res)=>{
    let resp= await Order.find({status:'Pending'})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    res.status(200).send(resp)
})
router.get('/ad_filterby_progress',authenticateUser,async(req,res)=>{
    let resp= await Order.find({status:'inprogress'})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    res.status(200).send(resp)
})
router.get('/ad_filterby_completed',authenticateUser,async(req,res)=>{
    let resp= await Order.find({status:'completed'})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    res.status(200).send(resp)
})
router.get('/ad_filterby_cancelled',authenticateUser,async(req,res)=>{
    let resp= await Order.find({status:'cancelled'})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    res.status(200).send(resp)
})

router.get('/findbyOrderID/:id',async(req,res)=>{
    try {
        if(req.params.id=="undefined")
        {
            return
        }
        let order_id=req.params.id
        let resp= await Order.findById({_id:order_id})
        if(!resp)
        {
            return res.status(400).send("no result found")
        }

    res.status(200).send(resp)
    } catch (error) {
        console.log("Error in Modals.jsx")
    }
})

router.post('/updateOrder/:id',authenticateUser,(req,res)=>{
    let or_id=req.params.id;
    let status=req.body.status;
    let resp=  Order.findByIdAndUpdate({_id:or_id},{status},function(err,doc){
        if(err)
        {
            
        }
        else
        {
            res.status(200).send("doc updated")
        }
    })
   
})

router.post('/updateOrderstatusAndBalance/:id',(req,res)=>{
    let or_id=req.params.id;
    let status=req.body.status;
    let user=req.body.user;
    let price=req.body.price;
    let resp=  Order.findByIdAndUpdate({_id:or_id},{status},function(err,doc){
        if(err)
        {
            console.log("error")
        }
        else
        {
            let result=User.findById({_id:user}, function(errs,users){
                if(errs)
                {
                    console.log("error while fetching usr details");
                }
                else
                {
                    let prev_bal=users.balance;
                    let updated_bal=prev_bal+price;
                    
                    let final=User.findByIdAndUpdate({_id:user},{balance:updated_bal},function(err,doc){
                        if(err)
                        {
                            console.log("error");
                        }
                        else
                        {
                            res.status(200).send("status updated and Refunded")
                        }
                    })

                    
                }
            })
        }
    })
})
router.post('/updateCurrency',authenticateUser,async(req,res)=>{
    let curr=req.body.currency;
    let resp= await Preference.findByIdAndUpdate({_id:"6176aca0bc02494fcdf1b83e"},{currency:curr},function(err,doc){
        if(err)
        {
           
        }
        else
        {
            res.status(200).send(doc)
        }
    })
})

router.post("/createManualPaymnt",async(req,res)=>{
    let {userid , paymentid, amount , method , email , status}=req.body;
    let result=await new TransactionLogs({
        paymentID:paymentid,
        amount,
        method,
        email,
        status,
        user:userid
    })
    result.save();
    res.status(201).send("Payment details added successfully.")
})


router.get('/fetchcurrency',authenticateUser,async(req,res)=>{
   
    let resp= await Preference.findById({_id:"6176aca0bc02494fcdf1b83e"})
   
    res.status(200).send(resp)
})


router.get('/fetchservicebynumber/:id',async(req,res)=>{
    let ser_id=req.params.id
    console.log(ser_id)
    let resp= await Osservice.find({_id:ser_id})
    if(!resp)
    {
        return res.status(400).send("no result found")
    }
    console.log("SERVICES", resp)
    res.status(200).send(resp)
})

router.get('/searchsingleuserByID/:id',authenticateUser,async(req,res)=>{
    try {
     let user_id=req.params.id
    
 
     // let resp= await User.findOne({'name': {'$regex': `${user_id}`, '$options': 'i'}})
     let resp= await User.findById({_id:user_id})
     if(!resp)
     {
       return  res.status(400).send("No users found")
     }
     res.status(200).send([resp])
    } catch (error) {
        res.status(400).send(["User not found"])
        
    }
 })

 router.delete("/deleteOrder/:id",authenticateUser,async(req,res)=>{
    let ord_id=req.params.id;
    let resp=await Order.deleteOne({_id:ord_id});
    res.status(200).send(resp);
 })

 router.put("/update-user/:id",authenticateUser,(req,res)=>{
     let usr_id=req.params.id;
     let role=req.body.role;
     let balance=req.body.up_balance;
   

     let resp=User.findByIdAndUpdate({_id:usr_id},{role,balance},function(err,doc){
         if(err)
         {
             
         }
         else
         {
          
             res.status(200).send(doc)
         }
     })
 })
 router.put("/updateService/:id",authenticateUser,(req,res)=>{
    let serv_id=req.params.id;
    let {name,category,rate,min,max,desc}=req.body;
console.log("NMAE", name)

    let resp=Osservice.findOneAndUpdate({_id:serv_id},{name,category,rate,min,max,desc},function(err,doc){
        if(err)
        {
             
        }
        else
        {
          
            res.status(200).send(doc)
        }
    })
})

router.delete("/deleteservice/:id",authenticateUser,async(req,res)=>{
    let serv_id=req.params.id;
    let resp=await Osservice.deleteOne({_id:serv_id});
   console.log("Deleted service", resp)
    res.status(200).send(resp);
 })
 router.delete("/deleteUserr/:id",authenticateUser,async(req,res)=>{
    let user_id=req.params.id;
    let resp=await User.deleteOne({_id:user_id});
   console.log("Deleted user", resp)
    res.status(200).send(resp);
 })

 router.delete("/deleteCategoryyy/:id",authenticateUser,async(req,res)=>{
    let category_name=req.params.id;
    let resp=await Osservice.deleteMany({category:category_name});
   console.log("Deleted service", resp)
    res.status(200).send(resp);
 })
 

 /* --------------------------------- TICKETS -------------------------------- */
 router.post("/submitTicket",authenticateUser,async(req,res)=>{
  
       try {
            let user=req.root_user[0]._id.toString();
            let role=req.root_user[0].role.toString();
            let name=req.root_user[0].name.toString();
            let {subject,request,orderID,desc,payment,transactionID,screenshot}=req.body;
            let resp=await new Ticket({
                subject,
                request,
                orderID,
                payment,
                transactionID,
                user,
                screenshot,
                role,
                name 
            })
            resp.descs.push(desc)

           

            resp.save();
            res.status(201).send(resp)
       } catch (error) {
           res.status(400).send("Unable to create ticket")
       }
 })

 const storage = multer.diskStorage({
    
    destination:"./client/build/images",
    filename: function(req, file, cb){
       cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
    }
    
 });

 const upload = multer({
    storage: storage,
    limits:{fileSize: 1000000},
 }).single("myfile");

 const obj =(req,res) => {
    try {
    upload(req, res ,() => {   
            let {subject,desc}=req.body;

            let name= req.root_user[0].name.toString();
            let role= req.root_user[0].role.toString();
            let user=req.root_user[0]._id.toString();

            const file = new File();
            file.meta_data = req.file;
            file.save().then(()=>{
        

            if(req.file==undefined || req.file.originalname==undefined)
            {
                return res.status(400).send("This file is not supported")
            }

            let screenshot=req.file.originalname;
            let path1=req.file.path;
         
            if(req.file.mimetype=="image/png" || req.file.mimetype=="image/jpeg" || req.file.mimetype=="image/jpg")
            {
                crateticket(subject,desc,screenshot,role,user,name,path1);
            }
            else
            {
                return res.status(400).send("This file is not supported")
            }
            res.status(201).send('ticket created')
     
            })
        });//up
       } catch (error) 
       {
           res.status(400).send("Unable to create ticket")
       }
       
    
 }

 async function crateticket(subject,desc,screenshot,role,user,name,path1)
 {
    
     let resp=await new Ticket({
         subject,desc,screenshot:screenshot,role,user,name,path:path1
     })
     resp.descs.push(desc)

     resp.save();
     
 }

router.post('/upload',authenticateUser,obj,(req,res)=>{
    let user=req.root_user[0]._id.toString();
    let role=req.root_user[0].role.toString();
    let name=req.root_user[0].name.toString();

   
});


router.post("/sendMessage/:id",authenticateUser,async(req,res)=>{
   try {
    let desc=req.body.desc;
    let id=req.params.id;
       if(!desc)
       {
          return res.status(400).send({resp:"Message cannot be Empty!"})
       }
      
        let resp1=await Ticket.findOneAndUpdate({_id:id},{$push:{descs:desc}    
        });
        res.status(201).send(resp1)
  
   } catch (error) {
       res.status(400).send("Unable to send mesage")
   }
})


router.post("/sendMessagebyAdmin/:id",authenticateUser,async(req,res)=>{
    try {
        let desc=req.body.desc;
        let tik_id=req.params.id;
        let resp1=await Ticket.findOneAndUpdate({_id:tik_id},{$push:{descs:desc}, status:"Answered",
    });
        res.status(201).send(resp1)
   
    } catch (error) {
        res.status(400).send("Unable to send mesage")
    }
 })
      
      


 router.get("/fetchTickets",authenticateUser,async(req,res)=>{
     let user=req.root_user[0]._id.toString();
     let resp= await Ticket.find({user}).sort({date:-1})
     res.status(200).send(resp);
 })
 router.get("/fetchTicket/:id",authenticateUser,async(req,res)=>{
    let user=req.root_user[0]._id.toString();
    let ticket=req.params.id;

    let resp= await Ticket.find({_id:ticket});
    res.status(200).send(resp);
})


router.get("/fetchMessage/:id",authenticateUser,async(req,res)=>{
    let user=req.root_user[0]._id.toString();
    let ticket=req.params.id;

    let resp= await Message.find({ticketid:ticket});
    res.status(200).send(resp);
})

router.get("/fetchAllTickets",authenticateUser,async(req,res)=>{
    // let user=req.root_user[0]._id.toString();
    // let ticket=req.params.id;
    let resp= await Ticket.find().sort({date:-1});
    res.status(200).send(resp);
})
router.get("/fetchtClosedTicket",authenticateUser,async(req,res)=>{
    // let user=req.root_user[0]._id.toString();
    // let ticket=req.params.id;
    let resp= await Ticket.find({"status":"Closed"})
    res.status(200).send(resp);
})
router.get("/fetchNotAnsaweredTicket",authenticateUser,async(req,res)=>{
    // let user=req.root_user[0]._id.toString();
    // let ticket=req.params.id;
    let resp= await Ticket.find({"status":"Not Answered"})
    res.status(200).send(resp);
})
router.get("/getTrashservices",authenticateUser,async(req,res)=>{
    // let user=req.root_user[0]._id.toString();
    // let ticket=req.params.id;
    let resp= await Trashservice.find().sort({date:-1});
    res.status(200).send(resp);
})

router.post("/changecategoryByad/:id",authenticateUser,async(req,res)=>{
    let act_cat=(req.body.category);
    let to_Change=(req.params.id);

    let resp=await Osservice.updateMany({category:act_cat},{category:to_Change});
        // ,function(err,doc){
        // if(err)
        // {
        //     console.log(err)
        // }
        // else
        // {
            res.status(200).send(resp)
        // }
    // })
})

router.get("/fetchcategoryAd/:id",authenticateUser,async(req,res)=>{
    
    let cate=req.params.id;
    let resp= await Service.find({category:cate})
    console.log(resp);
    res.status(200).send(resp);
})
router.post("/createServiceform1",authenticateUser,async(req,res)=>{
    try {
        
            let{name,category,rate,min,max,desc,dripfeed,type,serviceNum}=req.body;
            console.log("CATEGORY", category)
          
            // let service=uniqid('service-num-');
        let resp=await new Osservice({
            name,category,rate,min,max,desc,dripfeed,type,serviceNum
        })
        resp.save();
        res.status(201).send(resp)
    } catch (error) {
        res.status(400).send("Unable to create service")
    }
})
router.post("/checkAvailablityID",async(req,res)=>{
  try {
    let ID=req.body.ID;
    console.log(ID)
    let resp=await Osservice.findOne({serviceNum:ID});
    if(resp)
    {
        res.status(200).send("ID Already Exist.");
    }
    else
    {
        res.status(201).send("Choose it")
    }
  } catch (error) {
      console.log(error)
      res.status(400).send("Unable to find ID")
  }
 
})

router.post("/createTrashService",authenticateUser,async(req,res)=>{
    try {
        
            let{name,category,rate,min,max,desc,dripfeed,type,ID}=req.body;
        
        let resp=await new Trashservice({
            name,category,rate,min,max,desc,dripfeed,type,ID
        })
        resp.save();
        console.log("Trash service", resp)
        res.status(201).send(resp)
      
    } catch (error) {
        res.status(400).send("Unable to create Trash service")
    }
})

router.post("/createServiceform2",authenticateUser,async(req,res)=>{
    try {
            let{name,category3,rate,min,max,desc,dripfeed,type,serviceNum}=req.body;
            let service=uniqid('service-num-');
            let resp=await new Osservice({
            service,name,category:category3,rate,min,max,desc,dripfeed,type,serviceNum
        })
        resp.save();
        res.status(201).send(resp)
    } catch (error) {
        res.status(400).send("Unable to create service")
    }
})
router.put('/updateTicketstatus/:id',authenticateUser,(req,res)=>{
    try {
        let id=req.params.id
        let status=req.body.status;
        let resp=Ticket.findByIdAndUpdate({_id:id},{status:status},function(err,doc){
        if(err)
        {
         
        }
        else
        {
            res.status(200).send(doc)
        }
    })
    } catch (error) {
        res.status(400).send("not able to update status")
    }
})
// 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

router.post("/forgot-password",(req,res)=>{
   try {
        let html_path=(path.join(__dirname,'../client/build/'));
        crypto.randomBytes(32,(err,buffer)=>{
        if(err)
        {
           return console.log(err)
        }
        let token=buffer.toString("hex");
         User.findOne({email:req.body.email}).then(user=>{
            if(!user)
            {
                console.log("PATH")
                
                return res.status(422).send("User not exist with email address")
            }
            user.resetToken=token;
            user.expireToken=Date.now() + 3600000;
            user.save().then((resul)=>{
                transporter.sendMail({
                    to:resul.email,
                    from:"keerthan@smmdigg.in",
                    subject:"Password Reset | SMMDIGG",
                    // html:`Hii ${resul.name}, Please click this below link to reset your password. <a href="https://www.smmdigg.in/v1.1/update-password/${token}">CLICK HERE TO SET NEW PASSWORD</a> Thanks and Regards,
                    // www.smmdigg.in`
                    html: `<html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    </head>
                    
                    <body>
                        <div class="forgrtPassdiv" style="border: 1px dotted black;padding:10px 10px 20px 10px;background-color:rgb(255, 255, 255);font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;border-radius: 5px;">
                            <h2 style="font-weight:900;">Hello ${resul.name}</h2>
                            <p style="font-weight: 700;">A request has been received to change the password for your smmdigg account.</p>
                            <a href="https://smmdigg.herokuapp.com/v1.1/update-password/${token}" style="background-color: rgb(4, 5, 5);color:white;font-size:15px;border-radius:3px;padding:7px 17px 7px 17px;text-decoration: none;" class="btn">Reset Password</a>
                            <p class="alertMsg">If you did not initiate this request, Please ignore this Email.</p>
                    
                            <div style="display: flex;flex-direction:column;justify-content:first baseline;">
                                <p class="" style="margin-bottom: 0px;padding:0px;">Thank you,</p>
                                <p style="margin-bottom: 0px;padding:0px;">smmdigg Team | <a href="https://www.smmdigg.in">smmdigg.in</a></p>
                                
                            </div>
                        </div>
                    </body>
                    </html>`
                })
                res.status(201).send("Password Reset mail sent") 
            })  
            // res.status(200).send("Password Reset mail sent") 
    })
})
   }catch(err)
   {
       res.status(400).send("unable to send Email")
   }

})

router.post("/new-password",(req,res)=>{
try {
    let password=req.body.password;
let cpassword=req.body.cpassword;
let token=req.body.token;

 User.findOne({resetToken:token, expireToken:{$gt:Date.now()}}).then(user=>{
    // console.log("user", user)
    // if(!user)
    // {
    //     return res.status(422).send("Session expired, Please Retry")
    // }
     bcrypt.hash(password,12).then(hasedpasswd=>{
         user.password=password;
         user.resetToken=undefined;
         user.expireToken=undefined;
         user.save().then((saveduser)=>{
            res.status(200).send(saveduser)
         })
     }) 
 })
} catch (error) {
    res.status(400).send("unable to reset password")
}

})

router.get('/getPaymentlists',authenticateUser,async(req,res)=>{
    // 61b4770fbdcb97946f6cb19f
  try {
    let user=req.root_user[0]._id.toString();
    let result=await TransactionLogs.find({user}).sort({createdAt:-1})
    res.status(200).send(result);
  } catch (error) {
      res.status(400).send('Unable to fetch Transaction details')
  }
})

router.get('/getallPaymentlists',async(req,res)=>{
    
  try {
    
    let result=await TransactionLogs.find({}).sort({createdAt:-1})
    res.status(200).send(result);
  } catch (error) {
      res.status(400).send('Unable to fetch Transaction details')
  }
})

router.post('/changePasswordByAdmin',async(req,res)=>{
    console.log("user", req.body.user)
    console.log("passwd", req.body.newpassword)


    Hashed_password=await bcrypt.hash(req.body.newpassword,12);
    let usr= User.findByIdAndUpdate({_id:req.body.user},{password:Hashed_password},function(err,doc){
        if(err)
        {
            res.status(400).send("Unable to update password")
        }
        else
        {
            res.status(200).send("New password updated")
        }
    })
})
router.post("/createOrderforUser", async(req,res)=>{
    try {
            let {postCategory,postservice,link,rate,qty,Total,user}=req.body;

            let bal=await User.findById({_id:user});
            let old_balance=bal.balance;
            let updated_balance=Number(old_balance)-Number(Total);
            
            if(old_balance<Total)
            {
                return res.status(401).send("Insuffuciant fund!");
            }

        let resp=new Order({
            category:postCategory,service:postservice,link,price:rate,qty,total:Total,user
        })
        console.log("NEW ORDER", resp)
        resp.save();
        let update_doc= User.findByIdAndUpdate({_id:user},{balance:updated_balance},function(err,doc)
        {
            if(err)
            {
              
            }
            else
            {
               
            }
        })
        res.status(201).send("Order created");
    } catch (error) {
        res.status(400).send("unable to create order")
    }
})


module.exports=router;

// https://cors-anywhere.herokuapp.com/https://followerskart.in/api/v1/?key=uuqVyF1wgnqgrBH3IDXf41NRlS8S4PhM&action=services