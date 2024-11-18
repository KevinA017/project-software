import React, { useState } from 'react';

const SavingsPlan = ({ expenses = [] }) => {
    // Calcular el total de los gastos y otros valores dinámicos
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const savingsGoalPercentage = 0.15;
    const savingsGoal = totalExpenses * savingsGoalPercentage;

    // Estado para guardar los ahorros alcanzados
    const [currentSavings, setCurrentSavings] = useState(0);
    const projectedSavings = currentSavings + savingsGoal;

    // Calcular el ahorro potencial por categoría
    const categorySavings = expenses.map(expense => {
        const reduction = expense.category === 'Comida' ? 0.1 : 0.05;
        const potentialSavings = expense.amount * reduction;
        return { ...expense, potentialSavings };
    });

    const [showRecommendations, setShowRecommendations] = useState(false);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Plan de Ahorro</h1>

            {/* Resumen pequeño de Ahorro y Gastos */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
                    <h2 className="text-sm font-semibold text-gray-700">Gastos Totales</h2>
                    <p className="text-lg font-bold text-blue-500">${totalExpenses.toFixed(2)}</p>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
                    <h2 className="text-sm font-semibold text-gray-700">Objetivo de Ahorro</h2>
                    <p className="text-lg font-bold text-green-500">${savingsGoal.toFixed(2)}</p>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
                    <h2 className="text-sm font-semibold text-gray-700">Ahorros Actuales</h2>
                    <p className="text-lg font-bold text-purple-500">${currentSavings.toFixed(2)}</p>
                </div>
                <div className="bg-white p-2 rounded-lg shadow-md flex flex-col items-center">
                    <h2 className="text-sm font-semibold text-gray-700">Ahorro Proyectado</h2>
                    <p className="text-lg font-bold text-indigo-500">${projectedSavings.toFixed(2)}</p>
                </div>
            </div>

            
            {/* Recomendaciones de Ahorro */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Recomendaciones de Ahorro</h2>
                <button
                    onClick={() => setShowRecommendations(!showRecommendations)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    {showRecommendations ? 'Ocultar Recomendaciones' : 'Mostrar Recomendaciones'}
                </button>

                {showRecommendations && (
                    <div className="mt-4">
                        <p className="text-gray-600">Aquí tienes algunas recomendaciones para reducir tus gastos:</p>
                        <ul className="mt-2 space-y-2">
                            {categorySavings.map((expense, index) => (
                                <li key={index} className="text-sm text-gray-600">
                                    En {expense.category}: Puedes ahorrar ${expense.potentialSavings.toFixed(2)} este mes si reduces el gasto en un {expense.category === 'Comida' ? '10%' : '5%'}.
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Desglose por Categoría */}
            <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Desglose por Categoría</h2>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700">Categoría</th>
                            <th className="px-4 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700">Monto</th>
                            <th className="px-4 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700">Ahorro Potencial</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorySavings.map((expense, index) => (
                            <tr key={index} className="bg-gray-50">
                                <td className="px-4 py-2 border-b text-xs text-gray-600">{expense.category}</td>
                                <td className="px-4 py-2 border-b text-xs text-gray-600">${expense.amount.toFixed(2)}</td>
                                <td className="px-4 py-2 border-b text-xs text-green-500 font-semibold">${expense.potentialSavings.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SavingsPlan;
