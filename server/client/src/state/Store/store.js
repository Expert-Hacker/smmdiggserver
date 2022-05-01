import {createStore,applyMiddleware} from "redux"
import {reducers} from '../Reducer/root-reducers'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'


export let store=createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))

 
// normall way of exporting store without persisting   
// export const store=createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))