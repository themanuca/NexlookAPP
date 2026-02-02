import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resultadoLook, setResultadoLook] = useState(null);
  const [promptUser, setPromptUser] = useState('');

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const userData = await AsyncStorage.getItem('USER_DATA');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (e) {
      console.error('Erro ao carregar usuário:', e);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(userData) {
    try {
      await AsyncStorage.setItem('USER_DATA', JSON.stringify(userData));
      setUser(userData);
    } catch (e) {
      console.error('Erro ao salvar usuário:', e);
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem('USER_DATA');
      setUser(null);
      setResultadoLook(null);
      setPromptUser('');
    } catch (e) {
      console.error('Erro ao fazer logout:', e);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        resultadoLook,
        setResultadoLook,
        promptUser,
        setPromptUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de UserProvider');
  }
  return context;
}
