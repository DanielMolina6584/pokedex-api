export function formatPokemonNumber(id) {
  return `#${String(id).padStart(3, '0')}`;
}

export function capitalize(text) {
  const value = String(text ?? '');
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatHeight(decimeters) {
  return `${(decimeters / 10).toFixed(1)} m`;
}

export function formatWeight(hectograms) {
  return `${(hectograms / 10).toFixed(1)} kg`;
}
