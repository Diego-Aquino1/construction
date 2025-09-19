import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, User, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { usuarios } from '../data/mockData';

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      const user = usuarios.find(u => u.id === selectedUser);
      if (user) {
        onLogin(user);
      }
    }
  };

  const handleDemoLogin = (userId: string) => {
    const user = usuarios.find(u => u.id === userId);
    if (user) {
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Sistema Constructora</CardTitle>
            <CardDescription>
              Accede al sistema de gestión de obras y finanzas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Usuario Demo
                </label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un usuario demo" />
                  </SelectTrigger>
                  <SelectContent>
                    {usuarios.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.nombre} ({user.rol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    disabled
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={!selectedUser}>
                Iniciar Sesión
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Acceso Rápido</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2">
                {usuarios.map((user) => (
                  <Button
                    key={user.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin(user.id)}
                    className="justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    {user.nombre} - {user.rol}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Esta es una demostración. Los datos son ficticios.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
