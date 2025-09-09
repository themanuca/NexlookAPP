import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const API_URL = import.meta.env.VITE_API_URL;

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    debugger
    e.preventDefault();
    setError('');
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/Auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!response.ok) {
        throw new Error('Erro ao registrar. Verifique os dados.');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      localStorage.setItem('name', data.name);
      localStorage.setItem('email', data.email);
      setUser({ token: data.token, userId: data.userId, name: data.name, email: data.email });
      navigate('/wardrobe');
    } catch (err: any) {
      setError(err.message || 'Erro ao registrar.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-background py-6 px-2 sm:px-4">
      <div className="w-full max-w-md space-y-8 bg-card dark:bg-card-light p-6 sm:p-8 rounded-2xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-text dark:text-text-dark">
            Criar nova conta
          </h2>
          <p className="mt-2 text-center text-base text-text-secondary dark:text-text-secondary">
            Ou{' '}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-primary-dark dark:text-primary-dark"
            >
              faça login em sua conta existente
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="name" className="sr-only">
                Nome completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-t-md relative block w-full px-4 py-3 border border-gray-700 dark:border-gray-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-base bg-white dark:bg-gray-800"
                placeholder="Nome completo"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-700 dark:border-gray-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-base bg-white dark:bg-gray-800"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
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
                required
                className="appearance-none relative block w-full px-4 py-3 border border-gray-700 dark:border-gray-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-base bg-white dark:bg-gray-800"
                placeholder="Senha"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar Senha
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none rounded-b-md relative block w-full px-4 py-3 border border-gray-700 dark:border-gray-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-base bg-white dark:bg-gray-800"
                placeholder="Confirmar senha"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
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
              {isLoading ? 'Cadastrando...' : 'Criar conta'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;