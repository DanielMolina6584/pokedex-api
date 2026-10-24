# Pokedex Explorer — Taller universitario de React Native (Expo)

Proyecto Expo con plantilla **blank**: un solo `App.js` como punto de entrada, **sin Expo Router**.
La sección "Navigation & Routing" de `AGENTS.md` (generado por la plantilla) NO aplica a este proyecto.

## Stack
- Expo SDK 58, React Native, JavaScript (no TypeScript).
- `react-native-safe-area-context` para áreas seguras.
- Peticiones HTTP con `fetch` nativo. No instalar librerías HTTP (axios, etc.).
- Instalar dependencias siempre con `npx expo install <paquete>`.

## Reglas del proyecto
1. **Idioma:** el código va en inglés (variables, funciones, comentarios técnicos); los textos visibles de la interfaz van en español.
2. **Conceptos de clase:** cada concepto visto en clase (useState, useEffect, FlatList, fetch, async/await, etc.) debe marcarse con un comentario breve donde se use. Ejemplo: `// Concept: useState — stores the list of pokemon`. No agregar otros comentarios innecesarios.
3. **Separación de responsabilidades:** las llamadas a la API no se mezclan con los estilos ni con el JSX de los componentes (van en su propio módulo, `src/services/`).
4. **Commits:** trabajamos en pareja; cada commit debe ser pequeño y con un mensaje claro en español, sin prefijos tipo `chore:`/`feat:` (ej. `Inicializacion del proyecto`).
   - Los commits NO llevan `Co-Authored-By` ni ninguna mención a Claude; solo aparece el autor configurado en git.
   - Hacer exactamente los commits que se pidan (si se pide un commit, es uno solo).

## Bitácora de preguntas (BITACORA.md)
- Al terminar de responder cada pregunta o petición, agregar automáticamente una entrada al final de `BITACORA.md`, numerada de forma consecutiva:

```
### Pregunta N
- **Fecha y hora:** salida del comando `date` ejecutado en el momento de la pregunta (nunca inventarla)
- **Pregunta:** el texto de la pregunta
- **Respuesta:** resumen claro de lo que se respondió o hizo
```

## Comandos
```bash
npx expo start          # servidor de desarrollo (no dejarlo corriendo al terminar una tarea)
npx expo install <pkg>  # instalar dependencias compatibles con el SDK
```
