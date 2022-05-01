import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import {Alert,Checkbox,  FormControl,  IconButton,  InputLabel,  MenuItem,  Select,  TextField, Tooltip} from '@mui/material';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import whatsappLogo from '../../src/images/whatsappBtn.png'
import '../neworder.css'
import { useHistory } from 'react-router';
import Helmet from 'react-helmet';
import { Modal } from 'react-bootstrap';
import Header_landingPage from './Header_landingPage';
import Footer from './Footer';
import Loading from '../Loading/Loading'
import axios from 'axios'
import {Button} from 'semantic-ui-react'
function Neworder() {
    const[currency,setcurr]=useState("")
    let history=useHistory();
    let fullRate;
    const[category,setCategory]=useState([])
    const[service,setService]=useState([])
    const[prevService,setprevService]=useState("")
    const[previewInfo,setpreviewInfo]=useState([])
    const[error,setError]=useState(false)

    const[ID,setPOstserviceNum]=useState("")
    const[linkError,setlinkError]=useState(false)
    const[min,setMin]=useState("")
    const[max,setMax]=useState("")
    const[desc,setDec]=useState("")
    const[rate,fsetRate]=useState(0)
    const[name,setName]=useState("Loading..")

    const[totalCharge,setTotalcharge]=useState(0)

    const[inputerror,setinputerror]=useState(false);
    const[fundError,setFunderror]=useState(false);
    
    const[postCategory,setpostCategory]=useState("")
    const[postservice,setpostservice]=useState("")
    const[postLink,setpostLink]=useState("")
    const[postQty,setpostQty]=useState("")

    const[submitLoading,setsubmitLoad]=useState(false)
    const[btndisable,setbtndisable]=useState(false)

    const[balance,setBalance]=useState(0)
    const[link,setLink]=useState({
        text:""
    })
    const[tggleTCharge,settggleTCharge]=useState()

    const[zeroamt,setZerpamt]=useState(false)

    const[calcBtn,setCalcBtn]=useState(true)

    const[qty,setQty]=useState() //for qty input control

    const[Qtyerror,setQtyerror]=useState(false)
    let qtyName,qtyValue;

    const[pageLoading,setPageLoading]=useState(true)


    function handleQtychange(e)
    {
            e.preventDefault();
            let total_amout= (rate*e.target.value);
            setTotalcharge(total_amout/1000)
        setQty(e.target.value)  
    }
   

    const createOrder =async(e)=>{
        e.preventDefault();
      
       setQtyerror(false);
       setlinkError(false);
        setbtndisable(true);
        setsubmitLoad(true)
        setinputerror(false)
        setZerpamt(false);
        setFunderror(false)
        let resp=await fetch('/createorder',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                category:postCategory,
                service:postservice,
                ID:ID,
                link:link.text,
                qty,
                price:rate,
                total:totalCharge
            })
        })
        let data=await resp.json();
        if(resp.status==201)
        {
            setbtndisable(false);
            setsubmitLoad(false)
            toast.success(`Ordred Successfully! - ID:${data._id} `, {
                position: "bottom-center",
                autoClose: 3500,
                draggable: false,
                }); 
                
        }
        else if(resp.status==400)
        {
            toast.error(`${data.resp}`, {
                position: "bottom-center",
                autoClose: 3800,
                draggable: false,
                }); 
                setbtndisable(false);
                setsubmitLoad(false)
        }
        else
        {
            setbtndisable(false);
            setsubmitLoad(false)
            alert("order not successfull")
        }


    }


  async  function authUser()
    {
       
            try {
                let resp=await fetch('/authUser',{
                    method:"GET",
                    headers:{
                      Accept:"application/json",
                      "Content-Type":"application/json"
                    },
                    credentials:'include'
                  })
                  let data=await resp.json()
                  setBalance(data[0].balance)
            } catch (error) {
                history.push('/login')
            }

    }
    let name1,value
    const handleLinkchanage =(e)=>{
        name1=e.target.name;
        value=e.target.value;
        setLink({...link,[name1]:value})
    }
    
    function addfund()
    {
        history.push("/v1.1/addfund")
    }
    useEffect(() => {
        fetchCategory();
     
    //  fetchCuerrencyDetails();
  
     authUser();
    }, [])


