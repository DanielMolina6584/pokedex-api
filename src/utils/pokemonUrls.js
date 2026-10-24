const OFFICIAL_ARTWORK_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export function getIdFromUrl(url) {
  const match = /\/(\d+)\/?$/.exec(String(url ?? ''));
  return match ? Number(match[1]) : null;
}

export function getOfficialArtworkUrl(id) {
  return `${OFFICIAL_ARTWORK_BASE_URL}/${id}.png`;
}
