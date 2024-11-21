import React, { createContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';  // Asegúrate de importar correctamente tu cliente de Supabase

// Crear un contexto de autenticación
const AuthContext = createContext();

// Proveedor de contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verificar si hay un usuario autenticado al montar el componente
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser(); // Usar getUser() en lugar de user()
            setUser(user);
        };

        fetchUser();

        // Suscribirse a los cambios en el estado de autenticación
        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null); // Actualiza el usuario cuando cambia el estado de autenticación
            }
        );

        // No es necesario limpiar el listener manualmente, Supabase lo maneja internamente
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Exportar el contexto para usarlo en otros componentes
export const useAuth = () => React.useContext(AuthContext);
