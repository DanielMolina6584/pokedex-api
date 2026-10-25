import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function ErrorState({ message, onRetry, compact = false }) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <Text style={styles.title}>No pudimos cargar los Pokémon</Text>
      <Text style={styles.message}>{message ?? 'Ocurrió un error inesperado. Intenta de nuevo.'}</Text>
      <Pressable
        onPress={onRetry}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Reintentar</Text>
      </Pressable>
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
  },
  message: {
    marginTop: 8,
    marginBottom: 16,
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#dc2626',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
