import { useContext } from 'react';
import { categories } from '../data/categories.js'
import { BudgetDispatchContext } from '../context/BudgetContext.jsx'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';

export const ExpenseDetail = ({ expense }) => {

    const dispatch = useContext(BudgetDispatchContext) // recuperando el dispatch del reducer desde el context

    // Define una accion que se mostrara cuando el ususario deslice hacia al izquierda
    const leadingAction = () => (
        <LeadingActions> 
            <SwipeAction onClick={() => dispatch({ type: "get-expenses-by-id", payload: { id: expense.id } })}>
                Actualizar
            </SwipeAction>
        </LeadingActions>
    );

    //Define una accion que se mostrara cuando el usuario deslice hacia la derecha.
    const trailingAction = () => (
        <TrailingActions> {/* Contenedor de acciones a la derecha */}
            <SwipeAction destructive={true}
                onClick={() => { dispatch({ type: "remover-expense", payload: { id: expense.id } }) }}>
                Eliminar
            </SwipeAction>
            </TrailingActions>
    );

    const category = categories.find(cat => cat.id === expense.category) // Recuperando el nombre de la categoría

    return (
        <SwipeableList>
            <SwipeableListItem maxSwipe={1} leadingActions={leadingAction()} trailingActions={trailingAction()}>
                <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 
flex gap-5 items-center">
                    <div>
                        <img src={`/icono_${category.icon}.svg`} alt="Icono gasto"
                            className="w-20" />

                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold uppercase text-slate-500">
                            {category.name}
                        </p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">
                            {expense.date ? new Date(expense.date).toLocaleDateString("es-ES",
                                { weekday: "long", day: "numeric", month: "long", year: "numeric" }) : "Fecha no disponible"}
                        </p>
                    </div>

                    <div className="text-2xl text-blue-600 font-bold">
                        <span className="font-black text-black">{expense.amount}</span>
                    </div>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
