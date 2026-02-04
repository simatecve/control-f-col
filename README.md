# 🧾 Control F Colombia - Sistema de Gestión de Retenciones

Control F Colombia es una aplicación web moderna para la gestión integral de retenciones fiscales, vouchers y proveedores. Construida con **React 19**, **TypeScript**, **Vite** y **Tailwind CSS**, permite un control eficiente de las obligaciones tributarias.

## 🚀 Características Principales

- **Dashboard Interactivo**: Vista general con métricas clave (Total Retenido, IVA Gestionado, Proveedores, Vouchers)
- **Gestión de Proveedores**: Registro y administración completa de proveedores con información fiscal
- **Generación de Vouchers**: Creación automática de comprobantes de retención
- **Reportes Detallados**: Análisis de retenciones por período y proveedor
- **Historial Completo**: Seguimiento de todas las transacciones y vouchers generados
- **Papelera con Auditoría**: Sistema de eliminación segura con registro de motivos
- **Almacenamiento Local**: Datos seguros en LocalStorage sin necesidad de servidor

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Estilos**: Tailwind CSS 3
- **Iconografía**: Lucide React
- **Gráficos**: Recharts
- **Deployment**: GitHub Pages / Vercel

## 📦 Instalación y Desarrollo

### Requisitos Previos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/simatecve/control-f-col.git

# Navegar al directorio
cd control-f-col

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Build para Producción

```bash
# Generar build optimizado
npm run build

# Previsualizar build
npm run preview
```

## 🌐 Despliegue

El proyecto está configurado para desplegarse fácilmente en:

- **GitHub Pages**: Configurado con Vite
- **Vercel**: Deploy automático desde el repositorio
- **Netlify**: Compatible con configuración estándar

### Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_APP_NAME=Control F Colombia
```

## 📁 Estructura del Proyecto

```
control-f-col/
├── components/          # Componentes React
│   ├── Dashboard.tsx
│   ├── Suppliers.tsx
│   ├── Vouchers.tsx
│   ├── Reports.tsx
│   └── ...
├── utils/              # Utilidades y helpers
├── types.ts            # Definiciones TypeScript
├── App.tsx             # Componente principal
├── index.tsx           # Punto de entrada
├── index.css           # Estilos globales + Tailwind
└── vite.config.ts      # Configuración de Vite
```

## 🔐 Seguridad y Privacidad

- **Sin Backend**: Todos los datos se almacenan localmente
- **Privacidad Total**: La información nunca sale del navegador del usuario
- **Backup Manual**: Exportación/importación de datos en formato JSON
- **Código Abierto**: Auditable y transparente

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: Amazing Feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es privado y está bajo licencia propietaria de Simatec VE.

---

Desarrollado con ❤️ para la gestión tributaria eficiente en Colombia
