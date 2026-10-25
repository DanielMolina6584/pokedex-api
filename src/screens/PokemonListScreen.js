import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import usePokemonList from '../hooks/usePokemonList';
import usePokemonSearch from '../hooks/usePokemonSearch';

export default function PokemonListScreen({ onSelectPokemon }) {
  const { pokemons, loading, error, loadMore, retry } = usePokemonList();
  const isFirstLoad = pokemons.length === 0;

  // Concepto: useState — guarda el texto que el usuario escribe en la búsqueda
  const [searchText, setSearchText] = useState('');
  const { searching, notFoundQuery, error: searchError, search, clearSearch } = usePokemonSearch(onSelectPokemon);

  const handleChangeText = (text) => {
    setSearchText(text);
    if (text.trim() === '') {
      clearSearch();
    }
  };

  const handleSearch = () => {
    search(searchText);
  };

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
    if (searching) {
      return <LoadingState message="Buscando Pokémon..." />;
    }
    if (notFoundQuery) {
      return <EmptyState message={`No existe ningún Pokémon con el nombre o número "${notFoundQuery}".`} />;
    }
    if (searchError) {
      return <ErrorState title="No pudimos hacer la búsqueda" message={searchError.message} onRetry={handleSearch} />;
    }
    if (isFirstLoad && loading) {
      return <LoadingState />;
    }
    if (isFirstLoad && error) {
      return <ErrorState message={error.message} onRetry={retry} />;
    }
    // Concepto: FlatList — pinta solo las tarjetas visibles; numColumns arma 2 columnas y keyExtractor da una key única
    // Concepto: scroll infinito — onEndReached pide la siguiente página al acercarse al final
    return (
      <FlatList
        data={pokemons}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        renderItem={({ item }) => <PokemonCard pokemon={item} onPress={() => onSelectPokemon(item.id)} />}
        columnWrapperStyle={styles.row}
        contentContainerStyle={[styles.listContent, isFirstLoad && styles.emptyContent]}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<EmptyState />}
        ListFooterComponent={renderFooter}
      />
    );
  };

  // Concepto: SafeAreaView — evita que el contenido quede debajo de la barra de estado o el notch
  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.title}>PokéDex Explorer</Text>
      </View>
      <SearchBar value={searchText} onChangeText={handleChangeText} onSubmit={handleSearch} />
      <View style={styles.body}>{renderContent()}</View>
    </SafeAreaView>
  );
}

// Concepto: StyleSheet — define los estilos fuera del JSX
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
