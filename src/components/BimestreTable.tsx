
import React from 'react';
import { Card } from '@/components/ui/card';
import { studentGrades, defaultStudent, subjects } from '@/data/studentData';

interface BimestreTableProps {
  bimestre: 1 | 2 | 3 | 4;
}

const BimestreTable = ({ bimestre }: BimestreTableProps) => {
  const bimestreKey = `bimestre${bimestre}` as keyof typeof studentGrades[0];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-purple-800 text-center mb-4">
          {bimestre}º Bimestre
        </h1>
        <Card className="bg-purple-100 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-purple-800">Nome do Aluno:</h3>
              <p>{defaultStudent.name}</p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-800">Série/Turma:</h3>
              <p>{defaultStudent.series} / {defaultStudent.turma}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="bg-purple-800 text-white p-4">
          <h2 className="text-xl font-bold text-center">DISCIPLINAS</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th className="p-3 text-left">Nº</th>
                <th className="p-3 text-left">NOME DO ALUNO</th>
                <th className="p-3 text-center">Nota</th>
                <th className="p-3 text-center">Faltas</th>
                <th className="p-3 text-center">Nota</th>
                <th className="p-3 text-center">Faltas</th>
                <th className="p-3 text-center">Nota</th>
                <th className="p-3 text-center">Faltas</th>
                <th className="p-3 text-center">Nota</th>
                <th className="p-3 text-center">Faltas</th>
                <th className="p-3 text-center">MÉDIA</th>
                <th className="p-3 text-center">% Freq Total</th>
                <th className="p-3 text-center">Situação</th>
              </tr>
            </thead>
            <tbody>
              {studentGrades.map((grade, index) => {
                const currentGrade = grade[bimestreKey];
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3 font-medium">{grade.disciplina}</td>
                    <td className="p-3 text-center">{grade.bimestre1.nota.toFixed(1)}</td>
                    <td className="p-3 text-center">{grade.bimestre1.faltas}</td>
                    <td className="p-3 text-center">{bimestre >= 2 ? grade.bimestre2.nota.toFixed(1) : '-'}</td>
                    <td className="p-3 text-center">{bimestre >= 2 ? grade.bimestre2.faltas : '-'}</td>
                    <td className="p-3 text-center">{bimestre >= 3 ? grade.bimestre3.nota.toFixed(1) : '-'}</td>
                    <td className="p-3 text-center">{bimestre >= 3 ? grade.bimestre3.faltas : '-'}</td>
                    <td className="p-3 text-center">{bimestre >= 4 ? grade.bimestre4.nota.toFixed(1) : '-'}</td>
                    <td className="p-3 text-center">{bimestre >= 4 ? grade.bimestre4.faltas : '-'}</td>
                    <td className="p-3 text-center font-semibold">{bimestre >= 4 ? grade.media.toFixed(2) : '-'}</td>
                    <td className="p-3 text-center">{bimestre >= 4 ? `${grade.frequenciaTotal}%` : '-'}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-1 rounded text-sm ${
                        grade.situacao === 'Aprovado' ? 'bg-green-100 text-green-800' :
                        grade.situacao === 'Reprovado' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {bimestre >= 4 ? grade.situacao : '-'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default BimestreTable;
