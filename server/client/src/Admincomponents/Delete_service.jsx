import { MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { Button } from '@mui/material';
import {Modal} from 'react-bootstrap'

function Delete_service(props) {
  const[Category,setCategory]=useState([])
  const[Cat,setCat]=useState("Not Selected")
  const fetchCategory =async ()=>{
    try{
      
        let resp= await fetch('/fetchService',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        
        let data= await resp.json();
        setCategory(data)
    }
    catch(err)
    {
        // alert("Unable to fetch category")
    }
}
fetchCategory();
function refresh()
{
  fetchCategory();
}
function handleselect(e)
{
  setCat(e.target.value)
}
async function DeletethisCategory()
{
    let resp=await fetch(`/deleteCategoryyy/${Cat}`,{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      }
    })
    if(resp.status==200)
    {
      alert("Deleted successfully!")
    }
    else
    {
      alert("Unable to delete")
    }
}
  return (
    <Modal show={props.showDel} onHide={props.handleCloseDel}>
    <Modal.Header>
      <Modal.Title><h4>Delete service</h4> <Button size="small" variant='contained' color='primary' onClick={refresh}>Refresh</Button></Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <div>
            <h5 className='my-3'>Select the Category you want to Delete</h5>
            <Select fullWidth size='small' onChange={handleselect}>
                {
                  Category.map((cat,ind)=>(
                    <MenuItem value={cat} >{cat}</MenuItem>
                  ))
                }
            </Select>
            <div className='my-3'>
              <h6>Selected Category: <span className='text-danger'> {Cat}</span></h6>
            </div>
            <div>
              <Button variant='contained' color='error' size="small" onClick={DeletethisCategory}>Delete this category</Button>
            </div>
        </div>
    </Modal.Body>
    <Modal.Footer>
      <Button  variant="secondary" onClick={props.handleCloseDel}>
        Close
      </Button>
      
    </Modal.Footer>
  </Modal>
  );
}

export default Delete_service;
