import React, { useState } from "react";
import logo from '../LOGO4.png';
import { supabase } from "../supabaseClient";
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Crea una instancia de navigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            // Intentar iniciar sesión en Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) {
                setMessage("Error al iniciar sesión: " + error.message);
                return;
            }

            // Si el inicio de sesión es exitoso, redirige a la página de inicio
            setMessage("Inicio sesión exitoso!");
            navigate('/home');  // Redirige a la página de inicio (ajusta la ruta a tu caso)

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setMessage("Ocurrió un error inesperado. Inténtalo nuevamente.");
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url('https://cdn.pixabay.com/photo/2016/11/29/11/39/computer-1869236_1280.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="max-w-md w-full space-y-8 p-8 bg-white bg-opacity-85 backdrop-blur-sm rounded-xl shadow-2xl">
                <div className="text-center">
                    <img 
                        src={logo} 
                        alt="Logo"
                        className="w-auto h-20 mb-auto mx-auto" 
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Iniciar Sesión
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">Correo</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
          
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
                {message && (
                    <p className={`mt-2 text-center text-sm ${message.includes('exitoso') ? 'text-green-600' : 'text-red-600'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
