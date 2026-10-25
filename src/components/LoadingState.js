import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function LoadingState({ message = 'Cargando Pokémon...', compact = false }) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <ActivityIndicator size="large" color="#dc2626" />
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
  compact: {
    flex: 0,
    paddingVertical: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: '#4b5563',
  },
});
