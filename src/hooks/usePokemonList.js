import { useCallback, useEffect, useRef, useState } from 'react';
import { getPokemonList } from '../services/pokeApi';
import { getIdFromUrl, getOfficialArtworkUrl } from '../utils/pokemonUrls';

const PAGE_SIZE = 20;

export default function usePokemonList() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const nextOffsetRef = useRef(0);
  const isFetchingRef = useRef(false);
  const isMountedRef = useRef(true);

  const loadPage = useCallback(async () => {
    if (isFetchingRef.current) {
      return;
    }
    isFetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const data = await getPokemonList(PAGE_SIZE, nextOffsetRef.current);
      if (!isMountedRef.current) {
        return;
      }
      const page = data.results.map((item) => {
        const id = getIdFromUrl(item.url);
        return { id, name: item.name, imageUrl: getOfficialArtworkUrl(id) };
      });
      setPokemons((previous) => [...previous, ...page]);
      nextOffsetRef.current += PAGE_SIZE;
      setHasMore(data.next !== null);
    } catch (err) {
      if (isMountedRef.current) {
        setError(err);
      }
    } finally {
      isFetchingRef.current = false;
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  // Dependencias: solo loadPage, que nunca cambia porque su useCallback tiene [].
  // Así el efecto corre una sola vez al montarse. Si pokemons, loading o error estuvieran aquí,
  // cada setState dentro de loadPage volvería a ejecutar el efecto y pediría datos sin parar.
  useEffect(() => {
    isMountedRef.current = true;
    loadPage();
    return () => {
      isMountedRef.current = false;
    };
  }, [loadPage]);

  const loadMore = useCallback(() => {
    if (!hasMore || error) {
      return;
    }
    loadPage();
  }, [hasMore, error, loadPage]);

  const retry = useCallback(() => {
    loadPage();
  }, [loadPage]);

  return { pokemons, loading, error, hasMore, loadMore, retry };
}
