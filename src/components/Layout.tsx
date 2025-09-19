import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Building2, 
  ShoppingCart, 
  TrendingDown, 
  TrendingUp, 
  BarChart3,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Obras', href: '/obras', icon: Building2 },
  { name: 'Compras', href: '/compras', icon: ShoppingCart },
  { name: 'Egresos', href: '/egresos', icon: TrendingDown },
  { name: 'Ingresos', href: '/ingresos', icon: TrendingUp },
  { name: 'Reportes', href: '/reportes', icon: BarChart3 },
];

export default function Layout({ children, user, onLogout }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className="fixed inset-0 z-50 lg:hidden"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex h-full w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4">
            <h1 className="text-xl font-bold text-gray-900">Constructora</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 px-4 py-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 mb-1"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.nombre}</p>
                <p className="text-xs text-gray-500">{user?.rol}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="w-full mt-2 justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex h-16 shrink-0 items-center px-4">
            <h1 className="text-xl font-bold text-gray-900">Constructora</h1>
          </div>
          <nav className="flex flex-1 flex-col px-4">
            <ul className="flex flex-1 flex-col gap-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{user?.nombre}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.rol}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="w-full mt-2 justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Separator orientation="vertical" className="lg:hidden" />
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1" />
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <div className="hidden lg:block">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{user?.nombre}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.rol}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
