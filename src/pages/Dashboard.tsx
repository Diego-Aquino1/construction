import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
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
  Cell
} from 'recharts';
import { 
  obras, 
  datosIngresosEgresos, 
  distribucionEgresos, 
  rentabilidadPorObra 
} from '../data/mockData';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

export default function Dashboard() {
  const totalIngresos = obras.reduce((sum, obra) => sum + obra.ingresos, 0);
  const totalEgresos = obras.reduce((sum, obra) => sum + obra.egresos, 0);
  const rentabilidad = totalIngresos - totalEgresos;
  const obrasActivas = obras.filter(obra => obra.estado === 'activo').length;

  const metricCards = [
    {
      title: 'Ingresos Totales',
      value: `S/ ${totalIngresos.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: TrendingUp,
      description: 'vs mes anterior'
    },
    {
      title: 'Egresos Totales',
      value: `S/ ${totalEgresos.toLocaleString()}`,
      change: '+8.2%',
      changeType: 'negative' as const,
      icon: TrendingDown,
      description: 'vs mes anterior'
    },
    {
      title: 'Rentabilidad',
      value: `S/ ${rentabilidad.toLocaleString()}`,
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: DollarSign,
      description: 'margen de ganancia'
    },
    {
      title: 'Obras Activas',
      value: obrasActivas.toString(),
      change: '+1',
      changeType: 'positive' as const,
      icon: Building2,
      description: 'proyectos en curso'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen general del sistema de constructora</p>
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </div>
                <div className="flex items-center pt-1">
                  {metric.changeType === 'positive' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    {metric.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Ingresos vs Egresos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Ingresos vs Egresos por Mes</CardTitle>
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
                  <Tooltip 
                    formatter={(value) => [`S/ ${value.toLocaleString()}`, '']}
                    labelFormatter={(label) => `Mes: ${label}`}
                  />
                  <Bar dataKey="ingresos" fill="#10b981" name="Ingresos" />
                  <Bar dataKey="egresos" fill="#ef4444" name="Egresos" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Gráfico de distribución de egresos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
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
        </motion.div>
      </div>

      {/* Rentabilidad por obra */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Rentabilidad por Obra</CardTitle>
            <CardDescription>
              Comparación de rentabilidad entre proyectos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={rentabilidadPorObra} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="obra" type="category" width={100} />
                <Tooltip 
                  formatter={(value) => [`S/ ${value.toLocaleString()}`, 'Rentabilidad']}
                />
                <Bar dataKey="rentabilidad" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      {/* Lista de obras recientes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Obras Recientes</CardTitle>
            <CardDescription>
              Estado actual de los proyectos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {obras.map((obra) => (
                <div key={obra.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{obra.nombre}</h3>
                    <p className="text-sm text-gray-600">{obra.ubicacion}</p>
                    <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                      <span>Inicio: {new Date(obra.fechaInicio).toLocaleDateString()}</span>
                      <span>Fin: {new Date(obra.fechaFin).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        S/ {obra.ingresos.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Ingresos</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        S/ {obra.egresos.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Egresos</p>
                    </div>
                    <Badge variant={obra.estado === 'activo' ? 'default' : 'secondary'}>
                      {obra.estado}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
