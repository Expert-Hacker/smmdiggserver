import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Helmet } from 'react-helmet'

function EditCategory(props) {
    const[lenth,setLenth]=useState("")
    const[Input,setInput]=useState("")
    useEffect(() => {
        fetchCategory();
    }, [])

    async function fetchCategory()
    {
        let resp=await fetch(`/fetchcategoryAd/${props.cate}`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        })
        let data=await resp.json();
        console.log(data)
        setLenth(data.length)
    }
    function refrsh()
    {
        fetchCategory();
    }
    function handleInput(e)
    {
        setInput(e.target.value)
    }
    async function upDate()
    {
        console.log("Acrual", props.cate)
        console.log("tochange", Input)
        let resp=await fetch(`/changecategoryByad/${Input}`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                category:props.cate
            })
        })
        if(resp.status==200)
        {
            alert("Update success")
        }
        else
        {
            alert("Unable to update category")
        }
    }
    return (
        <div>
            <Modal show={props.show3} onHide={props.handleClose3}>
           <Helmet>
                <title>Edit category</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
                <Modal.Header >
                    <Modal.Title>Edit category</Modal.Title>
                    <button onClick={refrsh}>refresh</button>
                </Modal.Header>
                <Modal.Body>
                    <div>
                       <h6>{props.cate} of {lenth} </h6>
                    </div>  
                    <div>
                        <TextField onChange={handleInput} type="text" value={Input} fullWidth/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={upDate}>Update</Button>
                    <Button variant="primary"  onClick={props.handleClose3}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditCategory
