# Sistema Constructora - Frontend

Sistema web de demostración para una constructora desarrollado en React con Shadcn UI, siguiendo un diseño minimalista y profesional.

## 🚀 Características

- **Dashboard Principal**: Resumen general con métricas y gráficos
- **Módulo de Obras**: Gestión de proyectos de construcción
- **Módulo de Compras**: Requerimientos y órdenes de compra
- **Módulo de Egresos**: Registro detallado de gastos
- **Módulo de Ingresos**: Facturas y boletas simuladas
- **Módulo de Reportes**: Análisis financiero con filtros
- **Autenticación**: Sistema de roles (Administrador, Contador, Supervisor)

## 🛠️ Tecnologías

- **Frontend**: React 18 + Vite
- **UI**: Shadcn UI + TailwindCSS
- **Gráficos**: Recharts
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Contenedores**: Docker + Docker Compose

## 📦 Instalación

### Opción 1: Con Docker (Recomendado)

```bash
# Clonar el repositorio
git clone <repository-url>
cd constructora-frontend

# Construir y ejecutar con Docker Compose
docker-compose up --build
```

La aplicación estará disponible en: `http://localhost:3000`

### Opción 2: Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

## 🎯 Módulos del Sistema

### 1. Dashboard Principal
- Métricas principales (Ingresos, Egresos, Rentabilidad, Obras Activas)
- Gráficos de ingresos vs egresos por mes
- Distribución de egresos por categoría
- Lista de obras recientes

### 2. Obras y Proyectos
- Tabla con lista de obras
- Filtros por estado y búsqueda
- Vista detallada con información financiera
- Gráficos de rentabilidad por obra

### 3. Compras
- **Requerimientos de Compra**: Lista con estados (pendiente, aprobado, convertido)
- **Órdenes de Compra**: Gestión de órdenes con proveedores
- Flujo de aprobación y conversión
- Documentos adjuntos

### 4. Egresos
- Registro detallado de gastos
- Tipos: Factura proveedor, Planilla, Servicio, Otro
- Desglose de impuestos (IGV, Detracción)
- Documentos adjuntos

### 5. Ingresos
- Facturas y boletas simuladas
- Cálculo automático de IGV
- Vista de documento completo
- Información del cliente y obra

### 6. Reportes
- **Resumen**: Métricas principales y gráficos
- **Ingresos**: Análisis por obra y tipo de documento
- **Egresos**: Desglose por categoría e impuestos
- **Proyecciones**: Flujo de caja y rentabilidad

## 👥 Usuarios Demo

El sistema incluye usuarios de prueba con diferentes roles:

- **Ana García** (Administrador)
- **Luis Martínez** (Contador)
- **Pedro Rodríguez** (Supervisor)

## 🎨 Diseño

- **Estilo**: Minimalista y profesional
- **Colores**: Tonos neutros (grises, blanco, azul discreto)
- **Tipografía**: Clara y legible
- **Componentes**: Modernos con Shadcn UI
- **Animaciones**: Suaves con Framer Motion

## 📊 Datos de Prueba

El sistema incluye datos ficticios para demostración:
- 3 obras de construcción
- Múltiples ingresos y egresos
- Requerimientos y órdenes de compra
- Gráficos y métricas calculadas

## 🐳 Docker

### Comandos Docker

```bash
# Construir imagen
docker build -t constructora-frontend .

# Ejecutar contenedor
docker run -p 3000:3000 constructora-frontend

# Con Docker Compose
docker-compose up --build
docker-compose down
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── ui/              # Componentes de Shadcn UI
│   └── Layout.tsx       # Layout principal
├── pages/               # Páginas del sistema
├── data/                # Datos de prueba
├── lib/                 # Utilidades
└── main.tsx             # Punto de entrada
```

## 🔧 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Construcción para producción
- `npm run preview` - Vista previa de producción
- `npm run lint` - Linter de código

## 📝 Notas

- Este es un sistema de demostración con datos ficticios
- No incluye backend real
- Todos los datos son estáticos para propósitos de demostración
- El sistema está optimizado para mostrar todos los flujos principales

## 🤝 Contribución

Este proyecto es una demostración técnica. Para mejoras o sugerencias, por favor contactar al equipo de desarrollo.

## 📄 Licencia

Este proyecto es para fines de demostración y aprendizaje.