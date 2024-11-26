import React, { createContext, useState, useEffect } from 'react';
import { supabase } from './supabaseClient';  // Asegúrate de importar correctamente tu cliente de Supabase

// Crear un contexto de autenticación
const AuthContext = createContext();

// Proveedor de contexto
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Verificar si ya hay un usuario autenticado al montar el componente
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser(); // Usar getUser() en lugar de user()
            setUser(user); // Actualiza el estado con el usuario actual
        };

        // Usar supabase.auth.getSession() para obtener la sesión actual
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user); // Si hay una sesión activa, establece el usuario
            } else {
                fetchUser(); // Si no hay sesión, obtenemos el usuario desde supabase
            }
        };

        checkSession();

        // Suscribirse a los cambios en el estado de autenticación
        const authListener = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null); // Actualiza el usuario cuando cambia el estado de autenticación
            }
        );

        // Limpiar el listener cuando el componente se desmonte
        return () => {
            // Usamos `authListener.unsubscribe()` para cancelar la suscripción
            if (authListener && authListener.unsubscribe) {
                authListener.unsubscribe(); // Llamar al método unsubscribe de la suscripción
            }
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Exportar el contexto para usarlo en otros componentes
export const useAuth = () => React.useContext(AuthContext);