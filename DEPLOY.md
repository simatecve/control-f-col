# 🚀 Guía de Despliegue en Coolify

## Control F Colombia - Configuración de Coolify

Este documento explica cómo desplegar la aplicación en Coolify.

---

## 📋 Requisitos Previos

- Tener acceso a tu instancia de Coolify
- El repositorio debe estar en GitHub: `https://github.com/simatecve/control-f-col`

---

## 🔧 Configuración en Coolify

### Opción 1: Usando Dockerfile (Recomendado)

1. **Crear Nueva Aplicación en Coolify**
   - Ve a tu dashboard de Coolify
   - Click en "New Resource" → "Application"
   - Selecciona "Public Repository"

2. **Configurar el Repositorio**
   - Repository URL: `https://github.com/simatecve/control-f-col`
   - Branch: `main`
   - Build Pack: **Dockerfile**

3. **Configuración de Build**
   - Dockerfile Path: `./Dockerfile`
   - Port: `80`
   - No necesitas variables de entorno adicionales

4. **Deploy**
   - Click en "Deploy"
   - Coolify construirá la imagen Docker y la desplegará automáticamente

---

### Opción 2: Usando Nixpacks

Si prefieres usar Nixpacks en lugar de Docker:

1. **Crear Nueva Aplicación**
   - Repository URL: `https://github.com/simatecve/control-f-col`
   - Branch: `main`
   - Build Pack: **Nixpacks**

2. **Configuración**
   - Build Command: `npm run build`
   - Start Command: `npx serve -s dist -p $PORT`
   - Port: Coolify lo asignará automáticamente

3. **Variables de Entorno** (Opcional)
   ```
   PORT=3000
   NODE_ENV=production
   ```

---

## 🔍 Verificación del Despliegue

Una vez desplegado, verifica:

1. ✅ La aplicación carga sin pantalla en blanco
2. ✅ Los estilos CSS se aplican correctamente
3. ✅ No hay errores de MIME type en la consola
4. ✅ El favicon se carga correctamente
5. ✅ Las rutas SPA funcionan (refresh en cualquier página)

---

## 🐛 Solución de Problemas

### Problema: Pantalla en Blanco

**Solución:** Asegúrate de que Coolify esté usando el **Dockerfile** y no intentando servir archivos directamente.

### Problema: Error de MIME Type

**Solución:** Esto ocurre cuando se sirven archivos `.tsx` sin compilar. El Dockerfile resuelve esto compilando primero con `npm run build` y luego sirviendo desde `dist/`.

### Problema: 404 en Rutas

**Solución:** El archivo `nginx.conf` incluye la configuración `try_files $uri $uri/ /index.html;` que maneja las rutas SPA correctamente.

---

## 📊 Monitoreo

Coolify proporciona:
- Logs en tiempo real
- Métricas de uso de recursos
- Health checks automáticos (endpoint `/health`)

---

## 🔄 Actualizaciones Automáticas

Para habilitar despliegues automáticos cuando hagas push a GitHub:

1. En Coolify, ve a la configuración de tu aplicación
2. Habilita "Auto Deploy"
3. Configura el webhook en GitHub (Coolify te dará la URL)

Ahora cada vez que hagas `git push` a `main`, Coolify desplegará automáticamente.

---

## 📝 Comandos Útiles

```bash
# Ver logs del build
# (Disponible en la UI de Coolify)

# Forzar rebuild
# Click en "Redeploy" en Coolify

# Rollback a versión anterior
# Usa el historial de deployments en Coolify
```

---

## ✅ Checklist de Despliegue

- [ ] Repositorio conectado a Coolify
- [ ] Build Pack configurado (Dockerfile o Nixpacks)
- [ ] Puerto configurado correctamente
- [ ] Primer deploy exitoso
- [ ] Aplicación accesible desde el dominio
- [ ] Estilos CSS cargando correctamente
- [ ] Sin errores en consola del navegador
- [ ] Auto-deploy configurado (opcional)

---

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs de build en Coolify
2. Verifica que el repositorio esté actualizado
3. Asegúrate de que `npm run build` funcione localmente

---

**Última actualización:** 2026-02-04
