import React, { useEffect, useState } from 'react'
import Header_landingPage from './Header_landingPage'
import '../viewprofile.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import Helmet from 'react-helmet';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import Loading from '../Loading/Loading';
function Viewprofile() {
    const[loading,setloading]=useState(true)
    const[info,setInfo]=useState("")
    let history=useHistory();
    useEffect(() => {
        authState();
       getprofileInfo();
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
            setloading(false)
            setInfo(data[0])
        } catch (error) {
            toast.error('Something went wrong while fetching data', {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
                setloading(true)
        }
    }
    return (
        <div className=''>
            <Header_landingPage/>
            <Loading isActive={loading}>
            <ToastContainer/>
            <Helmet>
                <title>My profile</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            
            <div className="center">
            { <div className="viewprofile">
                <div className="viewprheader text-center bg-success">
                    <h4 className="p-2 text-white myprfilr">  My profile</h4>
                </div>
                <div className="d-flex row_dy justify-content-around">
                    <div className="">
                        <li className="h5">Name</li>
                        <li className="h5">Email</li>
                        <li className="h5">Number</li>
                        <li className="h5">Joined on</li>
                        <li className="h5">User ID</li>
                    </div>
                    <div className="">
                        <li className="h5">{info.name}</li>
                        <li className="h5">{info.email}</li>
                        <li className="h5">{info.phone}</li>
                        <li className="h5">{moment(info.createdAt).format("dddd, MMMM Do YYYY")}</li>
                        <li className="h5">{info._id}</li>   
                    </div>
                </div>
            </div>}
            </div>
            </Loading>
        </div>
    )
}

export default Viewprofile
