import React, { useState } from 'react'
import { Link ,useHistory} from 'react-router-dom'
import Header_home from './Header_home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../signup.css'
import {Button} from 'semantic-ui-react'
import {TextField, Tooltip, Checkbox, ClickAwayListener, Paper } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import  { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Helmet from 'react-helmet';
import signup from '../../src/images/sign-up.png'

import email from '../../src/images/email.png'
import  name11 from '../../src/images/user1.png'
import  whatspp from '../../src/images/whatsapp.png'
import  passwd from '../../src/images/key.png'
import Loading from '../Loading/Loading';

var validator = require("email-validator");


function Signup() {
    const[show,setShow]=useState(false)
    const[disable,setDisable]=useState(false)
    const[loading,setLoading]=useState(false);
 const[nameerr,setnameerr]=useState(false)
const[emailerr,setemailerr]=useState(false)
const[numerr,setnumerr]=useState(false)
const[passerr,setpasserr]=useState(false)
const[cpasserr,setcpasserr]=useState(false)
  const[passMatch,setpassMatch]=useState(false)
  const[sighnupvalid,setsignupValid]=useState(false)
  const[invaliEmailerror,setinvaliEmailerror]=useState(false)
  const[MinmaxPass,setminmaxpass]=useState(false)

  const[invalidName,setinvalidName]=useState(false)

  const[strongPasswd,setstrongPasswd]=useState(false)
  const[tOpen,settOpen]=useState(false)
  const[tOpen1,settOpen1]=useState(false)
  let history=useHistory();
    const [input,setInput]=useState({
        name:"",
        email:"",
        number:"",
        password:"",
        cpassword:""
    })
    let name,value;
    const handleChange = (e) =>{
      
        name=e.target.name;
        value=e.target.value;
        setInput({...input,[name]:value})
    }

    const register1 =async(e)=>
    {
        e.preventDefault();
        setDisable(true)
        const {name,email,password,cpassword}=input;
        let phone=input.number;
   

        if(password!==cpassword)
        {
            setpassMatch(true)
            setDisable(false)
        }
        //Password validation
       let lowerCaseLetters = /[a-z]/g
       let upperCaseLetters = /[A-Z]/g
       let numbers = /[0-9]/g
       let special_car = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

    



        if(validator.validate(email))
        {
              
        }
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if(!validateEmail)
        {
            setemailerr(true)
        }
       
             if(!name || !email || !password || !cpassword || !phone)
                {
                   
                    if(!name)
                    {
                        setnameerr(true)
                        setDisable(false)
                    }
                    if(name.trim().length==0)
                    {
                        setnameerr(true)
                        setDisable(false)
                    }
                 
                    if(email.length==0)
                    {
                        setemailerr(true)
                        setDisable(false)
                    }
                   
                    if(!phone)
                    {
                        setnumerr(true)
                        setDisable(false)
                    }
                    if(phone.length<10 || phone.length>10)
                    {
                        setnumerr(true)
                        setDisable(false)
                    }
                    if(!password || !cpassword)
                    {
                        setpasserr(true)
                        setDisable(false)
                    }
                    if(!cpassword)
                    {
                        setcpasserr(true)
                        setDisable(false)
                    }
                    
                }
              
               else 
            {
        
       
        if(validator.validate(email))
        {
            setLoading(true)
            let trimmed_name=name.trim();
            let res=await fetch('/register',{
             method:"POST",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 name:trimmed_name,email,phone,password,cpassword
             })  
         })
         let resp=await res.json();
 
         if(res.status==201)
         {
             setLoading(false)
            toast.success('Registration Successfull!', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
                // setsignupValid(true)
                setTimeout(function()
                {
                    history.push("/v1.1/dashboard")
                },3500)
                
          
         }
         else if(res.status==400)
         {
            setLoading(false)
            toast.error(`${resp.resp}`, {
                position: "bottom-center",
                autoClose: 3700,
                draggable: false,
                
                }); 
                setsignupValid(false)
                setDisable(false)
               
         }
        }
        else
        {
            setLoading(false)
            setinvaliEmailerror(true)
            setDisable(false)
        }
        
    }
    }
 
    function passwordHelp()
    {
        document.getElementById('passHelp').classList.toggle('TogglepasswodHelpDiv')

    }
    function handleTiiltipOpen()
    {
       settOpen(true)
    }
    function handleTiiltipClose()
    {
        settOpen(false)
    }

    function handleTiiltipOpen1()
    {
       settOpen1(true)
    }
    function handleTiiltipClose1()
    {
        settOpen1(false)
    }
    function showHidePassed()
    {
        let val=document.getElementById('passwdd');
        let val2=document.getElementById('passwdd1');
        
        if(val.type=="password" && val2.type=="password")
        {
            val.type="text"
            val2.type="text"
        }
        else
        {
            val.type="password"
            val2.type="password"
        }
    }
    return (
        <div>
            <Header_home/>
            <ToastContainer/>
            <Helmet>
                <title>Create an Account</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            
            {/* <div className="m-auto container"> */}
            <Paper elevation={6} className='signupdivwidth w-50  m-auto '>
            
            <div className='signup_div1 m-auto my-3'>
            <Loading isActive={loading}>
                <div className='d-flex mb-3'>
                    <img  src={signup} className='m-auto mr-2 img_create_account' alt="signUp_logo" height="100px" />
                </div>
                <div className="title mb-3">
                    <h3 className='text-center pt-1'>Create an account</h3>
                </div>
                
                <div className="controls">
                    <form method="POST" autoComplete='off'>
                            <div class={`ui ${nameerr && !input.name ? 'error' : ""} left icon input large d-flex`} >
                                <input  disabled={disable} value={input.name} onChange={handleChange} name="name" type="text" placeholder="Enter Name"/>
                                <i class="fas fa-user icon"></i>
                            </div>
                        
                        <div className="my-3 ">
                            <div class={`ui left icon input large d-flex ${emailerr && !input.email ? 'error' : "" }`}>
                                <input disabled={disable} value={input.email} onChange={handleChange} name="email" type="email" placeholder="Enter Email"/>
                                <i class="far fa-envelope icon"></i>
                            </div>
                        </div>
                        <div className="my-3">
                            <div class={`ui left icon input large d-flex  ${numerr && !input.number ? 'error' : ""}`}>
                                <input disabled={disable} value={input.number} onChange={handleChange} name="number" type="number" placeholder="Whatsapp"/>
                                <i class="fas fa-comment-alt icon"></i>
                            </div>
                            
                        </div>
                        <div className="my-3">
                            <div class={`left icon ui ${passerr && !input.password ? 'error' : ""}  large input d-flex`}>
                                <i class="fas fa-lock icon"></i>
                                <input disabled={disable} value={input.password} onChange={handleChange} name="password" type="password" placeholder="Password" id="passwdd"/>
                            </div>
                        </div>
                        <div className="my-3">
                            <div class={`left icon ui ${cpasserr && !input.cpassword ? 'error' : ""} large input d-flex`}>
                                <i class="fas fa-lock icon"></i>
                                <input disabled={disable} value={input.cpassword} onChange={handleChange} name="cpassword" type="password" placeholder="Re-Enter Password" id="passwdd1"/>
                            </div>
                        </div>
                        
                            {passMatch ? <span className="p-0 m-0 text-danger">Both Passwords should be matched!</span> : ""}
                        
                        <div>
                            <div className="d-flex justify-content-between" >
                                <div className='d-flex flex-row justify-content-center align-items-center'>
                                    <Checkbox checked/>
                                    <p className="tnctext" onClick={()=>{history.push("/v1.1/terms-and-conditions")}}>I agree the terms & Policy</p>
                                 
                                </div>
                                <div>
                                    <div className='d-flex flex-row'>
                                        <Checkbox onClick={showHidePassed}/><p className='mt-auto mb-auto' >Show Password</p>
                                    </div>
                                </div>
                            </div>
                            <Button disabled={disable}  color="facebook" size='big' fullWidth  onClick={register1} className="mt-2 w-100">SUBMIT</Button>
                        </div>
                    </form> 
                    <div className="mt-3">
                        <p>Already have an account?<Link className="text-primary h6" to="/login"> Login</Link></p>
                    </div>
                </div>
                </Loading>
            </div>
            </Paper>
        </div>
    )
}

export default Signup
