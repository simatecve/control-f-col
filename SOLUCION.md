# 🎯 SOLUCIÓN AL PROBLEMA DE PANTALLA EN BLANCO

## ✅ Problema Resuelto

El problema de la pantalla en blanco en producción se debía a:

1. **Rutas absolutas** (`/assets/`) en lugar de relativas (`./assets/`)
2. **Import maps con CDNs externos** que no funcionan bien en producción
3. **Falta de bundling** de dependencias

## 🔧 Cambios Realizados

### 1. Configuración de Vite (`vite.config.ts`)
- ✅ Agregado `base: './'` para rutas relativas
- ✅ Configuración de build optimizada
- ✅ Sourcemaps deshabilitados para producción

### 2. HTML (`index.html`)
- ✅ Eliminados import maps de CDNs externos
- ✅ Vite ahora bundlea todas las dependencias localmente

### 3. Build de Producción
- ✅ Todo compilado en la carpeta `dist/`
- ✅ Archivos con rutas relativas
- ✅ CSS y JS bundleados correctamente

---

## 📦 ARCHIVO LISTO PARA DESPLEGAR

Se ha generado: **`deploy-cpanel.zip`**

Este archivo contiene:
- ✅ `index.html` (con rutas relativas)
- ✅ `favicon.ico`
- ✅ `.htaccess` (para SPA routing)
- ✅ Carpeta `assets/` (con JS y CSS compilados)

---

## 🚀 PASOS PARA DESPLEGAR EN CPANEL

### Opción 1: Subir ZIP (Más Rápido)

1. **Accede a cPanel**
   - Ve a **File Manager**
   - Navega a `public_html`

2. **Limpia la carpeta** (si hay archivos antiguos)
   - Selecciona todos los archivos
   - Click en "Delete"

3. **Sube el ZIP**
   - Click en "Upload"
   - Selecciona `deploy-cpanel.zip`
   - Espera a que termine la subida

4. **Extrae el archivo**
   - Click derecho en `deploy-cpanel.zip`
   - Selecciona "Extract"
   - Confirma la extracción

5. **Limpia**
   - Elimina el archivo `deploy-cpanel.zip`

6. **¡Listo!** 🎉
   - Visita tu dominio
   - La aplicación debería cargar correctamente

---

### Opción 2: Subir Archivos Manualmente

Si prefieres subir archivos uno por uno:

1. Abre la carpeta `dist/` en tu computadora
2. Selecciona TODO el contenido
3. Súbelo a `public_html` en cPanel
4. Asegúrate de incluir el archivo `.htaccess`

---

## ✅ Verificación Post-Despliegue

Después de desplegar, verifica:

- [ ] La página carga (no pantalla en blanco)
- [ ] Los estilos CSS se aplican correctamente
- [ ] El favicon aparece
- [ ] La navegación funciona
- [ ] No hay errores en la consola del navegador (F12)
- [ ] Al refrescar en cualquier página, funciona (gracias al .htaccess)

---

## 🐛 Si Aún Hay Problemas

### Pantalla en Blanco
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Verifica que todos los archivos de `assets/` se subieron

### Error 404 en archivos
1. Verifica que la carpeta `assets/` existe en `public_html`
2. Revisa los permisos (deben ser 644 para archivos, 755 para carpetas)

### Error al refrescar página
1. Verifica que el archivo `.htaccess` está en `public_html`
2. Asegúrate de que mod_rewrite está habilitado en Apache

---

## 🔄 Actualizar en el Futuro

Cada vez que hagas cambios:

```powershell
# En tu computadora
.\deploy-cpanel.ps1

# Luego sube el nuevo deploy-cpanel.zip a cPanel
```

---

## 📊 Estructura Final en cPanel

```
public_html/
├── .htaccess
├── index.html
├── favicon.ico
└── assets/
    ├── index-[hash].js
    ├── index-[hash].css
    └── [otros archivos]
```

---

**Fecha:** 2026-02-04  
**Estado:** ✅ Listo para producción
