# API

## Requisitos

- PHP
- Composer
- Node.js

La manera más sencilla de instalar todo si no tienes ninguna de las anteriores es con [Herd](https://herd.laravel.com).

## Después de clonar el repositorio

Una vez clonado en el repositorio, ejecuta lo siguiente para instalar dependencias.

```bash
cd api
composer install
npm run install
```

## Uso

Para levantar el servidor en modo de desarrollo.

```bash
composer run dev
```

La URL será `http://127.0.0.1:8000/`.

Necesitarás algún cliente REST para probar la API. Si estas usando VS CODE, puedes instalar la extensión Thunder Client.

Presiona la combinación de teclas `Ctrl + P` e ingresa `ext install rangav.vscode-thunder-client`.

También puedes usar [Insomnia](https://insomnia.rest/) o [Postman](https://www.postman.com/downloads/).
