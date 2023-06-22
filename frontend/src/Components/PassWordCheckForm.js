import { useState } from "react";
import { useDispatch } from "react-redux";
import { startDeleteUsersAccount } from "../Redux/Actions/usersAction";

const PasswordCheckForm = (props) => {
    const [password, setPassWord] = useState("")

    const {handlePassWordModal , histpryProps} = props

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            password
        }
       dispatch(startDeleteUsersAccount(formData, histpryProps))
       handlePassWordModal()

    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="pass" className="form-label" >PassWord <sup style={{ color: "red" }}>*</sup></label><br />
                <input type="password"
                    className="form-control"
                    value={password} id="pass"
                    placeholder="Enter your password"
                    onChange={(e) => { setPassWord(e.target.value) }}
                    required
                /><br />
                <input type="submit" className="btn btn-primary" />
            </form>
        </div>
    )
}

export default PasswordCheckForm