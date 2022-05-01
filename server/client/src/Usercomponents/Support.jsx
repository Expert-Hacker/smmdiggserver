import React, { useState } from 'react'
import '../supportleft.css'
import TicketList from './TicketList'
import {Button,TextField}from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { compose } from '@mui/system'
import { Badge } from 'react-bootstrap';
import Helmet from 'react-helmet';
import Header_landingPage from './Header_landingPage';
import Footer from './Footer';
function Support() {
    const[disabled,setdisabled]=useState(true)
    const[subject,setSubject]=useState('order');
    const[request,setRequest]=useState("speed-up")
    const[orderID,setorderID]=useState("");

    let[btnDisabled,setbtnDisabled]=useState(false)

    const[orderIDerror,setorderIDerror]=useState(false);
    // const[serviceDesc,setserviceDesc]=useState("");
    // const[serviceDescerror,setserviceDescerror]=useState(false);

    const[Desc,setDesc]=useState("");
    const[Descerror,setDescerror]=useState(false);

    const[payment1,setpayment]=useState('')
    const[TransactionID,setTransactionID]=useState('');
    // const[paymentDesc,setpaymentDesc]=useState('')

    const[paymentError,setpaymentError]=useState(false)
    const[TransactionIDError,setTransactionIDError]=useState(false);
    
    const[category,setcategory]=useState([]);
    const[service,setService]=useState([])

    const[postCategory,setpostCategory]=useState("")

    const[fileUpload,setfilrUpload]=useState(null)
    const[fileUploadError,setfilrUploadError]=useState("")

    const[btnName,setbtnName]=useState("SUBMIT")

    const handleChange = (e) =>{
        setdisabled(false)
        if(e.target.value=="nill")
        {
            setdisabled(true)
        }
 
        setSubject(e.target.value)

        setorderIDerror(false)
        setDescerror(false)
        setDescerror(false)
        setpaymentError(false)
        setTransactionIDError(false)
        setDescerror(false)
        setDescerror(false)
        
    }
    const createTicketorder =async()=>{
       try {
           setbtnName("Please wait...")
        let resp=await fetch('/submitTicket',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                subject,request,orderID,desc:Desc
            })
        })
        if(resp.status==201)
        {
            toast.success('Ticket created successfully!', {
                position: "bottom-center",
                autoClose: 3000,
                draggable: false,
                });   
                setbtnDisabled(false)
                setbtnName('SUBMIT')
        }
        else
        {
            toast.error('Unable to create ticket!', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                });
                setbtnDisabled(false)
                setbtnName('SUBMIT')
        }
      
       
       } catch (error) {
            toast.error('Unable to create ticket!', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                });
                setbtnDisabled(false)
                setbtnName('SUBMIT')
       }
    }
    const createTicketService =async()=>{
        try {
            setbtnName("Please wait...")
         let resp=await fetch('/submitTicket',{
             method:"POST",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 subject,desc:Desc
             })
         })
         if(resp.status==201)
         {
             toast.success('Ticket created successfully!', {
                 position: "bottom-center",
                 autoClose: 3000,
                 draggable: false,
                 });  
                 setbtnDisabled(false) 
                 setbtnName('SUBMIT')
         }
         else
         {
             toast.error('Unable to create ticket!', {
                 position: "bottom-center",
                 autoClose: 3500,
                 draggable: false,
                 });
                 setbtnDisabled(false)
                 setbtnName('SUBMIT')
         }
        } catch (error) {
             toast.error('Unable to create ticket!', {
                 position: "bottom-center",
                 autoClose: 3500,
                 draggable: false,
                 });
                 setbtnDisabled(false)
                 setbtnName('SUBMIT')
        }
    
     }

     const createTicketPayment =async(e)=>{
        try {
            setbtnName("Please wait...")
            // e.preventDefault();
         let resp=await fetch('/submitTicket',{
             method:"POST",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 subject,desc:Desc,payment:payment1,transactionID:TransactionID
             })
         })
         if(resp.status==201)
         {
             toast.success('Ticket created successfully!', {
                 position: "bottom-center",
                 autoClose: 3000,
                 draggable: false,
                 }); 
                 setbtnDisabled(false)  
                 setbtnName('SUBMIT')
         }
         else
         {
             toast.error('Unable to create ticket!', {
                 position: "bottom-center",
                 autoClose: 3500,
                 draggable: false,
                 });
                 setbtnDisabled(false);
                 setbtnName('SUBMIT')
         }
        } catch (error) {
             toast.error('Unable to create ticket!', {
                 position: "bottom-center",
                 autoClose: 3500,
                 draggable: false,
                 });
                 setbtnDisabled(false)
                 setbtnName('SUBMIT')
        }
    
     }


     const setDescerrorOther =async()=>{
        try {
            setbtnName("Please wait...")
         let resp=await fetch('/submitTicket',{
             method:"POST",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 subject,request,orderID,desc:Desc,payment:payment1,transactionID:TransactionID
             })
         })
         if(resp.status==201)
         {
             toast.success('Ticket created successfully!', {
                 position: "bottom-center",
                 autoClose: 3000,
                 draggable: false,
                 }); 
                 setbtnDisabled(false)  
                 setbtnName('SUBMIT')
         }
         else
         {
             toast.error('Unable to create ticket!', {
                 position: "bottom-center",
                 autoClose: 3500,
                 draggable: false,
                 });
                 setbtnDisabled(false)
                 setbtnName('SUBMIT')
         }
        } catch (error) {
             toast.error('Unable to create ticket!', {
                 position: "bottom-center",
                 autoClose: 3500,
                 draggable: false,
                 });
                 setbtnDisabled(false)
                 setbtnName('SUBMIT')
        }
     }


  



    const SubmitTicket=(e)=>
    {   
        
        if(subject=="order")
        {
          
            if(!orderID)
            {
              return  setorderIDerror(true)
            }
            if(!Desc)
            {
             return   setDescerror(true)
            }
       
            setbtnDisabled(true)
            createTicketorder();
            
        }
        else if(subject=="service")
        {
            
            if(!Desc)
            {
                return setDescerror(true)
            }
            
            setbtnDisabled(true)
            createTicketService();
        }
        else if(subject=="payment")
        {
            
            if(!payment1)
            {
               return setpaymentError(true)
            }
            if(!TransactionID)
            {
               return setTransactionIDError(true)
            }
            if(!Desc)
            {
               return setDescerror(true)
            }
            setbtnDisabled(true)
            createTicketPayment();
        }
        else if(subject=="other")
        {
            if(!Desc)
            {
               return setDescerror(true)
            }
            setbtnDisabled(true)
            createTicketService();
        }
        else if(subject=="serviceunavailable")
        {
            if(fileUpload=="")
            {
              return  setfilrUploadError(true);

            }
            if(!Desc)
            {
              return  setDescerror(true)
            }
            setbtnDisabled(true)
            createTicket_serviceUnavailable1();
        }
      
      
    }
   function handleRequestchange(e)
   {
       if(e.target.value=="nill")
       {
           setdisabled(true)
       }
        setRequest(e.target.value)
   }
   function handleOrderIDchange(e)
   {
        setorderID(e.target.value)
   }
  
   function handleDecrChgange(e)
   {
    setDesc(e.target.value)
   }
   function handlePayment(e)
   {
       setpayment(e.target.value)
   }
   function handleTransactionID(e)
   {
       setTransactionID(e.target.value)
   }

   
  

function handleFileupload(e)
{
    setfilrUpload(e.target.files[0])
    
}



const handleserviceChange = (e) =>{
    
    const fetchserviceName=async()=>{
        try{
            let resp=await fetch(`/fetchserviceName/${e.target.value}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
            
            let data=await resp.json();
        
            setService(data)
        }
        catch(errr)
        {
          
        }
    }
    fetchserviceName();
  
}
async function createTicket_serviceUnavailable1(e)
{
    setbtnName("Please wait...")
 
        try {
            let fd=new FormData();
            
            fd.append("subject", subject);
            fd.append("desc",Desc)
            fd.append("myfile",fileUpload);

          

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/upload",fd,config)
            .then((response) => {
                toast.success('Ticket created', {
                    position: "bottom-center",
                    autoClose: 3500,
                    draggable: false,
                    }); 
                    setbtnDisabled(false)
                    setbtnName('SUBMIT')
            }).catch((error) => {
                toast.error('Invalid file format!', {
                    position: "bottom-center",
                    autoClose: 3500,
                    draggable: false,
                    }); 
                    setbtnDisabled(false)
                    setbtnName('SUBMIT')
        });
            

     
        }catch(err)
        {
            setbtnDisabled(false)
            setbtnName('SUBMIT')
        }
}

  
  
    return (
        <div className='dashboard-header11'>
             <Helmet>
                <title>Support</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            <Header_landingPage/>
            <div className="support my-3 container">
                <div className="row">
                    {/* <form action=""> */}
                <div className="col-sm">
                            <div>
                                <h4 className="p-2 addNewticket"><i class="fas mr-2 fa-1x fa-comments"></i>Add new Ticket</h4>
                            </div>
                            <div>
                                <h6 className="text-white">Subject</h6>
                                <select disabled={btnDisabled}  className="form-control mb-3" id="subject" onChange={handleChange}>
                                    <option selected value="nill">Select Subject</option>
                                    <option  value="order">Order</option>
                                    <option  value="service">Service</option>
                                    <option value="payment">Payment</option>
                                    <option value="serviceunavailable">Service Unavailable</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            { 
                                subject=="order" ? 
                                <div>
                                    <div className="my-3">
                                        <h6  className="text-white">Request</h6>
                                        <select disabled={disabled || btnDisabled} onChange={handleRequestchange} className="form-control" name="" id="request">
                                            {/* <option  value="nill">Select Request</option> */}
                                            <option  value="speed-up">Speed-up</option>
                                            <option value="refill">Refill</option>
                                            <option value="cancellation">Cancellation</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                    <div>
                                        <h6  className="text-white">Order ID</h6>
                                        <TextField disabled={disabled || btnDisabled} placeholder="Please enter Order ID" error={orderIDerror} helperText={orderIDerror ? "This field cannot blank" : ""}  value={orderID} required onChange={handleOrderIDchange} type="text" className="form-control" />
                                    </div>
                                    <div className="my-3">
                                        <h6  className="text-white">Description</h6>
                                        <TextField disabled={disabled || btnDisabled} placeholder="Please write a small description about the issue you're facing."  value={Desc} error={Descerror} onChange={handleDecrChgange} helperText={Descerror ? "This field cannot blank" : ""}  name="" className="form-control" id="" cols="5" rows="5"></TextField>
                                        <Button disabled={btnDisabled} className="my-2" color="warning" variant="contained" onClick={SubmitTicket}>{btnName}</Button>
                                    </div>
                                </div> : subject=="service" ? 
                                <div className="my-3">
                                    <h6  className="text-white">Descriptionn</h6>
                                    <TextField disabled={disabled || btnDisabled} placeholder="Please write a small description about the issue you're facing."  value={Desc} error={Descerror} onChange={handleDecrChgange} helperText={Descerror ? "This field cannot blank" : ""}  name="" className="form-control" id="" cols="5" rows="5"></TextField>
                                    <Button disabled={btnDisabled} className="my-2" color="warning" variant="contained" onClick={SubmitTicket}>{btnName}</Button>
                                </div> : subject=="payment" ? 
                                <div className="my-3">
                                    <h6  className="text-white">Payment</h6>
                                    <TextField onChange={handlePayment} disabled={disabled || btnDisabled} value={payment1} error={paymentError} helperText={paymentError ? "This field cannot blank" : ""} placeholder="Please enter payment mode Eg: UPI/Card/Netbanking" type="text"  className="form-control mb-3" />
                                    <h6  className="text-white">Transaction ID</h6>
                                    <TextField disabled={btnDisabled} placeholder="please enter Transaction ID" error={TransactionIDError} onChange={handleTransactionID} helperText={TransactionIDError ? "This field cannot blank" : ""}  type="text"  className="form-control mb-3" />
                                    <h6  className="text-white">Description</h6>
                                    <TextField disabled={btnDisabled} placeholder="Please write a small description about the issue you're facing."  value={Desc} error={Descerror} onChange={handleDecrChgange} helperText={Descerror ? "This field cannot blank" : ""}  name="" className="form-control" id="" cols="5" rows="5"></TextField>
                                    <Button disabled={btnDisabled} className="my-2" color="warning" variant="contained" onClick={SubmitTicket}>{btnName}</Button>
                                </div>: subject=="serviceunavailable" ?
                                <div>
                                    <h6  className="text-white">Upload screenshot</h6>{fileUploadError ? <span className="text-danger">Please upload the file</span> :""}
                                    <input disabled={btnDisabled} onChange={handleFileupload} required className="form-control mb-3"   type="file" name="myFile" id="" />
                                    <h6  className="text-white">Description</h6>
                                    <TextField disabled={disabled || btnDisabled} placeholder="Please write a small description about the issue you're facing."  value={Desc} error={Descerror} onChange={handleDecrChgange} helperText={Descerror ? "This field cannot blank" : ""}  name="" className="form-control" id="" cols="5" rows="5"></TextField>
                                    <Button disabled={btnDisabled} onClick={SubmitTicket} className="my-3" color="warning" variant="contained" type="submit">{btnName}</Button>

                                </div> :
                                <div>
                                    <h6  className="text-white">Description</h6>
                                    <TextField disabled={disabled || btnDisabled} placeholder="Please write a small description about the issue you're facing."  value={Desc} error={Descerror} onChange={handleDecrChgange} helperText={Descerror ? "This field cannot blank" : ""}  name="" className="form-control" id="" cols="5" rows="5"></TextField>
                                    <Button disabled={btnDisabled} className="my-2" color="warning" variant="contained" onClick={SubmitTicket}>{btnName}</Button>
                                </div>
                            }
                </div>
                {/* </form> */}
                    <div className="col-sm">
                        <TicketList/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Support
                            