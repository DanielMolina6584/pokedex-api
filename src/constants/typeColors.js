export const TYPE_COLORS = {
  normal: '#a8a77a',
  fire: '#ee8130',
  water: '#6390f0',
  electric: '#d4a417',
  grass: '#5fa83a',
  ice: '#5cbfb9',
  fighting: '#c22e28',
  poison: '#a33ea1',
  ground: '#c4a24a',
  flying: '#8f7fd8',
  psychic: '#f95587',
  bug: '#8f9c1a',
  rock: '#b6a136',
  ghost: '#735797',
  dragon: '#6f35fc',
  dark: '#705746',
  steel: '#8a8aa8',
  fairy: '#d685ad',
};

// Color de respaldo para cualquier tipo que no esté en la paleta
export const FALLBACK_TYPE_COLOR = '#6b7280';

export function getTypeColor(type) {
  return TYPE_COLORS[type] ?? FALLBACK_TYPE_COLOR;
}
