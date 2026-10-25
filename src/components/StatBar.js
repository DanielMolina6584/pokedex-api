import { StyleSheet, Text, View } from 'react-native';

const MAX_STAT_VALUE = 255;

// Concepto: props — nombre, valor y máximo llegan desde la pantalla para reutilizar la barra
export default function StatBar({ label, value, max = MAX_STAT_VALUE }) {
  // Porcentaje del ancho: valor / máximo × 100. Ej.: 100 / 255 × 100 ≈ 39 %.
  // Math.min y Math.max lo dejan entre 0 % y 100 % aunque llegue un valor fuera de rango.
  const percentage = Math.min(Math.max(value / max, 0), 1) * 100;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    width: 120,
    fontSize: 14,
    color: '#4b5563',
  },
  value: {
    width: 36,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'right',
    marginRight: 10,
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: '#dc2626',
  },
});
