import { useState, useEffect, createContext, useContext } from 'react';
import {login, logout} from '../models/AuthModel.js';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loginSnackBarOpen, setLoginSnackbarOpen] = useState(false);
    const [logoutSnackBarOpen, setLogoutSnackbarOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        // setIsAuthenticated(!!token);

    }, [isAuthenticated]);

    const handleLogin = async (email, password) => {
        try {
            await login(email, password);
            setIsAuthenticated(true);
            setLoginSnackbarOpen(true);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleLogout = () => {
        logout();
        setIsAuthenticated(false);
        setLogoutSnackbarOpen(true);
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            handleLogin,
            handleLogout,
            loginSnackBarOpen,
            setLoginSnackbarOpen,
            logoutSnackBarOpen,
            setLogoutSnackbarOpen
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}