import { useNavigate } from 'react-router-dom';
import { LogIn, Instagram } from 'lucide-react';
import { BsTiktok } from 'react-icons/bs';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md sm:max-w-lg bg-card dark:bg-card-light rounded-2xl shadow-xl p-8 sm:p-10 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-text dark:text-text-dark">
            Bem-vindo ao 
            <span className="text-primary block mt-2">NexLook</span>
          </h1>
          <p className="text-base sm:text-lg text-center text-text-secondary dark:text-text-secondary mt-4 mb-8">
            Envie suas roupas, escolha a ocasião e deixe a IA montar a combinação ideal para você.
          </p>
          <button
            className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-semibold text-lg flex items-center justify-center gap-2 transition-colors duration-200"
            onClick={() => navigate('/wardrobe')}
          >
            <LogIn className="text-xl" />
            Começar
          </button>
        </div>
      </main>
      <footer className="py-4 flex flex-col items-center gap-4 text-text-secondary dark:text-text-secondary">
        <div className="flex items-center justify-center gap-4">
          <a 
            href="https://www.tiktok.com/@sergio_manuca" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-secondary dark:text-text-secondary hover:text-primary dark:hover:text-primary transform hover:scale-110 transition-all duration-200"
            aria-label="Siga-me no TikTok"
          >
            <BsTiktok size={20} />
          </a>
          <a 
            href="https://www.instagram.com/dev.manuca" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-text-secondary dark:text-text-secondary hover:text-primary dark:hover:text-primary transform hover:scale-110 transition-all duration-200"
            aria-label="Siga-me no Instagram"
          >
            <Instagram size={20} />
          </a>
        </div>
        <div className="text-xs opacity-80">
          © 2025 NexLook. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
