import { useState } from 'react';
import { 
  Download,
  TrendingUp,
  TrendingDown,
  BarChart3
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  Line
} from 'recharts';
import { 
  obras, 
  ingresos, 
  egresos, 
  datosIngresosEgresos, 
  distribucionEgresos
} from '../data/mockData';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F'];

export default function Reportes() {
  const [selectedObra, setSelectedObra] = useState('todos');
  const [dateRange, setDateRange] = useState('ultimo_mes');
  const [activeTab, setActiveTab] = useState('resumen');

  const getObraName = (obraId: string) => {
    const obra = obras.find(o => o.id === obraId);
    return obra ? obra.nombre : 'Todas las obras';
  };

  const getFilteredData = () => {
    let filteredIngresos = ingresos;
    let filteredEgresos = egresos;

    if (selectedObra !== 'todos') {
      filteredIngresos = ingresos.filter(ing => ing.obraId === selectedObra);
      filteredEgresos = egresos.filter(eg => eg.obraId === selectedObra);
    }

    return { filteredIngresos, filteredEgresos };
  };

  const { filteredIngresos, filteredEgresos } = getFilteredData();

  const totalIngresos = filteredIngresos.reduce((sum, ing) => sum + ing.monto, 0);
  const totalEgresos = filteredEgresos.reduce((sum, eg) => sum + eg.monto, 0);
  const rentabilidad = totalIngresos - totalEgresos;

  const proyeccionFlujoCaja = [
    { mes: 'Ene', ingresos: 500000, egresos: 300000, saldo: 200000 },
    { mes: 'Feb', ingresos: 800000, egresos: 450000, saldo: 550000 },
    { mes: 'Mar', ingresos: 600000, egresos: 400000, saldo: 750000 },
    { mes: 'Abr', ingresos: 750000, egresos: 500000, saldo: 1000000 },
    { mes: 'May', ingresos: 900000, egresos: 600000, saldo: 1300000 },
    { mes: 'Jun', ingresos: 700000, egresos: 550000, saldo: 1450000 }
  ];

  const rentabilidadDetallada = obras.map(obra => ({
    obra: obra.nombre,
    ingresos: obra.ingresos,
    egresos: obra.egresos,
    rentabilidad: obra.ingresos - obra.egresos,
    porcentaje: ((obra.ingresos - obra.egresos) / obra.ingresos * 100).toFixed(1)
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Módulo de Reportes</h1>
        <p className="text-gray-600">Análisis y reportes financieros del sistema</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedObra} onValueChange={setSelectedObra}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar obra" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas las obras</SelectItem>
                  {obras.map((obra) => (
                    <SelectItem key={obra.id} value={obra.id}>
                      {obra.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Rango de fechas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ultimo_mes">Último mes</SelectItem>
                <SelectItem value="ultimos_3_meses">Últimos 3 meses</SelectItem>
                <SelectItem value="ultimo_ano">Último año</SelectItem>
                <SelectItem value="personalizado">Personalizado</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="ingresos">Ingresos</TabsTrigger>
          <TabsTrigger value="egresos">Egresos</TabsTrigger>
          <TabsTrigger value="proyecciones">Proyecciones</TabsTrigger>
        </TabsList>

        {/* Tab de Resumen */}
        <TabsContent value="resumen" className="space-y-4">
          {/* Métricas principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Ingresos</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    S/ {totalIngresos.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500">
                    {getObraName(selectedObra)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Egresos</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    S/ {totalEgresos.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500">
                    {getObraName(selectedObra)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Rentabilidad</CardTitle>
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${rentabilidad >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    S/ {rentabilidad.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-500">
                    Margen: {((rentabilidad / totalIngresos) * 100).toFixed(1)}%
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Gráficos de resumen */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Ingresos vs Egresos</CardTitle>
                  <CardDescription>
                    Comparación mensual de ingresos y egresos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={datosIngresosEgresos}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="mes" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`S/ ${value.toLocaleString()}`, '']} />
                      <Bar dataKey="ingresos" fill="#10b981" name="Ingresos" />
                      <Bar dataKey="egresos" fill="#ef4444" name="Egresos" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Distribución de Egresos</CardTitle>
                  <CardDescription>
                    Porcentaje por categoría de gastos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={distribucionEgresos}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ categoria, valor }) => `${categoria}: ${valor}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="valor"
                      >
                        {distribucionEgresos.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Tab de Ingresos */}
        <TabsContent value="ingresos" className="space-y-4">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Ingresos</CardTitle>
                <CardDescription>
                  Detalle de ingresos por obra y período
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Ingresos por Obra</h4>
                      <div className="space-y-2">
                        {obras.map((obra) => {
                          const obraIngresos = ingresos.filter(ing => ing.obraId === obra.id);
                          const totalObra = obraIngresos.reduce((sum, ing) => sum + ing.monto, 0);
                          return (
                            <div key={obra.id} className="flex justify-between items-center p-2 border rounded">
                              <span className="text-sm">{obra.nombre}</span>
                              <span className="font-medium">S/ {totalObra.toLocaleString()}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Tipo de Documentos</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">Facturas</span>
                          <span className="font-medium">
                            {ingresos.filter(ing => ing.tipo === 'factura').length}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">Boletas</span>
                          <span className="font-medium">
                            {ingresos.filter(ing => ing.tipo === 'boleta').length}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab de Egresos */}
        <TabsContent value="egresos" className="space-y-4">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Análisis de Egresos</CardTitle>
                <CardDescription>
                  Desglose detallado de egresos por categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Egresos por Tipo</h4>
                      <div className="space-y-2">
                        {['factura_proveedor', 'planilla', 'servicio', 'otro'].map((tipo) => {
                          const tipoEgresos = egresos.filter(eg => eg.tipo === tipo);
                          const totalTipo = tipoEgresos.reduce((sum, eg) => sum + eg.monto, 0);
                          return (
                            <div key={tipo} className="flex justify-between items-center p-2 border rounded">
                              <span className="text-sm capitalize">{tipo.replace('_', ' ')}</span>
                              <span className="font-medium">S/ {totalTipo.toLocaleString()}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900">Resumen de Impuestos</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">Total IGV</span>
                          <span className="font-medium">
                            S/ {egresos.reduce((sum, eg) => sum + eg.igv, 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 border rounded">
                          <span className="text-sm">Total Detracción</span>
                          <span className="font-medium">
                            S/ {egresos.reduce((sum, eg) => sum + eg.detraccion, 0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab de Proyecciones */}
        <TabsContent value="proyecciones" className="space-y-4">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Proyección de Flujo de Caja</CardTitle>
                <CardDescription>
                  Proyección de ingresos, egresos y saldo acumulado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={proyeccionFlujoCaja}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`S/ ${value.toLocaleString()}`, '']} />
                    <Area type="monotone" dataKey="ingresos" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                    <Area type="monotone" dataKey="egresos" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
                    <Line type="monotone" dataKey="saldo" stroke="#3b82f6" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Rentabilidad por Obra</CardTitle>
                <CardDescription>
                  Comparación de rentabilidad entre proyectos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={rentabilidadDetallada} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="obra" type="category" width={150} />
                    <Tooltip formatter={(value) => [`S/ ${value.toLocaleString()}`, '']} />
                    <Bar dataKey="rentabilidad" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}