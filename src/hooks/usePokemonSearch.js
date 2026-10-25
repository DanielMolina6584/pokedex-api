import { useCallback, useRef, useState } from 'react';
import { getPokemon, normalizeQuery, PokemonNotFoundError } from '../services/pokeApi';

export default function usePokemonSearch(onFound) {
  // Concepto: useState — guarda si se está buscando, la búsqueda sin resultados y el error
  const [searching, setSearching] = useState(false);
  const [notFoundQuery, setNotFoundQuery] = useState(null);
  const [error, setError] = useState(null);

  // Concepto: useRef — numera las búsquedas para ignorar la respuesta de una búsqueda vieja
  const lastSearchRef = useRef(0);

  const clearSearch = useCallback(() => {
    lastSearchRef.current += 1;
    setSearching(false);
    setNotFoundQuery(null);
    setError(null);
  }, []);

  // Concepto: async/await — espera a saber si el Pokémon existe antes de abrir su ficha
  const search = useCallback(
    async (text) => {
      const query = normalizeQuery(text);
      if (!query) {
        clearSearch();
        return;
      }

      const searchId = ++lastSearchRef.current;
      setSearching(true);
      setNotFoundQuery(null);
      setError(null);

      try {
        const data = await getPokemon(query);
        if (searchId === lastSearchRef.current) {
          onFound(data.id);
        }
      } catch (err) {
        if (searchId !== lastSearchRef.current) {
          return;
        }
        if (err instanceof PokemonNotFoundError) {
          setNotFoundQuery(query);
        } else {
          setError(err);
        }
      } finally {
        if (searchId === lastSearchRef.current) {
          setSearching(false);
        }
      }
    },
    [onFound, clearSearch]
  );

  return { searching, notFoundQuery, error, search, clearSearch };
}
