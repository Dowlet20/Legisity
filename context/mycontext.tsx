'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface MyContextType {
    change: boolean;
    setChange: React.Dispatch<React.SetStateAction<boolean>>;
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

interface MyProviderProps {
    children: ReactNode;
}

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
    const [change, setChange] = useState<boolean>(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
          const storedValue = sessionStorage.getItem('isActive');
          if (storedValue !== null) {
            setChange(storedValue === 'true');
          }
        }
      }, []);

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);

    return (
        <MyContext.Provider value={{ change, setChange, isAuthenticated, login, logout }}>
            {children}
        </MyContext.Provider>
    );
};



export const useMyContext = (): MyContextType => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyProvider');
    }
    return context;
};