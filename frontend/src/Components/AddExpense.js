import ExpenseForm from "./ExpenseForm"
import { useDispatch } from "react-redux"
import { startAddUserExpenses } from "../Redux/Actions/expensesAction"

const AddExpense = (props) => {

    const dispatch = useDispatch()

    const submitForm = (formData) => {
        dispatch(startAddUserExpenses(formData, formData.categoryId))
    }

    return (
        <div>
            <ExpenseForm
                submitForm={submitForm}
            />
        </div>
    )
}

export default AddExpense