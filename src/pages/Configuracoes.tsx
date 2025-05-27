
import React from 'react';
import { Card } from '@/components/ui/card';
import { subjects, schoolSettings } from '@/data/studentData';

const Configuracoes = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-red-800 text-center mb-8">
        Configurações do Sistema
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Instruções */}
        <Card className="bg-red-800 text-white p-6 border-red-700">
          <h2 className="text-xl font-bold mb-4">INSTRUÇÕES:</h2>
          <ol className="space-y-2 text-sm">
            <li>1. Insira abaixo as disciplinas que serão avaliadas.</li>
            <li>2. Insira a quantidade de aulas de cada disciplina no bimestre.</li>
            <li>3. O campo QTD DE AULAS POR ANO é calculado automaticamente.</li>
            <li>4. Sistema de avaliação: Trabalho, AV1, AV2, Teste.</li>
            <li>5. Média mínima para aprovação: 6.0 (abaixo vai para recuperação).</li>
          </ol>
        </Card>

        {/* Configurações de Aprovação */}
        <div className="space-y-4">
          <Card className="bg-yellow-500 text-red-900 p-4 border-yellow-600">
            <p className="text-sm text-center font-semibold">
              Sistema de Avaliação: Trabalho + AV1 + AV2 + Teste = Média do Bimestre
            </p>
          </Card>

          <Card className="bg-yellow-500 text-red-900 p-4 border-yellow-600">
            <h3 className="font-bold text-center">MÉDIA MÍNIMA PARA APROVAÇÃO</h3>
            <p className="text-3xl font-bold text-center">6,0</p>
            <p className="text-sm text-center mt-2">Abaixo de 6,0 = Recuperação</p>
          </Card>

          <Card className="bg-yellow-500 text-red-900 p-4 border-yellow-600">
            <h3 className="font-bold text-center">% MÍNIMO DE FREQUÊNCIA</h3>
            <p className="text-3xl font-bold text-center">{schoolSettings.frequenciaMinima}%</p>
          </Card>

          <Card className="bg-red-800 text-white p-4 border-red-700">
            <p className="text-sm text-center">
              Informações da turma exibidas no boletim do aluno
            </p>
          </Card>

          <Card className="bg-yellow-500 text-red-900 p-4 border-yellow-600">
            <h3 className="font-bold text-center">SÉRIE</h3>
            <p className="text-3xl font-bold text-center">{schoolSettings.serie}</p>
          </Card>

          <Card className="bg-yellow-500 text-red-900 p-4 border-yellow-600">
            <h3 className="font-bold text-center">TURMA</h3>
            <p className="text-3xl font-bold text-center">{schoolSettings.turma}</p>
          </Card>
        </div>
      </div>

      {/* Tabela de Disciplinas */}
      <Card className="mt-8 overflow-hidden border-red-200">
        <div className="bg-red-800 text-white p-4">
          <h2 className="text-xl font-bold text-center">DISCIPLINAS E CARGAS HORÁRIAS</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-red-700 text-white">
              <tr>
                <th className="p-3 text-left">DISCIPLINA</th>
                <th className="p-3 text-center">AULAS POR BIMESTRE</th>
                <th className="p-3 text-center">AULAS POR ANO</th>
                <th className="p-3 text-center">MÉDIA PARA APROVAÇÃO</th>
                <th className="p-3 text-center">SISTEMA DE AVALIAÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-red-50' : 'bg-white'}>
                  <td className="p-3 font-medium text-red-800">{subject.name}</td>
                  <td className="p-3 text-center">{subject.aulasPorBimestre}</td>
                  <td className="p-3 text-center">{subject.aulasPorAno}</td>
                  <td className="p-3 text-center font-bold text-red-800">6,0</td>
                  <td className="p-3 text-center text-sm text-gray-600">Trabalho + AV1 + AV2 + Teste</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Informações sobre Recuperação */}
      <Card className="mt-6 bg-yellow-100 border-yellow-300 p-6">
        <h3 className="text-xl font-bold text-red-800 mb-4 text-center">Sistema de Recuperação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h4 className="font-semibold text-red-800 mb-2">Quando ocorre:</h4>
            <ul className="space-y-1">
              <li>• Média do bimestre menor que 6,0</li>
              <li>• Aluno deve fazer prova de recuperação</li>
              <li>• Nota da recuperação substitui a média se for maior</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-800 mb-2">Cálculo final:</h4>
            <ul className="space-y-1">
              <li>• Nota final = maior(média_bimestre, nota_recuperação)</li>
              <li>• Aprovado se nota final ≥ 6,0</li>
              <li>• Frequência mínima de 75% obrigatória</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Configuracoes;
