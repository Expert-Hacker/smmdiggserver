import React from 'react'
import { TextField,Button } from '@mui/material'
import {Modal} from 'react-bootstrap'
import Helmet from 'react-helmet'
function Notifications(props) {
    return (
        <div className="notification">
             
            <Modal show={props.show} className="notification" onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><i class="far fa-bell"></i> Notifications</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 className="text-danger font-weight-bold"> 🎉 PRICE DROP!</h6>
                    <p>Upto 33% price drop on all services.. Hurry up!</p>
                    <hr />
                    <h5>Application updated - New Release v1.1</h5>
                    <ul className='listNot'>
                        <li>Fixed major bugs</li>
                        <li>Cheap service added</li>
                    </ul>
                    <hr />
                    <h5>🥉 New server Added -2022</h5>
                    <p>Checkout cheapest category</p>
                    <p>T&C Apply</p>
                    <hr />
                    <h5>🥉 Jan 26 2022 New Services Added</h5>
                    <p>With optimized application code</p>
                    <p>Added YouTube, Premium Accounts services</p>
                    <p>Added Instagram services and lot more.</p>
                    <p>Hurry up. Order Today! 🟡</p>
                    
                    <p>T&C Apply</p>
                    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" color="warning" onClick={props.handleClose}>
                        Close
                    </Button>
                   
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Notifications
