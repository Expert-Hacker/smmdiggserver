
import React, { useEffect, useState } from 'react'
import '../editprofile.css'
import Header_landingPage from './Header_landingPage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField,Tooltip,IconButton} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';
import Loading from '../Loading/Loading'
import { Button } from 'semantic-ui-react';
import {useSelector,useDispatch} from 'react-redux'
import {setUserIntoRedux} from '../state/Action-creators/index'
function Editprofile(props) {
    const dispatch=useDispatch(setUserIntoRedux("Keer"))
    let users=useSelector(state=>state);
    console.log("storeeee")
    const[loading,setloading]=useState(false)
    const[Pageloading,setPageloading]=useState(true)
    const[disable,setDisable]=useState(true)
    const[btndisable,setbtnDisable]=useState(true)
    const[user,setInfo]=useState({
        name:"",
        email:"",
        phone:""
    });
    let history=useHistory();

  
   
    
   
    let name,value;
  
    const handleInput = (e) =>{
        name=e.target.name;
        value=e.target.value;
        setInfo({...user,[name]:value})
    }

    useEffect(() => {
        
     
        getprofileInfo();
    }, [])
    async function updateUser()
    {
       
        try {
            setbtnDisable(true)
            setloading(true)
            setDisable(true)
        let {name,email,phone}=user
        let resp=await fetch('/updateuser',{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,email,phone
            })
        })
        
        if(resp.status==200)
        {
            setloading(false)
            setDisable(true)
            toast.success('Update Successfull!', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
        }
        } catch (error) {
            toast.error('Unable to update', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
        }
    }
 

    const getprofileInfo = async()=>{
        try {
            
            let resp=await fetch('/getprofileInfo',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:'include'
            })
            let data=await resp.json();
          setPageloading(false)
            setInfo(data[0])
        } catch (error) {
            toast.error('Something went wrong while fetching data', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
        }
    }
    return (
        <div>
            
            <Header_landingPage/>
            <Helmet>
                <title>Edit Profile</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>

                <meta property="og:smmdigg" content="" /> 
                <meta property="og:www.smmdigg.in" content="" /> 
                <meta property="og:Edit Profile" content=""/> 
                <meta property="og:description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly" />
                <meta property="og:img" content="" /> 
                <meta property="og:url" content="" /> 
                <meta property="og:type" content="article" />
            </Helmet>
            <Loading  isActive={Pageloading}> 
            <div className="container">
                <ToastContainer/>
                {loading ? <div className="my-3"><LinearProgress/></div> : ""}
                <div className="editIcon">
                <Tooltip title="Edit">
                <IconButton>
                    <i class="far fa-edit fa-1x" onClick={()=>{{setDisable(false); setbtnDisable(false)}}}></i>
                    </IconButton>
                    </Tooltip>
                </div>
               <form action="">
               <div className="mt-3">
                    <div className="">
                        <TextField helperText="Name" disabled={disable} value={user.name} onChange={handleInput}  type="text"  name="name" variant="standard"   fullWidth/>
                        
                    </div>
                    <div className="mt-3">
                        <TextField helperText="Email" disabled={disable} value={user.email} onChange={handleInput}  type="email"  name="email" variant="standard"  fullWidth/>
                        
                    </div>
                    <div className="mt-3">
                        <TextField helperText="Number" disabled={disable} value={user.phone}  onChange={handleInput}  type="number"  name="phone" variant="standard"   fullWidth/>
                    </div>
                    <div className="mt-3">
                        <TextField helperText="Password" disabled placeholder='Password field is disabled for security reasons!'  id="standard-basic" type="text" name="text" variant="standard" type="email"  fullWidth/>
                    </div>
                    <Button onClick={updateUser} className="my-3" disabled={btndisable} color="facebook" size='small'>UPDATE</Button>
                </div>
               </form>
            </div>
            </Loading>
        </div>
    )
}

export default Editprofile
