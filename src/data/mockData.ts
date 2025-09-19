// Mock data para el sistema de constructora

export interface Obra {
  id: string;
  nombre: string;
  ubicacion: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activo' | 'cerrado';
  presupuesto: number;
  ingresos: number;
  egresos: number;
}

export interface Ingreso {
  id: string;
  cliente: string;
  obraId: string;
  monto: number;
  igvIncluido: boolean;
  fecha: string;
  tipo: 'factura' | 'boleta';
  numero: string;
}

export interface Egreso {
  id: string;
  tipo: 'factura_proveedor' | 'planilla' | 'servicio' | 'otro';
  monto: number;
  igv: number;
  detraccion: number;
  cuentaOrigen: string;
  cuentaDestino: string;
  fecha: string;
  descripcion: string;
  documentoAdjunto?: string;
  obraId?: string;
}

export interface RequerimientoCompra {
  id: string;
  obraId: string;
  descripcion: string;
  monto: number;
  estado: 'pendiente' | 'aprobado' | 'convertido';
  fecha: string;
  solicitante: string;
}

export interface OrdenCompra {
  id: string;
  proveedor: string;
  fecha: string;
  montoTotal: number;
  estado: 'pendiente' | 'aprobada' | 'entregada';
  requerimientoId?: string;
  documentoAdjunto?: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  rol: 'administrador' | 'contador' | 'supervisor';
  avatar?: string;
}

// Datos de prueba
export const obras: Obra[] = [
  {
    id: '1',
    nombre: 'Edificio Residencial Los Pinos',
    ubicacion: 'San Isidro, Lima',
    fechaInicio: '2024-01-15',
    fechaFin: '2024-12-15',
    estado: 'activo',
    presupuesto: 2500000,
    ingresos: 1800000,
    egresos: 1200000
  },
  {
    id: '2',
    nombre: 'Centro Comercial Plaza Norte',
    ubicacion: 'Independencia, Lima',
    fechaInicio: '2023-06-01',
    fechaFin: '2024-08-30',
    estado: 'activo',
    presupuesto: 5000000,
    ingresos: 3200000,
    egresos: 2800000
  },
  {
    id: '3',
    nombre: 'Oficinas Corporativas Sur',
    ubicacion: 'Miraflores, Lima',
    fechaInicio: '2023-03-10',
    fechaFin: '2024-03-10',
    estado: 'cerrado',
    presupuesto: 1800000,
    ingresos: 1800000,
    egresos: 1650000
  }
];

export const ingresos: Ingreso[] = [
  {
    id: '1',
    cliente: 'Constructora ABC S.A.C.',
    obraId: '1',
    monto: 500000,
    igvIncluido: true,
    fecha: '2024-01-20',
    tipo: 'factura',
    numero: 'F001-000001'
  },
  {
    id: '2',
    cliente: 'Inversiones XYZ S.A.C.',
    obraId: '2',
    monto: 800000,
    igvIncluido: true,
    fecha: '2024-02-15',
    tipo: 'factura',
    numero: 'F001-000002'
  },
  {
    id: '3',
    cliente: 'Desarrollos Urbanos S.A.C.',
    obraId: '1',
    monto: 300000,
    igvIncluido: false,
    fecha: '2024-03-10',
    tipo: 'boleta',
    numero: 'B001-000001'
  }
];

export const egresos: Egreso[] = [
  {
    id: '1',
    tipo: 'factura_proveedor',
    monto: 150000,
    igv: 27000,
    detraccion: 15000,
    cuentaOrigen: 'Banco Principal',
    cuentaDestino: 'Proveedor Cementos',
    fecha: '2024-01-25',
    descripcion: 'Compra de cemento para obra Los Pinos',
    documentoAdjunto: 'factura_cemento.pdf',
    obraId: '1'
  },
  {
    id: '2',
    tipo: 'planilla',
    monto: 80000,
    igv: 0,
    detraccion: 0,
    cuentaOrigen: 'Banco Principal',
    cuentaDestino: 'Planilla Enero',
    fecha: '2024-02-01',
    descripcion: 'Planilla de personal enero 2024',
    obraId: '1'
  },
  {
    id: '3',
    tipo: 'servicio',
    monto: 25000,
    igv: 4500,
    detraccion: 2500,
    cuentaOrigen: 'Banco Principal',
    cuentaDestino: 'Servicios Eléctricos',
    fecha: '2024-02-10',
    descripcion: 'Instalación eléctrica temporal',
    obraId: '2'
  }
];

export const requerimientos: RequerimientoCompra[] = [
  {
    id: '1',
    obraId: '1',
    descripcion: 'Cemento Portland Tipo I - 1000 bolsas',
    monto: 150000,
    estado: 'aprobado',
    fecha: '2024-01-20',
    solicitante: 'Juan Pérez'
  },
  {
    id: '2',
    obraId: '2',
    descripcion: 'Acero de refuerzo - 50 toneladas',
    monto: 200000,
    estado: 'pendiente',
    fecha: '2024-02-15',
    solicitante: 'María González'
  },
  {
    id: '3',
    obraId: '1',
    descripcion: 'Pintura exterior - 200 galones',
    monto: 45000,
    estado: 'convertido',
    fecha: '2024-03-01',
    solicitante: 'Carlos López'
  }
];

export const ordenesCompra: OrdenCompra[] = [
  {
    id: '1',
    proveedor: 'Cementos Lima S.A.',
    fecha: '2024-01-25',
    montoTotal: 150000,
    estado: 'entregada',
    requerimientoId: '1',
    documentoAdjunto: 'oc_cementos.pdf'
  },
  {
    id: '2',
    proveedor: 'Aceros del Perú S.A.C.',
    fecha: '2024-02-20',
    montoTotal: 200000,
    estado: 'aprobada',
    requerimientoId: '2'
  },
  {
    id: '3',
    proveedor: 'Pinturas Nacionales S.A.',
    fecha: '2024-03-05',
    montoTotal: 45000,
    estado: 'pendiente',
    requerimientoId: '3'
  }
];

export const usuarios: Usuario[] = [
  {
    id: '1',
    nombre: 'Ana García',
    email: 'ana.garcia@constructora.com',
    rol: 'administrador'
  },
  {
    id: '2',
    nombre: 'Luis Martínez',
    email: 'luis.martinez@constructora.com',
    rol: 'contador'
  },
  {
    id: '3',
    nombre: 'Pedro Rodríguez',
    email: 'pedro.rodriguez@constructora.com',
    rol: 'supervisor'
  }
];

// Datos para gráficos
export const datosIngresosEgresos = [
  { mes: 'Ene', ingresos: 500000, egresos: 300000 },
  { mes: 'Feb', ingresos: 800000, egresos: 450000 },
  { mes: 'Mar', ingresos: 600000, egresos: 400000 },
  { mes: 'Abr', ingresos: 750000, egresos: 500000 },
  { mes: 'May', ingresos: 900000, egresos: 600000 },
  { mes: 'Jun', ingresos: 700000, egresos: 550000 }
];

export const distribucionEgresos = [
  { categoria: 'Compras', valor: 45, color: '#8884d8' },
  { categoria: 'Planillas', valor: 30, color: '#82ca9d' },
  { categoria: 'Servicios', valor: 15, color: '#ffc658' },
  { categoria: 'Otros', valor: 10, color: '#ff7300' }
];

export const rentabilidadPorObra = [
  { obra: 'Los Pinos', rentabilidad: 600000 },
  { obra: 'Plaza Norte', rentabilidad: 400000 },
  { obra: 'Oficinas Sur', rentabilidad: 150000 }
];
