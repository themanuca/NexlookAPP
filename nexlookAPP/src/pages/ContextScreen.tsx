import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function ContextScreen() {
  const { setResultadoLook, setPromptUser } = useUser();
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerateLook = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    if (context.length < 10) {
      setError('Descreva melhor a ocasião (mínimo 10 caracteres).');
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
    if (!response.ok) {
      const errorData = await response.json();
      if (import.meta.env.DEV) {
        console.error('Erro ao gerar look:', errorData);
      }
      setError('Erro ao gerar look. Tente novamente mais tarde.');
      setLoading(false);
      return;
    }
    setLoading(false);
    const responseData = await response.json();
    if (import.meta.env.DEV) {
      console.log('Resposta do backend:', responseData);
    }

    const lookData = responseData.descricao ? responseData.descricao : responseData;

    const lookResponse = {
      ocasiao: lookData.ocasiao || context,
      descricaoIA: lookData.descricaoIA || '',
      look: lookData.look || [],
      calcado: lookData.calcado || lookData.calçado || '',
      acessorio: lookData.acessorio || lookData.acessório || ''
    };
    setResultadoLook(lookResponse);
    setPromptUser(context);
    navigate('/resultado');
  };

  const suggestions = [
    'Reunião de trabalho',
    'Festa casual',
    'Jantar romântico',
    'Shopping com amigos',
    'Encontro ao ar livre',
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/6 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="px-4 sm:px-6 py-4 border-b border-white/8 relative z-10">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate('/guarda-roupa')}
            className="p-2 rounded-lg hover:bg-white/8 text-text-secondary hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-display text-2xl font-light text-white">
            Gerar <span className="italic text-primary">look</span>
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8 relative z-10">
        <form
          onSubmit={handleGenerateLook}
          className="w-full max-w-lg flex flex-col gap-6"
        >
          {/* Heading */}
          <div className="text-center mb-2">
            <h2 className="font-display text-4xl sm:text-5xl font-light text-white mb-3">
              Qual a <span className="italic text-primary">ocasião?</span>
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed">
              Descreva o evento e a IA vai montar o look ideal com suas peças.
            </p>
          </div>

          {/* Input */}
          <div className="bg-card border border-white/8 rounded-2xl p-6">
            <textarea
              className="w-full bg-transparent text-white placeholder-white/25 text-base resize-none focus:outline-none leading-relaxed"
              placeholder="Ex: Reunião de trabalho importante, ambiente formal mas moderno..."
              value={context}
              onChange={e => setContext(e.target.value)}
              rows={3}
              required
            />
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/8">
              <span className={`text-xs transition-colors ${context.length < 10 && context.length > 0 ? 'text-red-400' : 'text-text-secondary/50'}`}>
                {context.length} / mín. 10
              </span>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center py-2 px-3 bg-red-500/10 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          {/* Quick suggestions */}
          <div>
            <p className="text-xs tracking-widest uppercase text-text-secondary/60 mb-3">Sugestões</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setContext(s)}
                  className="px-3 py-1.5 rounded-full border border-white/12 hover:border-white/30 hover:bg-white/5 text-text-secondary hover:text-white text-xs transition-all duration-200"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm tracking-wide rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Gerando look...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Gerar look
              </>
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
