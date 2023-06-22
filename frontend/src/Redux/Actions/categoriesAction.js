import axios from "../../config/axios"
import Swal from "sweetalert2"

export const SET_CATEGORIES = "SET_CATEGORIES"
export const ADD_CATEGORY = "ADD_CATEGORY"
export const REMOVE_CATEGORY = "REMOVE_CATEGORY"
export const SET_ERRORS = "SET_ERRORS"

const setCategories = (categories)=>{
    return {
        type:SET_CATEGORIES,
        payload:categories
    }
}

const addCategory = (category)=>{
    return {
        type:ADD_CATEGORY,
        payload:category
    }
}

const removeCategory = (category)=>{
    return {
        type:REMOVE_CATEGORY,
        payload:category
    }
}

export const startGetUserCategories = ()=>{
    return (dispatch)=>{
        (   
            async()=>{
                try {
                    const categories = await axios.get("/api/categories", {headers:{
                    "Auth":localStorage.getItem("token")
                    }})
                    dispatch(setCategories(categories.data))
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }

}


export const startAddNewCategory = (formData)=>{
    return (dispatch)=>{
        (
            async()=>{
                const newCategory = await axios.post("/api/categories", formData, {headers:{
                    "Auth":localStorage.getItem("token")
                    }})
                    console.log(newCategory.data)
                    if(newCategory.data._id){
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Category Added Successfully',
                            showConfirmButton: false,
                            timer: 1500
                          })
                        dispatch(addCategory(newCategory.data))
                    }

                    ///// Error  Handlingss -----------
                    else if(newCategory.data?.keyValue){
                        Swal.fire({
                            icon: 'error',
                            title: 'You cannot add this...',
                            text: `${newCategory.data?.keyValue.title} category already exists`,
                          })
                    }
            }
        )()
    
    }
}

export const startRemoveCategory = (id)=>{
    return (dispatch)=>{
        (
            async()=>{
            const values = await Promise.all([
                    axios.delete(`/api/categories/${id}`,{headers:{
                        "Auth":localStorage.getItem("token")
                        }} ),
                    axios.delete(`/api/expenses/category/${id}`,{headers:{
                        "Auth":localStorage.getItem("token")
                        }})
               ])
               const categoryData = values[0]
               dispatch(removeCategory(categoryData.data))
            }
        )()
    }
}