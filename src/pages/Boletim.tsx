
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import GradeChart from '@/components/GradeChart';
import { studentGrades, defaultStudent, Student } from '@/data/studentData';
import StudentInfoEditor from '@/components/StudentInfoEditor';

const Boletim = () => {
  const [studentInfo, setStudentInfo] = useState<Student>({
    id: defaultStudent.id,
    name: defaultStudent.name,
    series: defaultStudent.series,
    turma: defaultStudent.turma
  });

  useEffect(() => {
    // Check if there's saved student info in localStorage
    const savedInfo = localStorage.getItem('studentInfo');
    if (savedInfo) {
      const parsedInfo = JSON.parse(savedInfo);
      setStudentInfo({
        ...studentInfo,
        name: parsedInfo.name,
        series: parsedInfo.series,
        turma: parsedInfo.turma
      });
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Cabeçalho */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-gray-100 p-6 text-center">
          <h3 className="font-bold text-gray-600">LOGO DA ESCOLA AQUI</h3>
        </Card>
        <Card className="bg-gray-100 p-6 text-center">
          <h3 className="font-bold text-gray-600">DADOS DA ESCOLA AQUI</h3>
        </Card>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6">
        Boletim Escolar: {studentInfo.name}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <strong>Nome do Aluno:</strong> {studentInfo.name}
        </div>
        <div>
          <strong>Nº:</strong> {studentInfo.id}
        </div>
        <div>
          <strong>Série:</strong> {studentInfo.series}
        </div>
        <div>
          <strong>Turma:</strong> {studentInfo.turma}
        </div>
      </div>

      {/* Student Info Editor */}
      <div className="mb-8">
        <StudentInfoEditor />
      </div>

      {/* Tabela Principal */}
      <Card className="overflow-hidden mb-8">
        <div className="bg-purple-800 text-white p-4">
          <h2 className="text-xl font-bold text-center">DISCIPLINA</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-purple-700 text-white">
              <tr>
                <th rowSpan={2} className="p-2 border-r border-white">DISCIPLINA</th>
                <th colSpan={2} className="p-2 border-r border-white">1º Bimestre</th>
                <th colSpan={2} className="p-2 border-r border-white">2º Bimestre</th>
                <th colSpan={2} className="p-2 border-r border-white">3º Bimestre</th>
                <th colSpan={2} className="p-2 border-r border-white">4º Bimestre</th>
                <th colSpan={2} className="p-2 border-r border-white">Avaliação / Situação</th>
              </tr>
              <tr>
                <th className="p-1 border-r border-white">N</th>
                <th className="p-1 border-r border-white">F</th>
                <th className="p-1 border-r border-white">N</th>
                <th className="p-1 border-r border-white">F</th>
                <th className="p-1 border-r border-white">N</th>
                <th className="p-1 border-r border-white">F</th>
                <th className="p-1 border-r border-white">N</th>
                <th className="p-1 border-r border-white">F</th>
                <th className="p-1 border-r border-white">Média</th>
                <th className="p-1 border-r border-white">% Freq Total</th>
                <th className="p-1">Situação</th>
              </tr>
            </thead>
            <tbody>
              {studentGrades.map((grade, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="p-2 font-medium border-r">{grade.disciplina}</td>
                  <td className="p-1 text-center border-r">{grade.bimestre1.nota.toFixed(1)}</td>
                  <td className="p-1 text-center border-r">{grade.bimestre1.faltas}</td>
                  <td className="p-1 text-center border-r">{grade.bimestre2.nota.toFixed(1)}</td>
                  <td className="p-1 text-center border-r">{grade.bimestre2.faltas}</td>
                  <td className="p-1 text-center border-r">{grade.bimestre3.nota.toFixed(1)}</td>
                  <td className="p-1 text-center border-r">{grade.bimestre3.faltas}</td>
                  <td className="p-1 text-center border-r">{grade.bimestre4.nota.toFixed(1)}</td>
                  <td className="p-1 text-center border-r">{grade.bimestre4.faltas}</td>
                  <td className="p-1 text-center border-r font-semibold">{grade.media.toFixed(2)}</td>
                  <td className="p-1 text-center border-r">{grade.frequenciaTotal}%</td>
                  <td className="p-1 text-center">
                    <span className={`px-1 rounded text-xs ${
                      grade.situacao === 'Aprovado' ? 'bg-green-100 text-green-800' :
                      grade.situacao === 'Reprovado' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {grade.situacao}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Gráfico */}
      <Card className="p-6">
        <GradeChart studentName={studentInfo.name} />
      </Card>

      {/* Observações */}
      <Card className="mt-8 bg-purple-800 text-white p-4">
        <h3 className="font-bold mb-4">OBSERVAÇÕES:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div>
            <p className="mb-2">Diretor(a)</p>
            <div className="border-t border-white mt-8"></div>
          </div>
          <div>
            <p className="mb-2">Professor(a) responsável:</p>
            <div className="border-t border-white mt-8"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Boletim;
