import { useState } from "react"
import { useDispatch } from "react-redux"
import { startAddBudget } from "../Redux/Actions/usersAction"

const BudgetForm = (props) => {

    const [addBudget, setAddBudget] = useState(0)

    const dispatch = useDispatch()

    const handleBudgetSubmit = (e) => {
        e.preventDefault()
        const formData = {
            budget: Number(addBudget)
        }
        dispatch(startAddBudget(formData))
    }

    return (
        <div className="card my-2 p-4 shadow">
            <h2 className="font-monospace">Assign budget for according to your savings plan</h2>
            <form onSubmit={handleBudgetSubmit}>
                <label className="form-label" id="budget">Add Budget</label><br />
                <input className="form-control" id="budget"
                    type="text"
                    value={addBudget}
                    onChange={(e) => { setAddBudget(e.target.value) }} /><br />
                <input type="submit" value="save" className="btn btn-success" />
            </form>
        </div>
    )
}

export default BudgetForm
