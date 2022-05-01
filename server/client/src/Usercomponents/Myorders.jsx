import React, { useEffect, useState } from 'react'
import '../myorder.css'
import Footer from './Footer'
import moment from 'moment'
import {TextField,Button,Tooltip,IconButton, Badge} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import Helmet from 'react-helmet'
import { useHistory } from 'react-router';
import Header_landingPage from './Header_landingPage'
import Loading from '../Loading/Loading'
function Myorders() {
    const[copied,setCopied]=useState(false);
    const[Linearproggrss,setLinearproggrss]=useState(false)
    const[display,setdisplay]=useState(false)
    const[orders,setOrders]=useState([])
    const[loading,setLoading]=useState(true)
    const[noResult,setNoresult]=useState(false)
    const[emptyOrder,setemptyorder]=useState(false)
    const[Lenth,setLenth]=useState("")
    let history=useHistory();
    useEffect(() => {
        authUser();
      fetchOrder();
    }, [])

    async  function authUser()
    {
       
            try {
                let resp=await fetch('/authUser',{
                    method:"GET",
                    headers:{
                      Accept:"application/json",
                      "Content-Type":"application/json"
                    },
                    credentials:'include'
                  })
                  let data=await resp.json()
               
            } catch (error) {
                history.push('/login')
            }

    }

    const fetchOrder =async()=>{
        setLinearproggrss(false)
        let resp= await fetch('/fetchorder',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data=await resp.json();
        setLoading(false)
        setLoading(false);
        setOrders(data)
        setLenth(data.length)
    console.log(data)
        if(data.length==0)
        {
            setemptyorder(true)
        }
    }
    function togglefilterbox()
    {
        document.getElementById('filterbox').classList.toggle('showfilterbox')
    }

    const filter1 =async (e) => {
        e.preventDefault();
        setLinearproggrss(true)
        document.getElementById('filterbox').classList.toggle('showfilterbox')
        let resp=await fetch('/filterby_ordered',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setNoresult(false)
      
        setOrders(data)
        if(data.length==0)
        {
            setNoresult(true)
        }
        setLinearproggrss(false)
    }
    const filter2 =async (e) => {
        e.preventDefault();
        setLinearproggrss(true)
        document.getElementById('filterbox').classList.toggle('showfilterbox')
        let resp=await fetch('/filterby_pending',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setNoresult(false)
      
        setOrders(data)
        if(data.length==0)
        {
            setNoresult(true)
        }
        setLinearproggrss(false)
    }
    const filter3 =async (e) => {
        e.preventDefault();
        setLinearproggrss(true)
        document.getElementById('filterbox').classList.toggle('showfilterbox')
        let resp=await fetch('/filterby_inprogress',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setNoresult(false)
     
        setOrders(data)
        if(data.length==0)
        {
            setNoresult(true)
        }
        setLinearproggrss(false)
    }
    const filter4 =async (e) => {
        e.preventDefault();
        setLinearproggrss(true)
        document.getElementById('filterbox').classList.toggle('showfilterbox')
        let resp=await fetch('/filterby_cancelled',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setNoresult(false)
     
        setOrders(data)
        if(data.length==0)
        {
            setNoresult(true)
        }
        setLinearproggrss(false)
    }
    const filter6 =async (e) => {
        e.preventDefault();
        setLinearproggrss(true)
        document.getElementById('filterbox').classList.toggle('showfilterbox')
        let resp=await fetch('/filterby_cancelledandrefunded',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setNoresult(false)
    
        setOrders(data)
        if(data.length==0)
        {
            setNoresult(true)
        }
        setLinearproggrss(false)
    }
    const filter5 =async (e) => {
        e.preventDefault();
        setLinearproggrss(true)
        document.getElementById('filterbox').classList.toggle('showfilterbox')
        let resp=await fetch('/completed',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data= await resp.json();
        setNoresult(false)
       
        setOrders(data)
        if(data.length==0)
        {
            setNoresult(true)
        }
        setLinearproggrss(false)
    }
   async function copy(id,indx)
    {
        if (navigator.clipboard != undefined)
        {
            await navigator.clipboard.writeText(id);
            setCopied(true);
            let btn=document.getElementById(`btn${indx}`);
            btn.innerHTML=`Copied <i class="far text-white ml-1 fa-check-circle"></i>`
            btn.style.backgroundColor="green"
            btn.style.color="white"
        }
        

    }
    return (
        <div class="dashboard-header11">
            <Header_landingPage/>
             <Helmet>
                <title>My orders</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            <Loading isActive={loading}>
            {Linearproggrss  ? <LinearProgress /> :"" }
            {!loading && orders.length<=0 ? <div class="noorderdiv d-flex flex-column justify-content-center align-items-center" style={{height:"400px"}}>
                <i class="fas fa-3x text-white fa-frown"></i>
                <span className="py-3 h4 text-white">No orders found!</span>
    
            </div> :
                    <div className='container'>
                    <div className=" controlsmyorder ">
                        <h5 className="my-2 myordhead  text-white"><i class="fas fa-people-carry text-white"></i> My orders</h5>
                        <h6 className="my-2  text-white myordhead">Total Orders {Lenth}</h6>
                        {/* <Tooltip placement="right" title="Filter"><IconButton><i class="fas my-2 fa-filter" onClick={togglefilterbox}></i></IconButton></Tooltip> */}
                        <div className="filterbox rounded shadow-lg" tabIndex="-1" id="filterbox">
                            <li className="filtertext" onClick={filter1}><i class="fas fa-list-ul"></i>  Ordered</li>
                            <li className="filtertext" onClick={filter2}><i class="far fa-clock"></i>  Pending</li>
                            <li className="filtertext" onClick={filter3}><i class="fas fa-hourglass-half"></i>  In progress</li>
                            <li className="filtertext" onClick={filter4}><i class="far fa-window-close"></i>  Cancelled</li>
                            <li className="filtertext" onClick={filter5}><i class="far fa-check-circle"></i>  Completed</li>
                            <li className="filtertext" onClick={filter6}><i class="fas fa-hand-holding-usd"></i>  Cancelled & Refunded</li>
                        </div>
                    </div>
                    
                    <table class="table myordertablee table-responsive ">
                    <thead class=" myordertable text-center">
                        <tr>
                        <th scope="col">SL.NO</th>
                        <th scope="col">CATEGORY</th>
                        {/* <th scope="col">SERVICE ID</th> */}
                        <th scope="col">SERVICE</th>
                        <th scope='col'>CHARGE <i class="fas fa-rupee-sign"></i></th>
                        <th scope="col">LINK</th>
                        <th scope="col">QUANTITY</th>
                        <th scope="col">STATUS</th>
                        <th scope="col">ORDER ID</th>
                        <th scope="col">CREATED AT</th>
                        </tr>
                    </thead>
                    
                    <tbody className='bg-light'>
                        {
                        orders.map((ord,ind)=>(
                        <tr className=' myorderTr' >
                            <td className="tddd" className='m-auto'>{ind+1}</td>
                            <td className="tddd">{decodeURIComponent(ord.category)}</td>
                            {/* <td className="tddd">{ord .ID}</td> */}
                            <td className="tddd">{ord.service}</td>
                            <td className="tddd">{ord.total.toFixed(2)}</td>
                            <td className="tddd ">{ord.link}</td>
                            <td className="tddd">{ord.qty}</td>
                            <td className="tddd">{ord.status=="Ordered" ? <p className='badge badge-secondary'>Ordered</p> : ord.status=="Pending" ? <p className='badge badge-warning'>Pending</p> : ord.status=="inprogress" ? <p className='badge badge-primary'>In Progress</p> : ord.status=="cancelled" ? <p className='badge badge-danger'>Cancelled</p> :ord.status=="cancelledandferunded" ? <p className='badge badge-danger'>Cancelled & Refunded</p>:ord.status=="completed" ? <p className='badge badge-success'>Completed</p> :""}</td>
                            {/* {ord.status=="Ordered" ? <p className="ordered">Ordered</p> : ord.status=="Pending" ? <p className="pending ">Pending</p> : ord.status=="inprogress" ? <p className="inprogress ">in progress</p>: ord.status=="cancelled" ? <p className="cancelled ">Cancelled</p> :ord.status=="cancelledandferunded" ? <p className="cancelledandferunded">Cancelled & Refunded</p>:ord.status=="completed" ? <p className="completed">Completed</p> :""} */}
                            <td className="tddd"><Button id={`btn${ind}`} className="copy" variant="contained" color="info" onClick={()=>copy(ord._id,ind)}><i class="far fa-clipboard mr-1"></i>Copy</Button>s{ord._id}</td>
                            <td className="tddd">{moment(ord.orderedAt).format("dddd, MMMM Do YYYY, h:mm a")}</td>
                        </tr>
                        ))} 
                    </tbody> 
                  
                    <div>
                   
                    </div> 
                    
                    </table>  
                    </div>
            }  
            </Loading>  
            <Footer/>
              
        </div>
    )
}

export default Myorders
// {loading ? <div className="d-flex flex-column justify-content-center align-items-center" style={{height:"200px"}}><CircularProgress/><p className="my-2">fetching your favourites...</p></div> :

// {emptyOrder ?  <div class="noorderdiv">
// <span className="py-3 display-6 text-danger">No orders Found!</span>
// </div> :


// {noResult ? <div>
//     <div className="noorderdiv"><span className="my-3 display-6 text-danger">No Results Found!</span></div>
// </div>: ""}


{/* <div>
<div className="container-fluid controlsmyorder">
    <h3 className="my-2 myordhead"><i class="fas fa-people-carry"></i> my orders</h3>
    <Tooltip placement="right" title="Filter"><IconButton><i class="fas my-2 fa-filter" onClick={togglefilterbox}></i></IconButton></Tooltip>
    <div className="filterbox rounded shadow-lg" tabIndex="-1" id="filterbox">
        <li className="filtertext" onClick={filter1}><i class="fas fa-list-ul"></i>  Ordered</li>
        <li className="filtertext" onClick={filter2}><i class="far fa-clock"></i>  Pending</li>
        <li className="filtertext" onClick={filter3}><i class="fas fa-hourglass-half"></i>  In progress</li>
        <li className="filtertext" onClick={filter4}><i class="far fa-window-close"></i>  Cancelled</li>
        <li className="filtertext" onClick={filter5}><i class="far fa-check-circle"></i>  Completed</li>
        <li className="filtertext" onClick={filter6}><i class="fas fa-hand-holding-usd"></i>  Cancelled & Refunded</li>
    </div>
</div>

<table class="table table-bordered table-responsive">
<thead class="thead-dark">
    <tr>
    <th scope="col">SL.NO</th>
    <th scope="col">CATEGORY</th>
    <th scope="col">SERVICE</th>
    <th scope="col">LINK</th>
    <th scope="col">QUANTITY</th>
    <th scope="col">STATUS</th>
    <th scope="col">ORDER ID</th>
    <th scope="col">CREATED AT</th>
    </tr>
</thead>

<tbody>
    {
    orders.map((ord,ind)=>(
    <tr>
        <td>{ind+1}</td>
        <td>{ord.category}</td>
        <td>{ord.service}</td>
        <td>{ord.link}</td>
        <td>{ord.qty}</td>
        {ord.status=="Ordered" ? <p className="ordered ">Ordered</p> : ord.status=="Pending" ? <p className="pending ">Pending</p> : ord.status=="inprogress" ? <p className="inprogress ">in progress</p>: ord.status=="cancelled" ? <p className="cancelled ">Cancelled</p> :ord.status=="cancelledandferunded" ? <p className="cancelledandferunded">Cancelled & Refunded</p>:ord.status=="completed" ? <p className="completed">Completed</p> :""}
        <td>{ord._id}</td>
        <td>{moment(ord.orderedAt).format("dddd, MMMM Do YYYY, h:mm a")}</td>
    </tr>
    ))} 
</tbody>  

</table>  
</div>  */}