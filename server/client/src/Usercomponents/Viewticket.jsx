import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, CircularProgress, TextField} from '@mui/material'
import moment from 'moment';
import Helmet from 'react-helmet';
function Viewticket(props) {
    const[disabled,setDisabled]=useState(false)
    const[loading,setLoading]=useState(true)
    const[message,setMessage]=useState([])
    const[input,setInput]=useState("")
    const[details,setDetails]=useState([])
    const[msgError,setmsgError]=useState(false)
    const[clsBtn,setclsbtn]=useState(false)
    const[btndisabled,setbtndisabled]=useState(false)
    useEffect(() => {
       getticketDetails();
       fetchMessages();
    }, [])
async function getticketDetails()
{
    let resp=await fetch(`/fetchTicket/${props.id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data=await resp.json();
    setDetails(data)
    setLoading(false)
   
    if(data[0].status=="Closed")
    {
        setDisabled(true)
    }
}
async function fetchMessages()
{
    let resp=await fetch(`/fetchMessage/${props.id}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    })
    let data=await resp.json();
    setLoading(false)
    setMessage(data)
}
function handlechange(e)
{
    setInput(e.target.value)
}
const sendMessage =async()=>{
    setbtndisabled(true)
    let resp=await fetch(`/sendMessage/${props.id}`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            desc:input
        })
    })
    let data=await resp.json();
    setInput("")
    getticketDetails();
   
    if(resp.status==201)
    {
        toast.success('Message sent Successfully', {
            position: "bottom-center",
            autoClose: 3000,
            draggable: false,
            }); 
            setbtndisabled(false)
    }
    else if(resp.status==400)
    {
        toast.error(`${data.resp}`, {
            position: "bottom-center",
            autoClose: 3000,
            draggable: false,
            }); 
            setbtndisabled(false)
    }
    else
    {
        toast.error('Message not sent', {
            position: "bottom-center",
            autoClose: 3500,
            draggable: false,
            }); 
            setbtndisabled(false)
    }

}
function refresh()
{
    getticketDetails();
}
const updateTicketstatus =async()=>{
    try {
        setclsbtn(true)
        let resp=await fetch(`/updateTicketStatus/${props.id}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                status:"Closed"
            })
        })
        if(resp.status==200)
        {
            setDisabled(true)
            document.getElementById('closeBtn').innerHTML=`<i class="fas mr-2 fa-1x fa-ticket-alt"></i>Closed`
            setclsbtn(false)
        }
    } catch (error) {
        toast.error('Unable to close this Ticket, please contact support', {
            position: "bottom-center",
            autoClose: 3500,
            draggable: false,
            }); 
            setclsbtn(false)
    }
}

    return (
        <div>
             <Helmet>
                <title>View Ticket</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            <div className="view-ticket d-flex flex-row justify-content-between">
                <h4 className="p-2"> <i class="fas fa-1x mr-2 fa-arrow-circle-left" onClick={props.hideit}></i> View ticket</h4>
                <i class="fas ticket_refresh fa-sync-alt mr-2" onClick={refresh}></i>
            </div>
        {loading ? <h4 className="my-5 text-center text-white">Loading...</h4> :
            <div>
                {details.map((tick,indx)=>(
                    <>
                    <div className="tick_detils p-2 mt-2">
                        <div><p className="ttick_info text-white font-weight-bold">Ticket ID: </p>{tick._id}</div>
                        <div><p className="ttick_info text-white font-weight-bold">Subject: </p> {tick.subject}</div>

                        {tick.screenshot=="" ? "" : <div><p className="ttick_info text-white font-weight-bold">screenshot: </p><img src={`https://www.smmdigg.in${tick.path.replace('../client/images','')}`} alt="screenshot" height="100px" width="100px" /><p className="text-dark h6"><a className="h6 text-dark" target="_blank" href={`https://www.smmdigg.in${tick.path.replace('client/build','')}`}>OPEN IMAGE</a></p></div>}

                        <div>{tick.request== "" ? "" : <p className="ttick_info text-white font-weight-bold">request :</p>}{tick.request}</div>
                        <div>{tick.orderID==null ? "" : <p className="ttick_info text-white font-weight-bold">Order ID: </p>}{tick.orderID}</div>
                        <div>{tick.payment=="" ? "": <p className="ttick_info text-white font-weight-bold">Payment method :</p> }{tick.payment}</div>
                        
                        <div>{tick.transactionID=="" ? "" : <p className="ttick_info text-white font-weight-bold">Transaction ID: </p>}{tick.transactionID}</div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <p className="ttick_info text-white font-weight-bold">Status: </p>{tick.status}        
                            </div>
                            <div>
                                <Button disabled={clsBtn} onClick={updateTicketstatus} id="closeBtn" color="warning" size="small" variant="contained"><i class="fas mr-2 fa-1x fa-ticket-alt"></i>{tick.status=="Not Answered" ? "CLOSE TICKET" : tick.status=="Closed" ? "CLOSED" : tick.status=="Answered" ? "CLOSE TICKET" : "CLOSE"}</Button>
                            </div>
                        </div>
                        <div>
                        <span className="msg_date text-primary">{moment(tick.date).format("dddd, MMMM Do YYYY, h:mm a")}</span>
                        </div>
                    </div>
                    <div className="">
                        {tick.descs.map((msgs,indx)=>(
                            <div>
                                {msgs.includes("support") ? <div className="d-flex my-4 ">
                                    <div className="mb-auto">
                                        
                                            <i class="fas fa-2x tick_admn fa-headset mr-2"></i> 
                                        
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="ad_tcket_div  my-0">
                                            <span className="user_tcket  msg_font">{msgs}</span>
                                        </div>
                                        <div className="tick_name_date">
                                            <span className="msg_name">Support</span>
                                            {/* <span className="msg_date">{moment(tick.date).format("dddd, MMMM Do YYYY, h:mm a")}</span> */}
                                        </div>
                                    </div>
                                </div> : <div className="d-flex my-4 ">
                                    <div className="mb-auto">
                                         <i class="fas fa-2x tick_usr fa-user mr-2"></i> 
                                        
                                    </div>
                                    <div className="d-flex flex-column">
                                        <div className="user_tcket_div  my-0">
                                            <span className="user_tcket  msg_font">{msgs}</span>
                                        </div>
                                        <div className="tick_name_date">
                                            <span className="msg_name">{tick.name}</span>
                                            {/* <span className="msg_date">{moment(tick.date).format("dddd, MMMM Do YYYY, h:mm a")}</span> */}
                                        </div>
                                    </div>
                                </div> }
                                    
                            </div>
                        ))}
                        
                    </div>
                    
                    </>
                ))}
            </div>
}

            <div className="mt-5 mb-2" >
                <TextField hidden={disabled} className="form-control" value={input} onChange={handlechange} name=""  id="msg" cols={30} rows={2} helperText={msgError ? "Please fill this field" : ""} error={msgError} multiline></TextField>
                <div className='d-flex my-3'>
                    <Button hidden={disabled} disabled={btndisabled}  color='warning' variant="contained" className="mt-auto mb-auto mr-4" onClick={sendMessage}>SEND</Button>
                    {btndisabled ? <CircularProgress style={{'color': 'white'}}/> : ""}
                </div>
            </div>
           
        </div>
    )
}

export default Viewticket
