import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { startGetSearchedExpenses, startGetUserExpenses, startSortExpenses } from "../Redux/Actions/expensesAction"
import { startAddNewCategory } from "../Redux/Actions/categoriesAction"
import AddExpense from "./AddExpense"
import ExpensesList from "./ExpensesList"
import { sortElements } from "./sortElements"

const DashBoard = (props) => {

    const dispatch = useDispatch()

    const [search, setSearch] = useState("")

    const [newCategory, setNewCategory] = useState("")

    const [sortBy, setSortBy] = useState("")

    ////   Getting Users Expenses    --------------

    useEffect(() => {
        dispatch(startGetUserExpenses())
    }, [dispatch])

    const expenses = useSelector((state) => {
        return state.expenses.data
    })


    ////  Search Functionality -----------
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
        dispatch(startGetSearchedExpenses(e.target.value))

    }

    ////// Adding new Category -------

    const handleAddCategory = (e) => {
        e.preventDefault()

        const formData = {
            title: newCategory
        }

        dispatch(startAddNewCategory(formData))
        setNewCategory("")
    }


    /////  Handling  Sort Functionality ------------
    const handleSortBy = (e) => {
        setSortBy(e.target.value)
        dispatch(startSortExpenses(e.target.value))
    }

    return (
        <div className="container my-4">

            <div className="row">
                <div className="col-md-6 card">
                    <div className="d-flex flex-row">
                        <div className="col-md-4 p-2">
                            <select className="form-select" value={sortBy} onChange={handleSortBy}>
                                <option value="">Sort by----</option>
                                {
                                    sortElements.map((ele, i) => {
                                        return <option key={i} value={ele.values}>{ele.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-md-3">

                        </div>
                        <div className="coljustify-content-end p-2">
                            <form onSubmit={handleAddCategory}>
                                <input type="text" className="" required value={newCategory} onChange={(e) => { setNewCategory(e.target.value) }} placeholder="Add New Category here" />
                                <input type="submit" className="btn btn-success btn-sm" value="add" />
                            </form>
                        </div>
                    </div>
                    <div className=" card container">
                        <div className="row">
                            <div className="col-md-8">
                                <h2 className="text-primary-emphasis my-1">Listing Your Expenses - {expenses.length}</h2>
                            </div>
                            <div className="col-md-4 my-2">
                                <input type="text"
                                    className="form-control"
                                    placeholder="Search"
                                    value={search}
                                    onChange={handleSearchChange} />
                            </div>
                        </div>
                    </div>
                    <ExpensesList
                        expenses={expenses}
                    />
                </div>
                <div className="col-md-4">
                    <AddExpense
                    />
                </div>
            </div>
        </div>
    )
}


export default DashBoard