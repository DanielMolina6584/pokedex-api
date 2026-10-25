import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { capitalize, formatPokemonNumber } from '../utils/formatters';

const IMAGE_SIZE = 96;

// Concepto: props — recibe el Pokémon y la función que se ejecuta al tocar la tarjeta
export default function PokemonCard({ pokemon, onPress }) {
  const name = capitalize(pokemon.name);

  return (
    // Concepto: Pressable — hace tocable la tarjeta y baja la opacidad mientras se presiona
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${name}`}
    >
      {/* Concepto: Image remota — necesita width y height explícitos */}
      <Image
        source={{ uri: pokemon.imageUrl }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.number}>{formatPokemonNumber(pokemon.id)}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    margin: 6,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cardPressed: {
    opacity: 0.7,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  info: {
    alignItems: 'center',
    marginTop: 8,
  },
  number: {
    fontSize: 14,
    color: '#6b7280',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
});
