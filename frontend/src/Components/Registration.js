import { useState } from "react"
import { useDispatch } from "react-redux"
import { startRegisterUser } from "../Redux/Actions/usersAction"

const Registration = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email, password
        }
        dispatch(startRegisterUser(formData, props))

    }

    return (
        <div className="d-flex justify-content-center ">
            <div className=" card p-4 shadow my-4 col-md-4">
                <h3 className="d-flex justify-content-center badge bg-success text-wrap fs-5 ">Register With Us</h3>

                <form onSubmit={handleRegisterSubmit}>

                    <label htmlFor="email" className="form-label">Email <sup style={{ color: "red" }}>*</sup></label><br />
                    <input type="text"
                        className="form-control"
                        id="email" value={email}
                        placeholder="Enter your email"
                        onChange={(e) => { setEmail(e.target.value) }} required /><br />

                    <label htmlFor="pass" className="form-label">PassWord <sup style={{ color: "red" }}>*</sup></label><br />
                    <input type="password"
                        className="form-control"
                        value={password} id="pass"
                        placeholder="Enter your password"
                        onChange={(e) => { setPassword(e.target.value) }} required /><br />

                    <input type="submit" className="btn btn-primary" />

                </form>
            </div>
        </div>
    )
}

export default Registration