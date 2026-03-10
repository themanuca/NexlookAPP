import { useNavigate } from 'react-router-dom';
import { ArrowRight, Instagram } from 'lucide-react';
import { BsTiktok } from 'react-icons/bs';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Atmospheric glow */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-primary/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <main className="flex-1 flex items-center justify-center px-6 relative z-10">
        <div className="w-full max-w-lg flex flex-col items-center text-center">

          {/* Eyebrow */}
          <span className="text-xs tracking-[0.35em] uppercase text-primary font-medium mb-6 opacity-80">
            AI Fashion Stylist
          </span>

          {/* Wordmark */}
          <h1 className="font-display text-[5.5rem] sm:text-[7rem] font-light text-white leading-[0.9] tracking-tight mb-6">
            Nex<span className="italic text-primary">Look</span>
          </h1>

          {/* Thin rule */}
          <div className="w-12 h-px bg-white/20 mb-8" />

          {/* Tagline */}
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-12 max-w-xs sm:max-w-sm">
            Envie suas roupas, escolha a ocasião e deixe a IA montar a combinação ideal para você.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              className="group px-10 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-medium text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
              onClick={() => navigate('/login')}
            >
              Entrar
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              className="px-10 py-3.5 rounded-xl border border-white/15 hover:border-white/35 hover:bg-white/5 text-white font-medium text-sm tracking-wide transition-all duration-200"
              onClick={() => navigate('/cadastro')}
            >
              Criar conta
            </button>
          </div>
        </div>
      </main>

      <footer className="py-6 flex flex-col items-center gap-3 relative z-10">
        <div className="flex items-center gap-5">
          <a
            href="https://www.tiktok.com/@sergio_manuca"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-white transition-colors duration-200"
            aria-label="TikTok"
          >
            <BsTiktok size={16} />
          </a>
          <div className="w-px h-3 bg-white/20" />
          <a
            href="https://www.instagram.com/manuca.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-white transition-colors duration-200"
            aria-label="Instagram"
          >
            <Instagram size={16} />
          </a>
        </div>
        <p className="text-text-secondary/50 text-xs tracking-widest">© 2025 NEXLOOK</p>
      </footer>
    </div>
  );
}
