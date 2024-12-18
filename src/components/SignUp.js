import React, { useState } from "react";
import logo from '../LOGO4.png'; 
import { supabase } from "../supabaseClient";

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        // Validación de contraseñas
        if (formData.password !== formData.confirmPassword) {
            setMessage("Las contraseñas no coinciden");
            return;
        }

        if (formData.password.length < 6) {
            setMessage("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        try {
            // Registro en Supabase (sistema de autenticación)
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password
            });

            if (authError) {
                setMessage(`Error de registro: ${authError.message}`);
                return;
            }

            // Generar un ID único de tipo INT para la tabla Usuarios
            const generatedId = Math.floor(Math.random() * 1000000); // ID aleatorio único

            // Guardar información adicional en la tabla "Usuarios"
            const { user } = authData;
            const { data: userData, error: userError } = await supabase.from("Usuarios").insert([{
                id: generatedId, // ID INT generado
                name: formData.name,
                email: formData.email
            }]);

            if (userError) {
                setMessage(`Error al guardar datos del usuario: ${userError.message}`);
                return;
            }

            setMessage("Registro exitoso. Verifica tu correo para confirmar tu cuenta.");
        } catch (error) {
            console.error("Error en el registro:", error);
            setMessage("Ocurrió un error inesperado. Inténtalo nuevamente.");
        }
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-cover bg-center"
            style={{
                backgroundImage: `url('https://images.pexels.com/photos/13620269/pexels-photo-13620269.jpeg')`,
            }}
        >
            <div className="max-w-md w-full space-y-8 p-8 bg-white bg-opacity-90 rounded-xl shadow-2xl backdrop-blur-sm">
                <div className="text-center">
                    <img 
                        src={logo}
                        alt="Imagen de encabezado"
                        className="w-auto h-20 mb-auto mx-auto"
                    />
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Crear una cuenta
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="name" className="sr-only">Usuario</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Usuario"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="sr-only">Confirmar contraseña</label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z -10 sm:text-sm"
                                placeholder="Confirmar contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Crear cuenta
                        </button>
                    </div>
                    <p className="text-red-600">{message}</p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
