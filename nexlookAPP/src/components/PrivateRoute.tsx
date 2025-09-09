import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function PrivateRoute() {
  const { user, isLoading } = useUser();
  
  // Mostra um indicador de carregamento enquanto verifica a autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background">
        <div className="text-lg text-text-secondary dark:text-text-secondary animate-pulse">
          Carregando...
        </div>
      </div>
    );
  }
  
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
