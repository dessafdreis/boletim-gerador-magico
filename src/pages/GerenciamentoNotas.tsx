
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DisciplinaEditor from '@/components/DisciplinaEditor';
import NotasEditor from '@/components/NotasEditor';
import { Subject, subjects as initialSubjects } from '@/data/studentData';
import { BimestreDetalhado, calcularSituacao } from '@/data/gradeStructure';
import { toast } from '@/hooks/use-toast';

const GerenciamentoNotas = () => {
  const [disciplinas, setDisciplinas] = useState<Subject[]>(initialSubjects);
  const [dadosNotas, setDadosNotas] = useState<Record<string, Record<number, BimestreDetalhado>>>({});
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState<string>('');

  useEffect(() => {
    // Carregar dados salvos
    const disciplinasSalvas = localStorage.getItem('disciplinas');
    if (disciplinasSalvas) {
      setDisciplinas(JSON.parse(disciplinasSalvas));
    }

    const notasSalvas = localStorage.getItem('dadosNotas');
    if (notasSalvas) {
      setDadosNotas(JSON.parse(notasSalvas));
    }

    if (disciplinas.length > 0) {
      setDisciplinaSelecionada(disciplinas[0].name);
    }
  }, []);

  const atualizarDisciplinas = (novasDisciplinas: Subject[]) => {
    setDisciplinas(novasDisciplinas);
    toast({
      title: "Disciplinas atualizadas",
      description: "As disciplinas foram salvas com sucesso!",
    });
  };

  const atualizarNotasBimestre = (disciplina: string, bimestre: number, novosDados: BimestreDetalhado) => {
    const novosEventos = {
      ...dadosNotas,
      [disciplina]: {
        ...dadosNotas[disciplina],
        [bimestre]: novosDados
      }
    };
    
    setDadosNotas(novosEventos);
    localStorage.setItem('dadosNotas', JSON.stringify(novosEventos));
    
    toast({
      title: "Notas atualizadas",
      description: `Dados do ${bimestre}º bimestre de ${disciplina} salvos!`,
    });
  };

  const gerarRelatorioFinal = () => {
    const relatorio = disciplinas.map(disciplina => {
      const dadosDisciplina = dadosNotas[disciplina.name] || {};
      
      const medias = [1, 2, 3, 4].map(bim => {
        const bimestreData = dadosDisciplina[bim];
        return bimestreData?.notaFinalComRecuperacao || bimestreData?.notaFinal || 0;
      });
      
      const frequencias = [1, 2, 3, 4].map(bim => 
        dadosDisciplina[bim]?.frequencia || 100
      );
      
      const mediaFinal = medias.reduce((acc, nota) => acc + nota, 0) / 4;
      const frequenciaTotal = frequencias.reduce((acc, freq) => acc + freq, 0) / 4;
      const situacao = calcularSituacao(mediaFinal, frequenciaTotal);

      return {
        disciplina: disciplina.name,
        bimestre1: { nota: medias[0], frequencia: frequencias[0] },
        bimestre2: { nota: medias[1], frequencia: frequencias[1] },
        bimestre3: { nota: medias[2], frequencia: frequencias[2] },
        bimestre4: { nota: medias[3], frequencia: frequencias[3] },
        media: mediaFinal,
        frequenciaTotal,
        situacao
      };
    });

    localStorage.setItem('relatorioFinal', JSON.stringify(relatorio));
    
    toast({
      title: "Relatório gerado",
      description: "O relatório final foi gerado e pode ser visualizado no boletim!",
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-red-800 text-center mb-8">
        Gerenciamento de Notas e Disciplinas
      </h1>

      <Tabs defaultValue="disciplinas" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-red-100">
          <TabsTrigger value="disciplinas" className="data-[state=active]:bg-red-800 data-[state=active]:text-white text-red-800">
            Disciplinas
          </TabsTrigger>
          <TabsTrigger value="notas" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-red-900 text-red-800">
            Lançar Notas
          </TabsTrigger>
          <TabsTrigger value="relatorio" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-red-800">
            Relatório Final
          </TabsTrigger>
        </TabsList>

        <TabsContent value="disciplinas">
          <DisciplinaEditor 
            disciplinas={disciplinas} 
            onUpdate={atualizarDisciplinas}
          />
        </TabsContent>

        <TabsContent value="notas">
          <div className="space-y-6">
            <Card className="p-4 border-red-200">
              <div className="flex flex-wrap gap-2 mb-4">
                {disciplinas.map((disciplina) => (
                  <Button
                    key={disciplina.name}
                    variant={disciplinaSelecionada === disciplina.name ? "default" : "outline"}
                    onClick={() => setDisciplinaSelecionada(disciplina.name)}
                    className={disciplinaSelecionada === disciplina.name ? 
                      "bg-red-800 hover:bg-red-900" : 
                      "border-red-300 text-red-800 hover:bg-red-50"
                    }
                  >
                    {disciplina.name}
                  </Button>
                ))}
              </div>
            </Card>

            {disciplinaSelecionada && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((bimestre) => (
                  <NotasEditor
                    key={`${disciplinaSelecionada}-${bimestre}`}
                    disciplina={disciplinaSelecionada}
                    bimestre={bimestre}
                    dadosBimestre={dadosNotas[disciplinaSelecionada]?.[bimestre] || {
                      avaliacoes: [],
                      diasLetivos: 60,
                      faltas: 0,
                      frequencia: 100,
                      notaFinal: 0
                    }}
                    onUpdate={(novosDados) => atualizarNotasBimestre(disciplinaSelecionada, bimestre, novosDados)}
                  />
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="relatorio">
          <Card className="p-6 border-red-200">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-red-800">Gerar Relatório Final</h3>
              <p className="text-gray-600">
                Clique no botão abaixo para calcular as médias finais (incluindo recuperação) e gerar o boletim completo do aluno.
              </p>
              <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300 mb-4">
                <p className="text-yellow-800 font-semibold">Sistema de Avaliação:</p>
                <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                  <li>• Média mínima para aprovação: 6.0</li>
                  <li>• Notas abaixo de 6.0 vão para recuperação</li>
                  <li>• A nota final será a maior entre a nota regular e a recuperação</li>
                </ul>
              </div>
              <Button 
                onClick={gerarRelatorioFinal}
                className="bg-red-800 hover:bg-red-900 text-white px-8 py-3 text-lg"
              >
                Gerar Boletim Final
              </Button>
              <p className="text-sm text-gray-500">
                Após gerar, acesse a seção "Boletim" para visualizar o resultado completo.
              </p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GerenciamentoNotas;
