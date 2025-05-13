# ITC_PAGE_V2

## Requisitos

### Git

Para instalar [git][git_download_page], puedes descargarlo desde su página oficial.

La forma más fácil de instalarlo en Windows es:

1. Abriendo una terminal de *Windows PowerShell* (búscala como con cualquier otra aplicación de Windows).
2. Pegar el comando `winget install --id Git.Git -e --source winget` en la terminal y presiona la tecla *Enter*.
3. Esperar a que termine la instalación y seguir los pasos del asistente de instalación.

### Node

Para instalar [node][node_download_page], puedes descargarlo desde su página oficial.

La forma más fácil de instalarlo en Windows es con [NVM para Windows][nvm_for_windows_download_page]:

1. Entra a la [página de descarga para NVM][nvm_for_windows_download_page].
2. Haz clic sobre la opción `nvm-setup.exe` cerca del final de la página.
3. Descarga el archivo.
4. Abre la carpeta donde se descargó el archivo y haz clic dos veces seguidas sobre el archivo.
5. Sigue las instrucciones del asistente de instalación.

## Instalación

Clona el repositorio en algún lugar, por ejemplo en tu escritorio:

Abre el *Explorador de Windows*.

Navega a la carpeta donde quieras tener el repositorio.

Si estás en Windows 11, haz clic derecho en algún espacio en blanco y seleccina la opción *Abrir en Terminal*.

Si estás en Windows 10 o no te aparece la opción anterior, presiona la tecla *Shift* y mantenla, haz clic derecho en algún espacio en blanco, suelta la tecla *Shift* y selecciona la opción *Abrir ventana de PowerShell aquí*.

Pega el comando `git clone https://github.com/nerivel97/ITC_PAGE_V2.git` y presiona la tecla *Enter*.

Si se abre una ventana preguntando tu nombre de usuario y contraseña, ingresa tu nombre de usuario y contraseña de tu cuenta de GitHub.

Si no hubo ningún problema, deberías poder ver la carpeta `ITC_PAGE_V2` en la carpeta que elegiste anteriormente.

Antes de cerrar la terminal...

Si estas trabajando en la carpeta `frontend`, ejecuta los siguientes comandos:

```bash
cd ITC_PAGE_V2
cd frontend
npm install
```

Si estas trabajando en la carpeta `backend`, ejecuta los siguientes comandos:

```bash
cd ITC_PAGE_V2
cd backend
npm install
```

> ***Importante:*** Adicionalmente, si trabajas en la carpeta `backend`, no olvides copiar el contenido del archivo `.env.example` dentro de `ITC_PAGE_V2/backend` en el mismo lugar pero con el nombre `.env` o no podrás levantar el servidor en modo de desarrollo. Cambia los valores de las variables según necesites. Lo más probable es que solo tengas que cambiar los valores de las variables que inician con `DB_`.

[git_download_page]: https://git-scm.com/downloads
[node_download_page]: https://nodejs.org/en/download
[nvm_for_windows_download_page]: https://github.com/coreybutler/nvm-windows/releases/tag/1.2.2

