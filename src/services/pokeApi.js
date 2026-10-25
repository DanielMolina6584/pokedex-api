const BASE_URL = 'https://pokeapi.co/api/v2';

export class PokemonNotFoundError extends Error {
  constructor(query) {
    super(`No se encontró ningún Pokémon con "${query}".`);
    this.name = 'PokemonNotFoundError';
  }
}

export class NetworkError extends Error {
  constructor() {
    super('No se pudo conectar con la PokéAPI. Revisa tu conexión a internet.');
    this.name = 'NetworkError';
  }
}

export function normalizeQuery(nameOrId) {
  const query = String(nameOrId ?? '').trim().toLowerCase().replace(/^#/, '');
  // Los números se envían sin ceros a la izquierda: la PokéAPI responde 404 con "025" y 200 con "25"
  return /^\d+$/.test(query) ? String(Number(query)) : query;
}

async function request(path, query) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch {
    throw new NetworkError();
  }

  if (response.status === 404) {
    throw new PokemonNotFoundError(query);
  }
  if (!response.ok) {
    throw new Error(`La PokéAPI respondió con un error (${response.status}).`);
  }

  return await response.json();
}

export async function getPokemonList(limit = 20, offset = 0) {
  return await request(`/pokemon?limit=${limit}&offset=${offset}`, `limit=${limit}&offset=${offset}`);
}

export async function getPokemon(nameOrId) {
  const query = normalizeQuery(nameOrId);
  if (!query) {
    throw new PokemonNotFoundError(query);
  }
  return await request(`/pokemon/${encodeURIComponent(query)}`, query);
}
