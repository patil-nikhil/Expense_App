import EditExpense from "./EditExpense";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { startRemoveUserExpense } from "../Redux/Actions/expensesAction"
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Swal from "sweetalert2"
import { startGetUserCategories } from "../Redux/Actions/categoriesAction";


const ExpensesList = (props) => {

    const [toggleEdit, setToggleEdit] = useState(false)
    const [editInfo, setEditInfo] = useState({})
    const [modal, setModal] = useState(false);
    const [pageItems, setPageItems] = useState(5)

    const dispatch = useDispatch()

    useEffect(()=>{ 
        dispatch(startGetUserCategories())
    },[dispatch])

    const categories = useSelector((state) => {
        return state.categories.data
    })

    const { expenses } = props

    const toggle = () => {
        setModal(!modal)
        setToggleEdit(!toggleEdit)
    }

    /////  Edit Expense  Functionality ---------
    const handleExpenseEdit = (editObj) => {
        toggle()
        setToggleEdit(!toggleEdit)
        setEditInfo(editObj)
    }

    ////   Remove Expense Functionality   --------------------
    const handleRemoveExpense = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startRemoveUserExpense(id))
                Swal.fire(
                    'Deleted!',
                    'Your Expense has been deleted.',
                    'success'
                )
            }
        })
    }

    ////  Pagination items Functionality  ------------------
    const addPagination = () => {
        if (pageItems < expenses.length) {
            setPageItems(pageItems + 3)
        }
    }
    const lowPagination = () => {
        if (pageItems > 3) {
            setPageItems(pageItems - 3)
        }

    }


    ////  Find Category Name

    const findCategoryName = (id)=>{
        const name =  categories.find(ele=>ele._id===id)
        return name?.title
    }
    

    return (
        <div>
            <Modal isOpen={modal} toggle={toggle}  >
                <ModalHeader toggle={toggle}>Make Changes in your Expense here..</ModalHeader>
                <ModalBody>
                    {
                        <EditExpense
                            handleExpenseEdit={handleExpenseEdit}
                            editInfo={editInfo}
                        />
                    }
                </ModalBody>
            </Modal>
            <div>
                <table className=" table table-striped table-hover table-light table-bordered">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenses &&
                            expenses.slice(0, pageItems).map(ele => {
                                return <tr key={ele._id}>
                                    <td>{ele.note}</td>
                                    <td>{findCategoryName(ele.categoryId)}</td>
                                    <td>{ele.amount}</td>
                                    <td>{ele.date.split("T")[0]}</td>
                                    <td><button className="btn btn-secondary btn-sm"
                                        onClick={() => { handleExpenseEdit(ele) }}
                                    ><img width="18" height="15" src="https://img.icons8.com/wired/64/edit.png" alt="edit" /></button></td>
                                    <td><button className="btn btn-danger btn-sm"
                                        onClick={() => { handleRemoveExpense(ele._id) }}
                                    ><img width="18" height="18" src="https://img.icons8.com/glyph-neue/64/trash.png" alt="trash" /></button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <div className="row">
                    {
                        pageItems < expenses.length && <div className="col-md-4">
                            <button className="btn btn-link" onClick={addPagination}>
                                Next...
                            </button>
                        </div>
                    }

                    {
                        pageItems > 3 && <div className="col-md-8" onClick={lowPagination}>
                            <button className="btn btn-link" style={{ float: "right" }}>
                                Previous
                            </button>
                        </div>
                    }

                </div>

            </div>
        </div>
    )
}

export default ExpensesList


