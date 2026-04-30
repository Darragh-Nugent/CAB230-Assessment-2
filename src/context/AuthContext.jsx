import { useState, useEffect, createContext, useContext } from 'react';
import { login, logout, register } from '../api/authApi.js';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        // setIsAuthenticated(!!token);

    }, [isAuthenticated]);

    const handleLogin = async (email, password) => {
        try {
            await login(email, password);
            setIsAuthenticated(true);
            setMessage('Login successful!');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const handleRegister = async (email, password) => {
        try {
            await register(email, password);
            setIsAuthenticated(true);
            setMessage('Registration successful!');
            handleLogin(email, password);
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };


    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        setMessage('Logged out successfully!');
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            handleLogin,
            handleLogout,
            handleRegister,
            message,
            setMessage,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}