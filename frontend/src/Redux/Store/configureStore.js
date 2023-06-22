import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import usersReducer from "../Reducers/usersReducer"
import expensesReducer from "../Reducers/expensesReducer"
import categoriesReducer from "../Reducers/categoriesReducer"
import {composeWithDevTools} from 'redux-devtools-extension'

const configureStore = ()=>{
    const store = createStore(combineReducers({
        users:usersReducer,
        expenses:expensesReducer,
        categories:categoriesReducer
    }), composeWithDevTools(applyMiddleware(thunk)))
    return store
}

export default configureStore
