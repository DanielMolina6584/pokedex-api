import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { capitalize, formatPokemonNumber } from '../utils/formatters';

const IMAGE_SIZE = 96;

export default function PokemonCard({ pokemon, onPress }) {
  const name = capitalize(pokemon.name);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalle de ${name}`}
    >
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 6,
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
    marginLeft: 16,
  },
  number: {
    fontSize: 14,
    color: '#6b7280',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
});
