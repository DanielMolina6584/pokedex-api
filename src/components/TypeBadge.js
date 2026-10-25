import { StyleSheet, Text, View } from 'react-native';
import { getTypeColor } from '../constants/typeColors';
import { getTypeLabel } from '../utils/formatters';

// Concepto: props — recibe el tipo en inglés (como lo da la API) y elige color y texto
export default function TypeBadge({ type }) {
  return (
    <View style={[styles.badge, { backgroundColor: getTypeColor(type) }]}>
      <Text style={styles.text}>{getTypeLabel(type)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
