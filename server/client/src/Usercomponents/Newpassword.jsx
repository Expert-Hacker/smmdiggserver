import React, { useState } from 'react'
import {TextField,Button} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ForgotPassword() {
    const[disabled,setdisbaled]=useState(false);
    const[inptError,setinptError]=useState(false)
const[password,setpassword]=useState("");
const[cpassword,setcpassword]=useState("")
let[btnName,setBtnname]=useState("UPDATE");
let[noMatch,setNpmath]=useState(false)

let {id}=useParams();
async function UpdatenewPass()
{
    // alert(id)
    if(password!=cpassword)
    {
        return setNpmath(true);
    }
    if(!password || !cpassword)
    {
       return setinptError(true)
    }
    
    setdisbaled(true)
    setBtnname("Please wait...")
    let resp=await fetch('/new-password',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            password,cpassword,token:id
        })
        
    })
    if(resp.status==200)
    {
        toast.success('Password Reset Successfully', {
            position: "bottom-center",
            autoClose: 3500,
            draggable: false,
            }); 
            setdisbaled(false)
            setBtnname("Password Reset Successfully, Please Login!")
    }
    else if(resp.status==400)
    {
        
            toast.error('Session expired, please Try again', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
                setdisbaled(false)
                setBtnname("UPDATE")
        
    }
    else
    {
        
            toast.error('Unable to Reset new password, please Try again', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
                setdisbaled(false)
                setBtnname("UPDATE")
    }
    
   
}
function handlepasswd(e)
{
    setpassword(e.target.value)
}
function handleCpass(e)
{
    setcpassword(e.target.value)
}
  
    return (
        <div className="forgot_p_div">
            <Helmet>
                <title>Update password</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            <ToastContainer/>
            <div className=" w-75 bg-light shadow-lg rounded">
                <div className="m-4 d-flex flex-column">
                    <h4 className="text-center font-weight-bold mb-3">Update Password</h4>
                    <TextField disabled={disabled} value={password} onChange={handlepasswd} error={inptError} helperText={inptError ? "Please fill this field" :""} id="standard-basic"  label="New Password" name="password" variant="standard"   type="text"  fullWidth/>
                    <TextField disabled={disabled} value={cpassword} onChange={handleCpass} id="standard-basic" helperText={noMatch ? "Both passwords should be matched" :""}  label="Re-enter Password" name="cpassword" variant="standard"   type="text"  fullWidth/>
                    <Button disabled={disabled} className="mt-3 w-auto" variant="contained" onClick={UpdatenewPass} color="success">{btnName}</Button>
                    <p  className="text-center mt-4"><Link to="/login" className="text-dark h6">Back to Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
