export function formatPokemonNumber(id) {
  return `#${String(id).padStart(3, '0')}`;
}

export function capitalize(text) {
  const value = String(text ?? '');
  return value.charAt(0).toUpperCase() + value.slice(1);
}
