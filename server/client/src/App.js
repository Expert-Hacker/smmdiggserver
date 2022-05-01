import React, {Suspense} from 'react';
import './App.css';
import LandingPage from './Usercomponents/LandingPage';
// import ProtectedRoute from './ProtectedRoute';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Usercomponents/Home';
import Signup from './Usercomponents/Signup';



import Viewprofile from './Usercomponents/Viewprofile';
import Editprofile from './Usercomponents/Editprofile';

import Addfund from './Usercomponents/Addfund';
import Admin_landingPage from './Admincomponents/Admin_landingPage';
import error from './Usercomponents/Erroe404'
import Viewticket from './Usercomponents/Viewticket';
import Transaction_status from './Usercomponents/Transaction_status';
import TermsandConditions from './Usercomponents/TermsandConditions';
import Disclaimer from './Usercomponents/Disclaimer';
import PrivacyPolicy from './Usercomponents/PrivacyPolicy'
import Helmet from 'react-helmet'
import ForgotPassword from './Usercomponents/ForgotPassword';
import Newpassword from './Usercomponents/Newpassword'
import TransactionLogs from './Usercomponents/TransactionLogs';
import Help from './Usercomponents/Help';
import Dashboard from './Admincomponents/Dashboard';
import Users from './Admincomponents/Users'
import Add_order from './Admincomponents/Add_order';

import Neworder from './Usercomponents/Neworder';
import Service from './Usercomponents/Service';
import Myorders from './Usercomponents/Myorders';
import Support from './Usercomponents/Support';

import adUsers from './Admincomponents/Users';
import adOrders from './Admincomponents/Orders';
import adUpdate from './Admincomponents/Update';
import adService from './Admincomponents/Service';
import adTransaction_log from './Admincomponents/Transaction_log';
import adTickets from './Admincomponents/Tickets';
import adTrashservices from './Admincomponents/Trashservices';
import adPreference from './Admincomponents/Preference';
import Service_home from './Usercomponents/Services_home';
import Loading from './Loading/Loading';
import ProtectedRoute from './ProtectedRoute';
import { Provider } from 'react-redux';
import {store} from './state/Store/store'
import axios from 'axios';

function App() {
  let url="https://cors-anywhere.herokuapp.com/https://smmdigg.herokuapp.com/fetchServicepage"
  axios.get("/foo")
  .then((respone)=>console.log("Data is", respone))
  .catch((err)=>console.log(err))


  return (
    <>
    <Suspense fallback={<Loading  isActive={true}/>}>

      <BrowserRouter>
      <Helmet>
        <title>India's Cheapest SMM Service - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly</title>
        <meta name="description" content="smmdigg.in - Social Media Marketing - Get Your Social Account's Likes, Followers, Subscribers & More in cheap price at One Place,Instatntly"></meta>
        </Helmet>
      <Switch>
        
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <ProtectedRoute exact path="/edit-profile" component={Editprofile} user="Test"/>
        {/* <Route exact path="/v1.1/dashboard" component={LandingPage} /> */}
        <ProtectedRoute exact path="/v1.1/dashboard" component={LandingPage}/>
        <ProtectedRoute exact path="/view-profile" component={Viewprofile}/>
        <ProtectedRoute exact path="/edit-profile" component={Editprofile} user="Test"/>
        <ProtectedRoute exact path="/v1.1/addfund" component={Addfund}/>
        <Route exact path="/v1.1/application-help" component={Help}/>

        <Route exact path="/v1.1/terms-and-conditions" component={TermsandConditions}/>
        <Route exact path="/v1.1/disclaimer" component={Disclaimer}/>
        <Route exact path="/v1.1/privacy-policy" component={PrivacyPolicy}/>

        <ProtectedRoute exact path="/v1.1/admin-dashboard" component={Admin_landingPage}/>
        <ProtectedRoute exact path="/v1.1/dashboard/view-ticket" component={Viewticket}/>
        <ProtectedRoute exact path="/transaction-status" component={Transaction_status}/>

        <ProtectedRoute exact path="/v1.1/forgot-password" component={ForgotPassword}/>
        <ProtectedRoute exact path="/v1.1/update-password/:id" component={Newpassword} />
        <ProtectedRoute exact path="/transaction-logs" component={TransactionLogs} />

        <ProtectedRoute exact path="/v1.1/add-order" component={Add_order} />

       <ProtectedRoute exact path="/v1.1/new-order" component={Neworder} />
      <ProtectedRoute exact path="/v1.1/services" component={Service} />
      <ProtectedRoute exact path="/v1.1/myorders" component={Myorders} />
      <ProtectedRoute exact path="/v1.1/support" component={Support} />

      <Route exact path="/v1.1/services/list" component={Service_home}/>

      <ProtectedRoute exact path="/v1.1/admin/users" component={adUsers}/>
      <ProtectedRoute exact path="/v1.1/admin/orders" component={adOrders}/>
      <ProtectedRoute exact path="/v1.1/admin/update-order" component={adUpdate}/>
      <ProtectedRoute exact path="/v1.1/admin/Allservices" component={adService}/>
      <ProtectedRoute exact path="/v1.1/admin/AllTransactions" component={adTransaction_log}/>
      <ProtectedRoute exact path="/v1.1/admin/AllTickets" component={adTickets}/>
      <ProtectedRoute exact path="/v1.1/admin/Trashes" component={adTrashservices}/>
      <ProtectedRoute exact path="/v1.1/admin/preferences" component={adPreference}/>

        <Route component={error}/>
        
      </Switch>
      </BrowserRouter>

      </Suspense>
    </>
  );
}

export default App;
