import React, { useEffect, useState } from 'react'
import {TextField,Button, Snackbar} from '@mui/material'
import Modal1 from './Modal1'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import Helmet from 'react-helmet';
import Header_landingPage from './Header_landingPage';
import Header_home from './Header_home'
import Footer from './Footer';
import { Link, useHistory } from 'react-router-dom';
import logo from '../images/logo_smm1.png'
import Loading from '../Loading/Loading';
function Service_home() {
  
  const[serachterm,setsearchTerm]=useState("")
  const[services,setservice]=useState([])
  const[name,setdname]=useState("");
  const[min,setMin]=useState("");
  const[max,setMax]=useState("");
  const[desc,setdesc]=useState("");
  const[rate,setdrate]=useState("");
  const[loading,setLoading]=useState(true)

 let history=useHistory();
    const fetchService =async () =>{
        try
        {
        let responce=await fetch('/fetchServicepage',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let service=await responce.json();
        setLoading(false)
        setservice(service)
   
        if(responce.status==400 || responce.status==500)
        {
          <Snackbar
             open="true"
            message="Error :: Something went wrong" />
        }
           
        }
        catch(er)
        {
          <Snackbar
             open="true"
            message="Error :: Something went wrong" />
        }
        
    }
    async function authState()
    {
     
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
          history.push('/login')
        }
       
    
    }

    useEffect(() => {
     
        fetchService();
    }, [])
    return (
        <div className='dashboard-header11'>
          <Header_home val={true}/>
           <Helmet>
                <title>Services</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, smm panel
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
          
            <Loading isActive={loading}>
              <div class="accordion my-3 container" id="accordionExample" >
                
                <ToastContainer/>
                
                <TextField className="my-3 w-50 bg-light"  onChange={(e)=>setsearchTerm(e.target.value)} size="small" id="outlined-basic" label="Search service" variant="outlined" />
              {services.filter((val)=>{
                if(serachterm=="")
                {
                  return val
                }
                else if(val.category.toLowerCase().includes(serachterm.toLocaleLowerCase()))
                {
                  return val
                }
               
              }).map((serv,ind)=>(
                
             services.length==0 ? <h1>No result</h1> :  <div class="accordion-item" key={ind}>
             <h2 class="accordion-header" id="headingOne">
               <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#${ind}`} aria-expanded="true" aria-controls="collapseOne">
                 {serv.category}
               </button>
             </h2>
             <div id={`#${ind}`} class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
               <div class="accordion-body d-flex flex-row justify-content-between">
                 <p>{serv.name}</p>
                 <Button size="small" onClick={()=>{setMin(serv.min)
                 setMax(serv.max)
                  setdesc(serv.desc) 
                  setdname(serv.name)
                  setdrate(serv.rate)} } variant="outlined" data-toggle="modal" data-target="#exampleModal">View Details</Button>
               </div>
             </div>
             <Modal1 min={min} max={max} rate={rate} desc={desc} name={name}/>
         </div>
              ))}
            </div>
            </Loading>  
            <div>
           
           <div className="footer d-flex flex-column  p-4">
               <div className="leftFooter d-flex flex-row justify-content-around">
                   <div className="logoFooter d-flex flex-row mr-4">
                       <img className="bg-" src={logo} alt="logo" height="90px" width="90px" />
                       <select className="ml-4 my-auto">
                           <option value="english">English</option>
                       </select>
                   </div>
                   <div className="quickLinks d-flex flex-row">
                       <div className="text-white d-flex flex-column">
                           <h5 className="contactinfo"><u>Contact Information</u></h5>
                           <span>Email:  keerthan@smmdigg.in</span>
                           <span className="">Whatsapp: +91 6361027573</span>
                           <span>Working Hour: Mon-Sat 9AM-11PM</span>
                       </div>
                   </div>
               </div>
               <div className="rightFooter container d-flex mr-auto">
                   <div className="leftQuicklinks text-white  d-flex mr-4 flex-column">
                       {/* <Link to="/v1.1/dashboard">Home</Link>
                       <Link to="/v1.1/addfund">Add fund</Link>
                       <Link to="/v1.1/privacy-policy">Privacy-Policy</Link> */}
                   </div>
                   <div className="rightQuickas text-white h6 d-flex flex-column">
                       <Link to="/v1.1/terms-and-conditions" className='text-white'>Terms & conditions</Link>
                       <Link to="/v1.1/disclaimer" className='text-white'>Disclaimer</Link>
                   </div>
               </div>
               <hr />
               <div className="d-flex footer_copy flex-column justify-content-center">
                   <h6 className="text-white text-center  pt-1">Copyright © 2021 - smmdigg.in - </h6>
                   <span className="text-white text-center pb-1">Made with ❤️ - Coded/Developed/Maintained by Keerthan</span>
               </div>
           </div>
       </div>
        </div>
    )
}

export default Service_home
