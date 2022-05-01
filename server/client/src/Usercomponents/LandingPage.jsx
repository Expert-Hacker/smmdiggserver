import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import { Link,useHistory } from 'react-router-dom'
import '../landingPage.css'
import Loading from '../Loading/Loading'
import Footer from './Footer'
import Header_landingPage from './Header_landingPage'
import Myorders from './Myorders'
import Neworder from './Neworder'
import Service from './Service'
import Support from './Support'
import UserDashboard from './UserDashboard'


function LandingPage() {
    const history=useHistory()
     const[loading,setLoading]=useState(true)
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
          history.push('/login')
        }
       
    }
    // authState();
}, [])

function status()
{
    setLoading(false)
}

    const[nav,setNav]=useState('dashboard')
    const decideNav = () =>{
        switch (nav) {
            case "dashboard":
                return <UserDashboard/>
            case "neworder":
                return <Neworder/>
            case "service":
                return <Service/>
            case "myorder":
                return <Myorders/>
            case "support":
                return <Support/>
            default:
                <h1>404 Error. page not found</h1>
        }
    }
    return (
        
        <div className='dashboard-header11 m-0'>
            <Helmet>
            <title>Dashboard</title>
            <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
            <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
            इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
            इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            <Header_landingPage postion="relative"/>
                <Loading isActive={loading}>
                    <div className="container land ">
                        <UserDashboard status={status}/>
                    </div>
                </Loading>
            <Footer/>
            
        </div>
        
    )
}

export default LandingPage
