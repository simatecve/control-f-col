# 🚀 Guía de Despliegue en cPanel

## Control F Colombia - Despliegue Simple en cPanel

---

## 📋 Pasos para Desplegar

### 1️⃣ Compilar el Proyecto Localmente

Abre tu terminal en el directorio del proyecto y ejecuta:

```bash
npm run build
```

Esto creará la carpeta `dist/` con todos los archivos compilados y optimizados.

---

### 2️⃣ Subir Archivos a cPanel

**Opción A: Usando File Manager de cPanel**

1. Inicia sesión en cPanel
2. Ve a **File Manager**
3. Navega a `public_html` (o la carpeta de tu dominio)
4. **Elimina** todos los archivos existentes en esa carpeta (si es un sitio nuevo)
5. Sube **TODO el contenido** de la carpeta `dist/` (NO la carpeta dist, sino su contenido)
   - Selecciona todos los archivos dentro de `dist/`
   - Click en "Upload"
   - Espera a que termine la subida

**Opción B: Usando FTP (FileZilla, WinSCP, etc.)**

1. Conecta por FTP a tu servidor
2. Navega a `public_html`
3. Sube todo el contenido de la carpeta `dist/`

---

### 3️⃣ Configurar .htaccess para SPA Routing

Crea un archivo `.htaccess` en `public_html` con este contenido:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Habilitar compresión GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache para archivos estáticos
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType application/x-javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>

# Seguridad
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

---

## 📁 Estructura Final en cPanel

Tu `public_html` debería verse así:

```
public_html/
├── .htaccess          (archivo que acabas de crear)
├── index.html         (de la carpeta dist)
├── favicon.ico        (de la carpeta dist)
├── assets/            (carpeta de dist con JS y CSS)
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
```

---

## ✅ Verificación

1. Visita tu dominio en el navegador
2. Verifica que:
   - ✅ La aplicación carga correctamente
   - ✅ Los estilos CSS se aplican
   - ✅ No hay errores en la consola
   - ✅ El favicon aparece
   - ✅ La navegación funciona (prueba refrescar en diferentes páginas)

---

## 🔄 Actualizar la Aplicación

Cada vez que hagas cambios:

1. **Local:** `npm run build`
2. **cPanel:** Elimina los archivos antiguos de `public_html`
3. **cPanel:** Sube el nuevo contenido de `dist/`
4. **Opcional:** Limpia la caché del navegador (Ctrl + F5)

---

## 🤖 Script de Despliegue Automático (Opcional)

Si quieres automatizar el proceso, puedes usar este script de PowerShell:

```powershell
# deploy.ps1
npm run build

# Comprimir la carpeta dist
Compress-Archive -Path "dist\*" -DestinationPath "deploy.zip" -Force

Write-Host "✅ Build completado y comprimido en deploy.zip"
Write-Host "📤 Sube deploy.zip a cPanel y extráelo en public_html"
```

Guárdalo como `deploy.ps1` y ejecútalo con: `.\deploy.ps1`

---

## 🐛 Solución de Problemas

### Problema: Página en blanco

**Causa:** Archivos no subidos correctamente o ruta incorrecta

**Solución:**
1. Verifica que subiste TODO el contenido de `dist/`
2. Asegúrate de que `index.html` esté en la raíz de `public_html`
3. Revisa la consola del navegador para ver errores

### Problema: Error 404 al refrescar

**Causa:** Falta el archivo `.htaccess`

**Solución:** Crea el archivo `.htaccess` con la configuración de arriba

### Problema: Estilos no se aplican

**Causa:** Archivos CSS no se cargaron o ruta incorrecta

**Solución:**
1. Verifica que la carpeta `assets/` se subió completa
2. Revisa la consola del navegador
3. Asegúrate de que los permisos de archivos sean 644

---

## 📊 Ventajas de usar cPanel

- ✅ **Simple:** Solo subes archivos
- ✅ **Rápido:** No necesitas Docker ni configuraciones complejas
- ✅ **Económico:** Hosting compartido es más barato
- ✅ **Familiar:** Interfaz conocida

---

## ⚠️ Importante

- **NO** subas `node_modules/`
- **NO** subas archivos `.tsx`, `.ts`, o código fuente
- **SOLO** sube el contenido de la carpeta `dist/`
- El archivo `.htaccess` es **ESENCIAL** para que funcione correctamente

---

**Última actualización:** 2026-02-04
