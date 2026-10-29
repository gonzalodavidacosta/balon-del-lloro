# Balón del Lloro

Aplicación web instalable para registrar partidos y decidir cada 26 de octubre quién gana el Balón del Lloro. Los datos se guardan en el almacenamiento local del navegador del teléfono; no se envían a un servidor. La app guarda su interfaz para abrirla sin conexión después de la primera visita. Usá **Ajustes → Exportar copia de seguridad** periódicamente: los datos del navegador pueden borrarse al limpiar Chrome o cambiar de teléfono.

## Instalar en un Samsung Galaxy A07

La instalación como app requiere publicar estos archivos en una dirección HTTPS. Una opción gratuita es GitHub Pages:

1. En una computadora, crea/inicia sesión en GitHub y crea un repositorio nuevo llamado `balon-del-lloro`.
2. Sube al repositorio `index.html`, `manifest.webmanifest`, `sw.js` e `icon.svg`.
3. En el repositorio abre **Settings → Pages**. En **Build and deployment**, elige **Deploy from a branch**, selecciona `main` y `/ (root)`, y guarda.
4. Espera a que GitHub Pages publique el sitio. La dirección tendrá la forma `https://TU-USUARIO.github.io/balon-del-lloro/`.
5. En tu Galaxy abre esa dirección con **Google Chrome**. Toca ⋮ → **Instalar aplicación** (o **Añadir a pantalla de inicio** → **Instalar**). El icono aparecerá entre tus aplicaciones.
6. Abre la app una vez con internet para que guarde los archivos. Después podrás cargar partidos sin conexión.

El icono de la app usa el archivo `Balon del lloro.webp`. Al subir el sitio a GitHub Pages, incluye ese archivo junto con los demás.

## Puntos

- Gol: 1 punto.
- Mejor gol del partido: 2 puntos.
- Mejor jugador: 3 puntos.
- Segundo mejor jugador: 2 puntos.

La clasificación se calcula por temporada/año. En caso de empate, se ordena por goles y después por cantidad de veces elegido jugador del partido.
