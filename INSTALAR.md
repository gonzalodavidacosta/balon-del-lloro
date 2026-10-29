# Instalar y probar en tu Samsung Galaxy A07

La app es una PWA: se abre desde una página segura (HTTPS) y Chrome la agrega a la pantalla como una aplicación. No se instala desde Play Store. Para conservar tus registros, no borres los datos de Chrome y exportá copias desde Ajustes.

## A. Publicarla gratis desde una computadora

Necesitás internet y una cuenta gratuita de GitHub. Si ya tenés el enlace público de la app, salta a la sección B.

1. En la computadora, abre **github.com** y crea una cuenta o inicia sesión.
2. En GitHub, pulsa el botón **+** de arriba a la derecha y elige **New repository** (repositorio nuevo).
3. En **Repository name** escribe `balon-del-lloro`.
4. Marca **Public** (público). Así GitHub Pages puede servir el sitio gratis.
5. Marca **Add a README file** si aparece esa casilla y pulsa **Create repository**.
6. En la página del repositorio pulsa **Add file → Upload files**.
7. Desde el Explorador de archivos de Windows, arrastra estos seis archivos a la página: `index.html`, `enhance.js`, `manifest.webmanifest`, `sw.js`, `icon.svg` y **`Balon del lloro.webp`**. Respeta exactamente los espacios y el nombre del archivo de imagen.
8. Baja hasta **Commit changes** (guardar cambios). Deja el mensaje sugerido y pulsa el botón verde **Commit changes**.
9. En el repositorio, abre **Settings** (Configuración) y, en el menú de la izquierda, **Pages**.
10. En **Build and deployment**, en **Source**, elige **Deploy from a branch**. En **Branch** elige `main` y la carpeta `/(root)`; pulsa **Save**.
11. Espera uno o dos minutos. Vuelve a **Settings → Pages**. Cuando aparezca el aviso **Your site is live at**, abre esa dirección. Se parecerá a `https://TU-USUARIO.github.io/balon-del-lloro/`. Guarda ese enlace: es la dirección de tu app.

## B. Abrir e instalarla en el A07

1. En el teléfono, conéctate a internet.
2. Abre **Chrome**. Si no lo encuentras, desliza hacia arriba en la pantalla de inicio y escribe “Chrome” en la búsqueda de aplicaciones.
3. Toca la barra de direcciones de Chrome, escribe o pega el enlace de GitHub Pages del paso 11 y toca **Ir** en el teclado.
4. Espera a que aparezca la pantalla verde de **Balón del Lloro**. Comprueba que cargó antes de seguir.
5. Toca los **tres puntos ⋮** de la esquina superior derecha de Chrome.
6. En el menú toca **Instalar aplicación**. Según la versión de Chrome puede decir **Añadir a pantalla de inicio**; si aparece esa opción, tócala y después elige **Instalar** (no solo crear acceso directo).
7. Confirma con **Instalar** en la ventana que aparece.
8. Vuelve a la pantalla de inicio. Busca el icono de Balón del Lloro. También debería aparecer en la lista de aplicaciones al deslizar hacia arriba.
9. Abre el icono. La app debería abrirse en su propia ventana, sin la barra de direcciones de Chrome.

## C. Probar que funciona

Haz esta prueba antes de empezar a guardar partidos reales:

1. Abre Balón del Lloro y toca **Jugadores → Agregar**. Agrega tres nombres de prueba, por ejemplo Ana, Beto y Cami.
2. Toca **Anotar partido**. Pon la fecha de hoy; carga 2 goles para Ana, 1 para Beto y ninguno para Cami.
3. En **Mejor gol**, elige Ana; en **Mejor jugador**, Ana; en **Segundo mejor**, Beto. Toca **Guardar partido**.
4. En **Inicio** o **Ranking**, Ana debería tener 7 puntos (2 por goles, 2 por mejor gol y 3 por mejor jugadora). Beto debería tener 3 (1 por gol y 2 por segundo mejor). Cami tendrá 0.
5. Cierra la app y vuelve a abrirla desde el icono. El partido y los puntos deben seguir ahí.
6. Para comprobar el modo sin conexión, abre la app una vez con internet. Luego desliza hacia abajo desde la parte superior del teléfono, activa **Modo avión** y abre Balón del Lloro. La pantalla debería cargar y tus datos seguir visibles. Desactiva Modo avión al terminar.
7. Si todavía no cargaste datos reales, ve a **Ajustes → Borrar todos los datos** y confirma para retirar los nombres y el partido de prueba. **Esto borra todos los registros actuales**, así que no lo hagas si ya guardaste partidos reales.

## Guardar una copia de seguridad

En la app abre **Ajustes → Exportar copia de seguridad**. Chrome descargará un archivo `.json` en **Mis archivos → Descargas**. Guarda ese archivo en un lugar seguro. Si cambias de teléfono, instala la app, abre **Ajustes → Importar copia de seguridad** y selecciona el archivo. La copia es personal: contiene los nombres y estadísticas de tu grupo.

Chrome permite instalar sitios web en Android desde el menú de la página; la imagen del icono se declara en el manifiesto de la app. Si no aparece **Instalar aplicación**, revisa que el enlace empiece con `https://`, que la publicación de GitHub Pages haya terminado y que subiste todos los archivos, incluida la imagen WebP.
