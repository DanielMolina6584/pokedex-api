import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PokemonDetailScreen from './src/screens/PokemonDetailScreen';
import PokemonListScreen from './src/screens/PokemonListScreen';

export default function App() {
  // Concepto: useState — guarda el Pokémon seleccionado; null muestra la lista
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  // Concepto: renderizado condicional — la lista sigue montada pero oculta para no perder el scroll ni volver a pedirla
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={{ flex: 1, display: selectedPokemon === null ? 'flex' : 'none' }}>
        <PokemonListScreen onSelectPokemon={setSelectedPokemon} />
      </View>
      {selectedPokemon !== null && (
        <PokemonDetailScreen nameOrId={selectedPokemon} onBack={() => setSelectedPokemon(null)} />
      )}
    </SafeAreaProvider>
  );
}
