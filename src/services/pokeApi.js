const BASE_URL = 'https://pokeapi.co/api/v2';
const REQUEST_TIMEOUT_MS = 10000;
const VALID_QUERY = /^[a-z0-9-]+$/;

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
  const query = String(nameOrId ?? '').trim().toLowerCase().replace(/^#/, '').replace(/\s+/g, '-');
  // Los números se envían sin ceros a la izquierda: la PokéAPI responde 404 con "025" y 200 con "25"
  return /^\d+$/.test(query) ? String(Number(query)) : query;
}

// Concepto: async/await — la función espera cada paso de la petición sin bloquear la interfaz
async function request(path, query) {
  // Si la conexión se queda colgada, se cancela la petición para no dejar la pantalla cargando para siempre
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    // Concepto: fetch — hace la petición HTTP a la PokéAPI
    response = await fetch(`${BASE_URL}${path}`, { signal: controller.signal });
  } catch {
    throw new NetworkError();
  } finally {
    clearTimeout(timeoutId);
  }

  if (response.status === 404) {
    throw new PokemonNotFoundError(query);
  }
  // Concepto: response.ok — se revisa antes de response.json() porque un 404 responde texto plano
  if (!response.ok) {
    throw new Error(`La PokéAPI respondió con un error (${response.status}).`);
  }

  // Concepto: response.json() — convierte el cuerpo de la respuesta en un objeto de JavaScript
  return await response.json();
}

export async function getPokemonList(limit = 20, offset = 0) {
  return await request(`/pokemon?limit=${limit}&offset=${offset}`, `limit=${limit}&offset=${offset}`);
}

export async function getPokemon(nameOrId) {
  const query = normalizeQuery(nameOrId);
  // Los nombres de la PokéAPI solo tienen letras sin tilde, números y guiones; con otro carácter responde 400
  if (!VALID_QUERY.test(query)) {
    throw new PokemonNotFoundError(query);
  }
  return await request(`/pokemon/${encodeURIComponent(query)}`, query);
}
