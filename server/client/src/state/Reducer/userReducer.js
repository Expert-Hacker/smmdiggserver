import { actions } from "../Action-Types"

const initialState=[
    {
        id:1,
        name:"Keerthan",
        email:"keerthan@123.com",
        address:"Udupi",
    },
    {
        id:2,
        name:"Dev",
        email:"Dev@123.com",
        address:"Manglore",
    }
]


export const userReducer=(state=initialState,action)=>{
    if(action.type==actions.ADD_USERS)
    {
        state= [...state,action.payload]
        return state
    }
    else if(action.type==actions.DELETE_USER)
    {
        let deletedData=state.filter(users=>users.id != action.payload)
        return deletedData
    }
    else if(action.type==actions.UPDATE_USER)
    {
        let updateddata=state.map(users=>users.id==action.payload.id ? action.payload : users)
        return updateddata
    }
    else
    {
        return state
    }
}