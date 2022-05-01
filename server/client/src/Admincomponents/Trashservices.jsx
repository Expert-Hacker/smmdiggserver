import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader';

function Trashservices() {
  const[trashService,setTrashservices]=useState([]);
  const[curr,setcurr]=useState("")
    const[show,setShow]=useState(false)

    useEffect(() => {
    //   fetchCuerrencyDetails();
    
  }, [])

  async function fetchCuerrencyDetails()
  {
      let resp=await fetch('/fetchcurrency',{
          method:"GET",
          headers:{
              "Content-Type":"application/json"
          }  
      })
      let data=await resp.json();
      
      setcurr(data.currency)
  }

    async function fetchallTransactions()
    {
        try {
            let resp=await fetch('/getTrashservices',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data=await resp.json();
            console.log(data)
            setTrashservices(data);
        } catch (error) {
         
        }
    }
    fetchallTransactions();
    async function mapService(category,desc,dripfeed,max,min,name,rate,type,ID)
    {
        let resp=await fetch("/createServiceform1",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,category,rate,min,max,desc,dripfeed,type,serviceNum:ID
            })
        })
        if(resp.status==201)
        {
            alert("Service Mapped succesfully")
        }
        else
        {
            alert("unable to map service")
        }
    
    }
    return (
        <div>
          <AdminHeader/>
            <table class="table table-responsive">
  <thead class="thead-dark">
    <tr>
      <th scope="col">s.no</th>
      <th scope="col">Map service</th>
      <th scope="col">Category</th>
      <th scope="col">No - Service name</th>
      <th scope="col">Rate</th>
      <th scope="col">service _id</th>
    </tr>
  </thead>
  <tbody>
    {
      trashService.length>0 ? 
    trashService.map((trash,indx)=>(
      <tr>
      <th scope="row">{indx+1}</th>
      <td><Button onClick={()=>mapService(trash.category, trash.desc, trash.dripfeed, trash.max, trash.min, trash.name,trash.rate, trash.type, trash.ID)}>Map</Button></td>
      <td>{trash.category}</td>
      <td>{trash.ID} - {trash.name}</td>
      <td>{trash.rate}</td>
      <td>{trash.service}</td>
    </tr>
    )): <h4>Trash is empty</h4>}
    
  </tbody>
</table>

        </div>
    )
}

export default Trashservices
