import { Button, TextField } from '@mui/material'
import { Modal } from 'react-bootstrap'
import React, { useState } from 'react'

function Passwordchange(props) {
    const[input,setInput]=useState("");

    function handlechange(e)
    {
        setInput(e.target.value)
    }
   async function changePassword()
    {
        try {
            let resp=await fetch('/changePasswordByAdmin',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    user:props.id,
                    newpassword:input
                    
                })
            })
            if(resp.status==200)
            {
                alert("New password updated.")
            }
            if(resp.status==400)
            {
                alert("Unable to update new password")
            }
        } catch (error) {
            alert('Unable to update New password')
        }
    }
    return (
        <div>
            <Modal show={props.show} handleClose={props.handleClose}>
                <Modal.Header >
                    <Modal.Title>Update password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>
                    <h5>User ID: {props.id}</h5>
                    <h5>Name: {props.name}</h5>
                </div>
                <div>
                    <TextField value={input} onChange={handlechange} fullWidth size='small' helperText="New password"/>
                </div>
                <Button variant='contained' className='mt-3' onClick={changePassword}>SUBMIT</Button>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Passwordchange
