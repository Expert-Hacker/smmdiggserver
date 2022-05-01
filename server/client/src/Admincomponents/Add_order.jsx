import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Helmet } from 'react-helmet'

function Add_order(props) {
    const[category,setCategory]=useState([])
    const[postCategory,setpostCategory]=useState("");
    const[postservice,setpostservice]=useState();
  let[Totalcharge,setTotalcharge]=useState(0)
    const[catee,setCatee]=useState("");
    const[service,setService]=useState([]);
    const[link,setLink]=useState("");
    const[price,Setprice]=useState("");
    const[qty,setqty]=useState("");
    const[Total,SetTotal]=useState("");
    const[user,setUser]=useState("");
    const[rate,setrate]=useState("")

    useEffect(() => {
        fetchCategories();
     
    }, []);
    
   async function createOrder()
    {
        let resp=await fetch("/createOrderforUser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                postCategory,postservice,link,rate,qty,Total,user
            })
        })
        if(resp.status==201)
        {
            alert("Order Created")
        }
        else if(resp.status==401)
        {
            alert("Insufficiant Fund!")
        }
        else
        {
            alert("Unable to create Order!")
        }
        console.log(postCategory)
        console.log(postservice)
        console.log(qty)
        console.log(link)
        console.log(Total)
        console.log(user)

    }

    function handleLinkChange(e)
    {
        setLink(e.target.value)
    }
    function handlePriceChange(e)
    {
        Setprice(e.target.value)
    }
    function handleQtyChange(e)
    {
        setqty(e.target.value);
        let a=((e.target.value*rate))
        SetTotal(a/1000)
    }
    function handleTotalChange(e)
    {
        SetTotal(e.target.value)
    }
    function handleUserChange(e)
    {
        setUser(e.target.value);
    }
    const fetchCategories=async()=>{
        let resp= await fetch('/fetchService',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        // setError(false)
        let data= await resp.json();
        setCategory(data);
        setpostCategory(data[0]) 
        let serv=data[0];
        serv=encodeURIComponent(serv)
        fetchservicesWhenpageLoads(serv);
    }
  

    async function fetchservicesWhenpageLoads(serv)
    {
       
                try{
               
                    let resp=await fetch(`/fetchserviceName/${serv}`,{
                        // let resp=await fetch(`/fetchserviceName/Facebook Post Likes [500] [No Refill]`,{
                        method:"GET",
                        headers:{
                            "Content-Type":"application/json"
                        }
                    });
                    // setError(false)
                    let data=await resp.json();
                    // setinputerror(false)
                    setrate(data[0].rate)
                    setService(data)
                   
                    setpostservice(data[0].name)
                  
                }
                catch(errr)
                {
                    // setError(true)
                }
    }
    async function handleWhenServiceChanged(serv)
    {
        try{
            let aa=encodeURIComponent(serv)
            
            // let enc=encodeURI(e.target.value)
            let resp= await fetch(`/fetchName/${aa}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json();
            setrate(data[0].rate)
            setpostservice(data[0].name)
          
        
        }
        catch(er)
        {
        //    setError(true)
        }
        
    }
    function handlecategoryChanges(e)
    {
        setTotalcharge(0)
       let cat=e.target.value;
       cat=encodeURIComponent(cat)
       fetchservicesWhenpageLoads(cat)
       setpostCategory(e.target.value)

    }
    function habdleservicechanged(e)
    {
        setTotalcharge(0)
        let serv=e.target.value;
        handleWhenServiceChanged(serv)
    }


    
    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
           <Helmet>
                <title>Add Order</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
                <Modal.Header >
                    <Modal.Title>Create Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                      <div>
                          <p>Select Category</p>
                            <select name="" id="" fullWidth className='form-control' onChange={handlecategoryChanges}>
                                {
                                    category.map((cat,ind)=>(
                                        <option value={cat} key={ind}>{cat}</option>
                                    ))
                                }
                            </select>
                            <p>Select Service</p>
                            <select name="" id="" fullWidth className='form-control' onChange={habdleservicechanged}>
                                {
                                    service.map((serv,ind)=>(
                                        <option value={serv.name} key={ind}>{serv.name}</option>
                                    ))
                                }
                            </select>
                            <h5 className='my-2'>Rate per 1000: {rate}</h5>
                            <TextField value={qty} onChange={handleQtyChange} label="Qty" variant="standard" className="m-2" fullWidth/>
                          <TextField value={link} onChange={handleLinkChange} label="Link" variant="standard" className="m-2" fullWidth/>
                          
                          
                          
                          <TextField disabled value={Total} onChange={handleTotalChange} label="Total" variant="standard" className="m-2" fullWidth/>
                          <TextField value={user} onChange={handleUserChange} label="User ID you want to Create" variant="standard" className="m-2" fullWidth/>
                      </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={createOrder}>SUBMIT</Button>
                    <Button variant="primary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Add_order
