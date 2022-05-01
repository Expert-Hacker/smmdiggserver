import React, { useEffect, useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import '../ad_dashboard.css'
import Helmet from 'react-helmet';
import AdminHeader from './AdminHeader';

function Dashboard() {
    const[userInfo,setuserInfo]=useState([])
    const[orderInfo,setorderInfo]=useState([])
    const[orderd,setOrderd]=useState([])
    const[pending,setPending]=useState([]);
    const[inprogrees,setinproess]=useState([])
    const[cancelled,setCanceled]=useState([])
    const[completed,setCompletdd]=useState([])
    const[cancelrefunded,setcancelrefunded]=useState([])
    const[loading,setLoading]=useState(true)
    const[ticket,setTickets]=useState([])

    const[closed,setClosed]=useState([])
    const[notAnswered,setNotAnswered]=useState([])
    
    useEffect(() => {
       fetchallUser();
       fetchOrderInfo();
       fetchTicket();
       fetchtClosedTicket();
       fetchNotAnsaweredTicket();
     
    }, [])
    async function fetchtClosedTicket()
    {
     let resp=await fetch('/fetchtClosedTicket',{
         method:"GET",
         headers:{
             "Content-Type":"application/json"
         }
     })
     let data= await resp.json();
     setClosed(data)
    }
    async function fetchNotAnsaweredTicket()
    {
     let resp=await fetch('/fetchNotAnsaweredTicket',{
         method:"GET",
         headers:{
             "Content-Type":"application/json"
         }
     })
     let data= await resp.json();
     setNotAnswered(data)
    }

    const fetchTicket =async()=>{
        let resp=await fetch('/fetchAllTickets',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setTickets(data)
       
    }

    async function fetchallUser()
    {
     let resp=await fetch('/fetchallUsers',{
         method:"GET",
         headers:{
             "Content-Type":"application/json"
         }
     })
     let data= await resp.json();
     setuserInfo(data)
    }

    async function fetchOrderInfo()
    {
     let resp1=await fetch('/fetchAllorders',{
         method:"GET",
         headers:{
             "Content-Type":"application/json"
         }
     })
     let data= await resp1.json();
     setorderInfo(data)

     let resp2=await fetch('/ad_filterby_ordered',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data2= await resp2.json();
    setOrderd(data2)

    let resp3=await fetch('/ad_filterby_pending',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data13= await resp3.json();
    setPending(data13)
    

    let resp4=await fetch('/ad_filterby_progress',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data4= await resp4.json();
    setinproess(data4)
    

    let resp5=await fetch('/ad_filterby_completed',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data5= await resp5.json();
    setCompletdd(data5)
    

    let resp6=await fetch('/ad_filterby_cancelled',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data6= await resp6.json();
    setCanceled(data6)
    

    let resp7=await fetch('/ad_filterby_cacelandrefunded',{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data7= await resp7.json();
    setcancelrefunded(data7)
    setLoading(false)
    }
    

   
    return (
        <div className="ad_cards_div d-flex ">
            
            <Helmet>
                <title>Admin Dashboard</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            {loading ? <LinearProgress/> : ""}
            <div className="ad_cards1 shadow-sm p-4 text-white">
                <h4><i class="fas fa-users p-2"></i> Users</h4>
                <p className="p-2 h5" >Total: <span className='font-weight-bold'>{userInfo.length}</span> </p>
            </div>
            <div className="ad_cards2 shadow-sm p-4 text-white">
                <h4><i class="far fa-folder-open p-2"></i> Orders</h4>
                <p className="p-2 h5" >Total: <span className='font-weight-bold'>{orderInfo.length}</span> </p>
                <p className="p-2">Ordred: <span className='font-weight-bold'>{orderd.length}</span> </p>
                <p className="p-2">Pending: <span className='font-weight-bold'>{pending.length}</span> </p>
                <p className="p-2">In progress: <span className='font-weight-bold'>{inprogrees.length}</span> </p>
                <p className="p-2">Cancelled: <span className='font-weight-bold'>{cancelled.length}</span> </p>
                <p className="p-2">Completed: <span className='font-weight-bold'>{completed.length}</span> </p>
                <p className="p-2">Cancelled & Refunded: <span className='font-weight-bold'>{cancelrefunded.length}</span> </p>
            </div>
            <div className="ad_cards3 shadow-sm p-4 text-white">
                <h4 className="p-2">Tickets: {ticket.length}</h4>
                <p className="p-2">Closed: {closed.length}</p>
                <p className="p-2">Not Answered: {notAnswered.length}</p>
            </div>
        </div>
    )
}

export default Dashboard
