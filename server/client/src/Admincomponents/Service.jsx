import React, { useEffect, useState } from 'react'
import {TextField,Button} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import Modal2 from '../Admincomponents/Modal2'
import Addservice from './Addservice';
import Addservice2 from './Addservice2';
import Helmet from 'react-helmet';
import EditCategory from './EditCategory';
import Delete_service from './Delete_service';
import AdminHeader from './AdminHeader';
function Service() {
    const[show1,setShow1]=useState(false)
    const[show,setShow]=useState(false)
    const[service,setservice]=useState([])
    const[serachterm,setsearchTerm]=useState("")
    const[curr,setcurr]=useState("")
    const[loading,setLoading]=useState(true)
    const[id,setId]=useState("")
    const[show2,setShow2]=useState(false)
    const[show3,setShow3]=useState(false)
    const[cate,setCate]=useState("")

    const[Delserv,setDelderv]=useState(false)
    useEffect(() => {
        // fetchCuerrencyDetails();
        fetchService();
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


    const fetchService =async () =>{
        try
        {
            setLoading(true)
        let responce=await fetch('/fetchServicepage',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let service=await responce.json();
        setLoading(false)
        console.log(service)
        setservice(service) 
        }
        catch(er)
        {
        }
    }
    function showhide(id)
    {
        setShow(true)
        setId(id)
    }
    function handleClose()
    {
        setShow(false)
    }
    function refresh()
    {
        fetchService();
    }
    const deleteService =async (id, category,desc,max,min,name,rate,type,dripfeed,ID) =>{
        // const deleteService =async (id) =>{
        let res=window.confirm("Are you sure to delete?")
        if(res)
        {
          

            const Createservice = async()=>{
                // let{service,name,category,rate,min,max,desc}=input;
                let dripfeed=0;
                let type="Package"
                let resp=await fetch("/createTrashService",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        name,category,rate,min,max,desc,dripfeed,type,ID
                    })
                })
                if(resp.status==201)
                {
                    alert("Service added to Trash")
                }
                else
                {
                    alert("unable to move service to Trash")
                }
            }

            Createservice();


            //
            let resp=await fetch(`/deleteservice/${id}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(resp.status==200)
            {
                alert("Deleted successfully.")
            }
            else
            {
                alert("Unable to delete service")
            }
        }
    }
    function addService()
    {
        setShow1(true)
    }
    function addService2()
    {
        setShow2(true)
    }
    function handleClose2()
    {
        setShow2(false)
    }
    function handleClose3()
    {
        setShow3(false)
    }
    
    function handleClose1()
    {
        setShow1(false)
    }
    const fetchServiceByDeatemodified =async () =>{
        try
        {
            setLoading(true)
        let responce=await fetch('/fetchServiceByDeatemodified',{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let service=await responce.json();
        setLoading(false)
        setservice(service) 
        }
        catch(er)
        {
        }
    }
    function editCategory(cate)
    {
        setCate(cate)
        setShow3(true);
    }
    function deleteCService()
    {
        setDelderv(true)
    }
    function handleCloseDel()
    {
        setDelderv(false)
    }
    return (
        <div>
            <AdminHeader/>
            <Helmet>
                <title>Services</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            {loading ? <LinearProgress/>: ""}
            <div className="dummy">
                <div className="dummy_div2">

                </div>
            </div>
            <div class="d-flex top_ad_user">
                <p className="m-2">Showing result for {service.length} services</p>
                <TextField size="small" className="my-3 service_textField ml-3 w-25" onChange={(e)=>setsearchTerm(e.target.value)} id="outlined-basic" label="Search service" variant="outlined" fullWidth />
                
                <select onChange={fetchServiceByDeatemodified} size="small" className="form-control w-25 mt-auto mb-auto mx-3 service_textField" name="" id="" fullWidth>
                    <option selected className="text-center" value="">---Select---</option>
                    <option value="">Sort by date modifed</option>
                </select>
                <i class="fas fa-sync-alt ml-4 fa-2x mt-4" onClick={refresh}></i>
                <Button color="error" variant="contained" size="small" className="ad_service mt-auto mb-auto m-3" onClick={deleteCService}>Delete</Button>
                <Button color="success" variant="contained" size="small" className="ad_service mt-auto mb-auto mx-3" onClick={addService}>ADD</Button>
                <Button color="warning" variant="contained" size="small" className="ad_service mt-auto mb-auto mx-3" onClick={addService2}>ADD</Button>
            </div>
            <table class="table table-responsive">
        <thead class="thead-dark">
            <tr>
            <th scope="col">SL.NO</th>
            <th scope="col">EDIT/DELETE</th>
            <th scope="col">Servie NO.</th>
            <th scope="col">NAME</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">EDIT CATEGORY</th>
            <th scope="col">RATE</th>
            <th scope="col">MIN</th>
            <th scope="col">MAX</th>
            {/* <th scope="col">DESCRIPTION</th> */}
            {/* <th scope="col">DRIPFEED</th> */}
            
            </tr>
        </thead>
        <tbody>
        
            {service.filter((val)=>{
                if(serachterm=="")
                {
                  return val
                }
                else if(val.category.toLowerCase().includes(serachterm.toLocaleLowerCase()))
                {
                  return val
                }
               
              }).map((serv,ind)=>(
                <tr>
                    <th scope="row">{ind+1}</th>
                    <td><i class="far fa-edit" onClick={()=>showhide(serv._id)}></i> <i class="fas ml-4 fa-trash-alt" onClick={()=>deleteService(serv._id,serv.category,serv.desc,serv.max,serv.min,serv.name,serv.rate,serv.type,serv.dripfeed, serv.serviceNum)}></i></td>
                    {/* <td><i class="far fa-edit" onClick={()=>showhide(serv._id)}></i> <i class="fas ml-4 fa-trash-alt" onClick={()=>deleteService(serv.service)}></i></td> */}
                   
                    <td>{serv.serviceNum}{serv.service}</td>
                    <td>{serv.name}</td>
                    <td>{serv.category}</td>
                    <td><i class="far fa-edit" onClick={()=>editCategory(serv.category)}></i></td>
                    <td>{serv.rate}</td>
                    <td>{serv.min}</td>
                    <td>{serv.max}</td>
                    {/* <td>{serv.desc}</td> */}
                    {/* <td>{serv.dripfeed}</td> */}
                </tr>
            ))}
            
        </tbody>
        {/* //FOR EDIT */}
        <Modal2 show={show} onHide={handleClose} id={id}/> 

        <Addservice show1={show1} handleClose1={handleClose1}/>
        <Addservice2 show2={show2} handleClose2={handleClose2}/>
        <EditCategory show3={show3} handleClose3={handleClose3} cate={cate}/>
        <Delete_service showDel={Delserv} handleCloseDel={handleCloseDel}/>
        </table>


        </div>
    )
}

export default Service
