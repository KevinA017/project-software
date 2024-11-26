import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '../AuthContext';

const Dashboard = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newExpense, setNewExpense] = useState({ date: '', description: '', amount: '', category: '' });
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const { user } = useAuth();

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
    
    // Cargar gastos desde la base de datos
    useEffect(() => {
        const fetchExpenses = async () => {

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
  
            setLoading(true);
            const { data, error } = await supabase
                .from('Gastos')
                .select('expense_id, date, description, amount, category')
                .eq('user_id', userId);

            if (error) {
                console.error('Error fetching expenses:', error);
            } else {
                setExpenses(data || []);
            }
            setLoading(false);
        };

        fetchExpenses();
    }, []);

    // Manejar cambios en el formulario de nuevo gasto
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewExpense(prev => ({ ...prev, [name]: value }));
    };

    // Agregar un nuevo gasto
    const handleAddExpense = async () => {
        try {
            const { data, error } = await supabase
                .from('Gastos')
                .insert([newExpense]);

            if (error) throw error;

            setExpenses(prev => [...prev, data[0]]);
            setShowModal(false);
            setNewExpense({ date: '', description: '', amount: '', category: '' });
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    // Procesar datos para gráficos
    const groupedByMonth = expenses.reduce((acc, expense) => {
        const month = new Date(expense.date).toLocaleString('es-ES', { month: 'long' });
        acc[month] = (acc[month] || 0) + expense.amount;
        return acc;
    }, {});

    const barData = Object.entries(groupedByMonth).map(([name, amount]) => ({ name, amount }));

    const pieData = expenses.reduce((acc, expense) => {
        const existingCategory = acc.find(item => item.name === expense.category);
        if (existingCategory) {
            existingCategory.value += expense.amount;
        } else {
            acc.push({ name: expense.category, value: expense.amount });
        }
        return acc;
    }, []);

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const transactionCount = expenses.length;
    const averageAmount = transactionCount ? (totalAmount / transactionCount).toFixed(2) : 0;

    // Mostrar mensaje si no hay datos y no está cargando
    if (!loading && expenses.length === 0) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
                <h2 className="text-gray-500 text-lg">No hay datos disponibles. Agrega un gasto para empezar.</h2>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard de Gastos</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6"
                onClick={() => setShowModal(true)}
            >
                Agregar Gasto
            </button>

            {/* Modal para agregar nuevo gasto */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">Nuevo Gasto</h2>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Fecha</label>
                            <input
                                type="date"
                                name="date"
                                value={newExpense.date}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Descripción</label>
                            <input
                                type="text"
                                name="description"
                                value={newExpense.description}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Monto</label>
                            <input
                                type="number"
                                name="amount"
                                value={newExpense.amount}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Categoría</label>
                            <input
                                type="text"
                                name="category"
                                value={newExpense.category}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={handleAddExpense}
                            >
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Resumen */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h2 className="text-lg font-semibold text-gray-700">Total de Gastos</h2>
                    <p className="text-3xl font-bold text-blue-500">${totalAmount.toFixed(2)}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h2 className="text-lg font-semibold text-gray-700">Transacciones</h2>
                    <p className="text-3xl font-bold text-green-500">{transactionCount}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md text-center">
                    <h2 className="text-lg font-semibold text-gray-700">Promedio de Gastos</h2>
                    <p className="text-3xl font-bold text-purple-500">${averageAmount}</p>
                </div>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6'>
            {/* Gráfico de gastos mensuales */}
            <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Gastos Mensuales</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barData}>
                        <XAxis dataKey="name" stroke="#8884d8" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-gray-700 mb-4">Distribución de Gastos</h2>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
            </div>
            
            </div>
        </div>
    );
};

export default Dashboard;