import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

/**
 * Hook personalizado para persistir a sessão do usuário
 * Use este hook nos componentes de rota privada para garantir
 * que a sessão seja mantida mesmo após refresh
 */
export function usePersistSession() {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Se não estiver carregando e não tiver usuário, redireciona para login
    if (!isLoading && !user) {
      navigate('/login', { replace: true });
    }
  }, [user, isLoading, navigate]);

  return { user, isLoading };
}
