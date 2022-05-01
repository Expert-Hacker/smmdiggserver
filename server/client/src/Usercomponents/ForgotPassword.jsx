import React, { useEffect, useState } from 'react'
import {TextField,Button} from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ForgotPassword() {
    const[disabled,setdisbaled]=useState(false);
    const[inptError,setinptError]=useState(false)
const[input,setInput]=useState("")
let[btnName,setBtnname]=useState("CONTINUE")
let history=useHistory();

  async  function forgotPassword()
    {
        if(!input)
        {
          return  setinptError(true)
        }
        else
        {
            setinptError(false)
        }
        setdisbaled(true);
        setBtnname("Please wait...")
        let resp=await fetch("/forgot-password",{
            method:"POST",
            headers:{
                "Content-Type":'application/json'
            },
            body:JSON.stringify({
                email:input
            })
        })
        if(resp.status==201)
        {
            setBtnname("Mail sent successfully.")
            toast.success('Mail sent. Please check your email even spam folder too!', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
                setdisbaled(false)
            
        }
        else
        {
            setBtnname("CONTINUE")
            toast.error('This Email does not Exist with our Records. Please check your Email', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                });
                setdisbaled(false)
        }

    }
    const authState=async()=>{
        try {
            let resp=await fetch('/authUser',{
                method:"GET",
                headers:{
                  Accept:"application/json",
                  "Content-Type":"application/json"
                },
                credentials:'include'
              })
              let data=await resp.json();
            
        } catch (error) {
           
            history.push('/login')
            
        }
    }
    function handleInputchange(e)
    {
        setInput(e.target.value);
    }

    return (
        <div className="forgot_p_div">
            <Helmet>
                <title>Forgot Password</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            <ToastContainer/>
            <div className=" w-auto bg-light shadow-lg rounded">
                <div className="m-4 d-flex flex-column">
                    <h4 className="text-center font-weight-bold mb-3">Forgot Password</h4>
                    <h6 className="text-center ">Enter your Email you use to sign in to smmdigg</h6>
                    <TextField  error={inptError} helperText={inptError ? "please enter Email" : ""} onChange={handleInputchange} value={input} disabled={disabled} id="standard-basic" type="text" label="Your Email" name="email" variant="standard"   type="email"  fullWidth/>
                    <Button onClick={forgotPassword} disabled={disabled} className="mt-3 w-auto" variant="contained" color="success">{btnName}</Button>
                    <p  className="text-center mt-2"><Link to="/login" className="text-dark h6">Back to Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
