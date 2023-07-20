import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { startGetUserCategories } from "../Redux/Actions/categoriesAction"
import { startGetUsersAccount } from "../Redux/Actions/usersAction"
import { startFindBudgetAvailability } from "../Redux/Actions/usersAction"

const ExpenseForm = (props) => {

    const { note: n, date: d, categoryId: cId, amount: a, submitForm } = props

    const [note, setNote] = useState(n ? n : "")
    const [date, setDate] = useState(d ? d.split("T")[0] : "")
    const [amount, setAmount] = useState(a ? a : 0)
    const [categoryId, setCategoryId] = useState(cId ? cId : "")


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetUserCategories())
        dispatch(startGetUsersAccount())
        dispatch(startGetUsersAccount())
    }, [dispatch])

    const categories = useSelector((state) => {
        return state.categories.data
    })


    /////  Resetting the Form -----------
    const resetForm = () => {
        setNote("")
        setDate("")
        setAmount(0)
        setCategoryId("")
    }


    const handleExpenseSubmit = (e) => {
        e.preventDefault()

        const formData = {
            note, date, amount, categoryId
        }
        submitForm(formData)
        resetForm()
    }

    /////   TO Check Budget Avilability When adding or Editing the Expense Amount

    const handleAmountChange = (e) => {
        setAmount(e.target.value)
        const formData = {
            amount: Number(e.target.value)
        }
        dispatch(startFindBudgetAvailability(formData))
    }

    const remainingBudget = useSelector((state) => {
        return state.users.remainingBudget
    })

    return (
        <div>
            <div className="justify-content-center">
                <div className="card p-4 shadow">
                    <h3>Add or Edit your Expense</h3>
                    <form onSubmit={handleExpenseSubmit}>

                        <label htmlFor="email" className="form-label">Note</label><br />
                        <input type="text"
                            id="email" value={note}
                            className="form-control"
                            placeholder="Enter the Note"
                            onChange={(e) => { setNote(e.target.value) }}
                        /><br />

                        <label htmlFor="data" className="form-label">Date</label><br />
                        <input type="date"
                            id="email" value={date}
                            className="form-control"
                            placeholder="Enter the Date"
                            onChange={(e) => { setDate(e.target.value) }}
                        /><br />

                        <label htmlFor="category" className="form-label">Category</label><br />
                        <select id="category" value={categoryId} onChange={(e) => { setCategoryId(e.target.value) }} className="form-select">
                            <option value="">Select the Category</option>
                            {
                                categories.length !== 0 &&
                                categories.map(ele => {
                                    return <option value={ele._id} key={ele._id}>{ele.title}</option>
                                })
                            }
                        </select><br />

                        <label htmlFor="pass" className="form-label">Amount</label><br />
                        <input type="number"
                            className="form-control"
                            value={amount} id="pass"
                            placeholder="Enter your Amount"
                            onChange={handleAmountChange}
                        />
                        {
                            !remainingBudget.hasOwnProperty("error") ?
                                <div>
                                    <span style={{ color: "green" }}>{remainingBudget.message}</span><br />
                                    <input type="submit" />
                                </div> :
                                <div>
                                    <span style={{ color: "red" }}>{remainingBudget.error}</span><br />
                                    <input type="submit" disabled />
                                </div>
                        }

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ExpenseForm