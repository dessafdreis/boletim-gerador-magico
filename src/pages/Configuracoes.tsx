
import React from 'react';
import { Card } from '@/components/ui/card';
import { subjects, schoolSettings } from '@/data/studentData';

const Configuracoes = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-purple-800 text-center mb-8">
        Configurações
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Instruções */}
        <Card className="bg-purple-800 text-white p-6">
          <h2 className="text-xl font-bold mb-4">INSTRUÇÕES:</h2>
          <ol className="space-y-2 text-sm">
            <li>1. Insira abaixo as disciplinas que serão avaliadas.</li>
            <li>2. Insira a quantidade de aulas de cada disciplina no bimestre. (Essa informação é necessária para o cálculo de presença no boletim do aluno)</li>
            <li>3. O campo QTD DE AULAS POR ANO é calculado automaticamente.</li>
          </ol>
        </Card>

        {/* Configurações de Aprovação */}
        <div className="space-y-4">
          <Card className="bg-yellow-500 text-purple-900 p-4">
            <p className="text-sm text-center">
              Insira abaixo o valor mínimo de média para aprovação e o percentual mínimo de frequência.
            </p>
          </Card>

          <Card className="bg-yellow-500 text-purple-900 p-4">
            <h3 className="font-bold text-center">% MÍNIMO DE FREQUÊNCIA</h3>
            <p className="text-3xl font-bold text-center">{schoolSettings.frequenciaMinima}%</p>
          </Card>

          <Card className="bg-purple-800 text-white p-4">
            <p className="text-sm text-center">
              Insira abaixo a série e a turma. Essa informação será exibida no boletim, ao lado do nome do aluno.
            </p>
          </Card>

          <Card className="bg-yellow-500 text-purple-900 p-4">
            <h3 className="font-bold text-center">SÉRIE</h3>
            <p className="text-3xl font-bold text-center">{schoolSettings.serie}</p>
          </Card>

          <Card className="bg-yellow-500 text-purple-900 p-4">
            <h3 className="font-bold text-center">TURMA</h3>
            <p className="text-3xl font-bold text-center">{schoolSettings.turma}</p>
          </Card>
        </div>
      </div>

      {/* Tabela de Disciplinas */}
      <Card className="mt-8 overflow-hidden">
        <div className="bg-purple-800 text-white p-4">
          <h2 className="text-xl font-bold text-center">DISCIPLINAS</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="p-3 text-left">INSIRA AQUI O NOME DAS DISCIPLINAS</th>
                <th className="p-3 text-center">QTD DE AULAS POR BIMESTRE</th>
                <th className="p-3 text-center">QTD DE AULAS POR ANO</th>
                <th className="p-3 text-center">MÉDIA MÍNIMA PARA APROVAÇÃO</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-3 font-medium">{subject.name}</td>
                  <td className="p-3 text-center">{subject.aulasPorBimestre}</td>
                  <td className="p-3 text-center">{subject.aulasPorAno}</td>
                  <td className="p-3 text-center">{schoolSettings.mediaMinima.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Configuracoes;
