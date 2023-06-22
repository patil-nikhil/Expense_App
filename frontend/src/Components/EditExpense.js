import { startEditUserExpense } from "../Redux/Actions/expensesAction"
import ExpenseForm from "./ExpenseForm"
import { useDispatch } from "react-redux"



const EditExpense = (props) => {

    const { handleExpenseEdit, editInfo } = props

    const dispatch = useDispatch()

    const submitForm = (formData) => {
        dispatch(startEditUserExpense(formData, editInfo._id))
        handleExpenseEdit()
    }

    return (
        <div>
            <ExpenseForm
                {...editInfo}
                submitForm={submitForm}
            />
        </div>
    )
}

export default EditExpense