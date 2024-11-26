import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const ExpenseForm = () => {
  // Estado para manejar múltiples gastos
  const [expenses, setExpenses] = useState([
    { amount: '', category: '', subcategory: '', paymentMethod: '', date: '', description: '', comments: '' }
  ]);
  const getUserDatabaseId = async (email) => {
    const { data, error } = await supabase
      .from('Usuarios')
      .select('id') // Seleccionar la columna id (INT)
      .eq('email', email) // Buscar el registro usando el correo del usuario
      .single();
  
    if (error) {
      console.error('Error fetching user ID:', error.message);
      throw error;
    }
  
    return data?.id;
  };
  // Subcategorías dinámicas
  const subcategoriesOptions = {
    Food: ['Groceries', 'Dining Out', 'Snacks'],
    Transport: ['Gas', 'Public Transport', 'Car Maintenance'],
    Entertainment: ['Movies', 'Games', 'Concerts'],
    Health: ['Medical Bills', 'Pharmacy', 'Gym Membership'],
    Other: ['Miscellaneous'],
  };

  // Manejar cambios en los inputs de los gastos
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExpenses = [...expenses];
    updatedExpenses[index][name] = value;
    setExpenses(updatedExpenses);
  };

  // Agregar un nuevo gasto al array
  const handleAddExpense = () => {
    setExpenses([...expenses, { amount: '', category: '', subcategory: '', paymentMethod: '', date: '', description: '', comments: '' }]);
  };

  // Eliminar un gasto del array
  const handleRemoveExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  // Enviar todos los gastos
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Obtén el usuario autenticado
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;
  
      const authUser = authData.user;
  
      if (!authUser) {
        alert('User not authenticated');
        return;
      }
  
      // Obtén el ID del usuario en la base de datos
      const userId = await getUserDatabaseId(authUser.email);
  
      if (!userId) {
        alert('Failed to fetch user ID');
        return;
      }
  
      // Agregar el ID del usuario a cada gasto
      const expensesWithUserId = expenses.map((expense) => ({
        ...expense,
        user_id: userId, // Agregar el ID entero del usuario
      }));
  
      // Insertar los gastos en la tabla 'Gastos'
      const { data, error } = await supabase
        .from('Gastos') // Asegúrate de que 'Gastos' tenga una columna llamada 'user_id'
        .insert(expensesWithUserId);
  
      if (error) throw error;
  
      console.log('Gastos guardados:', data);
      alert('Expenses saved successfully!');
  
      // Resetear el formulario
      setExpenses([
        { amount: '', category: '', subcategory: '', paymentMethod: '', date: '', description: '', comments: '' },
      ]);
    } catch (error) {
      console.error('Error al guardar los gastos:', error.message);
      alert('Failed to save expenses. Please try again.');
    }
  };

  return (
    <form className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto space-y-6" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Add Multiple Expenses</h2>

      {expenses.map((expense, index) => (
        <div key={index} className="space-y-4 border-b border-gray-200 pb-6 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">Expense {index + 1}</h3>
            {expenses.length > 1 && (
              <button
                type="button"
                className="text-red-500 text-sm font-semibold hover:text-red-700"
                onClick={() => handleRemoveExpense(index)}
              >
                Remove
              </button>
            )}
          </div>

          {/* Monto del gasto */}
          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              value={expense.amount}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Enter amount"
              className="w-full border-b border-gray-300 bg-gray-50 focus:outline-none focus:border-green-500 py-2 transition-colors"
              required
            />
          </div>

          {/* Categoría */}
          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">Category</label>
            <select
              name="category"
              value={expense.category}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full border-b border-gray-300 bg-gray-50 focus:outline-none focus:border-green-500 py-2 transition-colors"
              required
            >
              <option value="" disabled>Select category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Subcategoría (dinámica) */}
          {expense.category && (
            <div className="mb-2">
              <label className="block text-sm text-gray-600 mb-1">Subcategory</label>
              <select
                name="subcategory"
                value={expense.subcategory}
                onChange={(e) => handleInputChange(index, e)}
                className="w-full border-b border-gray-300 bg-gray-50 focus:outline-none focus:border-green-500 py-2 transition-colors"
              >
                <option value="" disabled>Select subcategory</option>
                {subcategoriesOptions[expense.category]?.map((subcat) => (
                  <option key={subcat} value={subcat}>{subcat}</option>
                ))}
              </select>
            </div>
          )}

          {/* Método de pago */}
          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">Payment Method</label>
            <select
              name="paymentMethod"
              value={expense.paymentMethod}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full border-b border-gray-300 bg-gray-50 focus:outline-none focus:border-green-500 py-2 transition-colors"
            >
              <option value="" disabled>Select payment method</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          {/* Fecha */}
          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={(e) => handleInputChange(index, e)}
              className="w-full border-b border-gray-300 bg-gray-50 focus:outline-none focus:border-green-500 py-2 transition-colors"
              required
            />
          </div>

          {/* Descripción */}
          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">Description</label>
            <input
              type="text"
              name="description"
              value={expense.description}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Enter description"
              className="w-full border-b border-gray-300 bg-gray-50 focus:outline-none focus:border-green-500 py-2 transition-colors"
            />
          </div>

          {/* Comentarios adicionales */}
          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">Additional Comments</label>
            <textarea
              name="comments"
              value={expense.comments}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Add any additional notes or comments"
              className="w-full border-b border-gray-300 bg-gray-50 focus:outline-none focus:border-green-500 py-2 transition-colors"
            />
          </div>
        </div>
      ))}

      {/* Botón para agregar un nuevo gasto */}
      <button
        type="button"
        onClick={handleAddExpense}
        className="w-full bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 transition duration-200"
      >
        Add Another Expense
      </button>

      {/* Botón de envío */}
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-200 mt-4"
      >
        Submit All Expenses
      </button>
    </form>
  );
};

export default ExpenseForm;

