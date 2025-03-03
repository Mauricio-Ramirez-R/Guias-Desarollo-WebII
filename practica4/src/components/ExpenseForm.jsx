import React, { useContext, useEffect, useState } from 'react'
import { categories } from '../data/categories'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { BudgetDispatchContext, BudgetStateContext } from '../context/BudgetContext'
import ErrorMessage from './ErrorMessage'

export const ExpenseForm = () => {

    const [expense, setExpense] = useState({
        expenseName: "",
        amount: 0,
        category: "",
        date: new Date(),
    });

    const [error, setError] = useState('')
    const dispatch = useContext(BudgetDispatchContext)
    const state = useContext(BudgetStateContext)

    const handleChange = (e) => {
        const { name, value } = e.target;
        const isAmountField = ["amount"].includes(name); // ["amount"] es un array con 
        // un solo valor, y .includes(name) devuelve true si name es "amount".
        setExpense({
            ...expense,
            // [name] es una clave calculada que representa el nombre del campo que se 
            // esta actualizando.
            [name]: isAmountField ? Number(value) : value,
        })
    }

    // Función para recuperar y escribir la fecha en el state  
    const handleChangeDate = (value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    useEffect(() => {
        if (state.editingId) {
            const editingExpense = state.expenses.find(currentExpense => currentExpense.id === state.editingId)
            setExpense(editingExpense)
        }
    }, [state.editingId])

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación  
        if (Object.values(expense).includes('')) {
            setError('Todos los Campos son Obligatorios')
            return
        }

        if (state.editingId) {
            dispatch({ type: 'update-expense', payload: { expense: { id: state.editingId, ...expense } } })
        }
        else {
            dispatch({ type: 'add-expense', payload: { expense } })
        }

        const totalExpenses = state.expenses.reduce((total, expense) => total + expense.amount, 0) + expense.amount;

        if (totalExpenses > state.budget) {
            setError("El gasto supera el presupuesto que se habia definido al inicio")
            return
        }

        // Reiniciar el state/form 
        setExpense({
            expenseName: "",
            amount: 0,
            category: "",
            date: new Date(),
        })
        setError('')
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="uppercase text-center text-2xl font-black border-b-4
border-blue-500 py-2">
                {state.editingId ? "Guardar cambios" : "Nuevo gasto"}
            </legend>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <div className="flex flex-col gap-2">
                <label htmlFor="expenseName" className="text-xl">
                    Nombre Gasto:
                </label>
                <input
                    type="text"
                    id="expenseName"
                    placeholder="Añade el Nombre del gasto"
                    className="bg-slate-100 p-2"
                    name="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Cantidad:
                </label>
                <input
                    type="number"
                    id="amount"
                    placeholder="Añade la Cantidad del gasto: ej. 300"
                    className="bg-slate-100 p-2"
                    name="amount" // se usa para identificar el campo en el formulario
                    value={expense.amount}
                    onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="category" className="text-xl">
                    Categoría:
                </label>
                <select
                    id="category"
                    className="bg-slate-100 p-2"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <option>-- Seleccione --</option>
                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="amount" className="text-xl">
                    Fecha Gasto:
                </label>
                <DatePicker
                    className="bg-slate-100 p-2 border-0" value={expense.date}
                    onChange={handleChangeDate}
                />
            </div>

            <input
                type="submit"
                className="bg-blue-600 cursor-pointer w-full p-2 text-white uppercase 
font-bold rounded-lg"
                value={state.editingId ? "Guardar cambios" : "Registrar gasto"}
            />
        </form>
    )
} 
