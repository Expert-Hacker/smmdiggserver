import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

function AddTransaction(props) {
    const[userid,setuserId]=useState();
    const[paymentid,setpaymentId]=useState();
    const[amount,setamount]=useState();
    const[method,setmethod]=useState();
    const[email,setemail]=useState();
    const[status,setstatus]=useState();

    function handleUserChange(e)
    {
        setuserId(e.target.value)
    }
    function handlePaymentChange(e)
    {
        setpaymentId(e.target.value)
    }
    function handleAmtChange(e)
    {
        setamount(e.target.value)
    }
    function handlemethodChange(e)
    {
        setmethod(e.target.value)
    }
    function handleEMailChange(e)
    {
        setemail(e.target.value)
    }
    function handleStatusChange(e)
    {
        setstatus(e.target.value)
    }
    
   async function addPaymentdetails()
    {
        console.log(userid , paymentid, amount , method , email , status)
        let resp=await fetch("/createManualPaymnt",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                userid , paymentid, amount , method , email , status
            })
        })
        if(resp.status==201)
        {
            alert("Payment details added successfully")
        }
        else
        {
            alert("Unable to add payment details")
        }
    }

    return (
        <div>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Manual Transaction Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <TextField className=" my-2" variant="outlined" onChange={handleUserChange} value={userid} label="User ID" fullWidth type="text"/>
                        <TextField className=" my-2" variant="outlined" onChange={handlePaymentChange} value={paymentid} label="Payment ID" fullWidth type="text"/>
                        <p className='font-weight-bold text-danger'>NOTE</p><p className='text-danger'>Amount should be multiply by 100 | Eg: Amount you want to add*100 </p>
                        <TextField className=" my-2" variant="outlined" onChange={handleAmtChange} value={amount} label="Amount" fullWidth type="Number"/>
                        <TextField className=" my-2" variant="outlined" onChange={handlemethodChange} value={method} label="Method" fullWidth type="text"/>
                        <TextField className=" my-2" variant="outlined" onChange={handleEMailChange} value={email} label="Email" fullWidth type="text"/>
                        <p className='font-weight-bold text-danger'>NOTE</p><p className='text-danger'>Status should be either true or false without "" quote </p>
                        <TextField className=" my-2" variant="outlined" onChange={handleStatusChange} value={status} label="Status" fullWidth type="text"/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="secondary" onClick={props.handleClose}>
                            Close
                    </Button>
                    <Button  color='success' variant="contained" onClick={addPaymentdetails}>
                        ADD
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddTransaction
