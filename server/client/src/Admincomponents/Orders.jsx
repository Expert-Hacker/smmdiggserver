import React, { useEffect, useState } from 'react'
import {TextField,Button} from '@mui/material'
import moment from 'moment';
import Helmet from 'react-helmet';
import Add_order from './Add_order';
import AdminHeader from './AdminHeader';
import Modals from './Modals';
import { FormControl, InputGroup } from 'react-bootstrap';
import Loading from '../Loading/Loading';
function Orders() {
    const[deleting,setDeleting]=useState(false)
    const[loading,setLoading]=useState(true)
    const[orders,setOrders]=useState([]);
    const[show,setShow]=useState(false)
    const[modalShow,setmodalShow]=useState(false)
    const[total, setTotal]=useState()
    const[id,setId]=useState()
    const[user,setUser]=useState()
    const[Searchorder,setSearchorder]=useState("")
    useEffect(() => {
        fetchAllorders();
    }, [])
    async function fetchAllorders()
    {setLoading(true)
        let resp= await fetch('/fetchAllorders1',{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })
        let data=await resp.json();
        setOrders(data)
        setLoading(false)
      
    }
    async function selectStatus(e)
    {
        setLoading(true)
        let resp= await fetch(`/fetchAllorders/${e.target.value}`,{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })
        let data=await resp.json();
        setOrders(data)
        setLoading(false)
    }
  async  function deleteOrder(id)
    {
        setLoading(true)
        let confm=window.confirm('Are sure to delete this Order?');
        if(confm)
        {
            setDeleting(true)
            let resp=await fetch(`/deleteOrder/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data=await resp.json();
        setLoading(false)
        if(resp.status==200)
        {
            fetchAllorders();
            setDeleting(false)
        }
        }
        
    }
    function createOrder()
    {
        setShow(true)
    }
    function handleClose()
    {
        setShow(false);
    }
    function handleClose2()
    {
        setmodalShow(false)
    }
    function editOrder(id,tot,usr)
    {
        setmodalShow(true)
        setId(id)
        console.log("ID", id)
        setTotal(tot)
        setUser(usr)
    }
    function handleinputsearchorder(e)
    {
        setSearchorder(e.target.value)
    }
    async function searchorderbyidbtn()
    {
        if(Searchorder=="")
        {
            return
        }
        setLoading(true)
        let resp=await fetch(`/searchOrderbyid/${Searchorder}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data=await resp.json();
        if(resp.status==200)
        {
            setOrders([data]) 
            setLoading(false)
        }
        else
        {
            setLoading(false)
            alert("No result found!")
        }
    }
    return (
        <div>
            <AdminHeader/>
            <Loading isActive={loading}>
            <div className="top_ad d-flex flex-row justify-content-around">
              
            <Helmet>
                <title>Orders</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            
                <div className="deleteStatus">
                   {deleting ?  <span class="deleting">Deleting...</span> : ""}
                </div>
                {/* <h5 className="p-3">Orders</h5> */}
                <p className="p-3 h6">Showing Result of {orders.length} Orders</p>
                <InputGroup className="my-3">
                    <FormControl  onChange={handleinputsearchorder} name="text"
                        placeholder="Enter Order ID"
                        aria-label="Enter Order ID"
                        aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-dark" onClick={searchorderbyidbtn} className='bg-dark' id="button-addon2">
                        <i class="fas text-white fa-search" ></i>
                        </Button>
                    </InputGroup>
                
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
                <div className='d-flex'>
                    <Button className='mt-auto mb-auto' variant='contained' color="info" onClick={createOrder}>Add Order</Button>
                </div>
                
            </div>
           <table class="table table-responsive">
            <thead class="thead-dark">
                <tr>
                <th scope="col">SL.NO</th>
                <th scope="col">ACTION</th>
                <th scope="col">USER ID</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">NO - SERVICE</th>
                <th scope="col">QTY</th>
                <th scope="col">STATUS</th>
                <th scope="col">AMOUNT</th>
                <th scope="col">LINK</th>
                <th scope="col">ORDER ID</th>
                <th scope="col">CREATED AT</th>
                </tr>
            </thead>
            <tbody>
               
                {orders.map((info,index)=>(
                     <tr key={index}>
                    <td>{index+1}</td>
                    <td><i class="fas fa-trash-alt mr-3" onClick={()=>deleteOrder(info._id)}></i><i class="far fa-edit" onClick={()=>editOrder(info._id, info.total,info.user)}></i></td>
                    <td>{info.user}</td>
                    <td>{decodeURIComponent(info.category)}</td>
                    <td>{info.ID} - {info.service}</td>
                    <td>{info.qty}</td>
                    <td> {info.status=="Ordered" ? <p className="ordered ">Ordered</p> : info.status=="Pending" ? <p className="pending ">Pending</p> : info.status=="inprogress" ? <p className="inprogress ">in progress</p>: info.status=="cancelled" ? <p className="cancelled ">Cancelled</p> :info.status=="cancelledandferunded" ? <p className="cancelledandferunded">Cancelled & Refunded</p>:info.status=="completed" ? <p className="completed">Completed</p> :""}</td>
                    <td>{info.total.toFixed(2)}</td>
                    <td>{info.link}</td>
                    <td>{info._id}</td>
                    <td>{moment(info.orderedAt).format("dddd, MMMM Do YYYY, h:mm a")}</td>
                    </tr>
                ))}
                
            </tbody>
            </table>
            
            <Add_order show={show} handleClose={handleClose}/>
            <Modals modalShow={modalShow} onHide={handleClose2} id={id} total={total} user={user}/>
            </Loading>
        </div>
    )
}

export default Orders
