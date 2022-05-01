import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import {TextField,Button} from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import Helmet from 'react-helmet';
import AdminHeader from './AdminHeader';
function Preference() {
    const[input,setinput]=useState("")
    const[curr,setcurr]=useState("")
    async function update()
    {
        if(input=="")
        {
            return alert("Field can't blank")
        }
        let resp=await fetch('/updateCurrency',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                currency:input
            })
        })
        if(resp.status==200)
        {
            toast.success('Currency updated Successfull!', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
        }
        let data=await resp.json();
        setinput(data.currency)
    }
    async function fetchCuerrencyDetails()
    {
        let resp=await fetch('/fetchcurrency',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }  
        })
        let data=await resp.json();
        setcurr(data.currency)
    }
    useEffect(() => {
      fetchCuerrencyDetails();
    }, [])

    function refresh()
    {
        fetchCuerrencyDetails()
    }
    return (
        <div>
            <AdminHeader/>
            <Helmet>
                <title>Preference</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            <ToastContainer/>
            <div className="mt-3 ml-3">
                    <i class="fas mb-3 fa-sync" onClick={refresh}></i>
                <h5>Update Currency (₹)</h5>
               <div className="d-flex flex-column w-25">
                    <span>Current currency ₹ {curr}</span>
                    <TextField onChange={(e)=>setinput(e.target.value)}  variant="outlined" size="small" className="mt-2"  type="text" />
                    <Button variant="contained" className="mt-2" onClick={update} color="success">SAVE</Button>
               </div>
            </div>
        </div>
    )
}

export default Preference
