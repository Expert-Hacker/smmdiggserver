import React, { useEffect, useState } from 'react'
import { Link,useHistory } from 'react-router-dom'
import '../ticketlist.css'
import {LinearProgress, CircularProgress,Button} from '@mui/material'
import Viewticket from './Viewticket'
import Helmet from 'react-helmet'
function TicketList() {
    const[loading,setLoading]=useState(true)
    const[ticket,setTicket]=useState([])
    const[ticketID,setTicketID]=useState("")
    const[show,setShow]=useState(false)
    useEffect(() => {
      fetchTickets();
    }, [ticket])
    const fetchTickets =async () =>{
        let resp=await fetch('/fetchTickets',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
   
        setLoading(false)
        setTicket(data)
    }
    function refresh()
    {
        fetchTickets();
    }
    function viewTickets(id)
    {
        setShow(true)
        setTicketID(id)
    }
    function hideit()
    {
        setShow(false)
    }

    // if(ticket.length>=1)
    // {
        return (
            
            <div className="ticket_header1">
                 <Helmet>
                <title>Tickets</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
               { show ? <Viewticket id={ticketID} hideit={hideit}/> :
                    loading ? <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"400px"}}><CircularProgress style={{'color': 'white'}}/><p className="my-2 text-white">Fetching your Tickets...</p></div> : 
                    <div>
                        <div className="d-flex flex-row ticket_header ticketlist">
                            <h4 className=" p-2"><i class="fas mr-2 fa-1x fa-ticket-alt"></i>My Tickets </h4>
                            <i class="fas ticket_refresh fa-sync-alt mr-2" onClick={refresh}></i>
                        </div>
                        {ticket.length>=1 ? <div>
                            <div className="py-2">
                            <span  className="text-white">Tickets: {ticket.length}</span>
                        </div>
                        <div>
                            {ticket.map((tick,indx)=>(
                                    <div className="d-flex shadow-sm ticket_list_bg my-2 flex-row" onClick={()=>viewTickets(tick._id)}>
                                        <div className="mt-auto pl-2 mb-auto ml-2">
                                            <i class="fas fa-2x fa-ticket-alt"></i>
                                        </div>
                                        <div className="d-flex ml-5 flex-column my-3">
                                            <div className="d-flex flex-row">
                                                <div className="d-flex flex-column justify-content-between">
                                                   <span className="text-dark subject_t font-weight-bold"> {tick.subject}</span>
                                                </div>
                                                <div>
                                                {tick.status=="Answered"  ? <Button className="font-weight-bold status_btn_tick"  id="closeBtn" color="success" size="small" variant="text"><i class="fas mr-1 fa-1x fa-ticket-alt"></i>{tick.status}</Button> : <Button className="font-weight-bold status_btn_tick"  id="closeBtn" color="error" size="small" variant="text"><i class="fas mr-1 fa-1x fa-ticket-alt"></i>{tick.status}</Button>}    
                                                </div>
                                            </div>
                                            <div className="d-flex">
                                             <span className="ticket_t mr-1">Ticket ID:</span><span className="ticket_t_nm">{tick._id}</span>
                                            </div>
                                        </div>  
                                    </div>
                                
                            ))}
                        </div>
                        </div> : <div>
                 <div className='allTickets d-flex flex-column'>
                    <h6><i class="far fa-3x fa-frown"></i></h6>
                     <h5>Look like you don't have ticket</h5>
                 </div>
                
             </div> }
                    </div>
                    
               }
            </div>
                
        )
    }


export default TicketList
