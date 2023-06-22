import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { startGetUsersAccount } from "../Redux/Actions/usersAction"
import DeletedExpenses from "./DeletedExpensesList"
import BudgetForm from "./BudgetForm"
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { startGetUserCategories, startRemoveCategory } from "../Redux/Actions/categoriesAction"
import Swal from "sweetalert2"
import { startGetUsersDeletedExpenses } from "../Redux/Actions/expensesAction"
import PasswordCheckForm from "./PassWordCheckForm"



const Settings = (props) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetUsersAccount())
        dispatch(startGetUserCategories())
        dispatch(startGetUsersDeletedExpenses())
    }, [dispatch])

    const userDeltedExpenses = useSelector((state) => {
        return state.expenses.deletedData
    })

    ///// Setting Toggle for Budget Model .............
    const [modal, setModal] = useState(false);

    //  Delete Account Toggle
    const [passwordmodal, setpasswordmodal] = useState(false)

    const toggle = () => {
        setModal(!modal)
    }


    /////  Getting User details for displaying the budget
    const userAccount = useSelector((state) => {
        return state.users.data
    })

    const { budget } = userAccount

    const handleEditBudget = () => {
        toggle()
    }

    const expenses = useSelector((state) => {
        return state.expenses.data
    })

    const totalBudgetUsed = expenses.reduce((pv, cv) => {
        return pv + cv.amount
    }, 0)

    const unUsedBudget = budget - totalBudgetUsed


    ///// Listing Categories  .............
    const categories = useSelector((state) => {
        return state.categories.data
    })

    const handleDeleteCategory = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Deleteing this Category will also delete expenses releted to this permanently",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startRemoveCategory(id))
                Swal.fire(
                    'Deleted!',
                    'Your category has been deleted.',
                    'success'
                )
            }
        })
    }



    /////  Delete Account Functionalaity

    const handlePassWordModal = () => {
        setpasswordmodal(!passwordmodal)
    }

    const handleDeleteAccount = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete my account'
        }).then((result) => {
            if (result.isConfirmed) {
                handlePassWordModal()
            }
        })
    }


    return (
        <div className="container">
            <div className="row">
                {
                    modal && <div>

                        <Modal isOpen={modal}>
                            <ModalHeader toggle={toggle}>Modify your Budget according to savings</ModalHeader>
                            <ModalBody>
                                <BudgetForm
                                />
                            </ModalBody>
                        </Modal>

                    </div>

                }

                {
                    passwordmodal && <div>

                        <Modal isOpen={passwordmodal}>
                            <ModalHeader passwordmodal={passwordmodal}>Enter Your PassWord to Delete your account</ModalHeader>
                            <ModalBody>
                                <PasswordCheckForm
                                    handlePassWordModal={handlePassWordModal}
                                    histpryProps={props}
                                />
                            </ModalBody>
                        </Modal>


                    </div>

                }

                {
                    budget === 0 ?
                        <div className="d-flex flex-row">
                            <BudgetForm />
                        </div> :
                        <div className="container">
                            <div className="d-flex flex -row">

                                <div className="col-md-4 card shadow my-5 p-3 bg-primary-subtle" >
                                    <h2>Total Budget : <span style={{ color: "GrayText" }}>{budget}</span> <button className="btn btn-secondary btn-sm"
                                        onClick={handleEditBudget}
                                    ><img width="18" height="15" src="https://img.icons8.com/wired/64/edit.png" alt="edit" /></button></h2>
                                    <h2>Used Amount : <span style={{ color: "GrayText" }}>{totalBudgetUsed}</span></h2>
                                    <h2>Remaining Purse : <span style={{ color: "GrayText" }}>{unUsedBudget}</span></h2>
                                    <span style={{ color: "green" }}><strong>Note: All the Amount are in Indian rs</strong></span>
                                    <br />
                                    <button className="btn btn-danger" onClick={handleDeleteAccount} >Delete Account</button>
                                </div>
                                <div className="col-md-3 my-5 card shadow">
                                    <h4>Listing Categories - {categories.length}</h4>
                                    <ul className="list-group">
                                        {
                                            categories &&
                                            categories.map(ele => {
                                                return <li className="list-group-item list-group-item-secondary" key={ele._id}>{ele.title}
                                                    - <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() => { handleDeleteCategory(ele._id) }}>Delete</button></li>
                                            })
                                        }
                                    </ul>
                                </div>

                            </div>

                            <div className="col-md-6 card shadow  p-2 ">
                                {
                                    !userDeltedExpenses.length === 0 ?
                                        <div>
                                            <DeletedExpenses expenses={userDeltedExpenses} />
                                        </div> :
                                        <div>
                                            <h1>No Recently Deleted Expenses Found</h1>
                                        </div>

                                }

                            </div>

                        </div>

                }
            </div>
        </div>
    )
}

export default Settings
