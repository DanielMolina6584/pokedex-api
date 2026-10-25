# PokéDex Explorer

App móvil hecha con **Expo (React Native)** que consume la [PokéAPI](https://pokeapi.co/). Muestra una lista de Pokémon con scroll infinito, permite buscar por nombre o número y abre una ficha con imagen, altura, peso, tipos y estadísticas base.

## Cómo ejecutarla

```bash
npm install
npx expo start
```

Escanea el código QR con **Expo Go** en el celular, o presiona `a` para abrirla en un emulador de Android.

## Árbol de carpetas

```
pokedex-api/
├── index.js                      # Punto de entrada: registra App
├── App.js                        # Navegación: decide si se ve la lista o la ficha
├── BITACORA.md                   # Registro de preguntas del taller
└── src/
    ├── services/
    │   └── pokeApi.js            # Única capa que habla con la PokéAPI
    ├── hooks/
    │   ├── usePokemonList.js     # Lista paginada: datos, loading, error, loadMore, retry
    │   ├── usePokemonDetail.js   # Ficha de un Pokémon: datos, loading, error, retry
    │   └── usePokemonSearch.js   # Búsqueda: decide si abre la ficha o muestra "sin resultados"
    ├── screens/
    │   ├── PokemonListScreen.js  # Pantalla de lista con barra de búsqueda
    │   └── PokemonDetailScreen.js # Pantalla de ficha
    ├── components/
    │   ├── PokemonCard.js        # Tarjeta tocable de la lista
    │   ├── SearchBar.js          # Campo de texto + botón "Buscar"
    │   ├── TypeBadge.js          # Distintivo de color por tipo
    │   ├── StatBar.js            # Barra proporcional de una estadística
    │   ├── LoadingState.js       # Estado de carga
    │   ├── ErrorState.js         # Estado de error con "Reintentar"
    │   └── EmptyState.js         # Estado "Sin resultados"
    ├── constants/
    │   ├── typeColors.js         # Paleta de colores por tipo + color de respaldo
    │   └── labels.js             # Nombres en español de tipos y estadísticas
    └── utils/
        ├── formatters.js         # Formatos: #025, mayúscula inicial, m, kg, traducciones
        └── pokemonUrls.js        # Saca el id de una URL y arma la URL de la imagen oficial
```

## Responsabilidad de cada capa

| Capa | Qué hace | Qué **no** hace |
|---|---|---|
| `services/` | Hace las peticiones con `fetch`, revisa `response.ok`, convierte a JSON y lanza errores claros (`PokemonNotFoundError`, `NetworkError`). Normaliza la búsqueda. | No sabe nada de React, estados ni pantallas. |
| `hooks/` | Llaman al servicio y guardan el resultado en estados (`useState`): datos, `loading` y `error`. Controlan cuándo pedir (`useEffect`) y evitan peticiones repetidas. | No tienen JSX ni estilos. |
| `screens/` | Arman una pantalla completa: usan un hook y deciden qué mostrar según el estado (cargando, error, sin resultados o datos). | No llaman a `fetch` directamente. |
| `components/` | Piezas visuales reutilizables que reciben todo por props. | No piden datos ni tienen lógica de negocio. |
| `constants/` y `utils/` | Datos fijos y funciones puras de formato, fáciles de probar por separado. | No dependen de React. |
| `App.js` | Guarda en un estado qué Pokémon está seleccionado y alterna entre lista y ficha, sin librerías de navegación. | No pide datos. |

## ¿Por qué esta arquitectura?

- **Separación de responsabilidades:** si mañana cambia la API, solo se toca `services/pokeApi.js`. Si cambia el diseño, solo se tocan `components/` y `screens/`.
- **Reutilización:** `LoadingState`, `ErrorState` y `EmptyState` se usan en la lista, la búsqueda y la ficha. `StatBar` y `TypeBadge` se pueden usar en cualquier otra pantalla.
- **Pantallas más simples:** la lógica de carga, errores y paginación vive en los hooks, y las pantallas solo pintan.
- **Menos errores con `useEffect`:** cada hook tiene sus dependencias revisadas y comentadas, así que es fácil comprobar que ninguna petición se repite sin parar.
- **Fácil de probar:** las funciones de `services/`, `utils/` y `constants/` no dependen de React y se pueden probar solas.

## ¿Cómo viaja una petición? (explicado sencillo)

Ejemplo: el usuario toca la tarjeta de **Pikachu** en la lista.

1. **El toque.** `PokemonCard` es un `Pressable`. Al tocarlo ejecuta el `onPress` que le pasó la lista: `onSelectPokemon(25)`.
2. **Cambio de pantalla.** `onSelectPokemon` es el `setSelectedPokemon` de `App.js`. El estado pasa de `null` a `25`, React vuelve a dibujar `App`, oculta la lista y monta `PokemonDetailScreen` con `nameOrId={25}`.
3. **El hook se activa.** La pantalla llama a `usePokemonDetail(25)`. Su `useEffect` corre porque `nameOrId` es nuevo: pone `loading` en `true` y la pantalla muestra `LoadingState` ("Cargando ficha...").
4. **El servicio pide los datos.** El hook llama a `getPokemon(25)` en `pokeApi.js`, que normaliza el texto y hace `fetch('https://pokeapi.co/api/v2/pokemon/25')`. Con `await` espera la respuesta sin congelar la app.
5. **Revisión de la respuesta.** Si la respuesta es 404, lanza "no encontrado". Si no hay internet o la conexión tarda más de 10 segundos, lanza "sin conexión". Si todo sale bien (`response.ok`), convierte el cuerpo con `response.json()`.
6. **El hook guarda el resultado.** Toma solo lo que la pantalla necesita (id, nombre, altura, peso, tipos, estadísticas, imagen) y lo guarda con `setPokemon`. Luego pone `loading` en `false`. Si hubo error, lo guarda con `setError`.
7. **Se pinta la pantalla.** Cada `setState` hace que React vuelva a dibujar `PokemonDetailScreen`. Ahora hay datos, así que muestra la imagen, `#025`, "Pikachu", 0.4 m, 6.0 kg, el distintivo "Eléctrico" y las barras de estadísticas. Si hubo error, muestra `ErrorState` con "Reintentar".
8. **Volver.** "Volver a la lista" pone el estado de `App` otra vez en `null`. La ficha se desmonta (su `useEffect` limpia e ignora cualquier respuesta pendiente) y la lista aparece tal como estaba, sin volver a pedirla.

**Resumen para la sustentación:** *toque → estado en App → pantalla → hook (`useEffect`) → servicio (`fetch`) → API → servicio revisa y convierte → hook guarda en estado → React vuelve a pintar.*
