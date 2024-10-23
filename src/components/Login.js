import React, { useState } from "react";

const Login =  () => {
    const  [username, setUsername] = useState("");
    const  [password, setPassword] = useState("");
    const  [message, setMessage] = useState("");

    const handleSubmit = (e)  => {
        e.preventDefault();
        if (username === "admin" && password === "123") {
            setMessage("Inicio sesión exitoso!");
            } else {
                setMessage("Usuario o constraseña incorrectos");
                }
            };
            return ( <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                  <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                      Iniciar Sesión
                    </h2>
                  </div>
                  <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <label htmlFor="username" className="sr-only">Usuario</label>
                        <input
                          id="username"
                          name="username"
                          type="text"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                          placeholder="Usuario"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div>
                        <label htmlFor="password" className="sr-only">Contraseña</label>
                        <input
                          id="password"
                          name="password"
                          type="text"
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