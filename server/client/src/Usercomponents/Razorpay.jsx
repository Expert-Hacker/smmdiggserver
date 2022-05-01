import React, { useEffect, useState } from 'react'
import payment from '../images/payment.png'
import {TextField,Button,Tooltip,Checkbox} from '@mui/material'
import payLogo from '../images/razorpay_logo.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';
function Razorpay() {
  const[input,setInput]=useState("")
  const[error,setError]=useState(false)
  const[minamt,setminamt]=useState(false)
  const[disable,setDisable]=useState(false)
  const[disText,setDistext]=useState(false)
  let history=useHistory();
  function handlechange(e)
  {

    let value=e.target.value
    setInput(e.target.value)
  }
  useEffect(() => {
  authState();
  }, [])

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
    async function paynow(e)
    {
      e.preventDefault();
      
      if(input=="")
      {
        setDisable(false)
        return setError(true)
      }
      if(input<5)
      {
        setDisable(false)
          return setminamt(true)
      }
     setDisable(true)
     setDistext(true)
      let resp=await fetch('/order',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          amount:input
        })
      })
      let data=await resp.json();
      if(resp.status==400)
      {
        setDistext(false)
        setDisable(false)
       return toast.error(`${data.resp}`, {
          position: "bottom-center",
          autoClose: 2000,
          draggable: false,
          
          });
          
      }
      setDistext(false)


    
    

  
  var options = {
    "key": process.env.REACT_APP_KEY, // Enter the Key ID generated from the Dashboard
    "amount": "900000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "SMMDIGG",
    "description": "",
    "order_id": data.id,
  //   "handler": function (response){
  //     alert(response.razorpay_payment_id);
  //     alert(response.razorpay_order_id);
  //     alert(response.razorpay_signature)
  // },
    "callback_url": "/check-payment-status",
    "theme": {
      "color": "#3399cc"
      }
  }
  var rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function (response){
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
});
  rzp1.open();
}


    return (
        <div className="paymentscreen container bg-light shadow-lg rounded">
          <Helmet>
                <title>Add Fund - Razorpay</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
              <div className="payLogo">
                {disText ? <div><h5 className="text-center mt-4 text-white py-1 bg-dark">Loading...Please wait</h5></div> : ""}
                  <img src={payLogo} alt="Razorpay_logo" width="500px" className="my-3 img-fluid" />
                  
              </div>
              <div>
                    <p className="text-center">You can deposit funds with razorpay® they will be automaticly added into your account!</p>
                    <p className="text-center h6">It supports: Google Pay/PhonePay/Cards or QR & more Payment options</p>
              </div>
              <div className="d-flex">
                <TextField type="number" error variant="standard" onChange={handlechange} value={input} helperText={error ? "Field can't be blank" : minamt ?  "Amount must be greater than 5" : ""} label="Enter Amount (₹)" error={error}/>
                <Button disabled={disable} className="mt-auto" onClick={paynow} variant="contained" color="success">PAY NOW</Button>
              </div>
              <div className="mt-3">
                  <h6 className="ml-3">Note:</h6>
                  <li className="list_note">Minimum payment: ₹5</li>
                  <li className="list_note">Maximum payment: ₹20,000</li>
                  <li className="list_note">Clicking on <span  className="font-weight-bold">"Go back to main menu"</span> after payment successfully completed.</li>
              </div>
              <div className="d-flex mb-3">
                  <Checkbox checked/> <p className="mt-3 h6">Yes, I understand after the funds added i will not ask fraudulent dispute or charge-back!</p>
              </div>
              
        </div>
    )
}

export default Razorpay
