import {React,useState,useEffect} from 'react'
import Header_home from './Header_home'
import '../home.css'
import hand from '../images/hand.png'
import quality1 from '../images/quality1.png'
import incentive from '../images/incentive.png'
import girl from '../images/girl.png'
import { Link,useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import {TextField} from '@mui/material'
import Home_Footer from './Home_footer'
import { Paper, Checkbox, Button} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress';
import Helmet from 'react-helmet'
import whatsappPNG from '../../src/images/s1.png'
import instaPNG from '../../src/images/s2.png'
import padlock from '../../src/images/padlock.png'
import Home_footer from './Home_footer'
import axios from 'axios'
// import {Input, Button} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Loading from '../Loading/Loading'
let validator = require("email-validator");

function Home() {
    const[disable,setDisable]=useState(false)
  const[loading,setLoading]=useState(false);
    const[emilerr,setemailerr]=useState(false)
    const[passerr,setpasserr]=useState(false)
    const history=useHistory()
  
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("")
    useEffect(() => {
       

        setEmail(getCookie("email"))
        setPassword(getCookie("password"))
        // fetchOS()
    }, []);
 
    function navigate()
    {
        history.push('/v1.1/dashboard')
    }
    function Register()
    {
        history.push('/signup')
    }
    function getCookie(ema,pass) {
        // Split cookie string and get all individual name=value pairs in an array
        var cookieArr = document.cookie.split(";");
    
        // Loop through the array elements
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
    
          
            if(ema == cookiePair[0].trim()) {
                // Decode the cookie value and return
                return decodeURIComponent(cookiePair[1]);
            }
            if(pass == cookiePair[1].trim()) {
                // Decode the cookie value and return
                return decodeURIComponent(cookiePair[1]);
            }
        }
    
        // Return null if not found
        return null;
    }
    
    // let name, value;
    function handleEmailChange(e)
    {
       
        setEmail(e.target.value)
    }
    function handlePassChange(e)
    {
        setPassword(e.target.value)
    }
  
    async function login(e)
   {
     
        localStorage.setItem('login_status',true)
        // let {email,password}=input;
        if(!email)
        {
            setemailerr(true)
        }
        if(!password)
        {
            setpasserr(true)
        }
        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        if(!validateEmail(email))
        {
            setemailerr(true)
        }
        if(validator.validate(email))
        {
                try {
                    setDisable(true)
                    setLoading(true)
                    let res= await fetch('/login',{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify({
                            email,password
                        })
                    })
                    
                    let resp= await res.json();
              
                    if(res.status==200 && resp.role=="user")
                    {
                        // document.cookie="email="+email+";path=http://localhost:3000/login"
                        // document.cookie="password="+password+";path=http://localhost:3000/login"
                        document.cookie = "email" + "=" + encodeURIComponent(email);
                        document.cookie = "password" + "=" + encodeURIComponent(password);

                        setLoading(false)
                        toast.success('Login Successfull!', {
                            position: "bottom-center",
                            autoClose: 3500,
                            draggable: false,
                            }); 
                            setTimeout(function()
                            {
                            history.push("/v1.1/dashboard")
                            },4000)
                    }
                    if(res.status==200 && resp.role=="admin")
                    {

                        document.cookie = "email" + "=" + encodeURIComponent(email); 
                        document.cookie = "password" + "=" + encodeURIComponent(password);

                        setLoading(false)
                        toast.success('Login Successfull!', {
                            position: "bottom-center",
                            autoClose: 3500,
                            draggable: false,
                            }); 
                            setTimeout(function()
                            {
                            history.push("/v1.1/admin-dashboard")
                            },4000)
                    }
                    if(res.status==400)
                    {
                        setLoading(false)
                        setDisable(false)
                        toast.error('Invalid Credentials!', {
                            position: "bottom-center",
                            autoClose: 3500,
                            draggable: false,
                            }); 
                    }
                } catch (error) {
                    setLoading(false);
                    setDisable(false)
                    toast.error('Invalid Credentials!', {
                        position: "bottom-center",
                        autoClose: 3500,
                        draggable: false,
                        }); 
                    
                }
        }

   }
   function showHidePassed()
   {
        let val=document.getElementById('passwd');
        if(val.type=="password")
        {
            val.type="text"
        }
        else
        {
            val.type="password"
        }

   }
   window.addEventListener("scroll", reveal);

   function reveal()
   {
       let revelas=document.querySelectorAll('.revealcls');
       let countss=document.getElementsByClassName('countcls');

       for(let i=0;i<revelas.length;i++)
       {
           let windowHeight=window.innerHeight;
           let revealTop=revelas[i].getBoundingClientRect().top;
           let revelaPoint=150;

           if(revealTop<windowHeight-revelaPoint)
           {
               revelas[i].classList.add('activescroll')
             
           }
           else
           {
            revelas[i].classList.remove('activescroll')
           
           }
       }
       for(let i=0;i<countss.length;i++)
       {
            let windowHeight1=window.innerHeight;
            let revealTop1=countss[i].getBoundingClientRect().top;
            let revelaPoint1=150;
            if(revealTop1<windowHeight1-revelaPoint1)
                {
                    countss[i].classList.add('activescroll')
                    runCounter()
                }
                else
                {
                    countss[i].classList.remove('activescroll')
                }
        }
   }
   function runCounter()
   {
       let counters=document.querySelectorAll('.counter');
       let speed=2000;

       counters.forEach(counter=>{
           const updateCount=()=>{
               let target=+counter.getAttribute('data-target');
               let count=+counter.innerText;

               let inc=target/speed;
               if(count<target)
               {
                   counter.innerText=Math.ceil(count+inc)
                   setTimeout(updateCount,14)
               }
               else
               {
                   counter.innerText=target;
               }
           }
           updateCount();
       })
   }
    function fetchOS()
   {
    let formData = new FormData(); 
    formData.append('key', "ltRYdMdt340sD1EkO4uPIVGxzGWjpiQr");
    formData.append('action', "services");
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }

       axios.post("/api/v1",formData,config)
       .then((respnc)=>{
           console.log(respnc)
       }).catch((err)=>{
           console.log(err)
       })
        
   }

 
    return (
        <div className=''>
            <Header_home/>
            <main className='main-home'>
                <div className="left-main mt-5">
                    <h1 className='caption1'>Welcome to</h1>
                    <h1 className='caption1 text-danger'>SMMDIGG</h1>
                    <span className='underline'>-</span>
                    <p>From Unexpected Friendships, to Lasting Relationships. Our website is a Cheap SMM and SEO service Reseller Auto Panel Script. Fast, Reliable and Secure, offering World Best Quality and Cheapest Automatic Social Media Services which is specially developed for Resellers with High Speed order completion!.</p>
                    <p className='signupbtn' onClick={Register}>SIGN UP <i class="fas fa-arrow-alt-right"></i></p>
                </div>
                <Loading isActive={loading}>
                <div className="right-main" id='login'>
                    <div className='login-code img-fluid bg-light shadow-lg rounded p-4'>
                                 <div className="login-heading">
                                     <h1 className="login-name "><span>Login to SMMDIGG</span></h1>
                                 </div>
                                 <div className="login-form text-white">
                                     {/* <Input fluid/> */}
                                        {/* <TextField className='my-3' color='warning' disabled={disable} autoComplete='none' error={emilerr} helperText={emilerr ? "Email is Required" : ""}  id="email" type="text" label="Your Email" name="email" variant="outlined" size='small' value={email} onChange={handleEmailChange} type="email"  fullWidth/> 
                                        <TextField className='my-3' disabled={disable} autoComplete='none'  error={passerr} helperText={passerr ? "Password is Required" : ""}  size="small" type="password" label="Your Password" id="passwd" name="password" variant="outlined" value={password} onChange={handlePassChange}   fullWidth/> */}
                                     <div class={`my-3 ui left icon input large d-flex ${emilerr && !email ? 'error' : ""}`}>
                                        <input disabled={disable} value={email} onChange={handleEmailChange} name="email" type="email" placeholder="Enter Email"/>
                                        <i class="far fa-envelope icon"></i>
                                    </div>
                                    <div class={`my-3 ui left icon input large d-flex ${passerr && !password ? "error" : ""}`}>
                                        <input disabled={disable} value={password} onChange={handlePassChange} name="password" type="email" placeholder="Enter Password"/>
                                        <i class="far fa-key icon"></i>
                                    </div>
                                 
                                 </div>
                                 <div className='d-flex flex-row'>
                                     <Checkbox onClick={showHidePassed} disabled={disable}/><p className='mt-auto mb-auto' >Show Password</p>
                                 </div>
                                 <p><Link className="text-primary h6" to="/v1.1/forgot-password">Forgot password?</Link></p>
                                 <ToastContainer/>
                                 <div>
                                    
                                     <button disabled={disable}   onClick={login}  className="btn  signupbtn w-100 text-dark mt-2">Secure Login <img className='mx-1' src={padlock} height="20px" alt="" /> </button>
                                    {/* <Button color='facebook' size='large' fluid>LOGIN</Button> */}
                                 </div>
                  </div>
                </div>
                </Loading> 
            </main>
            {/* what we offers section */}
            <div className='margin-150px my-5 revealcls'>
                <h4 className='py-3 caption-4'>Reasons why you should try our panel, Let us help you build your online presence quickly and efficiently!</h4>
                <div className='offers-section'  id='whychooseus'>
                    <Paper className='offers-child  ' elevation={6}>
                        <img className='img-fluid images-home' src={quality1} alt="quality" height="50px" width="110px"/>
                        <p className='caption-3'>The highest quality SMM services to meet your needs.</p>
                    </Paper>
                    <Paper className='offers-child ' elevation={6}>
                        <img className='img-fluid images-home' src={incentive} alt="incentive" height="50px" width="110px"/>
                        <p className='caption-3'>We have a good amount of different payment options.</p>
                    </Paper>
                    <Paper className='offers-child ' elevation={6}>
                        <img className='img-fluid images-home' src={hand} alt="hand" height="50px" width="110px"/>
                        <p className='caption-3'>We provide automated services with quick delivery.</p>
                    </Paper>
                </div>
            </div>
            <div className='revealcls my-5'>
                <div id='contactus'>
                    <h3 className='caption-4 '>CONTACT US</h3>
                </div>
                <div className="social-icons margin-150px my-4">
                    <Paper elevation={6}>
                    <a className=" social-link  child-social" href="https://wa.me/916361027573"  target="_blank">
                        <h4 className='caption-5'>Reach me at</h4><img src={instaPNG} alt="Whatsapp" height="50px" className='social-icon'/>
                    </a> 
                    </Paper>
                    <Paper  elevation={6}>
                    <a href='https://instagram.com/programed_heart' target="_blank" className=" right-social social-link  child-social" >
                        <h4 className='caption-5'>Reach me at</h4><img src={whatsappPNG} alt="instagram" height="50px" className='social-icon'/>
                    </a>
                    </Paper>
                
                </div>
            </div>
            <div className="margin-150px counter-div my-5 countcls">
                <div className="happycustomers counter-child">
                    <div>
                        <span className='counter' data-target="3106">0</span>
                        <span className='incrremrnt'>+</span>
                    </div>
                    <div className="card-1">
                        <p className='caption-6'>Happy Customers</p>
                    </div>
                </div>
                <div className="totalorders counter-child">
                    <div>
                        <span className='counter' data-target="2601">0</span>
                        <span className='incrremrnt'>+</span>
                    </div>
                    <div className="card-1">
                        <p className='caption-6'>Orders Completed yet</p>
                    </div>
                </div>
                <div className="services counter-child">
                    <div>
                        <span className='counter' data-target="899">0</span>
                        <span className='incrremrnt'>+</span>
                    </div>
                    <div className="card-1">
                        <p className='caption-6'>Total Services</p>
                    </div>
                </div>
            </div>
            <Home_footer/>
        </div>
    )
}
export default Home


