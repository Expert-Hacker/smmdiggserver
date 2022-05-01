import React, { useEffect, useState } from 'react'
import '../userDashboard.css'
import LinearProgress from '@mui/material/LinearProgress';
import {TextField,Button, Snackbar, Paper, IconButton, Alert} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import Helmet from 'react-helmet';
import Loading from '../Loading/Loading'
import whatsappLogo from '../../src/images/whatsappBtn.png'
function UserDashboard(props) {
    const[open,setOpen]=useState(false)
    const[info,setInfo]=useState([])
    const[balance,setBalance]=useState(0)
    const[totalOrders,settotalorder]=useState(0)
    const[completed,setcomplted]=useState(0)
    const[pending,setpending]=useState(0)
    const[cancelled,setcancelled]=useState(0)
    const[loading,setLoading]=useState(true)
    const[ticket,setTicket]=useState(0)
    const[inprogress,setInprogress]=useState(0);
    const[pageLoading,setPageLoading]=useState(false)

    const[poopup,setPopup]=useState(true)

    const authStatee=async()=>{
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
            
             setBalance(data[0].balance);
        } catch (error) {
            setOpen(true)
        }
       
    }

    const totalorderss=async()=>{
        let resp=await fetch('/fetchorder',{
          method:"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:'include'
        })
        let data=await resp.json();
      
       settotalorder(data.length) 
    }

    async function Inprogresss()
        {
            let resp=await fetch('/filterby_inprogress',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json();
     
            setInprogress(data.length)
        }

        async function completedd()
        {
            let resp=await fetch('/completed',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json();
         
            setcomplted(data.length)
        }

        async function pendingg()
        {
            let resp=await fetch('/filterby_pending',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json();
            setpending(data.length)
        }

        async function cancelledd()
        {
            let resp=await fetch('/filterby_cancelled',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json();
            setcancelled(data.length)
            setLoading(false)
        }
    
          const fetchTicketss =async () =>{
              let resp=await fetch('/fetchTickets',{
                  method:"GET",
                  headers:{
                      "Content-Type":"application/json"
                  }
              })
              let data= await resp.json();
          
              setTicket(data.length);
              props.status();
              setLoading(false)
          }
          
    useEffect(() => {
        messageForUser();
        authStatee();
        totalorderss();
        Inprogresss();
        completedd();
        pendingg();
        cancelledd();
        fetchTicketss();
       

    }, [])
    function messageForUser()
    {
        if(!(localStorage.getItem('userMessage')))
        {
            setPopup(true)
            localStorage.setItem('userMessage',true);
        }
        else
        {
            setPopup(false)
        }
    }
    function handleclose()
    {
        setPopup(false)
    }
    const action = (
        <React.Fragment>
        
         <Button onClick={handleclose} variant="contained" color="primary">OK</Button>
        </React.Fragment>
      );
 
    return (
    <div>
        <div className="container overflow">
            <Helmet>
                <title>Dashboard</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
             {open ? <Snackbar
             open="true"
            message="Error :: Please Login" /> : ""}

            {/* {loading ? <LinearProgress/> : ""} */}
            <div className="dashboard-header d-flex m-auto row justify-content-center p-2">
                {/* <div className='whatsappChatDiv'>
                    <a href="https://wa.me/916361027573" target="_blank"><img src={whatsappLogo} alt="" height="80px" width="80px"/></a>
                </div> */}


            <h4 className='font-weight-bold text-white'>Dashboard</h4>
                <Paper elevation={3} className='d-flex flex-row col-sm  m-4'>
                {/* <div className="shadow rounded d-flex flex-row col-sm  m-4"> */}
                    <div className="col-6 mt-auto mb-auto">
                        <i class="fas fa-3x fa-money-bill-alt py-2"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1">Your balance</p>
                        <p className="h6 font-weight-bold dashboardnames pb-4">{(balance.toFixed(2))}</p>
                   </div>
                {/* </div> */}
                </Paper>
                <Paper elevation={3} className='d-flex flex-row col-sm  m-4'>
                {/* <div className="shadow rounded d-flex flex-row col-sm  m-4"> */}
                    <div className="col-6 mt-auto mb-auto">
                    <i class="fas fa-shopping-cart fa-3x py-2"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1">Total Orders</p>
                        <p className="h6 font-weight-bold dashboardnames pb-4">{totalOrders}</p>
                   </div>
                {/* </div> */}
                </Paper>
                <Paper elevation={3} className='d-flex flex-row col-sm  m-4'>
                {/* <div className="shadow rounded d-flex flex-row col-sm  m-4"> */}
                    <div className="col-6 mt-auto mb-auto">
                    <i class="fas fa-clock fa-3x"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1">In Progress</p>
                        <p className="h6 font-weight-bold dashboardnames pb-4 ">{inprogress}</p>
                   </div>
                {/* </div> */}
                </Paper>
                <Paper elevation={3} className='d-flex flex-row col-sm  m-4'>
                {/* <div className="shadow rounded d-flex flex-row col-sm  m-4"> */}
                    <div className="col-6 mt-auto mb-auto">
                    <i class="fas fa-check fa-3x py-2 text-success"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1 pr-3">Completed</p>
                        <p className="h6 font-weight-bold dashboardnames  pb-4">{completed}</p>
                   </div>
                   </Paper>
                {/* </div> */}
                <Paper elevation={3} className='d-flex flex-row col-sm  m-4'>
                {/* <div className="shadow rounded d-flex flex-row col-sm  m-4"> */}
                    <div className="col-6 mt-auto mb-auto">
                        <i class="fas fa-lightbulb fa-3x py-2 text-warning"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1">Pending</p>
                        <p className="h6 font-weight-bold dashboardnames pb-4">{pending}</p>
                   </div>
                {/* </div> */}
                </Paper>
                <Paper elevation={3} className='d-flex flex-row col-sm  m-4'>
                {/* <div className="shadow rounded d-flex flex-row col-sm  m-4"> */}
                    <div className="col-6 mt-auto mb-auto">
                    <i class="far fa-times-circle fa-3x py-2 text-danger"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1">Cancelled</p>
                        <p className="h6 font-weight-bold dashboardnames pb-4">{cancelled}</p>
                   </div>
                {/* </div> */}
                </Paper>
                <Paper elevation={3} className='d-flex flex-row col-sm  m-4'>
                {/* <div className="shadow tickts_div_dashboard rounded d-flex flex-row col-sm  m-4"> */}
                    <div className="col-6 mt-auto mb-auto">
                    <i class="fas fa-ticket-alt fa-3x py-2 text-secondary"></i>
                    </div>
                   <div className="col-6">
                        <p className="h4 font-weight-bold dashboardnames pt-4 pb-1">Total Tickets</p>
                        <p className="h6 font-weight-bold dashboardnames pb-4">{ticket}</p>
                   </div>
                {/* </div> */}
                </Paper>
            </div>
        </div>
        <div>
      
      {poopup ? <Snackbar 
        open={poopup}
        autoHideDuration={6000}
        onClose={handleclose}
        // message="SMMDIGG is now having New Look!"
        action={action}
      ><Alert severity='info' className="bg-warning" sx={{ width: '100%' }}><p className='h6 p-0 m-0'>SMMDIGG is now has a New Look!</p></Alert></Snackbar> : ""}
    </div>
    </div>
    )
}

export default UserDashboard
