import React, { useEffect, useState } from 'react'
import {TextField,Button} from '@mui/material'
import Helmet from 'react-helmet';
function Modal1(props) {
  const[currency,setcurr]=useState("")
  useEffect(() => {
    // fetchCuerrencyDetails();
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
 
    return (
        <div>
            <div class="modal  fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            
                    <div class="modal-dialog" role="document">
                    <Helmet>
                <title>{props.name}</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel">{props.name}</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                         <p className="font-weight-bold">Minumum:<span className="text-success mx-2">{props.min}</span></p>
                         <p className="font-weight-bold">Maximum:<span className="text-danger mx-2">{props.max}</span></p>
                         <p className="font-weight-bold">Rate per 1000(INR):<span className=" mx-2">{props.rate}</span></p>
                            <hr />
                         <p className="font-weight-bold">Description:</p><span>{props.desc}</span>
                        </div>
                        <div class="modal-footer">
                          <Button   data-dismiss="modal">Close</Button>
                        </div>
                      </div>
                    </div>
                  </div>
        </div>
    )
}

export default Modal1
