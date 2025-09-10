import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function ResultScreen() {
  const navigate = useNavigate();
  const { resultadoLook, promptUser } = useUser();

  if (!resultadoLook) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-background flex flex-col items-center justify-center px-2 sm:px-4 py-8">
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-gray-800 dark:bg-card-light rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-white dark:text-text-dark mb-2">Nenhum look gerado</h2>
          <p className="text-center text-base text-gray-300 dark:text-text-dark mb-4">
            Volte e gere um look para ver as sugestões.
          </p>
          <button
            className="w-full py-3 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold text-lg transition-colors duration-200"
            onClick={() => navigate('/context')}
          >
            Gerar look
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-background flex flex-col items-center justify-center px-2 sm:px-4 py-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-gray-800 dark:bg-card-light rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-white dark:text-text-dark mb-2">Sugestão de Look</h2>
        <p className="text-center text-base sm:text-lg font-medium text-primary dark:text-primary bg-white dark:bg-transparent px-3 py-1 rounded-md mb-2">
          {promptUser || (typeof resultadoLook.ocasiao === 'object' ? JSON.stringify(resultadoLook.ocasiao) : resultadoLook.ocasiao) || ""}
        </p>
        
        {/* Descrição da IA */}
        <div className="bg-background-light dark:bg-card rounded-md p-4 text-sm sm:text-base text-gray-800 dark:text-gray-100 shadow mb-4">
          <p className="mb-2 font-semibold text-gray-900 dark:text-white">Recomendação:</p>
          <p className="whitespace-pre-wrap">{typeof resultadoLook.descricaoIA === 'object' ? JSON.stringify(resultadoLook.descricaoIA) : resultadoLook.descricaoIA || ""}</p>
        </div>
        
        {/* Itens do look */}
        {resultadoLook.look && resultadoLook.look.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold text-lg text-white dark:text-text-dark mb-2">Peças sugeridas:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {resultadoLook.look.map((item, index) => (
                <div key={index} className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg p-2 shadow">
                  {item.imagem ? (
                    <img 
                      src={item.imagem} 
                      alt={item.nome || `Item ${index + 1}`} 
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mb-1"
                    />
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-1">
                      <span className="text-gray-500 dark:text-gray-400">{item.categoria}</span>
                    </div>
                  )}
                  <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 text-center font-medium">
                    {item.nome ? String(item.nome) : `${item.categoria || 'Item'} ${index + 1}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Calçado e Acessório */}
        {((resultadoLook.calcado || resultadoLook.calçado) || (resultadoLook.acessorio || resultadoLook.acessório)) && (
          <div className={`${(resultadoLook.calcado || resultadoLook.calçado) && (resultadoLook.acessorio || resultadoLook.acessório) ? 'grid grid-cols-2' : ''} gap-3 mb-4`}>
            {(resultadoLook.calcado || resultadoLook.calçado) && (
              <div className="bg-background-light dark:bg-gray-700 rounded-md p-3 text-sm text-gray-800 dark:text-gray-100 shadow">
                <p className="font-semibold mb-1 text-gray-900 dark:text-white">Calçado recomendado:</p>
                <p>{typeof (resultadoLook.calcado || resultadoLook.calçado) === 'object' ? 
                    JSON.stringify(resultadoLook.calcado || resultadoLook.calçado) : 
                    resultadoLook.calcado || resultadoLook.calçado || ""}</p>
              </div>
            )}
            
            {(resultadoLook.acessorio || resultadoLook.acessório) && (
              <div className="bg-background-light dark:bg-gray-700 rounded-md p-3 text-sm text-gray-800 dark:text-gray-100 shadow">
                <p className="font-semibold mb-1 text-gray-900 dark:text-white">Acessórios recomendados:</p>
                <p>{typeof (resultadoLook.acessorio || resultadoLook.acessório) === 'object' ? 
                    JSON.stringify(resultadoLook.acessorio || resultadoLook.acessório) : 
                    resultadoLook.acessorio || resultadoLook.acessório || ""}</p>
              </div>
            )}
          </div>
        )}
        
        <div className="flex gap-3 mt-2">
          <button
            className="w-1/2 py-3 rounded-md bg-gray-500 hover:bg-gray-600 text-white font-medium text-lg transition-colors duration-200"
            onClick={() => navigate('/context')}
          >
            Novo look
          </button>
          <button
            className="w-1/2 py-3 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold text-lg transition-colors duration-200"
            onClick={() => navigate('/wardrobe')}
          >
            Ir ao guarda-roupa
          </button>
        </div>
      </div>
    </div>
  );
}