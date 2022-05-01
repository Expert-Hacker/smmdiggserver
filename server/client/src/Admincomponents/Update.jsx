import Modals from '../Admincomponents/Modals'
// import {Modal,Button,Form} from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet';
import moment from 'moment';
import { Button } from '@mui/material';
import AdminHeader from './AdminHeader';

function Update() {
    const[orders,setOrders]=useState([]);
    const[noorders,setnoOrders]=useState(false);
    const[modalShow,setmodalShow]=useState(false)
    const[total, setTotal]=useState()
    const[id,setId]=useState()
    const[user,setUser]=useState()
    useEffect(() => {
        fetchAllorders1();
    }, [])
    
    async function fetchAllorders1()
    {
        let resp= await fetch('/fetchAllorders1',{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })
        let data=await resp.json();
        setOrders(data)
        console.log(data)
       
    }
    async function selectStatus(e)
    {
       
        let resp= await fetch(`/fetchAllorders/${e.target.value}`,{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })
        let data=await resp.json();
        
        setOrders(data)
        
    }
    function editOrder(id,tot,usr)
    {
        setmodalShow(true)
        setId(id)
        console.log("ID", id)
        setTotal(tot)
        setUser(usr)
    }
    function handleClose()
    {
        setmodalShow(false)
    }
    function refresh()
    {
        fetchAllorders1();
    }
    return (
        <div>
            <AdminHeader/>
            <div className="top_ad ">
            <Helmet>
                <title>Update order</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
               <div className='top_ad_user d-flex d-flex flex-row justify-content-between'>
                <h5 className="p-3">Update orders</h5>
                    <p className="p-3 h6">Showing Result of {orders.length} Orders</p>
                    <Button ><i class="fas  fa-sync fa-2x" onClick={refresh}></i></Button>
                    {/* <TextField   id="standard-basic" type="text" label="Search Here" name="search" variant="standard"  /> */}
                    <div className="p-3">
                        <select className="form-control w-75" onChange={selectStatus} name="" id="">
                        
                            <option value="Ordered">Ordered</option>
                            <option value="Pending">Pending</option>
                            <option value="inprogress">Inprogress</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="completed">Completed</option>
                            <option value="cancelledandferunded">Cancelled & Refunded</option>
                        </select>
                    </div>
               </div>
            </div>
            <table class="table table-responsive">
            <thead class="thead-dark">
                <tr>
                <th scope="col">SL.NO</th>
                <th scope="col">ORDER ID</th>
                <th scope="col">ACTION</th>
                <th scope="col">AMOUNT</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">NO - SERVICE</th>
                <th scope="col">QTY</th>
                <th scope="col">ORDRED AT</th>
                <th scope="col">STATUS</th>
               
                <th scope="col">LINK</th>
                <th scope="col">USER ID</th>
                </tr>
            </thead>
            <tbody>
               
                 {noorders ? <h4 className="my-2 text-danger">We could't find any user with</h4> : orders.map((info,index)=>(
                     <tr>
                    <td>{index+1}</td>
                    <td>{info._id}</td> 
                    <td><i class="far fa-edit" onClick={()=>editOrder(info._id, info.total,info.user)}></i></td>
                    <td>{info.total.toFixed(2)}</td>
                    <td>{decodeURIComponent(info.category)}</td>
                    <td>{info.ID} - {info.service}</td>
                    <td>{info.qty}</td>
                    <td>{moment(info.orderedAt).format("dddd, MMMM Do YYYY")}</td>
                    <td>{info.status=="Ordered" ? <p className="ordered ">Ordered</p> : info.status=="Pending" ? <p className="pending ">Pending</p> : info.status=="inprogress" ? <p className="inprogress ">in progress</p>: info.status=="cancelled" ? <p className="cancelled ">Cancelled</p> :info.status=="cancelledandferunded" ? <p className="cancelledandferunded">Cancelled & Refunded</p>:info.status=="completed" ? <p className="completed">Completed</p> :""}</td>
                    
                    <td>{info.link}</td>
                    <td>{info.user}</td>
                    </tr>
                ))
                
                } 
            
            </tbody>
                <Modals modalShow={modalShow} onHide={handleClose} id={id} total={total} user={user}/>
            </table>
                   
        </div>
    )
}

export default Update
