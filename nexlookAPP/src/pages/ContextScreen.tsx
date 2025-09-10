import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

// Mock de peças cadastradas
const mockPieces = [
  {
    id: 1,
    name: 'Camisa Branca Social',
    imageUrl: 'https://via.placeholder.com/120x120?text=Camisa',
    category: 'Camisa',
  },
  {
    id: 2,
    name: 'Calça Jeans Azul',
    imageUrl: 'https://via.placeholder.com/120x120?text=Calça',
    category: 'Calça',
  },
];

export default function ContextScreen() {
  const { setResultadoLook,setPromptUser } = useUser();
  const [context, setContext] = useState('');
  // Estado para armazenar IDs de peças selecionadas (comentado temporariamente)
  // const [selectedPieceIds, setSelectedPieceIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateLook = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if(context.length < 10){
      alert('Por favor, descreva melhor a ocasião (mínimo 10 caracteres)');
      setLoading(false);
      return;
    }
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/IAIService/GerarDescricaoImagemcomFoto`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          promptUsuario: context,
        })
    });
    if(!response.ok){ 
      const errorData = await response.json();
      console.error('Erro ao gerar look:', errorData);
      alert('Erro ao gerar look. Tente novamente mais tarde.');
      setLoading(false);
      return;
    }
    setLoading(false);
    const responseData = await response.json();
    // Log para debug
    console.log('Resposta do backend:', responseData);
    
    // Verificar se os dados estão dentro de uma propriedade 'descricao'
    const lookData = responseData.descricao ? responseData.descricao : responseData;
    
    // Certifique-se de que os dados estão normalizados, independentemente de como vêm do backend
    const lookResponse = {
      ocasiao: lookData.ocasiao || context,
      descricaoIA: lookData.descricaoIA || '',
      look: lookData.look || [],
      calcado: lookData.calcado || lookData.calçado || '',
      acessorio: lookData.acessorio || lookData.acessório || ''
    };
    setResultadoLook(lookResponse);
    setPromptUser(context);
    navigate('/result');
  };

  // Comentado para evitar warning de função não utilizada
  // const handleCheckboxChange = (id: number) => {
  //   setSelectedPieceIds(prev =>
  //     prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
  //   );
  // };

  return (
    <div className="min-h-screen h-screen bg-background dark:bg-background flex flex-col items-center justify-center px-2 sm:px-4 py-8">
      <form className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-card dark:bg-card-light rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-4" onSubmit={handleGenerateLook}>
        <h2 className="text-xl sm:text-2xl font-bold text-center text-text dark:text-text-dark mb-2">Qual a ocasião?</h2>
        <input
          type="text"
          placeholder="Reunião de trabalho / Festa casual / Shopping com amigos"
          className="w-full px-4 py-3 rounded-md border border-gray-700 dark:border-gray-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary sm:text-base bg-white dark:bg-gray-800"
          value={context}
          onChange={e => setContext(e.target.value)}
          required
        />
        <div>
          <span className="block mb-2 text-text-secondary dark:text-text-secondary text-sm">(Opcional) Escolha uma peça base:</span>
          {/* <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {mockPieces.map(piece => (
              <label
                key={piece.id}
                className={`flex flex-col items-center bg-card dark:bg-card-light rounded-lg p-2 shadow border-2 ${selectedPieceIds.includes(piece.id) ? 'border-primary' : 'border-transparent'} cursor-pointer`}
              >
                <input
                  type="checkbox"
                  checked={selectedPieceIds.includes(piece.id)}
                  onChange={() => handleCheckboxChange(piece.id)}
                  className="mb-1 accent-primary w-4 h-4"
                />
                <img src={piece.imageUrl} alt={piece.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded mb-1" />
                <span className="text-xs sm:text-sm text-text dark:text-text-dark text-center">{piece.name}</span>
              </label>
            ))}
          </div> */}
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold text-lg transition-colors duration-200"
          disabled={loading}
        >
          {loading ? 'Gerando...' : 'Gerar look'}
        </button>
      </form>
    </div>
  );
}
