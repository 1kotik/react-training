import {createContext, useState, useEffect, useMemo, useCallback} from 'react';
import type { ReactNode } from 'react';
import type { User, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType>({
    user: null,
    updateAuthContext: () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        if (!savedUser) {
            return null;
        }
        try {
            const parsedUser = JSON.parse(savedUser);
            const isValidUser =
                typeof parsedUser === 'object' &&
                parsedUser !== null &&
                typeof parsedUser.id === 'string' &&
                typeof parsedUser.email === 'string';
            if (isValidUser) {
                return parsedUser;
            }
            localStorage.removeItem('user');
            return null;
        } catch (e) {
            localStorage.removeItem('user');
            return null;
        }
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = useCallback((userData: User) => {
        setUser(userData);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('user');
    }, []);

    const authContext = useMemo(() => ({
        user,
        updateAuthContext: login,
        logout,
    }), [user, login, logout]);

    return (
        <AuthContext.Provider value={authContext}>
            {children}
        </AuthContext.Provider>
    );
}