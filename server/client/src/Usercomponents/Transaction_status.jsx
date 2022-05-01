import React, { useEffect } from 'react'
import {Button} from '@mui/material';
import {useHistory} from 'react-router-dom'
import Helmet from 'react-helmet';
function Transaction_status() {
    let history=useHistory();

    useEffect(() => {
        const authState=async()=>{
            let resp=await fetch('/authUser',{
              method:"GET",
              headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
              },
              credentials:'include'
            })
         
            if(resp.status==400)
            {
              history.push('/')
            }
           
        }
        authState();
    }, [])
    function goBack()
    {
        history.push("/v1.1/dashboard")
    }
    return (
        <div className="transaction_div">
            <Helmet>
                <title>Payment Successfull</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            <div className="d-flex">
                <i class="fas text-success fa-2x tran_success fa-check-circle mr-1"></i>
                <h3 className="text-dark mt-auto mb-auto">Transaction Successfull</h3>
            </div>
            <Button variant="contained" className="mt-4" color="primary" onClick={goBack} size="small"><i class="fas fa-arrow-left mr-2"></i> GO BACK TO MAIN MENU</Button>
        </div>
    )
}  

export default Transaction_status
