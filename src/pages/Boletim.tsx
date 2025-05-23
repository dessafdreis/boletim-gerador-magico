
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import GradeChart from '@/components/GradeChart';
import { defaultStudent, Student } from '@/data/studentData';
import StudentInfoEditor from '@/components/StudentInfoEditor';

interface RelatorioItem {
  disciplina: string;
  bimestre1: { nota: number; frequencia: number };
  bimestre2: { nota: number; frequencia: number };
  bimestre3: { nota: number; frequencia: number };
  bimestre4: { nota: number; frequencia: number };
  media: number;
  frequenciaTotal: number;
  situacao: string;
}

const Boletim = () => {
  const [studentInfo, setStudentInfo] = useState<Student>({
    id: defaultStudent.id,
    name: defaultStudent.name,
    series: defaultStudent.series,
    turma: defaultStudent.turma
  });

  const [relatorioFinal, setRelatorioFinal] = useState<RelatorioItem[]>([]);

  useEffect(() => {
    // Carregar informações do aluno
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

    // Carregar relatório final gerado
    const relatorioSalvo = localStorage.getItem('relatorioFinal');
    if (relatorioSalvo) {
      setRelatorioFinal(JSON.parse(relatorioSalvo));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Cabeçalho */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card className="bg-gray-100 p-6 flex justify-center items-center">
          <img 
            src="/lovable-uploads/6098ce0c-5f29-41f5-a820-b0bb56d879fc.png" 
            alt="Instituto Educacional Palmares - 40 Anos" 
            className="h-24"
          />
        </Card>
        <Card className="bg-gray-100 p-6 text-center">
          <h3 className="font-bold text-red-800">INSTITUTO EDUCACIONAL PALMARES</h3>
          <p className="text-sm">Unidade Marujo - Rua Magalhães de Azevedo n° 215 Cosmos - RJ - CEP: 23059-460</p>
          <p className="text-sm">Tel: 2409-6651</p>
          <p className="text-sm">contato@institutopalmares.edu.br</p>
        </Card>
      </div>

      <h1 className="text-2xl font-bold text-center mb-6 text-red-800">
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

      {relatorioFinal.length > 0 ? (
        <>
          {/* Tabela Principal */}
          <Card className="overflow-hidden mb-8">
            <div className="bg-red-800 text-white p-4">
              <h2 className="text-xl font-bold text-center">DISCIPLINA</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-red-700 text-white">
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
                  {relatorioFinal.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="p-2 font-medium border-r">{item.disciplina}</td>
                      <td className="p-1 text-center border-r">{item.bimestre1.nota.toFixed(1)}</td>
                      <td className="p-1 text-center border-r">{(100 - item.bimestre1.frequencia).toFixed(0)}</td>
                      <td className="p-1 text-center border-r">{item.bimestre2.nota.toFixed(1)}</td>
                      <td className="p-1 text-center border-r">{(100 - item.bimestre2.frequencia).toFixed(0)}</td>
                      <td className="p-1 text-center border-r">{item.bimestre3.nota.toFixed(1)}</td>
                      <td className="p-1 text-center border-r">{(100 - item.bimestre3.frequencia).toFixed(0)}</td>
                      <td className="p-1 text-center border-r">{item.bimestre4.nota.toFixed(1)}</td>
                      <td className="p-1 text-center border-r">{(100 - item.bimestre4.frequencia).toFixed(0)}</td>
                      <td className="p-1 text-center border-r font-semibold">{item.media.toFixed(2)}</td>
                      <td className="p-1 text-center border-r">{item.frequenciaTotal.toFixed(1)}%</td>
                      <td className="p-1 text-center">
                        <span className={`px-1 rounded text-xs ${
                          item.situacao === 'Aprovado' ? 'bg-green-100 text-green-800' :
                          item.situacao === 'Reprovado' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {item.situacao}
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
        </>
      ) : (
        <Card className="p-8 text-center">
          <h3 className="text-xl font-bold text-red-800 mb-4">Nenhum relatório encontrado</h3>
          <p className="text-gray-600 mb-4">
            Para visualizar o boletim, você precisa primeiro:
          </p>
          <ol className="text-left max-w-md mx-auto space-y-2 text-gray-700">
            <li>1. Cadastrar as disciplinas</li>
            <li>2. Lançar as notas de cada bimestre</li>
            <li>3. Gerar o relatório final</li>
          </ol>
          <p className="mt-4 text-sm text-gray-500">
            Acesse "Gerenciar Notas" no menu principal para começar.
          </p>
        </Card>
      )}

      {/* Observações */}
      <Card className="mt-8 bg-red-800 text-white p-4">
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
