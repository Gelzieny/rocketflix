import { useState } from 'react';
import { Hero } from './components/hero';

// Variáveis de ambiente
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const IMG_URL = import.meta.env.VITE_IMG_URL;

// Interfaces para tipagem
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export function App() {
  // Estado para armazenar o filme selecionado
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getRandomMovie() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/popular?api_key=${API_KEY}&language=pt-BR`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data: MovieResponse = await response.json();
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const randomMovie = {
        ...data.results[randomIndex],
        poster_path: data.results[randomIndex].poster_path
          ? `${IMG_URL}${data.results[randomIndex].poster_path}`
          : '',
      };
      setMovie(randomMovie);
    } catch (error) {
      console.error('Erro ao buscar filmes:', error);
      setError('Não foi possível carregar o filme. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <Hero />

      <div className="flex flex-col items-center justify-center gap-4">
        <img src="logo.svg" alt="Logo" className="w-10" />

        <div className="text-center text-4xl font-bold dark:text-[#fffcf9] text-[#1A1A1A]">
          Não sabe o que assistir?
        </div>

        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}

        {isLoading && (
          <div className="text-center text-lg text-[#1A1A1A] dark:text-[#b3b3b3]">
            Carregando filme...
          </div>
        )}

        {movie && !isLoading && (
          <div className="flex w-[50%] h-auto m-auto grid grid-cols-2 items-center justify-center gap-[30px] text-[#1A1A1A] dark:text-[#b3b3b3] pb-2">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-[200px] h-auto object-cover rounded-xl"
            />

            <div>
              <h2 className="mb-[20px] text-2xl font-semibold">{movie.title}</h2>
              <p className="leading-[25px]">{movie.overview}</p>
            </div>
          </div>
        )}

        <button
          onClick={getRandomMovie}
          disabled={isLoading}
          className={`flex items-center justify-center w-[200px] h-[50px] rounded-md bg-[#e9e6e3] m-auto cursor-pointer bg-shadow gap-4 hover:bg-[#fffcf9] ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <img src="logo.svg" alt="Logo" className="w-6 h-6" />
          <span className="text-sm font-medium text-black">Encontrar filme</span>
        </button>

        <div className="max-w-md mx-auto text-center text-lg text-[#1A1A1A] dark:text-[#b3b3b3] pt-[30px]">
          Clique em "Encontrar filme" que traremos informações de algum filme para você assistir hoje.
        </div>
      </div>
    </div>
  );
}