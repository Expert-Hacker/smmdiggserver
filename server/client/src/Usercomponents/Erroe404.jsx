import { Button } from '@mui/material'
import React from 'react'
import Helmet from 'react-helmet'
import { useHistory } from 'react-router-dom'
import errorr from '../images/404_error_new.png'
function Erroe404() {
    let history=useHistory()
    function gotoHome()
    {
        history.push("/")
    }
    return (
        <div className="d-flex err_404 justify-content-center align-items-center">
             <Helmet>
                <title>404 Error :: page not found</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
            <div className='d-flex flex-column'>
                <img src={errorr} alt="404 Error" className='img-fluid' />
                <Button variant='outlined' size='small' className='my-5 ml-auto mr-auto' onClick={gotoHome} style={{display:"inline-block"}}>Back to Home</Button>
            </div>
        </div>
    )
}

export default Erroe404
