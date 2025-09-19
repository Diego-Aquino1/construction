import { useState } from 'react';
import { 
  Search, 
  Eye, 
  Calendar, 
  MapPin, 
  DollarSign,
  Building2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { obras, ingresos, egresos } from '../data/mockData';

export default function Obras() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [selectedObra, setSelectedObra] = useState<any>(null);

  const filteredObras = obras.filter(obra => {
    const matchesSearch = obra.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         obra.ubicacion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || obra.estado === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getObraDetails = (obraId: string) => {
    const obraIngresos = ingresos.filter(ing => ing.obraId === obraId);
    const obraEgresos = egresos.filter(eg => eg.obraId === obraId);
    
    const totalIngresos = obraIngresos.reduce((sum, ing) => sum + ing.monto, 0);
    const totalEgresos = obraEgresos.reduce((sum, eg) => sum + eg.monto, 0);
    
    return {
      ingresos: obraIngresos,
      egresos: obraEgresos,
      totalIngresos,
      totalEgresos,
      rentabilidad: totalIngresos - totalEgresos
    };
  };

  const handleViewDetails = (obra: any) => {
    setSelectedObra(obra);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Obras y Proyectos</h1>
        <p className="text-gray-600">Gestión de proyectos de construcción</p>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre o ubicación..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="cerrado">Cerrado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de obras */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Obras</CardTitle>
          <CardDescription>
            {filteredObras.length} obra(s) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Ubicación</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Fecha Fin</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Presupuesto</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredObras.map((obra) => (
                <TableRow key={obra.id}>
                  <TableCell className="font-medium">{obra.nombre}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      {obra.ubicacion}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {new Date(obra.fechaInicio).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {new Date(obra.fechaFin).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={obra.estado === 'activo' ? 'default' : 'secondary'}>
                      {obra.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                      S/ {obra.presupuesto.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(obra)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Ver Detalle
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center">
                            <Building2 className="h-5 w-5 mr-2" />
                            {selectedObra?.nombre}
                          </DialogTitle>
                          <DialogDescription>
                            Detalles completos del proyecto
                          </DialogDescription>
                        </DialogHeader>
                        
                        {selectedObra && (
                          <div className="space-y-6">
                            {/* Información general */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Información General</h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Ubicación:</span>
                                    <span>{selectedObra.ubicacion}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Fecha Inicio:</span>
                                    <span>{new Date(selectedObra.fechaInicio).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Fecha Fin:</span>
                                    <span>{new Date(selectedObra.fechaFin).toLocaleDateString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Estado:</span>
                                    <Badge variant={selectedObra.estado === 'activo' ? 'default' : 'secondary'}>
                                      {selectedObra.estado}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Finanzas</h3>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Presupuesto:</span>
                                    <span>S/ {selectedObra.presupuesto.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Ingresos:</span>
                                    <span className="text-green-600">S/ {selectedObra.ingresos.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Egresos:</span>
                                    <span className="text-red-600">S/ {selectedObra.egresos.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between font-semibold">
                                    <span className="text-gray-600">Rentabilidad:</span>
                                    <span className={selectedObra.ingresos - selectedObra.egresos >= 0 ? 'text-green-600' : 'text-red-600'}>
                                      S/ {(selectedObra.ingresos - selectedObra.egresos).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Gráfico de rentabilidad */}
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-4">Rentabilidad del Proyecto</h3>
                              <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={[
                                    { categoria: 'Ingresos', monto: selectedObra.ingresos },
                                    { categoria: 'Egresos', monto: selectedObra.egresos },
                                    { categoria: 'Rentabilidad', monto: selectedObra.ingresos - selectedObra.egresos }
                                  ]}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="categoria" />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [`S/ ${value.toLocaleString()}`, '']} />
                                    <Bar dataKey="monto" fill="#3b82f6" />
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            </div>

                            {/* Ingresos asociados */}
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-4">Ingresos Asociados</h3>
                              <div className="space-y-2">
                                {getObraDetails(selectedObra.id).ingresos.map((ingreso) => (
                                  <div key={ingreso.id} className="flex justify-between items-center p-3 border rounded-lg">
                                    <div>
                                      <p className="font-medium">{ingreso.cliente}</p>
                                      <p className="text-sm text-gray-600">
                                        {ingreso.tipo} {ingreso.numero} - {new Date(ingreso.fecha).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-semibold text-green-600">
                                        S/ {ingreso.monto.toLocaleString()}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        IGV {ingreso.igvIncluido ? 'incluido' : 'no incluido'}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Egresos asociados */}
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-4">Egresos Asociados</h3>
                              <div className="space-y-2">
                                {getObraDetails(selectedObra.id).egresos.map((egreso) => (
                                  <div key={egreso.id} className="flex justify-between items-center p-3 border rounded-lg">
                                    <div>
                                      <p className="font-medium">{egreso.descripcion}</p>
                                      <p className="text-sm text-gray-600">
                                        {egreso.tipo.replace('_', ' ')} - {new Date(egreso.fecha).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-semibold text-red-600">
                                        S/ {egreso.monto.toLocaleString()}
                                      </p>
                                      <p className="text-sm text-gray-600">
                                        IGV: S/ {egreso.igv.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
