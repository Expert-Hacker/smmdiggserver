import moment from 'moment';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Helmet } from 'react-helmet'
import CircularProgress from '@mui/material/CircularProgress';
import {TextField,Button, Snackbar, Tooltip, ClickAwayListener} from '@mui/material'
import { useHistory } from 'react-router-dom';
import Header_landingPage from './Header_landingPage'
import Footer from './Footer';
import Loading from '../Loading/Loading';
function TransactionLogs() {
    const[tOpen,settOpen]=useState(false)
    const[loading,setLoading]=useState(true)
    const[transactions,setTransactions]=useState([])
const[unauth,setUnauth]=useState(false)
let history=useHistory();
    useEffect(() => {
        authState();
      fetchTransactions();
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
            setUnauth(true)
            history.push('/login')
            
        }
    }

    async function fetchTransactions()
    {
        try {
            let resp=await fetch('/getPaymentlists',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data=await resp.json();
            setLoading(false)
            setTransactions(data);
        } catch (error) {
            setLoading(false)
        }
    }
    function handleTooltopOpen()
    {
        settOpen(true)
    }
    function handleTiiltipClose()
    {
        settOpen(false)
    }
    return (
        <div class="dashboard-header11">

            <Header_landingPage/>
            <Loading isActive={loading}>
            <div className='container'>
            
            {unauth ? <Snackbar
             open="true"
            message="Error :: Please Login" /> : ""}
            <div className="pay_tit my-3 d-flex justify-content-between">
                <h5 className='font-weight-bold'>Payment History</h5>
                
                <ClickAwayListener onClickAway={handleTiiltipClose}>
                <Tooltip placement='left-end'  open={tOpen} onClose={handleTiiltipClose}  title="Payments which made before 15-Dec-2021 was not displayed here. Contact admin for more info" disableFocusListener disableTouchListener disableHoverListener >
                    {/* <i class="fas text-dark fa-1x fa-bullhorn"  onClick={handleTooltopOpen}></i> */}
                    <button className='trans_btn' onClick={handleTooltopOpen}><i class="fas text-dark fa-1x fa-bullhorn" ></i></button>
                </Tooltip>
                </ClickAwayListener>
                
            </div>
            <Helmet>
                <title>Payment history</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            {!loading && transactions.length==0 ? 
            <div className='pay_load d-flex mt-5 flex-column'>
            <span className='mb-5 mt-2 h5'>No Transactions found!</span>
        </div>  :
          <div className=''>
            <table class="table table-responsive myordertablee " >
            <thead class="myordertable   text-center">
                <tr>
                <th scope="col">S.no</th>
                <th scope="col">Payment ID</th>
                <th scope="col">Amount</th>
                <th scope="col">Method</th>
                <th scope="col">Email</th>
                <th scope="col">Created At</th>
                <th scope="col">Status</th>
                </tr>
            </thead>
            <tbody className='bg-light'>
                {transactions.map((trsns,indx)=>(
                    <tr>
                        
                    <th scope="row">{indx+1}</th>
                    <td className="tddd">{trsns.paymentID}</td>
                    <td className="tddd">{trsns.amount/100}</td>
                    <td className="tddd">{trsns.method}</td>
                    <td className="tddd">{trsns.email}</td>
                    <td className="tddd">{moment(trsns.createdAt).format("dddd, MMMM Do YYYY")}</td>
                    {trsns.status ? <td className='text-success font-weight-bold'>Success</td> : <td className='text-danger font-weight-bold'>Failed</td> }
                </tr>
                ))}
            </tbody>
            </table>
         </div>

          
            }
        </div>
        </Loading>
        <Footer/>
        </div>
    )
}

export default TransactionLogs
