import axios from "../../config/axios"
import Swal from "sweetalert2"

export const SET_USER = "SET_USER"
export const SET_REMAINING_BUDGET = "SET_REMAINING_BUDGET"

const setUser = (user)=>{
    return {
        type:SET_USER,
        payload:user
    }
}

const setRemainingBudget = (value)=>{
    return {
        type:SET_REMAINING_BUDGET,
        payload:value
    }
}

//   Action for Registering Users Account
export const startRegisterUser = (formData, props)=>{
    return async(dispatch)=>{
        try {
            const user = await axios.post("/api/users/register", formData)
            console.log(user.data)
            //// --Error Handlings --
            if(user.data._message){
                Swal.fire({
                    icon: 'error',  
                    title: 'Oops...',
                    text: `${user.data._message}`,
                  })
            }else if(user.data.keyValue){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Phone number or email already taken`,
                  })
            }
            else if(user.data._id){
                Swal.fire(
                    'Good job!',
                    'Successfully Registered your account',
                    'success'
                  )
                 props.history.push("/login")
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.message}`,
              })
        }
    }
}


//Action for Log in the User
export const startLoginUser = (formData, props)=>{
    return async(dispatch)=>{
        try {
            const user = await axios.post("/api/users/login", formData)
            console.log(user.data)
            if(user.data.token){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Signed in successfully'
                  })
                localStorage.setItem("token", user.data.token)
               props.history.push("/dashboard")
            }

            ////  Error Handling while Login 
            if(user.data.errors){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `${user.data.errors}`,
                  })
            }

      
        } catch (error) {
            alert(error.message)
        }
    }
}


////  Action for Addding or Updating the Profile or Budget
export const startAddBudget = (formData)=>{
    return async(dispatch)=>{
        try {
            const budget = await axios.put(`/api/users/update`, formData, {headers:{
                "Auth":localStorage.getItem("token")
            }})
            dispatch(setUser(budget.data))
      
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error.message}`,
              })
        }
    }
}


/// Action for Getting the Users Account .......
export const startGetUsersAccount = ()=>{
    return (dispatch)=>{
        (
            async()=>{
                try {
                    const user = await axios.get("/api/users/account" , {headers:{
                        "Auth":localStorage.getItem("token")
                    }})
                    dispatch(setUser(user.data))   
                } catch (error) {
                    alert(error.message)
                }   
            }
        )()
    }
}

export const startFindBudgetAvailability = (formData)=>{
    console.log(formData)
    return (dispatch)=>{
        (
            async()=>{
                const budgetRemaining = await axios.post("/api/users/checkBudgetAvailability",formData, {headers:{
                    "Auth":localStorage.getItem("token")
                }}  )
                dispatch(setRemainingBudget(budgetRemaining.data))
            }
        )()

    }
}

export const startDeleteUsersAccount = (formData, props)=>{

    return (dispatch)=>{
        (
            async()=>{
                const user = await axios.post("/api/users/deleteAccount", formData, {headers:{
                    "Auth":localStorage.getItem("token")
                }}   )

                if(user.data?.error){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `${user.data.error}`,
                      })
                }else{
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'success',
                        title: 'Your Account Successfully Deleted'
                      })
                      localStorage.removeItem("token")
                      props.history.push("/")
                }  
                
            }
        )()
    }
}

