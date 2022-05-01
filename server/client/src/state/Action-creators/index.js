import {actions} from '../Action-Types/index'

//adding new users into Redux
export const setUserIntoRedux =(data)=>{
    return(dispatch)=>{
        dispatch({
            type:actions.ADD_USERS,
            payload:data
        })
    }
}

export const updateUser =(data)=>{
    return(dispatch)=>{
        dispatch({
            type:actions.UPDATE_USER,
            payload:data
        })
    }
}

export const deleteuser =(data)=>{
    return(dispatch)=>{
        dispatch({
            type:actions.DELETE_USER,
            payload:data
        })
        
    }
}