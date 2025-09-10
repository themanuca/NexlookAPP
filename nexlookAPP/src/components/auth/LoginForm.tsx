import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Login inválido. Verifique seus dados.');
      }
      const data = await response.json();
      // Salvar token/localStorage, etc.
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('name', data.name);
      localStorage.setItem('email', data.email);
      setUser({ token: data.token, userId: data.userId, name: data.name, email: data.email });
      // Redirecionar para o guarda-roupa
      navigate('/wardrobe');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background py-6 px-2 sm:px-4">
      <div className="w-full max-w-md space-y-8 bg-card dark:bg-card-light p-6 sm:p-8 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-text dark:text-text-dark">
            Entre na sua conta
          </h2>
          <p className="mt-2 text-center text-base text-text-secondary dark:text-text-secondary">
            Ou{' '}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-primary-dark dark:text-primary-dark"
            >
              crie uma nova conta
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-t-md relative block w-full px-4 py-3 
             border border-gray-700 dark:border-gray-300 
             placeholder-gray-400 dark:placeholder-gray-500 
             text-gray-900 dark:text-gray-100 
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
             sm:text-base bg-white dark:bg-gray-800"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-t-md relative block w-full px-4 py-3 
             border border-gray-700 dark:border-gray-300 
             placeholder-gray-400 dark:placeholder-gray-500 
             text-gray-900 dark:text-gray-100 
             focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary 
             sm:text-base bg-white dark:bg-gray-800"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-700 rounded dark:bg-card dark:border-gray-300"
                id="remember-me"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text dark:text-text-dark">
                Lembrar-me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-primary hover:text-primary-dark dark:text-primary-dark">
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          {error && (
            <div className="text-center text-red-500 text-sm font-semibold">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200 dark:bg-primary-dark dark:hover:bg-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
