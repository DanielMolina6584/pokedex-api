import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import PokemonCard from '../components/PokemonCard';
import usePokemonList from '../hooks/usePokemonList';

export default function PokemonListScreen() {
  const { pokemons, loading, error, loadMore, retry } = usePokemonList();
  const isFirstLoad = pokemons.length === 0;

  const renderFooter = () => {
    if (error) {
      return <ErrorState message={error.message} onRetry={retry} compact />;
    }
    if (loading) {
      return <LoadingState message="Cargando más Pokémon..." compact />;
    }
    return null;
  };

  const renderContent = () => {
    if (isFirstLoad && loading) {
      return <LoadingState />;
    }
    if (isFirstLoad && error) {
      return <ErrorState message={error.message} onRetry={retry} />;
    }
    return (
      <FlatList
        data={pokemons}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[styles.listContent, isFirstLoad && styles.emptyContent]}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<EmptyState />}
        ListFooterComponent={renderFooter}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>PokéDex Explorer</Text>
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
  body: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  listContent: {
    padding: 10,
  },
  emptyContent: {
    flexGrow: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
});
