import React, { useState } from 'react'
import {Modal,Form} from 'react-bootstrap'
import {TextField,Button} from '@mui/material'
import Helmet from 'react-helmet';
function Addservice(props) {
    const[currency,setcurr]=useState("")
    const[ID,setID]=useState("")

    const[input,setInput]=useState({
        service:"",
        name:"",
        category:"",
        rate:"",
        min:"",
        max:"",
        desc:""
    })

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
   
    let namee,val;
    function handleInput(e)
    {
        namee=e.target.name;
        val=e.target.value;
        setInput({...input,[namee]:val})
    }
    const Createservice = async()=>{
       
        let{name,category,rate,min,max,desc}=input;
        let serviceNum=ID;
        let dripfeed=0;
        let type="Package"
        console.log('category', category)
        let resp=await fetch("/createServiceform1",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,category,rate,min,max,desc,dripfeed,type,serviceNum
            })
        })
        if(resp.status==201)
        {
            alert("Service Createcd")
        }
        else
        {
            alert("unable to create service")
        }
    }
    function refresh()
    {
        // fetchCuerrencyDetails();
    }
    function ratechamnge(e)
    {
      
    }
    function checkrate()
    {
        
    }
    function handleIDchange(e)
    {
        setID(e.target.value)
    }
   async function checkAvailablity()
    {
       let resp=await fetch('/checkAvailablityID', {
           method:"POST",
           headers:{
               "Content-Type":"application/json"
           },
           body:JSON.stringify({
               ID
           })
       })
       if(resp.status==200)
       {
           alert("This Service ID Exist, Please choose Another")
       }
       else if(resp.status==201)
       {
           alert("Continue :)")
       }
       else
       {
           alert("Something went wrong!")
       }
       
     
    }
    return (
        <div>
           <Modal show={props.show1} onHide={props.handleClose1}>
           <Helmet>
                <title>Add New Service</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
                <Modal.Header >
                    <Modal.Title>Add Service form-1 <Button onClick={refresh}>Refresh</Button></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className='mb-2'>
                            <TextField size='small' helperText="choose above 1000" type="number" onChange={handleIDchange}/>
                            <Button variant='contained' color='error' className='mx-3' onClick={checkAvailablity}>Check</Button>
                        </div>
                        {/* <TextField size="small" onChange={handleInput}  name="service" type="text" className="my-2" variant="outlined" label="Service No." fullWidth/> */}
                        <TextField size="small" value={input.name} onChange={handleInput} name="name" type="text" className="my-2" variant="outlined" label="Service Name" fullWidth/>
                        <TextField size="small" value={input.category} onChange={handleInput} name="category" type="text" className="my-2" variant="outlined" label="Category" fullWidth/>
                        <div>
                        
                            <div>
                                <TextField size="small" value={input.rate} onChange={handleInput} name="rate" type="number" className="my-2" variant="outlined" label="Rate" fullWidth/>
                            </div>
                        </div>
                        <TextField size="small" value={input.min} onChange={handleInput} name="min" type="number" className="my-2" variant="outlined" label="Minimum" fullWidth/>
                        <TextField size="small" value={input.max} onChange={handleInput} name="max" type="number" className="my-2" variant="outlined" label="Maximum" fullWidth/>
                        <TextField size="small"   type="text" value="Package" className="my-2" variant="outlined" label="Type" fullWidth/>
                        <textarea onChange={handleInput} value={input.desc} name="desc" className="form-control my-2"  placeholder="Description" fullWidth/>
                        <TextField size="small"   type="number" value="0" className="my-2" variant="outlined" label="Dripfeed" fullWidth/>
                    </div>  
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={Createservice}>SUBMIT</Button>
                    <Button variant="primary"  onClick={props.handleClose1}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Addservice
