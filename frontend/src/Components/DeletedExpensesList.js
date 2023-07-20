import { useDispatch} from "react-redux"
import { startPermanentlyDelteExpenses, startUndoDeletedExpenses, startUndoUserExpense } from "../Redux/Actions/expensesAction"
import Swal from "sweetalert2"


const DeletedExpenses = (props) => {

    const {expenses} = props

    const dispatch = useDispatch()

    const handleUndoExpense = (id) => {
        dispatch(startUndoUserExpense(id))
    }

    const handleRestoreAll = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Restore all'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startUndoDeletedExpenses())
                Swal.fire(
                    'Restored!',
                    'Your Expense have been Restored.',
                    'success'
                )
            }
        })

    }

    const handlePermanentlyDeleteALl = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(startPermanentlyDelteExpenses())
                Swal.fire(
                    'Deleted!',
                    'Your Expense have been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <div>
            <h2 className="bg-success p-2 text-dark bg-opacity-25">Recently Deleted Expenses</h2>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 my-2">
                        <button onClick={handleRestoreAll} className="btn btn-success btn-sm">Restore all</button>
                    </div>
                    <div className="col-md-4 position-absolute top-10 end-0 my-2">
                        <button onClick={handlePermanentlyDeleteALl} className="btn btn-danger btn-sm ">Permanently delete all</button>
                    </div>
                </div>
            </div>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                    <tr>
                        <th >Note</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Restore</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map(ele => {
                            return <tr key={ele._id} style={{ textDecoration: "line-through" }}>
                                <td>{ele.note}</td>
                                <td>{ele.amount}</td>
                                <td>{ele.date.split("T")[0]}</td>
                                <td><button onClick={() => { handleUndoExpense(ele._id) }} className="btn btn-primary btn-sm">Undo</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>

        </div>

    )
}

export default DeletedExpenses