import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Trash2, Plus, Sparkles, LogOut } from 'lucide-react';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';

interface LookDTO {
  id: string;
  titulo: string;
  images: LookImageDTO[];
  descricao: string;
}
interface LookImageDTO {
  id: string;
  imageUrl: string;
}

interface DeleteResponse {
  sucesso: boolean;
  mensagem: string;
}

interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error';
}

export default function Wardrobe() {
  const navigate = useNavigate();
  const { user, logout, isLoading: contextLoading } = useUser();
  const [pieces, setPieces] = useState<LookDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean; lookId: string | null }>({
    isOpen: false,
    lookId: null
  });

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const openDeleteConfirm = (lookId: string) => {
    setConfirmDelete({ isOpen: true, lookId });
  };

  const closeDeleteConfirm = () => {
    setConfirmDelete({ isOpen: false, lookId: null });
  };

  const deleteLook = async () => {
    if (!user || !confirmDelete.lookId) return;

    setDeletingId(confirmDelete.lookId);
    closeDeleteConfirm();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/UploadImagem/ExcluirLook/${confirmDelete.lookId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          logout();
          return;
        }
        throw new Error('Erro ao deletar peça');
      }

      const data: DeleteResponse = await response.json();

      if (data.sucesso) {
        setPieces(prevPieces => prevPieces.filter(piece => piece.id !== confirmDelete.lookId));
        addToast('Peça removida com sucesso.', 'success');
      } else {
        throw new Error(data.mensagem || 'Erro ao deletar peça');
      }
    } catch (error) {
      console.error('Erro ao deletar peça:', error);
      addToast('Erro ao remover peça. Tente novamente.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    if (!user || contextLoading) return;

    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/UploadImagem/Imagens`, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 401) {
            logout();
            return;
          }
          throw new Error('Erro ao buscar peças');
        }
        return res.json();
      })
      .then(data => {
        if (data) setPieces(data);
      })
      .catch(error => console.error('Erro ao carregar peças:', error))
      .finally(() => setLoading(false));
  }, [user, contextLoading, logout]);

  const LIMIT = 15;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Toasts */}
      {toasts.map(toast => (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => removeToast(toast.id)} />
      ))}

      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        title="Remover Peça"
        message="Tem certeza que deseja remover esta peça? Esta ação não pode ser desfeita."
        onConfirm={deleteLook}
        onCancel={closeDeleteConfirm}
        confirmText="Remover"
        cancelText="Cancelar"
        type="danger"
      />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-white/8 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-light text-white">
              Nex<span className="italic text-primary">Look</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Piece counter badge */}
            {!loading && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/6 border border-white/10">
                <span className="text-xs text-text-secondary">
                  <span className={pieces.length >= LIMIT ? 'text-red-400 font-medium' : 'text-white font-medium'}>
                    {pieces.length}
                  </span>
                  <span className="text-text-secondary"> / {LIMIT} peças</span>
                </span>
              </div>
            )}

            {user && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-secondary hidden sm:block">{user.name}</span>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-white/8 text-text-secondary hover:text-white transition-colors duration-200"
                  title="Sair"
                >
                  <LogOut size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 py-8 pb-32 max-w-5xl mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-medium text-white">Meu Armário</h2>
            {!loading && (
              <p className="text-sm text-text-secondary mt-0.5 sm:hidden">
                {pieces.length} / {LIMIT} peças
              </p>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-3">
              <svg className="animate-spin h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-text-secondary text-sm">Carregando...</span>
            </div>
          </div>
        ) : pieces.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-card border border-white/10 flex items-center justify-center mb-6 text-3xl">
              👕
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Armário vazio</h3>
            <p className="text-text-secondary text-sm mb-8 max-w-xs leading-relaxed">
              Adicione suas primeiras peças para começar a montar seus looks com IA.
            </p>
            <button
              onClick={() => navigate('/adicionar-peca')}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl transition-colors duration-200"
            >
              Adicionar primeira peça
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {pieces.map(piece => (
              <div
                key={piece.id}
                className="group relative bg-card border border-white/8 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-200 hover:shadow-lg hover:shadow-black/30"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={piece.images[0].imageUrl}
                    alt={piece.titulo}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* Delete button overlay */}
                <button
                  onClick={() => openDeleteConfirm(piece.id)}
                  disabled={deletingId === piece.id}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50"
                  title="Remover peça"
                >
                  {deletingId === piece.id ? (
                    <div className="w-3.5 h-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Trash2 size={13} />
                  )}
                </button>

                {/* Name */}
                <div className="px-2.5 py-2.5">
                  <span className="text-xs text-text-secondary block truncate">{piece.titulo}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Floating actions */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {pieces.length > 0 && (
          <button
            className="flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-medium text-sm rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 hover:scale-[1.02]"
            onClick={() => navigate('/contexto')}
          >
            <Sparkles size={16} />
            Gerar look
          </button>
        )}
        <button
          className="p-3.5 bg-card border border-white/15 hover:border-white/30 hover:bg-white/8 text-white rounded-xl shadow-lg transition-all duration-200"
          aria-label="Adicionar peça"
          onClick={() => navigate('/adicionar-peca')}
          title="Adicionar peça"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
}
