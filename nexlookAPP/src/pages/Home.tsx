import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-background px-2 sm:px-4 py-8">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="w-full max-w-lg bg-card dark:bg-card-light rounded-2xl shadow-xl p-6 sm:p-10 flex flex-col items-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-center text-text dark:text-text-dark mb-2">
            Bem-vindo ao <span className="block text-primary">NexLook</span>
          </h1>
          <p className="text-base sm:text-lg text-center text-text-secondary dark:text-text-secondary mb-8">
            Suba suas roupas. Deixe a IA montar seu look.
          </p>
          <button
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold text-lg flex items-center justify-center gap-2 transition-colors duration-200"
            onClick={() => navigate('/wardrobe')}
          >
            <LogIn className="text-xl" />
            Começar
          </button>
        </div>
      </div>
      <footer className="w-full text-center mt-8 text-xs text-text-secondary dark:text-text-secondary opacity-80">
        © 2025 NexLook. Todos os direitos reservados.
      </footer>
    </div>
  );
}
