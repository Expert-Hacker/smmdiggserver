import moment from 'moment';
import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet';
import { useHistory } from 'react-router-dom';

function TicketList(props) {
    const[input,setInput]=useState("")
    const[msgs,setMsgs]=useState([])
    const[ticket1,Setticet]=useState("")
    const[screensht,setScreenshot]=useState("");
    let[path,setPath]=useState("")
    let history=useHistory();
    const fetchTickets =async () =>{
        let resp=await fetch(`/fetchTicket/${props.ticket}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
   
        Setticet(data[0]);
        setMsgs(data[0].descs)
        setScreenshot(data[0].screenshot)
        setPath(data[0].path)

    }
    useEffect(() => {
        authState();
        fetchTickets();
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
    function refresh()
    {
        fetchTickets();
    }
    const sendmessage =async()=>{
        let resp=await fetch(`/sendMessagebyAdmin/${props.ticket}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                desc:input
            })
        })
        let data=await resp.json();
        fetchTickets();
        if(resp.status==201)
        {
            alert("Message sent")
        }
    }
    function hangdleInput(e)
    {
        setInput(e.target.value)
    }
    return (
        <div>
         <Helmet>
                <title>View Ticket : {props.ticket}</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            <div>
                <i class="fas fa-2x fa-arrow-circle-left" onClick={props.handleClose}></i>
            </div>
            <div className="tick_detils p-2">
                <p>Ticket ID: {ticket1._id}</p>
                <p>Subject: {ticket1.subject}</p>
                {ticket1.request=="" ? "" : <p>request :{ticket1.request}</p>}
                {ticket1.orderID==null ? "" : <p>Order ID: {ticket1.orderID}</p>}
                {ticket1.payment=="" ? "": <p>Payment method :{ticket1.payment}</p> }
                <p>Status: {ticket1.status}</p>
                {ticket1.transactionID==null ? "" : <p>Transaction ID: {ticket1.transactionID}</p>}
                {screensht=="" ? "" : <div><p className="ttick_info font-weight-bold">screenshot: </p><img src={`https://www.smmdigg.in${path.replace('client/build','')}`} alt="screenshot" height="100px" width="100px" /><p className="text-dark h6"><a className="h6 text-dark" target="_blank" href={`https://www.smmdigg.in${screensht.replace('client/build','')}`}>OPEN IMAGE</a></p></div>}
            </div>
            {msgs.map((msg,indx)=>(
                <div>
                {msg.includes("support") ? <div className="d-flex my-4 ">
                    <div className="mb-auto">
                        
                            <i class="fas fa-2x tick_admn fa-headset mr-2"></i> 
                        
                    </div>
                    <div className="d-flex flex-column">
                        <div className="ad_tcket_div  my-0">
                            <span className="user_tcket  msg_font">{msg}</span>
                        </div>
                        <div className="tick_name_date">
                            <span className="msg_name">Support</span>
                            <span className="msg_date">{ticket1.date}</span>
                        </div>
                    </div>
                </div> : <div className="d-flex my-4 ">
                    <div className="mb-auto">
                         <i class="fas fa-2x tick_usr fa-user mr-2"></i> 
                        
                    </div>
                    <div className="d-flex flex-column">
                        <div className="user_tcket_div  my-0">
                            <span className="user_tcket  msg_font">{msg}</span>
                        </div>
                        <div className="tick_name_date">
                            <span className="msg_name">{ticket1.name}</span>
                            <span className="msg_date">{moment(ticket1.date).format("dddd, MMMM Do YYYY, h:mm a")}</span>
                        </div>
                    </div>
                </div> }
                    
            </div>
            ))}
            {ticket1.status=="Closed" ? <h4 className="text-danger font-weight-bold">THIS TICKET WAS CLOSED BY USER!</h4> : ""}
            <div>
                <textarea value={input} onChange={hangdleInput} className="form-control" name="" id="" cols="30" rows="10"></textarea>
            </div>
            <button onClick={sendmessage}>SEND</button>
        </div>
    )
}

export default TicketList
