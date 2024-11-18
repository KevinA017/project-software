import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Dashboard = ({ expenses = [] }) => {
    const [showModal, setShowModal] = useState(false);
    const [newExpense, setNewExpense] = useState({ date: '', description: '', amount: '', category: '' });
    const [selectedCategories, setSelectedCategories] = useState(['Comida', 'Transporte']);

    const exampleExpenses = expenses.length === 0 ? [
        {
          date: '2024-11-10',
          description: 'Compra de supermercado',
          amount: 50,
          category: 'Comida',
        },
        {
          date: '2024-11-09',
          description: 'Gasolina',
          amount: 30,
          category: 'Transporte',
        },
      ] : expenses;

    const barData = [
      { name: 'Enero', amount: 500 },
      { name: 'Febrero', amount: 700 },
      { name: 'Marzo', amount: 200 },
    ];

    const pieData = [
      { name: 'Comida', value: 400 },
      { name: 'Transporte', value: 300 },
      { name: 'Entretenimiento', value: 200 },
      { name: 'Otros', value: 100 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const handleChange = (e) => {
      const { name, value } = e.target;
      setNewExpense(prev => ({ ...prev, [name]: value }));
    };

    const handleAddExpense = () => {
      console.log(newExpense);
      setShowModal(false);
      setNewExpense({ date: '', description: '', amount: '', category: '' });
    };

    // Datos para el gráfico comparativo de categorías
    const categoryComparisonData = [
        { name: 'Enero', Comida: 200, Transporte: 150, Entretenimiento: 100 },
        { name: 'Febrero', Comida: 300, Transporte: 200, Entretenimiento: 150 },
        { name: 'Marzo', Comida: 250, Transporte: 180, Entretenimiento: 120 },
    ];

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard de Gastos</h1>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6"
                onClick={() => setShowModal(true)}
            >
                Agregar Gasto
            </button>

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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h2 className="text-lg font-semibold text-gray-700">Total de Gastos</h2>
                    <p className="text-3xl font-bold text-blue-500">$3500</p>
                    <p className="text-gray-500 text-sm">Gasto total del mes</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h2 className="text-lg font-semibold text-gray-700">Transacciones</h2>
                    <p className="text-3xl font-bold text-green-500">45</p>
                    <p className="text-gray-500 text-sm">Total de transacciones</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-center items-center">
                    <h2 className="text-lg font-semibold text-gray-700">Promedio de Gastos</h2>
                    <p className="text-3xl font-bold text-purple-500">$78</p>
                    <p className="text-gray-500 text-sm">Por transacción</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-4 rounded-lg shadow-md">
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

            {/* Comparador de Gastos por Categoría */}
            <div className="bg-white p-4 rounded-lg shadow-md mt-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Comparador de Gastos por Categoría</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={categoryComparisonData}>
                        <XAxis dataKey="name" stroke="#8884d8" />
                        <YAxis />
                        <Tooltip />
                        {selectedCategories.map((category, index) => (
                            <Line key={index} type="monotone" dataKey={category} stroke={COLORS[index % COLORS.length]} />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
