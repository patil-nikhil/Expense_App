import {SET_REMAINING_BUDGET, SET_USER } from "../Actions/usersAction"

const usersInitalState = {
    data:[],
    errors:{},
    remainingBudget:{}
}

const usersReducer = (state=usersInitalState, action)=>{
    switch(action.type){
        case SET_USER:{
            return {...state, data:action.payload}
        }
        case SET_REMAINING_BUDGET:{
            return {...state, remainingBudget:action.payload}
        }
        default:{
            return{...state}
        }
    }
}

export default usersReducer