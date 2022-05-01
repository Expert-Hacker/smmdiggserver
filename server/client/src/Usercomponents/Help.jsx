import React from 'react'
import { Helmet } from 'react-helmet'
import {Link,useHistory} from 'react-router-dom'
function Help() {
    const history=useHistory();
    function returnn()
    {
        history.push('/')
    }
    return (
        <div className="container">
            <Helmet>
                <title>Help</title>
                <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
                <meta name="keywords" content="smm,social media marketing, likes, followers, subscribers, view, increase followers, increase likes, increase subscribers, increase youtube subscribers, cheap instagram followers, trusted cheap best price facebook ads, youtube ads, youtube watchtime hours, cheap youtube watchtime hours, cheapest in market, facebook likes, facebook followers, twitter likes, comments, india's cheapest smm service at best price in market, 
                इन्सग्राम फॉलोअर्स बढ़ाएं, insagraam pholoars badhaen, 
                इन्सग्राम लाइक बढ़ाएं, insagraam laik badhaen  "/>

                <meta property="og:smmdigg" content="" /> 
                <meta property="og:www.smmdigg.in" content="" /> 
                <meta property="og:Addfund" content=""/> 
                <meta property="og:description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly" />
                <meta property="og:img" content="" /> 
                <meta property="og:url" content="" /> 
                <meta property="og:type" content="article" />
            </Helmet> 
            <div className='my-2'>
                <i class="fas fa-2x fa-arrow-circle-left" onClick={returnn}></i>
            </div>
            <div className='py-3'>
                <h2>What is SMM Panel?</h2>
                <p>One way to maximize marketing on social media is to use the SMM panel. SMM Panel is a marketing panel and SEO service that is reasonably priced so that people can buy social media services such as Twitter or Facebook followers.</p>
                <p>Social media is one of the best ways to maximize your business. If you are a business owner, then there is no harm in using a cheap SMM panel and using this social media service.</p>
                <p>Panel SMM is arguably a complete package to gather targeted online audiences to specific sites for the purpose of business promotion. Buying comments, likes and followers and using the organic method is arguably the SMM Panel.</p>
            </div>
            <div className='py-3'>
                <h2>SMMDIGG Cheapest and Guranteed SMM Panel</h2>
                <p>SMM (Social Media Marketing) is the users of social media platforms like Instagram, YouTube, Facebook, Twitter and many more, which is promote or grow your personal profiles or your company's profile on the social media platform. Many companies provide SMM services, but they are very slow or shallow quality. SMMDIGG Provides the best and genuine services that are best from the market. Cheap Prices, High-Quality services, Instant Delivery, Make us a perfect SMM Panel Provider.</p>
                <p>Our website dashboard is fully dynamic and user-friendly and is connected with every social media network to provide users a better experience. SMM Panel has maximum advantages to promote their business online and we also help resellers get the best prices for services from us. </p>
            </div>
            <div className='py-3'>
                <h2>Our Best Services</h2>
                <p>We always provide quality services to our customers. We provide 24*7 support to all our customers on the ticket system and also on WhatsApp. We try our best to gives you services on time.</p>
            </div>
            <div className='py-3'>
                <h2>How does SMM Panel Works</h2>
                <p>1. Create an Free account</p>
                <p>2. Add fund via Razorpay[Phonepay, GooglePay, PayTm, Cards, Etc available]</p>
                <p>3. Place New order and wait for mins/hours.</p>
                <p>4 .Order Auto Completetd by system.</p>
            </div>
        </div>
    )
}

export default Help

