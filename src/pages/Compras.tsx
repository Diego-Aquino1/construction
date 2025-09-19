import { useState } from 'react';
import { 
  Search, 
  Eye, 
  CheckCircle, 
  FileText,
  ShoppingCart,
  Plus,
  Download,
  Building2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { requerimientos, ordenesCompra, obras } from '../data/mockData';

export default function Compras() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('requerimientos');

  const filteredRequerimientos = requerimientos.filter(req => {
    const matchesSearch = req.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.solicitante.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || req.estado === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredOrdenes = ordenesCompra.filter(orden => {
    const matchesSearch = orden.proveedor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'todos' || orden.estado === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getObraName = (obraId: string) => {
    const obra = obras.find(o => o.id === obraId);
    return obra ? obra.nombre : 'Obra no encontrada';
  };

  const handleApprove = (id: string) => {
    // Simular aprobación
    console.log('Aprobando requerimiento:', id);
  };

  const handleConvert = (id: string) => {
    // Simular conversión a orden
    console.log('Convirtiendo requerimiento:', id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Módulo de Compras</h1>
        <p className="text-gray-600">Gestión de requerimientos y órdenes de compra</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="requerimientos">Requerimientos</TabsTrigger>
          <TabsTrigger value="ordenes">Órdenes de Compra</TabsTrigger>
        </TabsList>

        {/* Filtros */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por descripción o solicitante..."
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
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="aprobado">Aprobado</SelectItem>
                  <SelectItem value="convertido">Convertido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tab de Requerimientos */}
        <TabsContent value="requerimientos" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Requerimientos de Compra</CardTitle>
                  <CardDescription>
                    {filteredRequerimientos.length} requerimiento(s) encontrado(s)
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Requerimiento
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Obra</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequerimientos.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">{req.descripcion}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                          {getObraName(req.obraId)}
                        </div>
                      </TableCell>
                      <TableCell>{req.solicitante}</TableCell>
                      <TableCell>S/ {req.monto.toLocaleString()}</TableCell>
                      <TableCell>{new Date(req.fecha).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            req.estado === 'aprobado' ? 'default' : 
                            req.estado === 'convertido' ? 'secondary' : 'outline'
                          }
                        >
                          {req.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedItem(req)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Ver
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Detalle del Requerimiento</DialogTitle>
                                <DialogDescription>
                                  Información completa del requerimiento
                                </DialogDescription>
                              </DialogHeader>
                              {selectedItem && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Descripción</label>
                                      <p className="text-sm">{selectedItem.descripcion}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Monto</label>
                                      <p className="text-sm font-semibold">S/ {selectedItem.monto.toLocaleString()}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Obra</label>
                                      <p className="text-sm">{getObraName(selectedItem.obraId)}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Solicitante</label>
                                      <p className="text-sm">{selectedItem.solicitante}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Fecha</label>
                                      <p className="text-sm">{new Date(selectedItem.fecha).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-gray-600">Estado</label>
                                      <Badge variant={selectedItem.estado === 'aprobado' ? 'default' : 'outline'}>
                                        {selectedItem.estado}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          {req.estado === 'pendiente' && (
                            <Button 
                              size="sm"
                              onClick={() => handleApprove(req.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Aprobar
                            </Button>
                          )}
                          
                          {req.estado === 'aprobado' && (
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => handleConvert(req.id)}
                            >
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Convertir
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Órdenes de Compra */}
        <TabsContent value="ordenes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Órdenes de Compra</CardTitle>
                  <CardDescription>
                    {filteredOrdenes.length} orden(es) encontrada(s)
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Orden
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Monto Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Documento</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrdenes.map((orden) => (
                    <TableRow key={orden.id}>
                      <TableCell className="font-medium">{orden.proveedor}</TableCell>
                      <TableCell>{new Date(orden.fecha).toLocaleDateString()}</TableCell>
                      <TableCell>S/ {orden.montoTotal.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            orden.estado === 'entregada' ? 'default' : 
                            orden.estado === 'aprobada' ? 'secondary' : 'outline'
                          }
                        >
                          {orden.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {orden.documentoAdjunto ? (
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
                              onClick={() => setSelectedItem(orden)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Ver
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Detalle de la Orden de Compra</DialogTitle>
                              <DialogDescription>
                                Información completa de la orden
                              </DialogDescription>
                            </DialogHeader>
                            {selectedItem && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Proveedor</label>
                                    <p className="text-sm">{selectedItem.proveedor}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Monto Total</label>
                                    <p className="text-sm font-semibold">S/ {selectedItem.montoTotal.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Fecha</label>
                                    <p className="text-sm">{new Date(selectedItem.fecha).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Estado</label>
                                    <Badge variant={selectedItem.estado === 'entregada' ? 'default' : 'outline'}>
                                      {selectedItem.estado}
                                    </Badge>
                                  </div>
                                  {selectedItem.requerimientoId && (
                                    <div className="col-span-2">
                                      <label className="text-sm font-medium text-gray-600">Requerimiento Asociado</label>
                                      <p className="text-sm">ID: {selectedItem.requerimientoId}</p>
                                    </div>
                                  )}
                                </div>
                                
                                {selectedItem.documentoAdjunto && (
                                  <div>
                                    <label className="text-sm font-medium text-gray-600">Documento Adjunto</label>
                                    <div className="mt-2">
                                      <Button variant="outline">
                                        <FileText className="h-4 w-4 mr-2" />
                                        {selectedItem.documentoAdjunto}
                                      </Button>
                                    </div>
                                  </div>
                                )}
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
