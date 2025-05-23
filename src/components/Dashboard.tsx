
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-red-800 mb-2">
          BOLETIM ESCOLAR 
        </h1>
      </div>

      <Card className="bg-red-800 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link 
            to="/1-bimestre"
            className="bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold py-6 px-8 rounded-lg text-center text-xl transition-colors"
          >
            1º BIMESTRE
          </Link>
          <Link 
            to="/2-bimestre"
            className="bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold py-6 px-8 rounded-lg text-center text-xl transition-colors"
          >
            2º BIMESTRE
          </Link>
          <Link 
            to="/3-bimestre"
            className="bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold py-6 px-8 rounded-lg text-center text-xl transition-colors"
          >
            3º BIMESTRE
          </Link>
          <Link 
            to="/4-bimestre"
            className="bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold py-6 px-8 rounded-lg text-center text-xl transition-colors"
          >
            4º BIMESTRE
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link 
            to="/configuracoes"
            className="bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold py-6 px-8 rounded-lg text-center text-xl transition-colors"
          >
            CONFIGURAÇÕES
          </Link>
          <Link 
            to="/boletim"
            className="bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold py-6 px-8 rounded-lg text-center text-xl transition-colors"
          >
            BOLETIM
          </Link>
        </div>

        <Link 
          to="/instrucoes"
          className="block bg-yellow-500 hover:bg-yellow-400 text-red-900 font-bold py-6 px-8 rounded-lg text-center text-xl transition-colors"
        >
          INSTRUÇÕES GERAIS
        </Link>
      </Card>

      <div className="text-center mt-8 text-gray-600">
        <p>Desenvolvido por: escolaapp.com.br</p>
      </div>
    </div>
  );
};

export default Dashboard;
