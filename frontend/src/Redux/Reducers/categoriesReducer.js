import { ADD_CATEGORY, REMOVE_CATEGORY, SET_CATEGORIES, SET_ERRORS } from "../Actions/categoriesAction"

const initalCategoriesData = {
    data:[],
    errors:{}
}

const categoriesReducer = (state=initalCategoriesData, action)=>{
    switch(action.type){
        case SET_CATEGORIES:{
            return {...state, data:action.payload}
        }
        case ADD_CATEGORY:{
            return {...state, data:[action.payload,...state.data]}
        }
        case SET_ERRORS:{
            return{...state, errors:action.payload}
        }
        case REMOVE_CATEGORY:{
            return {...state, data:[...state.data.filter(ele=>{
                return ele._id!==action.payload._id
            })]}
        }
        default:{
            return {...state}
        }
    }
}

export default categoriesReducer