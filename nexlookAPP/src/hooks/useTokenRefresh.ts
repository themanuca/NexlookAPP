import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook personalizado para garantir que uma rota logada não perca o token
 * em caso de refresh
 */
export function useTokenRefresh() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verificar token ao carregar a página
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    
    // Implementar verificação de expiração do token se necessário
    try {
      // Se o token estiver no formato JWT, você pode verificar a expiração
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = tokenData.exp * 1000; // converter para milissegundos
      
      if (Date.now() >= expirationTime) {
        // Token expirado, limpar localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        navigate('/login', { replace: true });
      }
    } catch (e) {
      // Se não for possível verificar a expiração, continue normalmente
      // Silenciando o erro para não poluir o console em produção
    }
  }, [navigate]);
}
