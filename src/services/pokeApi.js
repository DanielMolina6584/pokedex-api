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
  return String(nameOrId ?? '').trim().toLowerCase();
}

// Concept: async/await — the function pauses at each await until the promise resolves
async function request(path, query) {
  let response;
  try {
    // Concept: fetch — sends the HTTP GET request and returns a promise with the response
    response = await fetch(`${BASE_URL}${path}`);
  } catch {
    throw new NetworkError();
  }

  // Concept: response.ok — must be checked before parsing; a 404 body is plain text, not JSON
  if (response.status === 404) {
    throw new PokemonNotFoundError(query);
  }
  if (!response.ok) {
    throw new Error(`La PokéAPI respondió con un error (${response.status}).`);
  }

  // Concept: response.json() — also returns a promise, so it needs await too
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
