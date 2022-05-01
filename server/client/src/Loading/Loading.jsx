import ClassNames from 'classnames'
import React from 'react'
import styles from './LoadingIndicator.module.scss';
import {Dimmer, Image, Loader, Segment} from 'semantic-ui-react'
import { CircularProgress } from '@mui/material';
import loader from '../images/loader1.gif'
function Loading(props) {
  console.log(props)
  const { isActive = false } = props;
  let status=isActive
  const { className, children } = props;
  const cssClasses = ClassNames(className, {
    [styles.wrapper]: status,
  });
  return (
    <div className={cssClasses}>
    {status && (
        <div className={styles.loaderContainer}>
            <div className='d-flex flex-column  align-items-center'> 
                {/* <CircularProgress color='secondary'/> */}
                {/* <div class="spinner-border text-dark" style={{height:"3rem",width:"3rem"}} role="status" >
                    <span class="sr-only m-0 p-0"></span>
                </div> */}
                <img src={loader} alt="Fetching data..." height="100px" width="100px"/>
                {/* <h3 className='text-dark m-0 p-0'>Fetching data...</h3> */}
            </div>
            
        </div>
      )}
      {children}
    </div>
      // status && <div className='master-loading-div'><h1>Loading</h1></div>
  )
}

export default Loading