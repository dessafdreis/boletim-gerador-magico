
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'INÍCIO' },
    { path: '/1-bimestre', label: '1º BIMESTRE' },
    { path: '/2-bimestre', label: '2º BIMESTRE' },
    { path: '/3-bimestre', label: '3º BIMESTRE' },
    { path: '/4-bimestre', label: '4º BIMESTRE' },
    { path: '/configuracoes', label: 'CONFIGURAÇÕES' },
    { path: '/boletim', label: 'BOLETIM' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center py-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 mx-1 my-1 text-sm font-semibold rounded transition-colors ${
                  location.pathname === item.path
                    ? 'bg-yellow-500 text-purple-900'
                    : 'bg-purple-700 hover:bg-yellow-400 hover:text-purple-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
