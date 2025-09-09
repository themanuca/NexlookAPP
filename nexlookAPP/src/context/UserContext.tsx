import { createContext, useContext, useEffect, useState } from 'react';

export type User = {
  token: string;
  userId: string;
  name: string;
  email: string;
};

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Carregar usuário do localStorage ao iniciar
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    if (token && userId && name && email) {
      setUser({ token, userId, name, email });
    }
    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}
