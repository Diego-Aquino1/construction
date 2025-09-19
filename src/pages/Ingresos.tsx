import { useState } from 'react';
import { 
  Search, 
  Eye, 
  FileText,
  Download,
  Calendar,
  DollarSign,
  Building2,
  User,
  Receipt,
  FileCheck
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { ingresos, obras } from '../data/mockData';

const tipoIcons = {
  factura: Receipt,
  boleta: FileCheck
};

const tipoLabels = {
  factura: 'Factura',
  boleta: 'Boleta'
};

const tipoColors = {
  factura: 'bg-blue-100 text-blue-800',
  boleta: 'bg-green-100 text-green-800'
};

export default function Ingresos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('todos');
  const [selectedIngreso, setSelectedIngreso] = useState<any>(null);

  const filteredIngresos = ingresos.filter(ingreso => {
    const matchesSearch = ingreso.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ingreso.numero.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = filterTipo === 'todos' || ingreso.tipo === filterTipo;
    return matchesSearch && matchesTipo;
  });

  const getObraName = (obraId: string) => {
    const obra = obras.find(o => o.id === obraId);
    return obra ? obra.nombre : 'Obra no encontrada';
  };

  const getTipoIcon = (tipo: string) => {
    const IconComponent = tipoIcons[tipo as keyof typeof tipoIcons] || FileText;
    return IconComponent;
  };

  const getTipoLabel = (tipo: string) => {
    return tipoLabels[tipo as keyof typeof tipoLabels] || 'Desconocido';
  };

  const getTipoColor = (tipo: string) => {
    return tipoColors[tipo as keyof typeof tipoColors] || 'bg-gray-100 text-gray-800';
  };

  const calculateIGV = (monto: number, igvIncluido: boolean) => {
    if (igvIncluido) {
      return monto * 0.18 / 1.18;
    }
    return 0;
  };

  const calculateSubtotal = (monto: number, igvIncluido: boolean) => {
    if (igvIncluido) {
      return monto / 1.18;
    }
    return monto;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Módulo de Ingresos</h1>
        <p className="text-gray-600">Registro y gestión de ingresos del sistema</p>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por cliente o número de documento..."
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
                <SelectItem value="factura">Factura</SelectItem>
                <SelectItem value="boleta">Boleta</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de ingresos */}
      <Card>
        <CardHeader>
          <CardTitle>Registro de Ingresos</CardTitle>
          <CardDescription>
            {filteredIngresos.length} ingreso(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Obra</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>IGV</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIngresos.map((ingreso) => {
                const IconComponent = getTipoIcon(ingreso.tipo);
                const igv = calculateIGV(ingreso.monto, ingreso.igvIncluido);
                return (
                  <TableRow key={ingreso.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-400 mr-2" />
                        {ingreso.cliente}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                        {getObraName(ingreso.obraId)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <IconComponent className="h-4 w-4 text-gray-400 mr-2" />
                        <Badge className={getTipoColor(ingreso.tipo)}>
                          {getTipoLabel(ingreso.tipo)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{ingreso.numero}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
                        S/ {ingreso.monto.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {ingreso.igvIncluido ? (
                        <span className="text-green-600 font-medium">
                          S/ {igv.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-gray-400">No incluido</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        {new Date(ingreso.fecha).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedIngreso(ingreso)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Factura
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center">
                              <IconComponent className="h-5 w-5 mr-2" />
                              {getTipoLabel(selectedIngreso?.tipo)} - {selectedIngreso?.numero}
                            </DialogTitle>
                            <DialogDescription>
                              Documento de venta generado
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedIngreso && (
                            <div className="space-y-6">
                              {/* Encabezado de la factura */}
                              <div className="border-b pb-4">
                                <div className="grid grid-cols-2 gap-8">
                                  <div>
                                    <h3 className="font-bold text-lg text-gray-900">CONSTRUCTORA ABC S.A.C.</h3>
                                    <p className="text-sm text-gray-600">RUC: 20123456789</p>
                                    <p className="text-sm text-gray-600">Av. Principal 123, Lima</p>
                                    <p className="text-sm text-gray-600">Tel: (01) 234-5678</p>
                                  </div>
                                  <div className="text-right">
                                    <h3 className="font-bold text-lg text-gray-900">
                                      {getTipoLabel(selectedIngreso.tipo).toUpperCase()}
                                    </h3>
                                    <p className="text-sm text-gray-600">N° {selectedIngreso.numero}</p>
                                    <p className="text-sm text-gray-600">
                                      Fecha: {new Date(selectedIngreso.fecha).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Información del cliente */}
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Cliente:</h4>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <p className="font-medium">{selectedIngreso.cliente}</p>
                                  <p className="text-sm text-gray-600">Obra: {getObraName(selectedIngreso.obraId)}</p>
                                </div>
                              </div>

                              {/* Detalles de la factura */}
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">Detalles del Servicio:</h4>
                                <div className="border rounded-lg overflow-hidden">
                                  <table className="w-full">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Descripción</th>
                                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Cantidad</th>
                                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Precio Unit.</th>
                                        <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className="px-4 py-2 text-sm">Servicios de construcción</td>
                                        <td className="px-4 py-2 text-sm text-right">1</td>
                                        <td className="px-4 py-2 text-sm text-right">
                                          S/ {calculateSubtotal(selectedIngreso.monto, selectedIngreso.igvIncluido).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-right">
                                          S/ {calculateSubtotal(selectedIngreso.monto, selectedIngreso.igvIncluido).toLocaleString()}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>

                              {/* Totales */}
                              <div className="flex justify-end">
                                <div className="w-64 space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-sm text-gray-600">Subtotal:</span>
                                    <span className="text-sm font-medium">
                                      S/ {calculateSubtotal(selectedIngreso.monto, selectedIngreso.igvIncluido).toLocaleString()}
                                    </span>
                                  </div>
                                  {selectedIngreso.igvIncluido && (
                                    <div className="flex justify-between">
                                      <span className="text-sm text-gray-600">IGV (18%):</span>
                                      <span className="text-sm font-medium">
                                        S/ {calculateIGV(selectedIngreso.monto, selectedIngreso.igvIncluido).toLocaleString()}
                                      </span>
                                    </div>
                                  )}
                                  <Separator />
                                  <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>S/ {selectedIngreso.monto.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Información adicional */}
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 mb-2">Información Adicional:</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-600">Tipo de Documento:</span>
                                    <p className="font-medium">{getTipoLabel(selectedIngreso.tipo)}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">IGV:</span>
                                    <p className="font-medium">
                                      {selectedIngreso.igvIncluido ? 'Incluido' : 'No incluido'}
                                    </p>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Fecha de Emisión:</span>
                                    <p className="font-medium">{new Date(selectedIngreso.fecha).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <span className="text-gray-600">Estado:</span>
                                    <Badge className="bg-green-100 text-green-800">Pagado</Badge>
                                  </div>
                                </div>
                              </div>

                              {/* Botones de acción */}
                              <div className="flex justify-end space-x-2">
                                <Button variant="outline">
                                  <Download className="h-4 w-4 mr-2" />
                                  Descargar PDF
                                </Button>
                                <Button variant="outline">
                                  <FileText className="h-4 w-4 mr-2" />
                                  Imprimir
                                </Button>
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
