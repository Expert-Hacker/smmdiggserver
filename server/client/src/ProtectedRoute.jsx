import { useState,useEffect } from "react"
import { render } from "react-dom"
import { Redirect, Route } from "react-router-dom"
import Loading from "./Loading/Loading"

const ProtectedRoute=({component:component,...restArgs})=>{
    const[auth,setAuth]=useState("loading")
    const[user,setInfo]=useState([])
    const authState=async()=>{
        let resp=await fetch('/authUser',{
          method:"GET",
          headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
          },
          credentials:'include'
        })
      //  let data=await resp.json();
        if(resp.status==200)
        {
          // setInfo(data)
           setAuth(true)
        }
        else{
          setAuth(false)
        }
       
    }
    useEffect(() => {
        authState()
    }, [])
    
    
    return(
      auth=="loading" ? <Loading isActive/> : auth ? <Route component={component} /> : <Redirect to="/" />
    )
}
export default ProtectedRoute