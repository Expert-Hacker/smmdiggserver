import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import TicketList from './TicketList'
import {Button,TextField} from '@mui/material'
import Helmet from 'react-helmet'
import moment from 'moment'
import AdminHeader from './AdminHeader'
function Tickets() {
    const[ticket,setticket]=useState("")
    const[Tickets,setTickets]=useState([])
    const[show,setShow]=useState(true)
    const[status,setstatus]=useState('All')
    let history=useHistory();
    useEffect(() => {
        authState();
        fetchTicket();
    }, [])

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
    function ticketlist(id)
    {
        setticket(id)
        setShow(false);
    }
    function handleClose()
    {
        setShow(true)
    }
    function refresh()
    {
        fetchTicket();
    }
    function handlechangge(e)
    {
        setstatus(e.target.value)
        fetchbystatus(e.target.value);
    }
    async function fetchbystatus(stat)
    {
        
        let resp=await fetch(`/fetchTicketBystatus/${stat}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data=await resp.json();
        setTickets(data)
    }
    return (
        <div>
            <AdminHeader/>
            <Helmet>
                <title>Tickets</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            {show ? <> <div className="d-flex justify-content-around my-2">
                <span>Showing Result of {Tickets.length} Tickets</span>
                <i class="fas fa-sync-alt mr-4 fa-2x" onClick={refresh}></i>
                <select onChange={handlechangge} className="w-25 form-control" name="" id="">
                    <option value="all">All</option>
                    <option value="Closed">Closed</option>
                    <option value="Not Answered">Not Answered</option>
                </select>
            </div>
           
            <table class="table table-responsive">
            <thead class="thead-dark">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Ticket#</th>
                <th scope="col">User</th>
                <th scope="col">Subject</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                
                    {Tickets.map((tick,inx)=>(
                        <tr>
                                <th scope="row">{inx+1}</th>
                                <td onClick={()=>ticketlist(tick._id)}>{tick._id}</td>
                                <td>{tick.user}</td>
                                <td>{tick.subject}</td>
                                <td>{tick.status}</td>
                                <td>{moment(tick.date).format("dddd, MMMM Do YYYY, h:mm a")}</td>
                        </tr>
                    ))}
                
            </tbody>
            </table></> : <TicketList handleClose={handleClose} ticket={ticket}/>}
        </div>
    )
}

export default Tickets

