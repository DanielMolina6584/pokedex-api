import { StyleSheet, Text, View } from 'react-native';

// Concepto: props con valor por defecto — el mensaje se puede cambiar según el caso
export default function EmptyState({ message = 'No se encontraron Pokémon.' }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sin resultados</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  message: {
    marginTop: 8,
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
  },
});
