import { AmountDisplay } from './AmountDisplay'
import { BudgetStateContext, BudgetDispatchContext } from '../context/BudgetContext'
import { useContext } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const BudgetTracker = () => {

    const state = useContext(BudgetStateContext);
    const totalExpenses = state.expenses.reduce((total, expense) => total + expense.amount, 0);
    const remainingBudget = state.budget - totalExpenses;
    const percentage = ((totalExpenses / state.budget) * 100).toFixed(2);
    const dispatch = useContext(BudgetDispatchContext)

    const handleReset = () => {
        dispatch({ type: "reset-app" })
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentage}//valor del progreso (0-100)
                    text={`${percentage}%`}// texto que se muestra dentro del circulo, en este caso el porcentaje
                    styles={buildStyles({
                        pathColor: (percentage < 100) ? '#3b82f6' : '#adc2626', //color de la barra: azul si es menor a 100%, rojo si es 100%
                        trailColor: '#F5F5F5'// color del fondo de la barra (trayectoria no completada)
                    })}
                />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    onClick={handleReset}
                    className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
                >
                    Resetear app
                </button>

                <AmountDisplay amount={state.budget} label="Presupuesto" />
                <AmountDisplay amount={remainingBudget} label="Disponible" />
                <AmountDisplay amount={totalExpenses} label="Gastado" />
            </div>

        </div>
    )
}