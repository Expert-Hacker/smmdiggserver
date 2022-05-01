import React, { useEffect, useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import Header_home from './Header_home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField,Button, Paper, Checkbox} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import Helmet from 'react-helmet';
import '../../src/login.css'
import user from '../../src/images/user.png'


import emaill from '../../src/images/email.png'
import pass1 from '../../src/images/key.png'
import padlock from '../../src/images/padlock.png'
import Loading from '../Loading/Loading';
let validator = require("email-validator");


function Login() {
    const[disable,setDisable]=useState(false)
  const[loading,setLoading]=useState(false);
    const[emilerr,setemailerr]=useState(false)
    const[passerr,setpasserr]=useState(false)
    const history=useHistory()
    // const[input,setInput]=useState({
    //     email:"",
    //     password:""
    // })
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
    useEffect(() => {
       

        //   setInput({...input,["email"]:(getCookie("email"))})
        //   setInput({...input,["password"]:(getCookie("password"))})

        setEmail(getCookie("email"))
        setPassword(getCookie("password"))
    }, []);
    function getCookie(ema,pass) {
        // Split cookie string and get all individual name=value pairs in an array
        var cookieArr = document.cookie.split(";");
    
        // Loop through the array elements
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
    
            /* Removing whitespace at the beginning of the cookie name
            and compare it with the given string */
            if(ema == cookiePair[0].trim()) {
                // Decode the cookie value and return
                return decodeURIComponent(cookiePair[1]);
            }
            if(pass == cookiePair[1].trim()) {
                // Decode the cookie value and return
                return decodeURIComponent(cookiePair[1]);
            }
        }
    
        // Return null if not found
        return null;
    }
    
    // let name, value;
    function handleEmailChange(e)
    {
        // name=e.target.name;
        // value=e.target.value
        // setInput({...input,[name]:value})
        setEmail(e.target.value)
    }
    function handlePassChange(e)
    {
        // name=e.target.name;
        // value=e.target.value
        // setInput({...input,[name]:value})
        setPassword(e.target.value)
    }
  
    async function login(e)
   {
     
        localStorage.setItem('login_status',true)
        // let {email,password}=input;
        if(!email)
        {
            setemailerr(true)
        }
        if(!password)
        {
            setpasserr(true)
        }
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if(!validateEmail(email))
        {
            setemailerr(true)
        }
        if(validator.validate(email))
        {
                try {
                    setDisable(true)
                    setLoading(true)
                    let res= await fetch('/login',{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            email,password
                        })
                    })
                    
                    let resp= await res.json();
              
                    if(res.status==200 && resp.role=="user")
                    {
                        // document.cookie="email="+email+";path=http://localhost:3000/login"
                        // document.cookie="password="+password+";path=http://localhost:3000/login"
                        document.cookie = "email" + "=" + encodeURIComponent(email);
                        document.cookie = "password" + "=" + encodeURIComponent(password);

                        setLoading(false)
                        toast.success('Login Successfull!', {
                            position: "bottom-center",
                            autoClose: 3500,
                            draggable: false,
                            }); 
                            setTimeout(function()
                            {
                            history.push("/v1.1/dashboard")
                            },4000)
                    }
                    if(res.status==200 && resp.role=="admin")
                    {

                        document.cookie = "email" + "=" + encodeURIComponent(email); 
                        document.cookie = "password" + "=" + encodeURIComponent(password);

                        setLoading(false)
                        toast.success('Login Successfull!', {
                            position: "bottom-center",
                            autoClose: 3500,
                            draggable: false,
                            }); 
                            setTimeout(function()
                            {
                            history.push("/v1.1/admin-dashboard")
                            },4000)
                    }
                    if(res.status==400)
                    {
                        setLoading(false)
                        setDisable(false)
                        toast.error('Invalid Credentials!', {
                            position: "bottom-center",
                            autoClose: 3500,
                            draggable: false,
                            }); 
                    }
                } catch (error) {
                    setLoading(false);
                    setDisable(false)
                    toast.error('Invalid Credentials!', {
                        position: "bottom-center",
                        autoClose: 3500,
                        draggable: false,
                        }); 
                    
                }
        }

   }
   function showHidePassed()
   {
        let val=document.getElementById('passwd');
        if(val.type=="password")
        {
            val.type="text"
        }
        else
        {
            val.type="password"
        }
   }
  


    return (
        <div>
            <Loading isActive={true}>
            <Header_home postion="relative"/>
                   
            <Helmet>
                <title>Login</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            
            <Paper elevation={6} className="   widthforlogin m-auto ">
            {loading ? <LinearProgress/> :""}
            <div className='login_div1 container m-auto'>

            
            {/* <div className="m-auto container login_div1  bg-light"> */}
            
                <ToastContainer/>
                <div className='d-flex'>
                    <img src={user} className='m-auto' alt="user_logo" height="100px" />
                </div>
                <div className="title">
                    <h3 className='mt-2 text-center'>Login</h3>
                </div>
                <div className="controls">
                   <form action="">
                        <div  className="my-3 d-flex flex-row form-outline">
                            {/* <i className="fa icons fa-envelope mr-2"></i> */}
                            <img className='mr-2' src={emaill} height="30px" width="30px" alt="email_icon" />
                            <TextField disabled={disable} autoComplete='none' error={emilerr} helperText={emilerr ? "Email is Required" : ""}  id="email" type="text" label="Your Email" name="email" variant="outlined" size='small' value={email} onChange={handleEmailChange} type="email"  fullWidth/>
                            
                                {/* <TextField type="text" className="form-control my-auto" placeholder="Username" aria-label="Username" aria-describedby="basic-addon" size='small'/> */}
                                </div>
                            
                     
                        <div  className="my-3 d-flex flex-row ">
                            {/* <i className="fas icons mr-2 fa-key"></i> */}
                            <img className='mr-2' src={pass1} height="30px" width="30px" alt="password_icon" />
                            <TextField disabled={disable} autoComplete='none'  error={passerr} helperText={passerr ? "Password is Required" : ""}  size="small" type="password" label="Your Password" id="passwd" name="password" variant="outlined" value={password} onChange={handlePassChange}   fullWidth/>
                        </div>
                        <div className='d-flex flex-row justify-content-between'>
         
                            <div className='d-flex flex-row'>
                                <Checkbox onClick={showHidePassed} disabled={disable}/><p className='mt-auto mb-auto' >Show Password</p>
                            </div>
                        </div>
                        <div>
                            <Button disabled={disable} variant="contained" color="success" to="#" fullWidth onClick={login}  className="btn btn-success mt-2">Secure Login <img className='mx-1' src={padlock} height="20px" alt="" /> </Button>
                        </div>
                   </form>
                   <div className="mt-3">
                        <p><Link className="text-primary h6" to="/v1.1/forgot-password">Forgot password?</Link></p>
                   </div>
                    <div className="mt-3">
                        <p>New to smmdigg?<Link className="text-primary h6" to="/signup"> Create Account</Link></p>
                    </div>
                </div>
            </div>
            </Paper>
            </Loading> 
        </div>
    )
}

export default Login