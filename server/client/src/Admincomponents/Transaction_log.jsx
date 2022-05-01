import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material';
import Helmet from 'react-helmet'
import AddTransaction from './AddTransaction';
import AdminHeader from './AdminHeader';

function Transaction_log() {
    const[transactions,setTransactions]=useState([])
    const[show,setShow]=useState(false)
    const[input,setInput]=useState("")
    const[Nouser,setNouser]=useState(false)
    useEffect(() => {
        fetchallTransactions();
    }, [])
    
    async function fetchallTransactions()
    {
        try {
            let resp=await fetch('/getallPaymentlists',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data=await resp.json();
            console.log("data1" , data)
            // console.log(data)
            setTransactions(data);
        } catch (error) {
         
        }
    }
    

    function showHide()
    {
        setShow(true)
    }
    function handleClose()
    {
        setShow(false)
    }
    async function searchUser()
    {
        try {
            
            if(input=="")
            {
                
                return fetchallTransactions();
            }
            let resp=await fetch(`/getTransactionByID/${input}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json()
            console.log("data2" , data)
            setTransactions(data)
          
            setNouser(false)
         
            if(resp.status==400)
            {
                setNouser(true);
            }
        } catch (error) {
            setNouser(true);
            // setOLaoding(false)
        }
    }
    function handleInput(e)
    {
        setInput(e.target.value)
    }
    return (
        <div>
             <AdminHeader/>
           
           
            <Helmet>
                <title>Transaction Logs</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            <div className='d-flex flex-column'>
                <div className='d-flex my-3 flex-row justify-content-around '>
                    <p className='my-auto my-auto'>Showing result of {transactions.length} Transactions</p>
                    <div className='d-flex'>
                        <TextField className=' my-auto mr-0' onChange={handleInput} size='small' label="Search User by ID"></TextField>
                        <Button onClick={searchUser}><i class="fa fa-2x fa-search"></i></Button>
                    </div>
                    <Button className=' my-auto' onClick={showHide}  variant='contained' color='success' size='small'>Add</Button>
                </div>
            <table class="table table-responsive">
            <thead class="thead-dark">
            <tr>
                <th scope="col">S.no</th>
                <th scope="col">User ID</th>
                <th scope="col">Payment ID</th>
                <th scope="col">Amount</th>
                <th scope="col">Method</th>
                <th scope="col">Email</th>
                <th scope="col">Created At</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody>
            {Nouser || transactions.length==0 ? <div><h5>No user found!</h5></div> :  transactions.map((trsns,indx)=>(
                    <tr>
                        
                    <th scope="row">{indx+1}</th>
                    <td>{trsns.user}</td>
                    <td>{trsns.paymentID}</td>
                    <td>{trsns.amount/100}</td>
                    <td>{trsns.method}</td>
                    <td>{trsns.email}</td>
                    <td>{moment(trsns.createdAt).format("dddd, MMMM Do YYYY, h:mm a")}</td>
                   
                    {trsns.status=="true" ? <td className='text-success font-weight-bold'>Success</td> : <td className='text-danger font-weight-bold'>Failed</td> }
                </tr>
                ))}
                
            </tbody>
            </table>
            <AddTransaction show={show} handleClose={handleClose}/>
            
            </div>
        </div>
    )
}

export default Transaction_log
