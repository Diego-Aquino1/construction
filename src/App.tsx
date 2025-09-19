import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Obras from './pages/Obras';
import Compras from './pages/Compras';
import Egresos from './pages/Egresos';
import Ingresos from './pages/Ingresos';
import Reportes from './pages/Reportes';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout user={user} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/obras" element={<Obras />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/egresos" element={<Egresos />} />
          <Route path="/ingresos" element={<Ingresos />} />
          <Route path="/reportes" element={<Reportes />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