//Fetching categories when page loads
    const fetchCategory =async ()=>{
        try{
           setPageLoading(true)
            let resp= await fetch('/fetchService',{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            // setError(false)
            let data= await resp.json();
            setCategory(data);
            setpostCategory(data[0]) 
            let serv=data[0];
            serv=encodeURIComponent(serv)
            fetchservicesWhenpageLoads(serv);
            setPageLoading(false)
            
        }
        catch(er)
            {
               setError(true)
            }  
    }

   async function fetchservicesWhenpageLoads(serv)
    {
       
                try{
                    setPageLoading(true)
                    let resp=await fetch(`/fetchserviceName/${serv}`,{
                        // let resp=await fetch(`/fetchserviceName/Facebook Post Likes [500] [No Refill]`,{
                        method:"GET",
                        headers:{
                            "Content-Type":"application/json"
                        }
                    });
                    setError(false)
                    let data=await resp.json();
                    setinputerror(false)
                    setService(data)
                   
                    serviceDetails(data[0])
                    setPOstserviceNum(data[0].serviceNum)
                    setpostservice(data[0].name)
                    setPageLoading(false)
                }
                catch(errr)
                {
                    setError(true)
                }
    }

        async function handleWhenServiceChanged(serv)
        {
            try{
                setPageLoading(true)
                let aa=encodeURIComponent(serv)
                
                // let enc=encodeURI(e.target.value)
                let resp= await fetch(`/fetchName/${aa}`,{
                    method:"GET",
                    headers:{
                        "Content-Type":"application/json"
                    }
                })
                let data= await resp.json();
                serviceDetails(data[0])
                setPOstserviceNum(data[0].serviceNum)
                setpostservice(data[0].name)
                setError(false)
                setinputerror(false)
            setPageLoading(false)
            
            }
            catch(er)
            {
               setError(true)
            }
            
        }
        

    function serviceDetails(details)
    {
       
        setDec(details.desc)
        setMax(details.max)
        setMin(details.min)
      
        fsetRate(details.rate)
        if(details.min==1&&details.max==1)
        {
            setTotalcharge(details.rate*currency)
            setQty(1)
        }
    }
        

    function handlecategoryChanges(e)
    {
        setTotalcharge(0)
       let cat=e.target.value;
       cat=encodeURIComponent(cat)
       fetchservicesWhenpageLoads(cat)
       setpostCategory(cat)

    }
    function handleServicechanged(e)
    {
        setTotalcharge(0)
        let serv=e.target.value;
        handleWhenServiceChanged(serv)
    }
    function hideerror()
    {
        setError(false)
    }


    return (
        
        <div className="overflow overflow1 dashboard-header11 ">
            <Header_landingPage/>
            <ToastContainer/>
             <Helmet>
                <title>New Order</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            <Loading isActive={pageLoading}>
            <div className="neworder container ml-auto mr-auto row mt-0">
            {/* <div className='whatsappChatDiv'>
                    <a href="https://wa.me/916361027573" target="_blank"><img src={whatsappLogo} alt="" height="80px" width="80px"/></a>
                </div> */}
                <div className="left_neworder  col-sm container">
                        <div className="my-1 d-flex justify-content-between">
                            <h5 className="neword p-1 text-dark font-weight-bold"><i class="fas fa-shopping-cart"></i>  Create order</h5>
                            
                            {/* <Tooltip title="Add to Wishlist" placement="left"><IconButton size="small"><h5 ><i class="fas  text-white fa-hand-holding-heart"></i></h5></IconButton></Tooltip> */}
                        </div>
                        {/* <FormControl fullWidth className="my-3"> */}
                            <InputLabel className=" text-white">Select Category</InputLabel>
                            <select disabled={btndisable} size='small'  label="Select Category" onChange={handlecategoryChanges} className="form-control" 
                            >
                                {
                                    category.map((cate,index)=>(
                                        <option className="bg-dark text-white" value={cate} key={index}>{cate}</option>
                                    ))
                                }
                               
                            </select>
                        {/* </FormControl> */}
                        <div className="my-3">
                        {/* <FormControl fullWidth className="my-3"> */}
                            
          
                            {/* <h6>select Service <span className="text-danger">*</span></h6> */}
                            <InputLabel className=" text-white">Select Service</InputLabel>
                            <select disabled={btndisable} size='small' label="Select Service" className="form-control" name="" id="sel_service" onChange={handleServicechanged}>
                            {/* <option value="selectService" >Select Service</option> */}
                          

                                {
                                    service.map((serv,ind)=>(
                                        <option className="bg-dark text-white" value={serv.name} key={ind}>ID{serv.serviceNum} - {serv.name} - ₹{serv.rate}</option>
                                    ))
                                }
                            </select>
                        {/* </FormControl> */}
                        </div>
                        <div>
                        <InputLabel disabled={btndisable}  className=" text-white">Description</InputLabel>
                            <TextField multiline value={desc} rows="6"  className="form-control serv_desc00" disabled maxRows={10}/> 
                        </div>
                        <div className="my-3 linksss">
                            <InputLabel  className=" text-white">Enter Link <span className="text-danger">*</span></InputLabel>
                            <TextField  disabled={btndisable} error={linkError} helperText={linkError ? "Please enter the link" : ""} size="small" autoComplete="false" className="form-control" value={link.text} name="text" placeholder="https://" onChange={handleLinkchanage} type="text" />
                        </div>
                      {min==1&&max==1 ? "" : <div className="my-3">
                            <InputLabel className=" text-white">Quantity <span className=" rate_per1000">(Min: {min} Max: {max}) <span className="text-danger">*</span></span></InputLabel>
                            <div className="d-flex justity-content ">
                                <TextField  disabled={btndisable} size="small" error={Qtyerror} helperText={Qtyerror ? "Please enter the quantity" : ""} autoComplete="false" value={qty} onChange={handleQtychange} name="qty" className="w-75 form-control" type="number" fullWidth />
                            </div>
                            
                        </div>}
                        {min==1&&max==1 ? <div className="my-3 d-flex">
                            <div className="mr-3">
                                <h6><i class="fas fa-rupee-sign"></i> Total charge</h6>
                                <h3 className="h5"><span class="px-3 py-1 bg-dark text-white">{(totalCharge).toFixed(2)}</span></h3>
                            </div>
                           
                        </div> : <div className="my-3 d-flex">
                            <div className="mr-3">
                                <h6 className=" text-white"><i class="fas fa-rupee-sign"></i> Total charge</h6>
                                <h3 className="h5"><span class="px-3 py-1 bg-dark text-white">{(totalCharge).toFixed(2)}</span></h3>
                            </div>
                            <div>
                                <span className="rate_per1000only text-white">Rate per 1000 : {rate} <i class="fas fa-rupee-sign"></i></span>
                            </div>
                        </div>}
                        <div>
                            <div className="d-flex ">
                                <Checkbox defaultChecked checked/>
                                <p className="mt-auto mb-auto  text-white ">I agree the <Link to="/v1.1/terms-and-conditions" className="termsncond text-dark">Terms</Link> & <Link to="/v1.1/privacy-policy" className="termsncond text-dark">Policy</Link></p>
                            </div>
                            
                            <div className="error">
                                <Button color='orange' className="ml-2 my-2 mr-3" disabled={btndisable} onClick={createOrder}>PLACE ORDER</Button>{submitLoading ? <CircularProgress style={{'color': 'white'}}  className="position-absolute mt-2" /> : ""}
                                {inputerror ? <span className="errosubmit"><i class="fas fa-exclamation-circle"></i>  please provide the input(s)</span> : ""}
                      
                                {fundError ? <button onClick={addfund} className="errosubmit"><i class="fas fa-exclamation-circle"></i>  Insufficient fund.<span className="errosubmit_addfnd" to="/v1/addfund">Add fund</span> </button> : ""}
                            </div>
                        </div>
                </div>
            </div>
            </Loading>
            <Modal show={error} >
                <div className='m-3'>
                {/* <h6 className="font-weight-bold text-danger p-0 m-0"><i class="fas fa-exclamation-triangle"></i> This service may temporarily unavailable. Please take this screenshot and raise a Ticket.</h6> */}
                <Alert variant="filled" severity="error">
               <p> This service may temporarily unavailable. Please choose another service or take this screenshot and create a Ticket.</p>
                 <Button color="inherit" className="text-dark" variant="contained" size="small" onClick={hideerror}>OK</Button>
                 </Alert>
                </div>
            
            </Modal>
            <Footer/>
        </div>
        
    )
}

export default Neworder
