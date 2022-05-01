import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import '../users_ad.css'
import UserEditModal from './UserEditModal';
import moment from 'moment';
import Helmet from 'react-helmet';
import Passwordchange from './Passwordchange';
import AdminHeader from './AdminHeader';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { FormControl, InputGroup } from 'react-bootstrap';
import AddNewuser from './AddNewuser';
function Users() {
    const[users,setusers]=useState([]);
    const[input,setInput]=useState("")
    const[noUser,setNouser]=useState(false)
    const[loading,setOLaoding]=useState(true)
    const[id,setID]=useState("")
    const[show,setShow]=useState(false)
    const[show1,setShow1]=useState(false)
    const[show2,setShow2]=useState(false)
    const[role,setRole]=useState("")
    const[email,setEmail]=useState("")
    const[name,setName]=useState("")

    useEffect(() => {
      fetchAllUsers();
    }, [])
    async function fetchAllUsers()
    {
        let resp= await fetch('/fetchallUsers',{
            method:"GET",
            headers:{
                "Content-type":"application/json"
            }
        })
        let data=await resp.json();
        setNouser(false)
        setOLaoding(false)
        setusers(data)
       
    }

    function hanleInput(e)
    {
       setInput(e.target.value)
    }

   async function search()
    {
        try {
            setOLaoding(true)
            if(input=="")
            {
                fetchAllUsers();
            }
            let resp=await fetch(`/searchuserByID/${input}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json()
            setusers(data)
            setOLaoding(false)
            setNouser(false)
         
            if(resp.status==400)
            {
                setNouser(true);
            }
        } catch (error) {
            setNouser(true);
            setOLaoding(false)
        }
    }

    async function searchbyEmail()
    {
        try {
            setOLaoding(true)
            if(email=="")
            {
                fetchAllUsers();
            }
            let resp=await fetch(`/searchUserbyEmail/${email}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            let data= await resp.json()
            setusers(data)
            setOLaoding(false)
            setNouser(false)
         
            if(resp.status==400)
            {
                setNouser(true);
            }
        } catch (error) {
            setNouser(true);
            setOLaoding(false)
        }
    }


    function editUser(id,role)
    {
        setID(id);
        setRole(role);
     
        setShow(true)
       
    }
    function handleClose(id)
    {
      
        setShow(false)
        
    }
    function refresh()
    {
        fetchAllUsers();
    }
    function hanleEmailInput(e)
    {
        setEmail(e.target.value)
    }
    function changePasswd(id,name)
    {
        setShow1(true)
        setID(id)
        setName(name)
       
        
    }
    function handleClose1()
    {
        setShow1(false)
    }

        
      //Export all users
        const exportToCSV = (users,fileName ) => {
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            // const fileName="SMMDIGG_users";
            const ws = XLSX.utils.json_to_sheet(users);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], {type: fileType});
            FileSaver.saveAs(data, "Users-smmdigg.in" + fileExtension);
        
    }
    function addNewUser()
    {
        setShow2(true);
        
        
    }
    function handleClose2()
    {
        setShow2(false)
    }

    const deleteUser = async(uid)=>{
        
       let confrm=window.confirm("Are you sure to delete this user?")
       if(confrm)
       {
            let resp=await fetch(`/deleteUserr/${uid}`,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            if(resp.status==200)
            {
                alert("User Deleted sucessfully!")
            }
            else
            {
                alert("Unable to delete the User")
            }
       }
    }
    return (
        <div className="users_ad ">
       
            <Helmet>
                <title>Users</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            {loading ? <LinearProgress/> : ""}
            <AdminHeader/>
            <div className="top_ad_user d-flex justify-content-between container-fluid">
                <p className="p-3 h6">Showing Result of {users.length} Users</p>
                <div className=''>
                    {/* <TextField onChange={hanleEmailInput} name="text" size="small" className="my-3 " label="Search by Email" variant="outlined"/>
                    <i class="fas my-3 mx-3 fa-2x fa-search" onClick={searchbyEmail}></i> */}
                    <InputGroup className="my-3">
                    <FormControl onChange={hanleEmailInput}  name="text"
                        placeholder="Enter Email"
                        aria-label="Enter Email"
                        aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-dark" onClick={searchbyEmail} className='bg-dark' id="button-addon2">
                        <i class="fas text-white fa-search" ></i>
                        </Button>
                    </InputGroup>
                </div>
                <div>
                    {/* <i class="fas fa-sync-alt mr-4 fa-2x" onClick={refresh}></i> */}
                    {/* <TextField onChange={hanleInput} name="text" size="small" className="my-3 " label="Search by User ID" variant="outlined"/>
                    <i class="fas my-3 mx-3 fa-2x fa-search" onClick={search}></i> */}
                     <InputGroup className="my-3">
                    <FormControl onChange={hanleInput} name="text"
                        placeholder="Enter User ID"
                        aria-label="Enter User ID"
                        aria-describedby="basic-addon2"
                        />
                        <Button onClick={search} variant="outline-dark" className='bg-dark' id="button-addon2">
                        <i class="fas text-white fa-search" ></i>
                        </Button>
                    </InputGroup>
                </div>
                <div className='my-3'>
                    <Button><i class="fas fa-sync-alt mr-4 fa-2x" onClick={refresh}></i></Button>
                </div>
                <div className='d-flex'>
                    <Button className='mt-auto mb-auto mr-3' variant="contained" color='success' onClick={addNewUser}>Add</Button>
                    <Button className='mt-auto mb-auto' variant="contained" onClick={()=>{exportToCSV(users,"users")}}>Export</Button>
                    {/* <button onClick={exporttt}>export</button> */}
                </div>
            </div>
            <table class="table table-responsive">
            <thead class="thead-dark">
                <tr>
                <th scope="col">SL.NO</th>
                <th scope="col">NAME</th>
                <th scope="col">ACTION</th>
                <th scope="col">CHANGE PASSWD</th>
                <th scope="col">EMAIL</th>
                <th scope="col">ROLE</th>
                <th scope="col">PHONE</th>
                <th scope="col">BALANCE</th>
                <th scope="col">USER ID</th>
                <th scope="col">CREATED AT</th>
                </tr>
            </thead>
            <tbody>
               
                 {noUser ? <h4 className="my-2 text-danger">We could't find any user with {input}</h4> : users.map((info,index)=>(
                     <tr>
                    <td>{index+1}</td>
                    <td>{info.name}</td>
                    <td><i class="far fa-edit" onClick={()=>editUser(info._id,info.role)}></i><i class="fas ml-4 fa-trash-alt" onClick={()=>deleteUser(info._id)}></i></td>
                    <td><i class="fas text-danger fa-lock" onClick={()=>changePasswd(info._id,info.name)}></i></td>
                    <td>{info.email}</td>
                    <td>{info.role}</td>
                    <td>{info.phone}</td>
                    <td>{info.balance.toFixed(2)}</td>
                    <td>{info._id}</td>
                    <td>{moment(info.createdAt).format("dddd, MMMM Do YYYY, h:mm a")}</td>
                    </tr>
                ))
                
                } 
            
            </tbody>
          
            </table>
            <UserEditModal show={show} handleClose={handleClose} role={role} id={id}/>
            <Passwordchange show={show1}  handleClose={handleClose1} id={id} name={name}/>
            <AddNewuser show={show2} handleClose={handleClose2}/>
        </div>
    )
}

export default Users
