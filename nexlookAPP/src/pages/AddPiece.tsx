import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';

const categories = [
  'Camisa',
  'Calça',
  'Sapato',
  'Acessório',
  'Jaqueta',
  'Vestido',
  'Outro',
];

export default function AddPiece() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!image) {
      setError('Por favor, selecione uma imagem.');
      return;
    }
    if (!name) {
      setError('Por favor, digite um nome para a peça.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('File', image);
      formData.append('nome', name);
      formData.append('categoria', category);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/UploadImagem/UploadImagem`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dados para o servidor');
      }

      if (import.meta.env.DEV) {
        console.log('Dados enviados:', { name, category, imageName: image.name });
      }
      navigate('/guarda-roupa');
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Erro ao salvar peça:', error);
      }
      setError('Erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 border-b border-white/8">
        <div className="max-w-lg mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate('/guarda-roupa')}
            className="p-2 rounded-lg hover:bg-white/8 text-text-secondary hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="font-display text-2xl font-light text-white">
            Adicionar <span className="italic text-primary">peça</span>
          </h1>
        </div>
      </header>

      {/* Form */}
      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 py-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-card border border-white/8 rounded-2xl p-6 sm:p-8 flex flex-col gap-6"
        >
          {error && (
            <p className="text-red-400 text-sm text-center py-2 px-3 bg-red-500/10 rounded-lg border border-red-500/20">
              {error}
            </p>
          )}

          {/* Image upload */}
          <div>
            <label className="block text-xs tracking-widest uppercase text-text-secondary mb-3">
              Foto da peça
            </label>
            <label className="cursor-pointer block">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              <div
                className={`w-full h-56 rounded-xl border-2 border-dashed flex items-center justify-center transition-all duration-200 overflow-hidden
                  ${preview
                    ? 'border-primary/40'
                    : 'border-white/15 hover:border-white/30 bg-background hover:bg-white/3'
                  }`}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <div className="flex flex-col items-center gap-3 text-text-secondary">
                    <Upload size={28} strokeWidth={1.5} />
                    <span className="text-sm">Clique para selecionar</span>
                    <span className="text-xs opacity-60">JPG, PNG, WEBP</span>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Name */}
          <div>
            <label htmlFor="piece-name" className="block text-xs tracking-widest uppercase text-text-secondary mb-2">
              Nome
            </label>
            <input
              id="piece-name"
              type="text"
              placeholder="Ex: Camiseta branca básica"
              className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white placeholder-white/25 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 text-sm"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="piece-category" className="block text-xs tracking-widest uppercase text-text-secondary mb-2">
              Categoria
            </label>
            <select
              id="piece-category"
              className="w-full px-4 py-3 bg-background border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 text-sm appearance-none cursor-pointer"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              className="w-1/3 py-3 rounded-xl border border-white/12 hover:border-white/25 hover:bg-white/5 text-text-secondary hover:text-white text-sm font-medium transition-all duration-200"
              onClick={() => navigate('/guarda-roupa')}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-2/3 py-3 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium text-sm tracking-wide transition-all duration-200 relative"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Salvando...
                </span>
              ) : 'Salvar peça'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
