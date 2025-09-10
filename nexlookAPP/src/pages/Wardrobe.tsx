import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

// Tipos para peça
interface LookDTO {
  id: string;
  titulo: string;
  images: LookImageDTO[];
  descricao: string;
}
interface LookImageDTO {
  id:string;
  imageUrl:string;
}
export default function Wardrobe() {
  const navigate = useNavigate();
  const { user, logout, isLoading: contextLoading } = useUser();
  const [pieces, setPieces] = useState<LookDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Não carrega dados se estiver carregando o contexto ou se não tiver usuário
    if (!user || contextLoading) {
      return;
    }
  
    
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/UploadImagem/Imagens`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          // Se a resposta for 401, significa que o token expirou
          if (res.status === 401) {
            logout(); // Logout automático em caso de token inválido
            return;
          }
          throw new Error('Erro ao buscar peças');
        }
        return res.json();
      })
      .then(data => {
        if (data) {
          setPieces(data);
        }
      })
      .catch(error => console.error('Erro ao carregar peças:', error))
      .finally(() => setLoading(false));
  }, [user, contextLoading, logout]);

  return (
    <div className="min-h-screen bg-background dark:bg-background px-2 sm:px-4 pt-4 pb-32 flex flex-col items-center relative">
      {/* Nome do usuário no canto superior esquerdo */}
      {user && (
        <div className="absolute left-4 top-4 text-lg font-semibold text-primary dark:text-primary-dark flex items-center gap-2">
          <span>👤</span> {user.name}
          <button
            className="ml-2 text-xs text-red-500 underline"
            onClick={logout}
            title="Sair"
          >
            Sair
          </button>
        </div>
      )}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-text dark:text-text-dark mt-14">Meu Guarda-Roupa</h1>
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-lg text-text-secondary dark:text-text-secondary animate-pulse">Carregando...</div>
        </div>
      ) : pieces.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto text-center p-6">
          <div className="text-primary dark:text-primary-dark mb-4 opacity-80 text-5xl">👕</div>
          <h2 className="text-xl font-semibold text-text dark:text-text-dark mb-2">Seu guarda-roupa está vazio</h2>
          <p className="mb-6 text-text-secondary dark:text-text-secondary">
            Adicione suas primeiras peças para começar a montar seus looks
          </p>
          <button
            onClick={() => navigate('/add-piece')}
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
          >
            Adicionar primeira peça
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mx-auto">
          {pieces.map(piece => (
            <div key={piece.id} className="flex flex-col items-center bg-card dark:bg-card-light rounded-xl p-3 shadow-md hover:shadow-lg transition-shadow">
              <img src={piece.images[0].imageUrl} alt={piece.titulo} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg mb-2" />
              <span className="text-xs sm:text-sm text-text dark:text-text-dark text-center">{piece.titulo}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Botão flutuante Adicionar peça - Sempre visível */}
      <button
        className="fixed bottom-24 right-6 z-10 bg-primary hover:bg-primary-dark text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl font-bold transition-transform hover:scale-105"
        aria-label="Adicionar peça"
        onClick={() => navigate('/add-piece')}
      >
        +
      </button>
      
      {/* Botão principal Gerar look - Só aparece se tiver peças */}
      {pieces.length > 0 && (
        <button
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-primary hover:bg-primary-dark text-white font-semibold py-4 rounded-xl shadow-lg text-lg transition-transform hover:scale-[1.02]"
          onClick={() => navigate('/context')}
        >
          Gerar look
        </button>
      )}
    </div>
  );
}
