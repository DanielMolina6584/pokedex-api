import { useCallback, useEffect, useState } from 'react';
import { getPokemon } from '../services/pokeApi';
import { getOfficialArtworkUrl } from '../utils/pokemonUrls';

export default function usePokemonDetail(nameOrId) {
  // Concepto: useState — guarda la ficha, si está cargando y el error
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  // Concepto: useEffect — pide la ficha cuando cambia el Pokémon o se reintenta
  // Dependencias: nameOrId y attempt. Son las únicas entradas de la petición; si cambian, hay que volver a pedir.
  // pokemon, loading y error no van aquí porque el efecto los actualiza y eso repetiría la petición sin parar.
  useEffect(() => {
    let isActive = true;

    // Concepto: async/await — espera la respuesta del servicio antes de guardar los datos
    const loadPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getPokemon(nameOrId);
        if (isActive) {
          setPokemon({
            id: data.id,
            name: data.name,
            height: data.height,
            weight: data.weight,
            types: data.types.map((item) => item.type.name),
            stats: data.stats.map((item) => ({ name: item.stat.name, value: item.base_stat })),
            imageUrl: data.sprites?.other?.['official-artwork']?.front_default ?? getOfficialArtworkUrl(data.id),
          });
        }
      } catch (err) {
        if (isActive) {
          setPokemon(null);
          setError(err);
        }
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    loadPokemon();

    // Limpieza: si el Pokémon cambia o la pantalla se cierra antes de que llegue la respuesta, se ignora
    return () => {
      isActive = false;
    };
  }, [nameOrId, attempt]);

  const retry = useCallback(() => {
    setAttempt((previous) => previous + 1);
  }, []);

  return { pokemon, loading, error, retry };
}
