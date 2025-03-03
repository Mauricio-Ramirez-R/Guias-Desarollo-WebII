const initialBudget = () => {
    const localStorageBudget = localStorage.getItem("budget");
    return localStorageBudget ? parseFloat(localStorageBudget) : 0;
}

const localStorageExpenses = () => {
    const localStorageExpenses = localStorage.getItem("expenses");
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState = {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: "",
    currentCategory: ""
}

export const budgetReducer = (state, action) => {
    switch (action.type) {
        case "add-budget":
            return { ...state, budget: action.payload.budget }
        case "show-modal":
            return { ...state, modal: true }
        case "close-modal":
            return { ...state, modal: false, editingId: "" }
        case "add-expense":
            const totalExpensesAdd = state.expenses.reduce((total, expense) => total + expense.amount, 0)
                + action.payload.expense.amount;
            if (totalExpensesAdd > state.budget) {
                return { ...state, error: "el gasto supera el presupuesto que se habia definido al inicio" };
            }
            return {
                ...state,
                expenses: [
                    ...state.expenses,
                    { ...action.payload.expense, id: new Date().getTime() }
                ],
                modal: false,
                error: null
            }
        case "remover-expense":
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id)
            }
        case "get-expenses-by-id":
            return {
                ...state,
                editingId: action.payload.id,
                modal: true
            }
        case "update-expense":
            const totalExpensesUpdate = state.expenses.reduce((total, expense) => total + expense.amount, 0) + action.payload.expense.amount;
            if (totalExpensesUpdate > state.budget) {
                return { ...state, error: "el gasto supera el presupuesto que se habia definido al inicio" };
            }
            return {
                ...state,
                expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ?
                    action.payload.expense :
                    expense),
                modal: false,
                editingId: "",
                error: null
            }
        case "add-filter-category":
            return { ...state, currentCategory: action.payload.categoryId }
        case "reset-app":
            localStorage.setItem("budget", "0");
            localStorage.setItem("expenses", JSON.stringify([]));
            return { ...state, budget: 0, expenses: [], error: null }
        default:
            return state;
    }
}