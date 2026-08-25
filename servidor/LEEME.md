# Archivos que van al servidor, no al build

`.htaccess` y `contacto.php` vivían en `public/`, que es lo natural en Next
porque esa carpeta se copia tal cual a la exportación. Se movieron aquí por un
problema concreto.

El despliegue de Hostinger copia el repositorio entero, así que `public/`
también acaba en el servidor. Y Apache lee el `.htaccess` de cada carpeta: el
que quedaba en `/public/` se aplicaba a esa subcarpeta y **anulaba la regla de
la raíz que debía bloquearla**. Resultado: `/public/contacto.php` respondía en
vez de dar 403.

Y por eso `apache.conf` no se llama `.htaccess` aquí: mientras exista un archivo
con ese nombre en cualquier subcarpeta del repositorio, Apache lo aplicará a esa
subcarpeta y anulará el bloqueo de la raíz. `publicar.sh` lo copia a la raíz con
su nombre definitivo.
