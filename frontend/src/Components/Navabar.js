import { Link, Route, withRouter } from "react-router-dom"
import Registration from "./Registration"
import Login from "./Login"
import Settings from "./Settings"
import Account from "./Account"
import PrivateRoute from "../config/PrivateRoute"
import DashBoard from "./DashBoard"
import Home from "./Home"
import { loginNavItems, withoutLoginItems } from "./navItems"

const Navbar = (props) => {

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are u sure want logout")
        if (confirmLogout) {
            props.history.push("/")
            localStorage.removeItem("token")
        }
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-secondary ">
                <div className="container-fluid ">
                    <a className="navbar-brand text-white" href="/#">EXPENSE APP</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mx-3">
                            {
                                !localStorage.getItem("token") ?
                                    <div className="d-flex flex-row gap-5">
                                        {
                                            withoutLoginItems.map((ele) => {
                                                return <Link key={ele.id} className="nav-link fs-5 text-white" to={`${ele.path}`}> {ele.name} </Link>
                                            })
                                        }
                                    </div> :
                                    <div className="d-flex flex-row gap-5">
                                        {
                                            loginNavItems.map((ele) => {
                                                return <Link key={ele.id} className="nav-link fs-5 text-white" to={`${ele.path}`}> {ele.name} </Link>
                                            })

                                        }
                                        <Link className="nav-link fs-5 text-white" to="/" onClick={handleLogout}>Logout</Link>

                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>

            <Route path="/registration" component={Registration} exact={true} />
            <Route path="/login" component={Login} exact={true} />
            <Route path="/" component={Home} exact={true} />
            <PrivateRoute path="/settings" component={Settings} exact={true} />
            <PrivateRoute path="/account" component={Account} exact={true} />
            <PrivateRoute path="/dashboard" component={DashBoard} exact={true} />
        </div>
    )
}

export default withRouter(Navbar)

///d-flex flex-row gap-5