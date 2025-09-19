import { useState } from 'react';
import { 
  Search, 
  Eye, 
  FileText,
  Download,
  Calendar,
  DollarSign,
  Receipt,
  Users,
  Wrench,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { egresos } from '../data/mockData';

const tipoIcons = {
  factura_proveedor: Receipt,
  planilla: Users,
  servicio: Wrench,
  otro: MoreHorizontal
};

const tipoLabels = {
  factura_proveedor: 'Factura Proveedor',
  planilla: 'Planilla',
  servicio: 'Servicio',
  otro: 'Otro'
};

export default function Egresos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('todos');
  const [selectedEgreso, setSelectedEgreso] = useState<any>(null);

  const filteredEgresos = egresos.filter(egreso => {
    const matchesSearch = egreso.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         egreso.cuentaOrigen.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         egreso.cuentaDestino.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === 'todos' || egreso.tipo === filterTipo;
    return matchesSearch && matchesTipo;
  });

  const getTipoIcon = (tipo: string) => {
    const IconComponent = tipoIcons[tipo as keyof typeof tipoIcons] || MoreHorizontal;
    return IconComponent;
  };

  const getTipoLabel = (tipo: string) => {
    return tipoLabels[tipo as keyof typeof tipoLabels] || 'Desconocido';
  };

  const getTipoColor = (tipo: string) => {
    const colors = {
      factura_proveedor: 'bg-blue-100 text-blue-800',
      planilla: 'bg-green-100 text-green-800',
      servicio: 'bg-yellow-100 text-yellow-800',
      otro: 'bg-gray-100 text-gray-800'
    };
    return colors[tipo as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Módulo de Egresos</h1>
        <p className="text-gray-600">Registro y gestión de egresos del sistema</p>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por descripción, cuenta origen o destino..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterTipo} onValueChange={setFilterTipo}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los tipos</SelectItem>
                <SelectItem value="factura_proveedor">Factura Proveedor</SelectItem>
                <SelectItem value="planilla">Planilla</SelectItem>
                <SelectItem value="servicio">Servicio</SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de egresos */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Egresos</CardTitle>
          <CardDescription>
            {filteredEgresos.length} egreso(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>IGV</TableHead>
                <TableHead>Detracción</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Documento</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEgresos.map((egreso) => {
                const IconComponent = getTipoIcon(egreso.tipo);
                return (
                  <TableRow key={egreso.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <IconComponent className="h-4 w-4 text-gray-400 mr-2" />
                        <Badge className={getTipoColor(egreso.tipo)}>
                          {getTipoLabel(egreso.tipo)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{egreso.descripcion}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                        S/ {egreso.monto.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>S/ {egreso.igv.toLocaleString()}</TableCell>
                    <TableCell>S/ {egreso.detraccion.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        {new Date(egreso.fecha).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {egreso.documentoAdjunto ? (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Descargar
                        </Button>
                      ) : (
                        <span className="text-gray-400">Sin documento</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedEgreso(egreso)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalle
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center">
                              <IconComponent className="h-5 w-5 mr-2" />
                              Detalle del Egreso
                            </DialogTitle>
                            <DialogDescription>
                              Información completa del egreso registrado
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedEgreso && (
                            <div className="space-y-6">
                              {/* Información general */}
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Información General</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Tipo de Egreso</label>
                                    <div className="flex items-center mt-1">
                                      <IconComponent className="h-4 w-4 text-gray-400 mr-2" />
                                      <Badge className={getTipoColor(selectedEgreso.tipo)}>
                                        {getTipoLabel(selectedEgreso.tipo)}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Fecha</label>
                                    <p className="text-sm mt-1">{new Date(selectedEgreso.fecha).toLocaleDateString()}</p>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="text-sm font-medium text-gray-600">Descripción</label>
                                    <p className="text-sm mt-1">{selectedEgreso.descripcion}</p>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Información financiera */}
                              <div>
                                <h3 className="font-semibold text-gray-900 mb-3">Información Financiera</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div className="space-y-3">
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">Monto Base:</span>
                                      <span className="text-sm font-semibold">
                                        S/ {(selectedEgreso.monto - selectedEgreso.igv).toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">IGV:</span>
                                      <span className="text-sm font-semibold text-red-600">
                                        S/ {selectedEgreso.igv.toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">Detracción:</span>
                                      <span className="text-sm font-semibold text-orange-600">
                                        S/ {selectedEgreso.detraccion.toLocaleString()}
                                      </span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between font-semibold">
                                      <span className="text-sm">Total:</span>
                                      <span className="text-sm text-gray-900">
                                        S/ {selectedEgreso.monto.toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Cuenta Origen</label>
                                      <p className="text-sm mt-1">{selectedEgreso.cuentaOrigen}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Cuenta Destino</label>
                                      <p className="text-sm mt-1">{selectedEgreso.cuentaDestino}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Documento adjunto */}
                              {selectedEgreso.documentoAdjunto && (
                                <>
                                  <Separator />
                                  <div>
                                    <h3 className="font-semibold text-gray-900 mb-3">Documento Adjunto</h3>
                                    <div className="flex items-center space-x-2">
                                      <FileText className="h-5 w-5 text-gray-400" />
                                      <span className="text-sm text-gray-600">{selectedEgreso.documentoAdjunto}</span>
                                      <Button variant="outline" size="sm">
                                        <Download className="h-4 w-4 mr-2" />
                                        Descargar
                                      </Button>
                                    </div>
                                  </div>
                                </>
                              )}

                              {/* Resumen de impuestos */}
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Resumen de Impuestos</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>IGV (18%):</span>
                                    <span className="font-medium">S/ {selectedEgreso.igv.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Detracción (3%):</span>
                                    <span className="font-medium">S/ {selectedEgreso.detraccion.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Total Impuestos:</span>
                                    <span className="font-semibold">
                                      S/ {(selectedEgreso.igv + selectedEgreso.detraccion).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
