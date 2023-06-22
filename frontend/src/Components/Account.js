import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { startGetUsersAccount } from "../Redux/Actions/usersAction"
import BudgetusageChart from "./BudgetusageChart"
import { startGetUserCategories } from "../Redux/Actions/categoriesAction"
import CategoryDistChart from "./Category_Distrubution_Chart"


const Account = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startGetUsersAccount())
        //dispatch(startGetUsersAccount())
        dispatch(startGetUserCategories())
    }, [dispatch])

    const user = useSelector((state) => {
        return state.users.data
    })

    const expenses = useSelector((state) => {
        return state.expenses.data
    })

    const categories = useSelector((state) => {
        return state.categories.data
    })

    const totalBudgetUsed = expenses.reduce((pv, cv) => {
        return pv + cv.amount
    }, 0)

    const unUsedBudget = user.budget - totalBudgetUsed

    return (
        <div className="container" >
            <div className="row">
                <div className="col-md-4 my-5 p-2 gap-5">
                    <BudgetusageChart
                        totalBudgetUsed={totalBudgetUsed}
                        unUsedBudget={unUsedBudget}
                    />
                </div>

                <div className="col-md-7 my-5 p-2">
                    <CategoryDistChart
                        categories={categories}
                        expenses={expenses}
                    />
                </div>

            </div>
        </div>
    )
}

export default Account