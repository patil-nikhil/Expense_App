import { ADD_EXPENSE, DELETED_EXPENSE, EDIT_EXPENSE, PERMANENET_REMOVE_ALL, REMOVE_EXPENSE, SET_EXPENSES, UNDO_EXPENSE } from "../Actions/expensesAction"

const initalExpenseData = {
    data:[],
    errors:{},
    deletedData:[]
}

const expensesReducer = (state=initalExpenseData, action)=>{
    switch(action.type){
        case SET_EXPENSES:{
            return{...state, data:action.payload}
        }
        case ADD_EXPENSE:{
            return{...state, data:[action.payload, ...state.data]}
        }
        case REMOVE_EXPENSE:{
            return {...state, data:[...state.data.filter(ele=>ele._id!==action.payload._id)]}
        }
        case EDIT_EXPENSE:{
            return {...state, data:[...state.data.map(ele=>{
                if(ele._id===action.payload._id){
                    return {...ele , ...action.payload}
                }else{
                    return {...ele}
                }
            })]}
        }
        case DELETED_EXPENSE:{
            return{...state, deletedData:action.payload}
        }
        case UNDO_EXPENSE:{
            return {...state, deletedData:[...state.deletedData.filter(ele=>ele._id!==action.payload._id)]}
        }
        case PERMANENET_REMOVE_ALL:{
            return {...state, deletedData:[]}
        }

        default:{
            return{...state}
        }
    }
}

export default expensesReducer