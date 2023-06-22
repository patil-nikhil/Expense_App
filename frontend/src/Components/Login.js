import { useState } from "react"
import { useDispatch } from "react-redux"
import { startLoginUser } from "../Redux/Actions/usersAction"



const Login = (props)=>{
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const handleLoginSubmit = (e)=>{
        e.preventDefault()
        const formData = {
            email, password
        }
        dispatch(startLoginUser(formData, props))
    }

    return (
        <div className="d-flex justify-content-center">
        <div className="card p-4 shadow my-4 col-md-4">
        <h3 className="d-flex justify-content-center badge bg-success text-wrap fs-5 ">Login to Account</h3>
        <form onSubmit={handleLoginSubmit}>

            <label htmlFor="email" className="form-label">Email <sup style={{color:"red"}}>*</sup></label><br/>
            <input type="text" 
            id="email" value={email} 
            className = "form-control"
            placeholder="Enter your email" 
            onChange={(e)=>{setEmail(e.target.value)}}
            required
            /><br/>

            <label htmlFor="pass" className="form-label" >PassWord <sup style={{color:"red"}}>*</sup></label><br/>
            <input type="password" 
            className = "form-control"
            value={password} id="pass" 
            placeholder="Enter your password"
             onChange={(e)=>{setPassword(e.target.value)}}
             required
             /><br/>

            <input type="submit" className="btn btn-primary"/>

        </form>
        </div>
    </div>
    )
}

export default Login