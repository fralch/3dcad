# Guía de Despliegue en Ubuntu 22.04 con Nginx y MySQL

Esta guía te llevará paso a paso para desplegar tu proyecto Laravel (con Inertia.js/React) en un servidor Ubuntu 22.04 recién instalado.

## Prerrequisitos
- Servidor con Ubuntu 22.04.
- Acceso a la terminal como root o usuario con permisos sudo.
- Dominio apuntando a la IP de tu servidor (opcional, pero recomendado).

---

## Paso 1: Actualizar el Sistema

Lo primero es asegurarse de que el servidor esté actualizado.

```bash
sudo apt update && sudo apt upgrade -y
```

---

## Paso 2: Instalar PHP 8.3

Laravel 12 requiere PHP 8.2 o superior. Ubuntu 22.04 trae versiones anteriores por defecto, así que usaremos un repositorio actualizado.

1. Instalar dependencias necesarias:
```bash
sudo apt install -y lsb-release ca-certificates apt-transport-https software-properties-common
```

2. Agregar el repositorio de PHP (Ondřej Surý):
```bash
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
```

3. Instalar PHP 8.3 y las extensiones necesarias para Laravel:
```bash
sudo apt install -y php8.3 php8.3-fpm php8.3-mysql php8.3-mbstring php8.3-xml php8.3-bcmath php8.3-curl php8.3-zip php8.3-intl php8.3-gd php8.3-sqlite3
```

---

## Paso 3: Instalar y Configurar MySQL

1. Instalar el servidor MySQL:
```bash
sudo apt install -y mysql-server
```

2. Asegurar la instalación (opcional, recomendado para producción):
```bash
sudo mysql_secure_installation
```
*(Sigue las instrucciones: define una contraseña para root, elimina usuarios anónimos, deshabilita login remoto de root, etc.)*

3. Crear la base de datos y el usuario para el proyecto:
Ingresa a MySQL:
```bash
sudo mysql
```

Ejecuta los siguientes comandos SQL (cambia `tu_password` por una contraseña segura):

```sql
CREATE DATABASE sketch3dlab;
CREATE USER 'fralch'@'localhost' IDENTIFIED BY '12345678';
GRANT ALL PRIVILEGES ON sketch3dlab.* TO 'fralch'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## Paso 4: Instalar Composer

Composer es necesario para las dependencias de PHP.

```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

---

## Paso 5: Instalar Node.js y NPM

Necesario para compilar los assets (Vite/React). Instalaremos la versión LTS (v20 o v22).

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## Paso 6: Configurar el Proyecto

1. **Subir o clonar tu código**:
Ve al directorio web (usualmente `/var/www`):
```bash
cd /var/www
# Opción A: Clonar con git (si lo tienes en GitHub/GitLab)
# sudo git clone https://github.com/tu-usuario/tu-repo.git sketch3dlab

# Opción B: Si subes los archivos manualmente, crea la carpeta y sube el contenido
sudo mkdir -p sketch3dlab
# (Sube tus archivos aquí)
```

2. **Asignar permisos iniciales**:
Asegúrate de que tu usuario pueda editar archivos por ahora (luego le daremos permisos a Nginx).
```bash
sudo chown -R $USER:www-data /var/www/sketch3dlab
cd /var/www/sketch3dlab
```

3. **Instalar dependencias de PHP**:
```bash
composer install --no-dev --optimize-autoloader
```

4. **Instalar dependencias de Node.js y compilar**:
```bash
npm install
npm run build
```

5. **Configurar el entorno (.env)**:
Copia el archivo de ejemplo:
```bash
cp .env.example .env
```

Edita el archivo `.env`:
```bash
nano .env
```

**Cambios importantes a realizar en el .env**:
- Cambia `APP_ENV=local` a `APP_ENV=production`.
- Cambia `APP_DEBUG=true` a `APP_DEBUG=false`.
- Configura la URL de tu sitio en `APP_URL`.
- **Configura la base de datos (¡Muy Importante!)**:
  Por defecto viene en sqlite, cámbialo a mysql y pon los datos que creaste en el Paso 3.

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=sketch3dlab
DB_USERNAME=app_user
DB_PASSWORD=tu_password
```

Guarda con `Ctrl+O`, `Enter` y sal con `Ctrl+X`.

6. **Generar la clave de la aplicación**:
```bash
php artisan key:generate
```

7. **Crear enlace simbólico para almacenamiento**:
Esto es necesario para que las imágenes y archivos subidos sean accesibles públicamente.
```bash
php artisan storage:link
```

8. **Ejecutar migraciones**:
Esto creará las tablas en tu base de datos MySQL.
```bash
php artisan migrate --force
```

9. **Optimizar Laravel**:
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## Paso 7: Configurar Permisos de Directorios

Laravel necesita escribir en ciertas carpetas. Nginx (usuario `www-data`) debe ser el dueño.

```bash
sudo chown -R www-data:www-data /var/www/3dcad
sudo chmod -R 775 /var/www/3dcad/storage
sudo chmod -R 775 /var/www/3dcad/bootstrap/cache
```

---

## Paso 8: Configurar Nginx

1. Crear un archivo de configuración para el sitio:
```bash
sudo nano /etc/nginx/sites-available/sketch3dlab
```

2. Pega el siguiente contenido (cambia `tu_dominio_o_ip` por tu dominio real o la IP del servidor):

```nginx
server {
    listen 80;
    server_name tu_dominio_o_ip;
    root /var/www/sketch3dlab/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

3. Activar el sitio y reiniciar Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/sketch3dlab /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Paso 9: Certificado SSL (Opcional pero recomendado)

Si tienes un dominio apuntando a tu servidor, puedes instalar un certificado SSL gratuito con Certbot.

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d tu_dominio.com
```

---

## Solución de Problemas Comunes

- **Error 500**: Verifica los permisos de la carpeta `storage` y `bootstrap/cache`. Revisa los logs en `/var/www/sketch3dlab/storage/logs/laravel.log`.
- **Página en blanco**: Asegúrate de haber ejecutado `npm run build` y que los archivos en `public/build` existan.
- **Error de conexión a BD**: Verifica las credenciales en el archivo `.env`.

¡Listo! Tu aplicación debería estar funcionando.
