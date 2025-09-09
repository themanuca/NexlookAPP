import React from 'react';
import { useNavigate } from 'react-router-dom';

// Mock de resposta da IA
const lookSuggestion = {
  context: 'Look para reunião de trabalho',
  pieces: [
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
    {
      id: 3,
      name: 'Sapato Preto',
      imageUrl: 'https://via.placeholder.com/120x120?text=Sapato',
      category: 'Sapato',
    },
  ],
  description:
    'Sugestão: Combine a camisa branca social com a calça jeans azul para um visual elegante e confortável. Complete com o sapato preto para um toque profissional. Ideal para reuniões de trabalho.',
};

export default function ResultScreen() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background dark:bg-background flex flex-col items-center justify-center px-2 sm:px-4 py-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-card dark:bg-card-light rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-text dark:text-text-dark mb-2">Sugestão de Look</h2>
        <p className="text-center text-base sm:text-lg text-primary mb-2">{lookSuggestion.context}</p>
        <div className="flex flex-row flex-wrap justify-center gap-2 mb-2">
          {lookSuggestion.pieces.map(piece => (
            <div key={piece.id} className="flex flex-col items-center">
              <img src={piece.imageUrl} alt={piece.name} className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg mb-1" />
              <span className="text-xs sm:text-sm text-text dark:text-text-dark text-center">{piece.name}</span>
            </div>
          ))}
        </div>
        <div className="bg-background-light dark:bg-card rounded-md p-3 text-sm sm:text-base text-text dark:text-text-dark shadow">
          {lookSuggestion.description}
        </div>
        <button
          className="w-full py-3 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold text-lg transition-colors duration-200 mt-2"
          onClick={() => navigate('/wardrobe')}
        >
          Voltar ao guarda-roupa
        </button>
      </div>
    </div>
  );
}
