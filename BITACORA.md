# Bitácora de preguntas — Pokedex Explorer

Registro de las preguntas y peticiones hechas durante el taller.
Formato de cada entrada: fecha y hora (comando `date`), pregunta y respuesta.

### Pregunta 1
- **Fecha y hora:** Sat Oct 24 02:40:41 PM -05 2026
- **Pregunta:** Ahora la capa de red. En la carpeta de services crea el archivo que consume la PokéAPI (https://pokeapi.co/api/v2/) con dos funciones: una para la lista paginada con limit y offset y otra para la ficha por nombre o id. Usa fetch con async/await y revisa response.ok antes de llamar a response.json(), porque un nombre inexistente responde 404 con texto plano. Lanza errores distintos para "no encontrado" y para fallo de red, normaliza la búsqueda a minúsculas y sin espacios al inicio o al final, y agrega utilidades para sacar el id desde la URL del resultado y armar la URL de la imagen oficial. Marca con comentarios los conceptos de fetch y async/await.
- **Respuesta:** Se renombró `src/api/` a `src/services/` y se creó `src/services/pokeApi.js`. Tiene `getPokemonList(limit, offset)` para la lista paginada y `getPokemon(nameOrId)` para la ficha. Ambas usan una función `request` que revisa el estado de la respuesta antes de `response.json()` y lanza `PokemonNotFoundError` en un 404, `NetworkError` si `fetch` falla sin respuesta y un error genérico para otros códigos HTTP. La búsqueda se normaliza con `normalizeQuery` (`trim` + minúsculas). En `src/utils/pokemonUrls.js` quedaron `getIdFromUrl(url)` y `getOfficialArtworkUrl(id)`. Los conceptos de fetch, async/await, response.ok y response.json() quedaron marcados con comentarios. Se probó contra la API real: lista, búsqueda con " PiKaChu ", nombre inexistente y fallo de red simulado.

