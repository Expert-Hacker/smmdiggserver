import React, { useState } from 'react'
import {Offcanvas} from 'react-bootstrap'
import '../ad_header.css'
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import {TextField,Button,Tooltip,IconButton} from '@mui/material'
import {Link, useHistory} from 'react-router-dom'
function AdminHeader() {
    const[show,setShow]=useState(false)
    const history=useHistory();
    function showHideMenu()
    {
        setShow(true)
    }
    function handleClose()
    {
        setShow(false)
    }
    async function logout()
    {
        try {
            let resp= await fetch('/logout',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:'include'
            })
            if(resp.status==200)
            {
                history.push("/")
            }
        } catch (error) {
            alert("unable to logout")
        }
    }
    
  
    return (
        <div className="ad_div1 shadow-lg">
       
            <div className="container d-flex justify-content-between">
                
                <div className="ad_logo ">
                    <h5 className="m-0 p-3 text-white">Admin Dashboard</h5>
                </div>
                {/* <div className="d-flex">
                    <Tooltip title="Logout"><div ><p className="m-0 p-3"><i class="fas te fa-sign-out-alt" onClick={logout}></i></p></div></Tooltip>
                </div> */}
                <div className='d-flex'>
                    <i class="fas text-white m-auto fa-2x fa-bars" onClick={showHideMenu}></i>
                </div>
                
            </div>
            <Offcanvas className="ad_offcanvas text-white" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Admin Dashboard</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <li className='navlinkHover'><Link className='text-white ' to="/v1.1/admin-dashboard">Dashboard</Link></li>
                        <li className='navlinkHover'><Link className='text-white ' to="/v1.1/admin/users">Users</Link></li>
                        <li className='navlinkHover'><Link className='text-white ' to="/v1.1/admin/orders">Orders</Link></li>
                        <li className='navlinkHover'><Link className='text-white ' to="/v1.1/admin/update-order">Update Order</Link></li>
                        <li className='navlinkHover'><Link className='text-white ' to="/v1.1/admin/Allservices">Services</Link></li>
                        <li className='navlinkHover'><Link className='text-white ' to="/v1.1/admin/AllTransactions">Transactions</Link></li>
                        <li className='navlinkHover'><Link className='text-white ' to="/v1.1/admin/AllTickets">Tickets</Link></li>
                        <li className='navlinkHover'><Link className='text-white ' to="/v1.1/admin/Trashes">Trash</Link></li>
                        <li className='navlinkHover'><Link className='text-white ' to="/v1.1/admin/preferences">Preferences</Link></li>
                    </div>
                    <div className='d-flex flex-row'>
     
                        <li><Tooltip title="Logout"><div ><p className="m-0 p-3 text-white"><i class="fas text-white te fa-sign-out-alt" onClick={logout}></i></p></div></Tooltip></li>
                        
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
            
        </div>
    )
}

export default AdminHeader
