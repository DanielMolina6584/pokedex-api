import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

// Concepto: props — el texto y las acciones vienen de la pantalla (componente controlado)
export default function SearchBar({ value, onChangeText, onSubmit }) {
  return (
    <View style={styles.container}>
      {/* Concepto: TextInput — campo controlado por el estado de la pantalla */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder="Busca por nombre o número..."
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        style={styles.input}
      />
      <Pressable
        onPress={onSubmit}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        accessibilityRole="button"
      >
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#111827',
  },
  button: {
    height: 44,
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: '#991b1b',
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
