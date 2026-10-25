import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import usePokemonDetail from '../hooks/usePokemonDetail';
import { capitalize, formatHeight, formatPokemonNumber, formatWeight } from '../utils/formatters';

const IMAGE_SIZE = 240;

// Concepto: props — recibe qué Pokémon mostrar y la función para volver a la lista
export default function PokemonDetailScreen({ nameOrId, onBack }) {
  const { pokemon, loading, error, retry } = usePokemonDetail(nameOrId);

  const renderContent = () => {
    if (loading) {
      return <LoadingState message="Cargando ficha..." />;
    }
    if (error) {
      return <ErrorState title="No pudimos cargar la ficha" message={error.message} onRetry={retry} />;
    }
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <Image source={{ uri: pokemon.imageUrl }} style={styles.image} resizeMode="contain" />
        <Text style={styles.number}>{formatPokemonNumber(pokemon.id)}</Text>
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{formatHeight(pokemon.height)}</Text>
            <Text style={styles.statLabel}>Altura</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{formatWeight(pokemon.weight)}</Text>
            <Text style={styles.statLabel}>Peso</Text>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
          accessibilityRole="button"
        >
          <Text style={styles.backText}>← Volver a la lista</Text>
        </Pressable>
      </View>
      <View style={styles.body}>{renderContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dc2626',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  backButtonPressed: {
    opacity: 0.7,
  },
  backText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  body: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
  },
  number: {
    marginTop: 16,
    fontSize: 18,
    color: '#6b7280',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
  },
  stats: {
    flexDirection: 'row',
    marginTop: 24,
    gap: 16,
  },
  stat: {
    alignItems: 'center',
    minWidth: 120,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 14,
    color: '#6b7280',
  },
});
