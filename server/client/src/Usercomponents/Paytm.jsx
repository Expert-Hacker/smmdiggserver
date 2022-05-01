import React, { useEffect } from 'react'
import qr from '../images/qr.jpg'
import GooglePayButton from '@google-pay/button-react';
import Helmet from 'react-helmet';
function Paytm() {

    return (
        <div className="mt-5">
             <Helmet>
                <title>Add Fund - paytm</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>
            </Helmet>
           <div className='paytm_divv d-flex justify-content-around'>
               <div>
                    <img src={qr} alt="QR_Code"  height="500px" />
               </div>
               <div className='mb-auto mt-auto instruction_div'>
                    <h5 className='font-weight-bold pb-3'>Instructions</h5>
                    <p>1. Scan this QR code and make the Payment.</p>
                    <p>2. Take screenshot of transaction details.</p>
                    <p>3. Send screenshot into +91 6361027573 WhatsApp.</p>
                    <p>Then, immediately your fund will be added.</p>
                    <div className='pt-3'>
                        <h5>NOTE:</h5>
                        <p>Use Razorpay, your fund will added automatically.</p>
                    </div>
                    <div className='pt-3'>
                        <p>For any queries, Please raise a Ticket.</p>
                    </div>
               </div>
           </div>
           
        </div>
    )
}

export default Paytm
