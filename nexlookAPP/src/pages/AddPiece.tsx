import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    if (!image || !name || !category) {
      // Feedback visual se estiver faltando alguma informação
      if (!image) {
        alert('Por favor, selecione uma imagem');
        return;
      }
      if (!name) {
        alert('Por favor, digite um nome para a peça');
        return;
      }
      return;
    }
    
    setLoading(true);
    
    try {
      // Criando FormData para upload
      const formData = new FormData();
      formData.append('File', image);
      formData.append('nome', name);
      formData.append('categoria', category);
      
      // Enviando para o backend
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
      
      // Log apenas para desenvolvimento
      if (import.meta.env.DEV) {
        console.log('Dados enviados:', { name, category, imageName: image.name });
      }
      navigate('/wardrobe');
    } catch (error) {
      // Registrar erro apenas em ambiente de desenvolvimento
      if (import.meta.env.DEV) {
        console.error('Erro ao salvar peça:', error);
      }
      alert('Erro ao salvar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-screen bg-background dark:bg-background flex flex-col items-center justify-center px-2 sm:px-4 py-8">
      <form className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-card dark:bg-card-light rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-4" onSubmit={handleSubmit}>
        <h2 className="text-xl sm:text-2xl font-bold text-center text-text dark:text-text-dark mb-2">Adicionar Peça</h2>
        <label className="flex flex-col items-center cursor-pointer">
          <span className="mb-2 text-gray-700 dark:text-gray-300">Foto da peça</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          <div className={`w-28 h-28 sm:w-32 sm:h-32 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed ${preview ? 'border-green-500' : 'border-primary'} mb-2 transition-all hover:opacity-90`}>
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="flex flex-col items-center text-center p-2">
                <span className="text-primary text-3xl mb-1">+</span>
                <span className="text-gray-600 dark:text-gray-300 text-sm">Selecionar imagem</span>
              </div>
            )}
          </div>
        </label>
        <input
          type="text"
          placeholder="Nome da peça"
          className="w-full px-4 py-3 rounded-md border border-gray-700 dark:border-gray-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary sm:text-base bg-white dark:bg-gray-800"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <select
          className="w-full px-4 py-3 rounded-md border border-gray-700 dark:border-gray-300 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary sm:text-base bg-white dark:bg-gray-800 appearance-none"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="flex gap-3 mt-2">
          <button
            type="button"
            className="w-1/3 py-3 rounded-md bg-gray-400 dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700 text-white font-medium text-lg transition-colors duration-200"
            onClick={() => navigate('/wardrobe')}
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-2/3 py-3 rounded-md bg-primary hover:bg-primary-dark text-white font-semibold text-lg transition-colors duration-200 relative"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="opacity-0">Salvar</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </>
            ) : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}
