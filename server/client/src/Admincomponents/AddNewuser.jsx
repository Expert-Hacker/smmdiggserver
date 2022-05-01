import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

function AddNewuser(props) {
    const[Name,setName]=useState("")
    const[Email,setEmail]=useState("")
    const[Phone,setPhone]=useState("")
    const[Pass,setPass]=useState("")
    const[CPass,setCPass]=useState("")
    const[mailStatus,setMailststua]=useState("")
          
           function handleNamechange(e)
           {
                setName(e.target.value)
           }
           function handleEMailchange(e)
           {
                setEmail(e.target.value)
           }
           function handlePhonechange(e)
           {
                setPhone(e.target.value)
           }
           function handlePasswrdchange(e)
           {
                setPass(e.target.value)
           }
           function handleCPasswrdchange(e)
           {
            setCPass(e.target.value)
           }

           async function addUser()
           {
                    if(mailStatus=="send")
                    {
                        // alert(mailStatus)
                        if(Pass!==CPass)
                        {
                            return alert("Both Password should be Matched.")
                        }
                        let name,email,phone, password,cpassword;
                        name=Name;
                        email=Email;
                        phone=Phone;
                        password=Pass;
                        cpassword=CPass;
                        let newUser=await fetch("/register",{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify({
                                name, email, phone, password, cpassword
                            })
                        
                        })
                        let resp=await newUser.json();
                        if(newUser.status==201)
                        {
                            alert("User created")
                        }
                        else if(newUser.status==400)
                        {
                            alert(resp.resp)
                        }
                        else
                        {
                            alert("Unable to create New User!")
                        }
                    }
                    else if(mailStatus=="noSend")
                    {
                        alert(mailStatus)
                        if(Pass!==CPass)
                        {
                            return alert("Both Password should be Matched.")
                        }
                        let name,email,phone, password,cpassword;
                        name=Name;
                        email=Email;
                        phone=Phone;
                        password=Pass;
                        cpassword=CPass;
                        let newUser=await fetch("/registerWithoutMail",{
                            method:"POST",
                            headers:{
                                "Content-Type":"application/json"
                            },
                            body:JSON.stringify({
                                name, email, phone, password, cpassword
                            })
                        
                        })
                        let resp=await newUser.json();
                        if(newUser.status==201)
                        {
                            alert("User created")
                        }
                        else if(newUser.status==400)
                        {
                            alert(resp.resp)
                        }
                        else
                        {
                            alert("Unable to create New User!")
                        }
                    }
                    else
                    {
                        alert("Enable to identify Mail status")
                    }
           }
           function handleRadioChange(e)
           {
               setMailststua(e.target.value);
               
           }
  return (
      <div>
          <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <TextField onChange={handleNamechange} className='mx-2 my-3' size='small' variant='outlined' label="Enter name" fullWidth type="text"></TextField>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue=""
                            name="radio-buttons-group"
                            onChange={handleRadioChange}
                            >
                            <FormControlLabel value="send" control={<Radio />} label="Send Mail" />
                            <FormControlLabel value="noSend" control={<Radio />} label="Don't Send" />
                        </RadioGroup>
                        </FormControl>
                    <TextField onChange={handleEMailchange} className='mx-2 my-3' size='small' variant='outlined' label="Enter Email" fullWidth type="text"></TextField>
                    <TextField onChange={handlePhonechange} className='mx-2 my-3' size='small' variant='outlined' label="Enter Phone Number" fullWidth type="text"></TextField>
                    <TextField onChange={handlePasswrdchange} className='mx-2 my-3' size='small' variant='outlined' label="Enter Password" fullWidth type="text"></TextField>
                    <TextField onChange={handleCPasswrdchange} className='mx-2 my-3' size='small' variant='outlined' label="Confirm Password" fullWidth type="text"></TextField>
                   
                </div>
            </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant='outlined' color='success' onClick={addUser}>
                    Create
                </Button>
                </Modal.Footer>
            </Modal>
      </div>

  )
}

export default AddNewuser;
