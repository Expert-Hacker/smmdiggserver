import React, { useEffect, useState } from 'react'
 import { Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField,Button, LinearProgress} from '@mui/material'
import Helmet from 'react-helmet';
function Modals(props) {
   const[order,setOrder]=useState([])
   const[loading,setLoading]=useState(true)
   const[disabled,setDisabled]=useState(true)
   const[selected,setselected]=useState(false)

   const[stat1sele,setstate1]=useState(false)
   const[stat2sele,setstate2]=useState(false)
   const[stat3sele,setstate3]=useState(false)
   const[stat4sele,setstate4]=useState(false)
   const[stat5sele,setstate5]=useState(false)
   const[stat6sele,setstate6]=useState(false)

   const[selectedValue,setselectedValue]=useState("")
   useEffect(() => {
    fetchOrder();
   }, [])
  async function fetchOrder()
   {

        try {
            console.log("KEERTHAN",props.id)
            setstate1(false)
            setstate2(false)
            setstate3(false)
            setstate4(false)
            setstate5(false)
            setstate6(false)
        
          
            let resp= await fetch(`/findbyOrderID/${props.id}`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                }
            })
            let data=await resp.json();
            setDisabled(false)
            setLoading(false)
            setOrder(data)
            // alert(data.status)
           
        
           switch (data.status) {
               case "Ordered":
                  return setstate1(true)
                   break;
                case "Pending":
                  return  setstate2(true)
                    break;
                case "inprogress":
                   return setstate3(true)
                    break;
                case "cancelled":
                   return setstate4(true)
                    break;
                case "completed":
                   return setstate5(true)
                    break;
                case "cancelledandferunded":
                   return setstate6(true)
                    break;
                    default:
                        setstate1(false)
                        setstate2(false)
                        setstate3(false)
                        setstate4(false)
                        setstate5(false)
                        setstate6(false)
        
           }
        } catch (error) {
            console.log("something wrong")
        }
  
   }
   function refresh()
   {
       fetchOrder()
   }
   async function changeStatus(e)
   {
        setselectedValue(e.target.value)
        
   }
   async function updatedOrder()
   {
        if(selectedValue=="cancelledandferunded")
        {
            let resp=await fetch(`/updateOrderstatusAndBalance/${props.id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    status:selectedValue,
                    user:props.user,
                    price:props.total
                    
                })
            })
            if(resp.status==200)
            {
                toast.success('Status updated and Refuned successfully!', {
                    position: "bottom-center",
                    autoClose: 3500,
                    draggable: false,
                    }); 
            }
            
        }
        else
        {
            let resp=await fetch(`/updateOrder/${props.id}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    status:selectedValue
                })
            })
            if(resp.status==200)
            {
                toast.success('Update Successfull!', {
                    position: "bottom-center",
                    autoClose: 3500,
                    draggable: false,
                    }); 
            }
        }
   }
    return (
        <div>
             <Modal show={props.modalShow}>
             <Helmet>
                <title>Update Order Status</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
                 <ToastContainer/>
                <Modal.Header >
                    {/* <h1>{props.total}</h1> */}
                    <Modal.Title><p>Order: {props.id}</p></Modal.Title>
                    <p><i class="fas fa-redo" onClick={refresh}></i></p>
                </Modal.Header>
                {loading ? <LinearProgress/> : ""}
                <Modal.Body>
                    <p><span className="font-weight-bold text-info">ID</span>: {order._id}</p>
                    <p><span className="font-weight-bold text-info">Category</span>: {decodeURIComponent(order.category)}</p>
                    <p><span className="font-weight-bold text-info">Name</span>: {order.service}</p>

                    <select disabled={disabled} onChange={changeStatus} className="form-control w-75"  name="" id="">
                        <option selected={stat1sele} value="Ordered">Ordered</option>
                        <option selected={stat2sele} value="Pending">Pending</option>
                        <option selected={stat3sele} value="inprogress">Inprogress</option>
                        <option selected={stat4sele} value="cancelled">Cancelled</option>
                        <option selected={stat5sele} value="completed">Completed</option>
                        <option selected={stat6sele} value="cancelledandferunded">Cancelled & Refunded</option>
                </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={disabled} onClick={updatedOrder} variant="contained" color="primary" >
                        UPDATE
                    </Button>
                    <Button variant="secondary"  onClick={props.onHide}>
                    Close
                </Button>
                </Modal.Footer>
                
            </Modal>
          
        </div>
    )
}

export default Modals
