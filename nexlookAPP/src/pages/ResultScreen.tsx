import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ArrowLeft, RotateCcw, Shirt } from 'lucide-react';

export default function ResultScreen() {
  const navigate = useNavigate();
  const { resultadoLook, promptUser } = useUser();

  if (!resultadoLook?.look.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-card border border-white/10 flex items-center justify-center mx-auto mb-6">
            <Shirt size={24} className="text-text-secondary" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-3xl font-light text-white mb-3">Nenhum look gerado</h2>
          <p className="text-text-secondary text-sm mb-8">
            Volte e descreva uma ocasião para ver as sugestões.
          </p>
          <button
            className="px-8 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-xl transition-colors duration-200"
            onClick={() => navigate('/contexto')}
          >
            Gerar look
          </button>
        </div>
      </div>
    );
  }

  const calcado = resultadoLook.calcado || (resultadoLook as any).calçado;
  const acessorio = resultadoLook.acessorio || (resultadoLook as any).acessório;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-white/8 px-4 sm:px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/guarda-roupa')}
              className="p-2 rounded-lg hover:bg-white/8 text-text-secondary hover:text-white transition-colors duration-200"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="font-display text-2xl font-light text-white">
              Seu <span className="italic text-primary">look</span>
            </h1>
          </div>
          <button
            onClick={() => navigate('/contexto')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/12 hover:border-white/25 text-text-secondary hover:text-white text-xs transition-all duration-200"
          >
            <RotateCcw size={12} />
            Novo look
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 sm:px-6 py-8 max-w-2xl mx-auto w-full">
        <div className="flex flex-col gap-6">

          {/* Occasion badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/15 border border-primary/25 text-primary text-sm font-medium">
              {promptUser || (typeof resultadoLook.ocasiao === 'object'
                ? JSON.stringify(resultadoLook.ocasiao)
                : resultadoLook.ocasiao) || ''}
            </span>
          </div>

          {/* AI Recommendation */}
          {resultadoLook.descricaoIA && (
            <div className="bg-card border border-white/8 rounded-2xl p-6">
              <p className="text-xs tracking-widest uppercase text-text-secondary/60 mb-3">Recomendação da IA</p>
              <p className="text-white/85 text-sm leading-relaxed whitespace-pre-wrap">
                {typeof resultadoLook.descricaoIA === 'object'
                  ? JSON.stringify(resultadoLook.descricaoIA)
                  : resultadoLook.descricaoIA}
              </p>
            </div>
          )}

          {/* Suggested pieces */}
          {resultadoLook.look && resultadoLook.look.length > 0 && (
            <div>
              <p className="text-xs tracking-widest uppercase text-text-secondary/60 mb-4">Peças sugeridas</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {resultadoLook.look.map((item, index) => (
                  <div
                    key={index}
                    className="bg-card border border-white/8 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-200"
                  >
                    <div className="aspect-square overflow-hidden">
                      {item.imagem ? (
                        <img
                          src={item.imagem}
                          alt={item.nome || `Item ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-background flex items-center justify-center">
                          <span className="text-text-secondary/40 text-xs text-center px-2">
                            {item.categoria || 'Peça'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="px-3 py-2.5">
                      <span className="text-xs text-text-secondary block truncate">
                        {item.nome ? String(item.nome) : `${item.categoria || 'Item'} ${index + 1}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footwear & Accessories */}
          {(calcado || acessorio) && (
            <div className={`grid gap-3 ${calcado && acessorio ? 'grid-cols-2' : 'grid-cols-1'}`}>
              {calcado && (
                <div className="bg-card border border-white/8 rounded-xl p-4">
                  <p className="text-xs tracking-widest uppercase text-text-secondary/60 mb-2">Calçado</p>
                  <p className="text-white/85 text-sm leading-relaxed">
                    {typeof calcado === 'object' ? JSON.stringify(calcado) : calcado}
                  </p>
                </div>
              )}
              {acessorio && (
                <div className="bg-card border border-white/8 rounded-xl p-4">
                  <p className="text-xs tracking-widest uppercase text-text-secondary/60 mb-2">Acessórios</p>
                  <p className="text-white/85 text-sm leading-relaxed">
                    {typeof acessorio === 'object' ? JSON.stringify(acessorio) : acessorio}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bottom actions */}
          <div className="flex gap-3 pt-2 pb-6">
            <button
              className="flex-1 py-3.5 rounded-xl border border-white/12 hover:border-white/25 hover:bg-white/5 text-text-secondary hover:text-white text-sm font-medium transition-all duration-200"
              onClick={() => navigate('/contexto')}
            >
              Novo look
            </button>
            <button
              className="flex-1 py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-medium transition-all duration-200"
              onClick={() => navigate('/guarda-roupa')}
            >
              Ir ao armário
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
