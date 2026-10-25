import { STAT_LABELS, TYPE_LABELS } from '../constants/labels';

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

export function getTypeLabel(type) {
  return TYPE_LABELS[type] ?? capitalize(type);
}

export function getStatLabel(stat) {
  return STAT_LABELS[stat] ?? capitalize(stat);
}
