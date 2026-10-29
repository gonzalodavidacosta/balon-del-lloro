# Instalar y probar en tu Samsung Galaxy A07

La app es una PWA: se abre desde una pÃ¡gina segura (HTTPS) y Chrome la agrega a la pantalla como una aplicaciÃ³n. No se instala desde Play Store. Para conservar tus registros, no borres los datos de Chrome y exportÃ¡ copias desde Ajustes.

## A. Publicarla gratis desde una computadora

NecesitÃ¡s internet y una cuenta gratuita de GitHub. Si ya tenÃ©s el enlace pÃºblico de la app, salta a la secciÃ³n B.

1. En la computadora, abre **github.com** y crea una cuenta o inicia sesiÃ³n.
2. En GitHub, pulsa el botÃ³n **+** de arriba a la derecha y elige **New repository** (repositorio nuevo).
3. En **Repository name** escribe `balon-del-lloro`.
4. Marca **Public** (pÃºblico). AsÃ­ GitHub Pages puede servir el sitio gratis.
5. Marca **Add a README file** si aparece esa casilla y pulsa **Create repository**.
6. En la pÃ¡gina del repositorio pulsa **Add file â†’ Upload files**.
7. Desde el Explorador de archivos de Windows, arrastra estos seis archivos a la pÃ¡gina: `index.html`, `enhance.js`, `manifest.webmanifest`, `sw.js`, `icon.svg` y **`Balon del lloro.webp`**. Respeta exactamente los espacios y el nombre del archivo de imagen.
8. Baja hasta **Commit changes** (guardar cambios). Deja el mensaje sugerido y pulsa el botÃ³n verde **Commit changes**.
9. En el repositorio, abre **Settings** (ConfiguraciÃ³n) y, en el menÃº de la izquierda, **Pages**.
10. En **Build and deployment**, en **Source**, elige **Deploy from a branch**. En **Branch** elige `main` y la carpeta `/(root)`; pulsa **Save**.
11. Espera uno o dos minutos. Vuelve a **Settings â†’ Pages**. Cuando aparezca el aviso **Your site is live at**, abre esa direcciÃ³n. Se parecerÃ¡ a `https://TU-USUARIO.github.io/balon-del-lloro/`. Guarda ese enlace: es la direcciÃ³n de tu app.

## B. Abrir e instalarla en el A07

1. En el telÃ©fono, conÃ©ctate a internet.
2. Abre **Chrome**. Si no lo encuentras, desliza hacia arriba en la pantalla de inicio y escribe â€œChromeâ€ en la bÃºsqueda de aplicaciones.
3. Toca la barra de direcciones de Chrome, escribe o pega el enlace de GitHub Pages del paso 11 y toca **Ir** en el teclado.
4. Espera a que aparezca la pantalla verde de **BalÃ³n del Lloro**. Comprueba que cargÃ³ antes de seguir.
5. Toca los **tres puntos â‹®** de la esquina superior derecha de Chrome.
6. En el menÃº toca **Instalar aplicaciÃ³n**. SegÃºn la versiÃ³n de Chrome puede decir **AÃ±adir a pantalla de inicio**; si aparece esa opciÃ³n, tÃ³cala y despuÃ©s elige **Instalar** (no solo crear acceso directo).
7. Confirma con **Instalar** en la ventana que aparece.
8. Vuelve a la pantalla de inicio. Busca el icono de BalÃ³n del Lloro. TambiÃ©n deberÃ­a aparecer en la lista de aplicaciones al deslizar hacia arriba.
9. Abre el icono. La app deberÃ­a abrirse en su propia ventana, sin la barra de direcciones de Chrome.

## C. Probar que funciona

Haz esta prueba antes de empezar a guardar partidos reales:

1. Abre BalÃ³n del Lloro y toca **Jugadores â†’ Agregar**. Agrega tres nombres de prueba, por ejemplo Ana, Beto y Cami.
2. Toca **Anotar partido**. Pon la fecha de hoy; carga 2 goles para Ana, 1 para Beto y ninguno para Cami.
3. En **Mejor gol**, elige Ana; en **Mejor jugador**, Ana; en **Segundo mejor**, Beto. Toca **Guardar partido**.
4. En **Inicio** o **Ranking**, Ana deberÃ­a tener 9 puntos (2 por goles, 2 por mejor gol y 3 por mejor jugadora). Beto deberÃ­a tener 4 (3 por gol y 1 por segundo mejor). Cami tendrÃ¡ 0.
5. Cierra la app y vuelve a abrirla desde el icono. El partido y los puntos deben seguir ahÃ­.
6. Para comprobar el modo sin conexiÃ³n, abre la app una vez con internet. Luego desliza hacia abajo desde la parte superior del telÃ©fono, activa **Modo aviÃ³n** y abre BalÃ³n del Lloro. La pantalla deberÃ­a cargar y tus datos seguir visibles. Desactiva Modo aviÃ³n al terminar.
7. Si todavÃ­a no cargaste datos reales, ve a **Ajustes â†’ Borrar todos los datos** y confirma para retirar los nombres y el partido de prueba. **Esto borra todos los registros actuales**, asÃ­ que no lo hagas si ya guardaste partidos reales.

## Guardar una copia de seguridad

En la app abre **Ajustes â†’ Exportar copia de seguridad**. Chrome descargarÃ¡ un archivo `.json` en **Mis archivos â†’ Descargas**. Guarda ese archivo en un lugar seguro. Si cambias de telÃ©fono, instala la app, abre **Ajustes â†’ Importar copia de seguridad** y selecciona el archivo. La copia es personal: contiene los nombres y estadÃ­sticas de tu grupo.

Chrome permite instalar sitios web en Android desde el menÃº de la pÃ¡gina; la imagen del icono se declara en el manifiesto de la app. Si no aparece **Instalar aplicaciÃ³n**, revisa que el enlace empiece con `https://`, que la publicaciÃ³n de GitHub Pages haya terminado y que subiste todos los archivos, incluida la imagen WebP.


