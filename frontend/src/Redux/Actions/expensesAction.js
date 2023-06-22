import axios from "../../config/axios"
import Swal from "sweetalert2"

export const SET_EXPENSES = "SET_EXPENSES"
export const ADD_EXPENSE = "ADD_EXPENSE"
export const REMOVE_EXPENSE = "REMOVE_EXPENSE"
export const EDIT_EXPENSE = "EDIT_EXPENSE"
export const DELETED_EXPENSE = "DELETED_EXPENSE"
export const UNDO_EXPENSE = "UNDO_EXPENSE"
export const PERMANENET_REMOVE_ALL = "PERMANENET_REMOVE_ALL"

const setExpenses = (expenses) => {
    return {
        type: SET_EXPENSES,
        payload: expenses
    }
}

const addExpense = (expense) => {
    return {
        type: ADD_EXPENSE,
        payload: expense
    }
}

const removeExpense = (expense) => {
    return {
        type: REMOVE_EXPENSE,
        payload: expense
    }
}

const editExpense = (expense) => {
    return {
        type: EDIT_EXPENSE,
        payload: expense
    }
}

const setDeletedExpense = (expense) => {
    return {
        type: DELETED_EXPENSE,
        payload: expense
    }
}

const undoExpense = (expense) => {
    return {
        type: UNDO_EXPENSE,
        payload: expense
    }
}

const permanentRemove = () => {
    return {
        type: PERMANENET_REMOVE_ALL
    }
}

export const startGetUserExpenses = () => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const expenses = await axios.get("/api/expenses?type=alive", {
                        headers: {
                            "Auth": localStorage.getItem("token")
                        }
                    })
                    dispatch(setExpenses(expenses.data))
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startAddUserExpenses = (formData, categoryId) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const expense = await axios.post(`/api/expenses/${categoryId}`, formData, {
                        headers: {
                            "Auth": localStorage.getItem("token")
                        }
                    })
                    if (expense.data) {
                        dispatch(addExpense(expense.data))
                        Swal.fire(`${expense.data.note} is added successfully`)
                    }
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startRemoveUserExpense = (id) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const expense = await axios.delete(`/api/expenses/${id}?type=delete`, {
                        headers: {
                            "Auth": localStorage.getItem("token")
                        }
                    })
                    dispatch(removeExpense(expense.data))
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startGetSearchedExpenses = (value) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const expenses = await axios.get(`/api/expenses/search?text=${value}`, {
                        headers: {
                            "Auth": localStorage.getItem("token")
                        }
                    })
                    if (expenses.data) {
                        dispatch(setExpenses(expenses.data))
                    }
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startEditUserExpense = (formData, id) => {
    return (dispatch) => {
        (
            async () => {
                try {
                    const expense = await axios.put(`/api/expenses/${id}`, formData, {
                        headers: {
                            "Auth": localStorage.getItem("token")
                        }
                    })
                    dispatch(editExpense(expense.data))
                } catch (error) {
                    alert(error.message)
                }
            }
        )()
    }
}

export const startGetUsersDeletedExpenses = () => {
    return (dispatch) => {
        (
            async () => {
                const expenses = await axios.get("/api/expenses?type=deleted", {
                    headers: {
                        "Auth": localStorage.getItem("token")
                    }
                })
                dispatch(setDeletedExpense(expenses.data))
            }
        )()
    }
}

export const startUndoUserExpense = (id) => {
    return (dispatch) => {
        (
            async () => {
                const expense = await axios.delete(`/api/expenses/${id}?type=undo`, {
                    headers: {
                        "Auth": localStorage.getItem("token")
                    }
                })

                dispatch(undoExpense(expense.data))
            }
        )()
    }
}

export const startPermanentlyDelteExpenses = () => {
    return (dispatch) => {
        (
            async () => {
                const expenses = await axios.delete("/api/expenses/deleteAll?type=permanent", {
                    headers: {
                        "Auth": localStorage.getItem("token")
                    }
                })
                dispatch(permanentRemove(expenses.data))
            }
        )()
    }
}

export const startUndoDeletedExpenses = () => {
    return (dispatch) => {
        (
            async () => {
                const expenses = await axios.delete("/api/expenses/deleteAll?type=undoAll", {
                    headers: {
                        "Auth": localStorage.getItem("token")
                    }
                })
                dispatch(permanentRemove(expenses.data))
            }
        )()
    }
}

export const startSortExpenses = (data) => {
    const newData = data.split(",")
    const [text, order] = newData

    // console.log(text, order, typeof order)

    return (dispatch) => {
        (
            async () => {
                const sortedExpenses = await axios.get(`/api/sort/expenses?text=${text}&order=${order}`, {
                    headers: {
                        "Auth": localStorage.getItem("token")
                    }
                })
                dispatch(setExpenses(sortedExpenses.data))
            }
        )()
    }
}