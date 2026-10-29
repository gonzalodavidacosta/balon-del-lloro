# BalÃ³n del Lloro

AplicaciÃ³n web instalable para registrar partidos y decidir cada 26 de octubre quiÃ©n gana el BalÃ³n del Lloro. Los datos se guardan en el almacenamiento local del navegador del telÃ©fono; no se envÃ­an a un servidor. La app guarda su interfaz para abrirla sin conexiÃ³n despuÃ©s de la primera visita. UsÃ¡ **Ajustes â†’ Exportar copia de seguridad** periÃ³dicamente: los datos del navegador pueden borrarse al limpiar Chrome o cambiar de telÃ©fono.

## Instalar en un Samsung Galaxy A07

La instalaciÃ³n como app requiere publicar estos archivos en una direcciÃ³n HTTPS. Una opciÃ³n gratuita es GitHub Pages:

1. En una computadora, crea/inicia sesiÃ³n en GitHub y crea un repositorio nuevo llamado `balon-del-lloro`.
2. Sube al repositorio `index.html`, `manifest.webmanifest`, `sw.js` e `icon.svg`.
3. En el repositorio abre **Settings â†’ Pages**. En **Build and deployment**, elige **Deploy from a branch**, selecciona `main` y `/ (root)`, y guarda.
4. Espera a que GitHub Pages publique el sitio. La direcciÃ³n tendrÃ¡ la forma `https://TU-USUARIO.github.io/balon-del-lloro/`.
5. En tu Galaxy abre esa direcciÃ³n con **Google Chrome**. Toca â‹® â†’ **Instalar aplicaciÃ³n** (o **AÃ±adir a pantalla de inicio** â†’ **Instalar**). El icono aparecerÃ¡ entre tus aplicaciones.
6. Abre la app una vez con internet para que guarde los archivos. DespuÃ©s podrÃ¡s cargar partidos sin conexiÃ³n.

El icono de la app usa el archivo `Balon del lloro.webp`. Al subir el sitio a GitHub Pages, incluye ese archivo junto con los demÃ¡s.

## Puntos

- Gol: 1 punto.
- Mejor gol del partido: 2 puntos.
- Mejor jugador: 3 puntos.
- Segundo mejor jugador: 2 puntos.

La clasificaciÃ³n se calcula por temporada/aÃ±o. En caso de empate, se ordena por goles y despuÃ©s por cantidad de veces elegido jugador del partido.


