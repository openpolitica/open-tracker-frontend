# Proyecto Open Tracker FrontEnd

## Scripts incluidos

El proyecto incluye los scripts por defecto de Next.js:

- `yarn dev`: inicia el servidor en modo de desarrollo en
		[http://localhost:3000](http://localhost:3000).

- `yarn build`: compila la aplicación.

- `yarn start`: inicia la aplicación compilada.

Y también cuenta con scripts para fines de desarrollo, los cuales se han incluido
como una modificación del script original `create-next-app`:

- `yarn lint`: verifica las reglas de ESLint en todos los archivos de javascript del proyecto.

- `yarn lint:fix`: trata de corregir según las reglas de ESLint todos los archivos de javascript del proyecto (especialmente las reglas de Prettier).

- `yarn lint-only`: verifica las reglas de ESLint solamente en los archivos que se
		especifiquen.

- `yarn lint-only:fix`: trata de corregir según las reglas de ESLint solamente en los archivos que se
		especifiquen.

- `yarn prepare`/`yarn postinstall`: hook de instalación de husky, ejecutado
		cada vez que se instala un nuevo paquete.

- `yarn optimize:svg`: ejecuta el script de optimización de svg, localizado en
		`scripts/optimize-svg.js` que aplica las reglas de svgo a los iconos svg
		ubicados en `public/images/icons`, salvo aquellos en la lista `blacklist`.

Como parte de la configuración de Husky, cada vez que se realice un commit se
ejecuta `nxp --no-install lintstaged`, el cual verifica las reglas de ESLint
mediante `npm run lint-only` en
los archivos preparados para el commit.

Así mismo, cada vez que se compile el proyecto, se ejecuta el script `scripts/optimize-svg.js` el cual optimizará todos los svg ubicados en `public/images/icons`, salvo aquellos en la lista `blacklist`.

## Acerca de OpenPolítica

OpenPolítica es un colectivo que crea soluciones digitales para facilitar la participación ciudadana. Si quieres conocer más sobre OpenPolítica puedes visitar su página en https://openpolitica.com/.
