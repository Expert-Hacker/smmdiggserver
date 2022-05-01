import React, { useState } from 'react'
import Header_landingPage from './Header_landingPage'
import '../addfund.css'
import Razorpay from './Razorpay'
import Paytm from './Paytm'
import Helmet from 'react-helmet'
import img from '../images/homePagepic.png'
import Footer from './Footer'
function Addfund() {
    const[initval,setInitval]=useState("Razorpay")
   const navigate=()=>{
   
    switch (initval) {
        case "Razorpay":
        return <Razorpay/>
            
        case "Paytm": 
        return <Paytm/>
        default:
            break;
    }
   }
    return (
        <div >
            <div className='mb-3'>
            <Header_landingPage/>
            <Helmet>
                <title>Add Fund</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
                <meta property="og:smmdigg" content="" /> 
                <meta property="og:www.smmdigg.in" content="" /> 
                <meta property="og:Addfund" content=""/> 
                <meta property="og:description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly" />
                <meta property="og:img" content="" /> 
                <meta property="og:url" content="" /> 
                <meta property="og:type" content="article" />
                        </Helmet>
            <div className="container container1">
                <div className="d-flex flex-row">
                    <li className="linkss selected my-0" id="rozorpay1" onClick={()=>{setInitval("Razorpay");
                    document.getElementById('rozorpay1').classList.add('selected');
                    document.getElementById('paypal').classList.remove('selected')}}><i class="far fa-money-bill-alt mx-1"></i>Razorpay</li>

                    <li className="linkss my-0" id="paypal" onClick={()=>{setInitval("Paytm");
                document.getElementById('paypal').classList.add('selected');
                document.getElementById('rozorpay1').classList.remove('selected')}}><i class="far fa-money-bill-alt mx-1"></i>Paytm</li>
                    <li className="linkss disabled my-0"><i class="far fa-money-bill-alt mx-1"></i>PayUmoney</li>
                </div>   
            </div>
            <div className="container">
            {navigate()}
            </div>
          
        </div>
        <Footer/>
        </div>
        
    )
    
}

export default Addfund