// <Header_home position="relative"/>
//             <div className="margin-top">
//                 <div className='grid container'>
//                     <div className='caption bg-'>
//                         <h1 className='caption1'><span>Get Your Social Account's Followers and Likes</span></h1>
//                         <p className='caption-2'>From Unexpected Friendships, to Lasting Relationships. Our website is a Cheap SMM and SEO service Reseller Auto Panel Script. Fast, Reliable and Secure, offering World Best Quality and Cheapest Automatic Social Media Services which is specially developed for Resellers with High Speed order completion!.</p>
//                     </div>
//                     <div className='login-code img-fluid'>
//                             <div className="login-heading">
//                                 <h1 className="login-name"><span>Login to SMMDIGG</span></h1>
//                             </div>
//                             <div className="login-form text-white">
//                                 <TextField className='my-3' color='warning' disabled={disable} autoComplete='none' error={emilerr} helperText={emilerr ? "Email is Required" : ""}  id="email" type="text" label="Your Email" name="email" variant="outlined" size='small' value={email} onChange={handleEmailChange} type="email"  fullWidth/>
//                                 <TextField className='my-3' disabled={disable} autoComplete='none'  error={passerr} helperText={passerr ? "Password is Required" : ""}  size="small" type="password" label="Your Password" id="passwd" name="password" variant="outlined" value={password} onChange={handlePassChange}   fullWidth/>
//                             </div>
//                             <div className='d-flex flex-row'>
//                                 <Checkbox onClick={showHidePassed} disabled={disable}/><p className='mt-auto mb-auto' >Show Password</p>
//                             </div>
//                             <ToastContainer/>
//                             <div>
//                                 {loading ? <LinearProgress/> : ""}
//                                 <Button disabled={disable} variant="contained" color="success" to="#" fullWidth onClick={login}  className="btn btn-success mt-2">Secure Login <img className='mx-1' src={padlock} height="20px" alt="" /> </Button>
//                             </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="section-2 my-3 container">
//                    <div className="right_hm ">
//                         <img src={girl} alt="image" height="500px" width="500px" className="img-fluid" />
//                    </div>
//                    <div className="left_hm  d-flex align-items-center mt-3">
//                        <div>
//                             <h3 className="font-weight-bold text-white">Why smmDigg?</h3>
//                            <div className="my-2 panel-color rounded shadow-lg d-flex">
//                                 <i class="far fa-2x text-white mt-auto mb-auto pl-3 fa-gem"></i>
//                                <h6 className="py-3 text-white px-5">Quality service</h6>
//                            </div>
//                            <div className="my-2 panel-color rounded shadow-lg d-flex">
//                                 <i class="fas fa-2x text-white mt-auto mb-auto pl-3 fa-robot"></i>
//                                <h6 className="py-3 text-white px-5">Instant automatic submission</h6>
//                            </div>
//                            <div className="my-2 panel-color rounded shadow-lg d-flex">
//                                 <i class="fas fa-2x text-white mt-auto mb-auto pl-3 fa-ticket-alt"></i>
//                                <h6 className="py-3 text-white px-5">CRM Ticket system</h6>
//                            </div>
//                            <div className="my-2 panel-color rounded shadow-lg d-flex">
//                            <i class="far fa-thumbs-up fa-2x text-white mt-auto mb-auto pl-3"></i>
//                                <h6 className="py-3 text-white px-5">Multiple payment options</h6>
//                            </div>
//                            <div className="my-2 panel-color rounded shadow-lg d-flex">
//                            <i class="fas fa-2x text-white mt-auto mb-auto pl-3 fa-headset"></i>
//                                <h6 className="py-3 text-white px-5">24/7 Online support</h6>
//                            </div>
//                        </div>
//                    </div>
//                </div>
//                <Home_Footer/>