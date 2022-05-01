import React, { useEffect, useState } from 'react'
import {Modal,Form} from 'react-bootstrap'
import {TextField,Button} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import Helmet from 'react-helmet';
function Modal2(props) {
    
    let[service,setService]=useState([])

    const[name,setName]=useState({
        "name":""
    })
    const[category,setcategory]=useState({
        "category":""
    })
    const[rate,setrate]=useState({
        "rate":""
    })
    const[min,setmin]=useState({
        "min":""
    })
    const[max,setMax]=useState({
        "max":""
    })
    const[desc,setdesc]=useState({
        "desc":""
    })
    
    let namee,value;
    const handleNamechange =(e)=>{
        let namee=e.target.name;
        let value=e.target.value;
        setService({...name,[namee]:value})
    }
    const handleCategorychange =(e)=>{
        let namee=e.target.name;
        let value=e.target.value;
        setService({...category,[namee]:value})
    }
    const handleRatechange =(e)=>{
        let namee=e.target.name;
        let value=e.target.value;
        setService({...rate,[namee]:value})
    }
    const handleMinchange =(e)=>{
        let namee=e.target.name;
        let value=e.target.value;
        setService({...min,[namee]:value})
    }
    const handleMaxchange =(e)=>{
        let namee=e.target.name;
        let value=e.target.value;
        setService({...max,[namee]:value})
    }
    const handledescchange =(e)=>{
        let namee=e.target.name;
        let value=e.target.value;
        setService({...desc,[namee]:value})
    }

    const[loading,setLoading]=useState(true)
    useEffect(() => {
      fetchservice();
    }, [])

    const fetchservice = async()=>{
        let resp= await fetch(`/fetchservicebynumber/${props.id}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data=await resp.json();
        console.log(resp.status)
        setLoading(false)
        console.log(data)
        setService(data[0])
    }
    function refresh()
    {
        // alert(props.id)
        fetchservice();
    }
    const updateService =async () =>{
        const{name,category,rate,min,max,desc}=service;
        let resp=await fetch(`/updateService/${props.id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            name,category,rate,min,max,desc
        })
        
    })
        if(resp.status==200)
        {
            alert("update success")
        }
    }
    return (
        <div>
                <Modal show={props.show}>
                <Helmet>
                <title>Edit Service</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
                    {loading ? <LinearProgress/> : ""}
                    <Modal.Header>
                        <Modal.Title><h5>Edit Services</h5></Modal.Title><p><i class="fas fa-sync-alt" onClick={refresh}></i></p>
                    </Modal.Header>
                        <Modal.Body>
                            <p>service ID: {props.id}</p>
                            <TextField className="my-2"  onChange={handleNamechange} name="name" type="text" value={service.name} label="Name" fullWidth variant="outlined"></TextField>
                            <TextField className="my-2"  onChange={handleCategorychange} name="category" type="text" value={service.category} label="Category" fullWidth variant="outlined"></TextField>
                            <TextField className="my-2"  onChange={handleRatechange} name="rate" type="number" value={service.rate} label="Rate" fullWidth variant="outlined"></TextField>
                            <TextField className="my-2"  onChange={handleMinchange} name="min" type="number" value={service.min} label="Min" fullWidth variant="outlined"></TextField>
                            <TextField className="my-2"  onChange={handleMaxchange} name="max" type="number" value={service.max} label="Max" fullWidth variant="outlined"></TextField>
                            <textarea value={service.desc} onChange={handledescchange} name="desc" type="text" className="form-control w-100"/>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="success" onClick={updateService}>
                            UPDATE
                        </Button>
                        <Button variant="secondary" onClick={props.onHide}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default Modal2
