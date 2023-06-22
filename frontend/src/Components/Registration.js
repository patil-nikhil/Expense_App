import { useState } from "react"
import { useDispatch } from "react-redux"
import { startRegisterUser } from "../Redux/Actions/usersAction"
import { Link } from "react-router-dom/cjs/react-router-dom.min"

const Registration = (props) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [occupation, setOccupation] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    const handleRegisterSubmit = (e) => {
        e.preventDefault()
        const formData = {
            email, password, profile: {
                username, occupation, phone
            }
        }
        dispatch(startRegisterUser(formData, props))

    }

    return (
        <div className="d-flex justify-content-center ">
            <div className=" card p-4 shadow my-4 col-md-4">
                <h3 className="d-flex justify-content-center badge bg-success text-wrap fs-5 ">Register With Us</h3>

                <form onSubmit={handleRegisterSubmit}>
                    <label htmlFor="name" className="form-label">UserName <sup style={{ color: "red" }}>*</sup></label><br />
                    <input type="text" className="form-control"
                        id="name" value={username}
                        placeholder="Enter your Name"
                        onChange={(e) => { setUsername(e.target.value) }}
                        required
                    /><br />

                    <label htmlFor="email" className="form-label">Email <sup style={{ color: "red" }}>*</sup></label><br />
                    <input type="text"
                        className="form-control"
                        id="email" value={email}
                        placeholder="Enter your email"
                        onChange={(e) => { setEmail(e.target.value) }} required /><br />

                    <label htmlFor="phone" className="form-label">Phone <sup style={{ color: "red" }}>*</sup></label><br />
                    <input type="text"
                        className="form-control"
                        id="phone" value={phone}
                        placeholder="Enter your email"
                        onChange={(e) => { setPhone(e.target.value) }} required /><br />

                    <label htmlFor="occupation" className="form-label">Occupation <sup style={{ color: "red" }}>*</sup></label><br />
                    <select id="occupation" value={occupation} onChange={(e) => { setOccupation(e.target.value) }} className="form-select">
                        <option value="">Select Occupation</option>
                        <option value="working">Working</option>
                        <option value="non-working">Non-Working</option>
                        <option value="student">Student</option>
                    </select><br />

                    <label htmlFor="pass" className="form-label">PassWord <sup style={{ color: "red" }}>*</sup></label><br />
                    <input type="password"
                        className="form-control"
                        value={password} id="pass"
                        placeholder="Enter your password"
                        onChange={(e) => { setPassword(e.target.value) }} required /><br />

                    <input type="submit" className="btn btn-primary" />   <span className="p-5">Already have a account <Link to="/login"> login here</Link></span>


                </form>
            </div>
        </div>
    )
}

export default Registration