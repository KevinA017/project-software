import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay } from 'date-fns';

const ExpenseCalendar = ({ expenses = []  }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0); // Estado para el total del mes
  const [selectedDay, setSelectedDay] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 


   // Agregar un gasto de ejemplo si expenses está vacío
   const Ejexpenses = expenses.length === 0 ? [
    {
      date: '2024-11-15',
      description: 'Compra de supermercado',
      amount: 50,
      category: 'Comida',
    },
  ] : expenses;

  useEffect(() => {
    const firstDayOfMonth = startOfMonth(currentMonth);
    const lastDayOfMonth = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });
    setDaysInMonth(days);
    
    // Calcular el total de gastos del mes actual
    const total = Ejexpenses
      .filter(expense => new Date(expense.date).getMonth() === currentMonth.getMonth())
      .reduce((sum, expense) => sum + expense.amount, 0);
    setMonthlyTotal(total); // Actualizar el total mensual
  }, [currentMonth, expenses]);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const getExpensesForDay = (day) => {
    return expenses ? Ejexpenses.filter(expense => isSameDay(new Date(expense.date), day)) : [];
  };

  const openModal = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDay(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md max-w-full sm:max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-500 hover:text-gray-700">&larr;</button>
        <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button onClick={handleNextMonth} className="text-gray-500 hover:text-gray-700">&rarr;</button>
      </div>

      {/* Resumen Mensual de Gastos */}
      <div className="mb-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">Gasto Total del Mes</h3>
        <p className="text-2xl text-blue-500 font-bold">${monthlyTotal.toFixed(2)}</p>
      </div>

      <div className="grid grid-cols-7 gap-1 sm:gap-4 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-xs sm:text-sm font-semibold text-gray-700">
            {day}
          </div>
        ))}

        {daysInMonth.map(day => (
          <div
            key={day.toString()}
            className="p-2 sm:p-4 border rounded-lg text-center flex flex-col items-center cursor-pointer"
            onClick={() => openModal(day)}
          >
            <p className="text-xs sm:text-sm font-medium text-gray-900">{format(day, 'd')}</p>
            <div className="mt-1 sm:mt-2 space-y-1">
              {getExpensesForDay(day).map((expense, idx) => (
                <div key={idx} className="text-[10px] sm:text-xs text-gray-500">
                  {expense.description}: ${expense.amount}
                </div>
              ))}
              {getExpensesForDay(day).length === 0 && (
                <p className="text-[10px] sm:text-xs text-gray-400">No expenses</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalles de gastos para el día seleccionado */}
      {isModalOpen && selectedDay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Gastos del {format(selectedDay, 'dd MMM yyyy')}
            </h2>
            <div className="space-y-3">
              {getExpensesForDay(selectedDay).length > 0 ? (
                getExpensesForDay(selectedDay).map((expense, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <p className="text-gray-700">{expense.description}</p>
                    <p className="text-green-500 font-semibold">${expense.amount}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No hay gastos registrados para este día.</p>
              )}
            </div>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseCalendar;
