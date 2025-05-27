
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Calculator, AlertTriangle } from 'lucide-react';
import { Avaliacao, BimestreDetalhado, calcularNotaBimestre, calcularFrequencia, calcularSituacaoComRecuperacao } from '@/data/gradeStructure';

interface NotasEditorProps {
  disciplina: string;
  bimestre: number;
  dadosBimestre: BimestreDetalhado;
  onUpdate: (novosDados: BimestreDetalhado) => void;
}

const NotasEditor = ({ disciplina, bimestre, dadosBimestre, onUpdate }: NotasEditorProps) => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>(dadosBimestre.avaliacoes || []);
  const [diasLetivos, setDiasLetivos] = useState(dadosBimestre.diasLetivos || 60);
  const [faltas, setFaltas] = useState(dadosBimestre.faltas || 0);
  const [notaRecuperacao, setNotaRecuperacao] = useState<number | undefined>(dadosBimestre.notaRecuperacao);

  const adicionarAvaliacao = () => {
    const novaAvaliacao: Avaliacao = {
      id: Date.now().toString(),
      tipo: 'trabalho',
      nome: '',
      nota: 0,
      peso: 1
    };
    setAvaliacoes([...avaliacoes, novaAvaliacao]);
  };

  const removerAvaliacao = (id: string) => {
    setAvaliacoes(avaliacoes.filter(av => av.id !== id));
  };

  const atualizarAvaliacao = (id: string, campo: keyof Avaliacao, valor: any) => {
    setAvaliacoes(avaliacoes.map(av => 
      av.id === id ? { ...av, [campo]: valor } : av
    ));
  };

  const calcularEAtualizar = () => {
    const notaFinal = calcularNotaBimestre(avaliacoes);
    const frequencia = calcularFrequencia(diasLetivos, faltas);
    const situacaoRecuperacao = calcularSituacaoComRecuperacao(notaFinal, notaRecuperacao);
    
    const novosDados: BimestreDetalhado = {
      avaliacoes,
      diasLetivos,
      faltas,
      frequencia,
      notaFinal,
      precisaRecuperacao: situacaoRecuperacao.precisaRecuperacao,
      notaRecuperacao,
      notaFinalComRecuperacao: situacaoRecuperacao.notaFinalComRecuperacao,
      aprovado: situacaoRecuperacao.aprovado
    };
    
    onUpdate(novosDados);
  };

  const cores = {
    1: 'bg-red-800',
    2: 'bg-yellow-600', 
    3: 'bg-red-700',
    4: 'bg-yellow-500'
  };

  const notaAtual = calcularNotaBimestre(avaliacoes);
  const situacaoAtual = calcularSituacaoComRecuperacao(notaAtual, notaRecuperacao);

  return (
    <Card className="w-full border-red-200">
      <CardHeader className={`${cores[bimestre as keyof typeof cores]} text-white`}>
        <CardTitle className="flex items-center gap-2">
          {disciplina} - {bimestre}º Bimestre
          {situacaoAtual.precisaRecuperacao && !situacaoAtual.aprovado && (
            <AlertTriangle className="h-5 w-5 text-yellow-300" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Frequência */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-red-50 rounded-lg border border-red-200">
            <div>
              <Label className="text-red-800 font-semibold">Dias Letivos</Label>
              <Input
                type="number"
                value={diasLetivos}
                onChange={(e) => setDiasLetivos(Number(e.target.value))}
                className="border-red-200 focus:border-red-500"
              />
            </div>
            <div>
              <Label className="text-red-800 font-semibold">Faltas</Label>
              <Input
                type="number"
                value={faltas}
                onChange={(e) => setFaltas(Number(e.target.value))}
                className="border-red-200 focus:border-red-500"
              />
            </div>
          </div>

          {/* Avaliações */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold text-red-800">Avaliações</h4>
              <Button onClick={adicionarAvaliacao} size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-red-900">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Avaliação
              </Button>
            </div>

            {avaliacoes.map((avaliacao) => (
              <div key={avaliacao.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <Label className="text-red-800 font-semibold">Tipo</Label>
                  <Select value={avaliacao.tipo} onValueChange={(value) => atualizarAvaliacao(avaliacao.id, 'tipo', value)}>
                    <SelectTrigger className="border-red-200 focus:border-red-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-red-200">
                      <SelectItem value="trabalho">Trabalho</SelectItem>
                      <SelectItem value="av1">AV1</SelectItem>
                      <SelectItem value="av2">AV2</SelectItem>
                      <SelectItem value="teste">Teste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-red-800 font-semibold">Nome</Label>
                  <Input
                    value={avaliacao.nome}
                    onChange={(e) => atualizarAvaliacao(avaliacao.id, 'nome', e.target.value)}
                    placeholder="Ex: AV1 - Matemática"
                    className="border-red-200 focus:border-red-500"
                  />
                </div>
                <div>
                  <Label className="text-red-800 font-semibold">Nota (0-10)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={avaliacao.nota}
                    onChange={(e) => atualizarAvaliacao(avaliacao.id, 'nota', Number(e.target.value))}
                    className="border-red-200 focus:border-red-500"
                  />
                </div>
                <div>
                  <Label className="text-red-800 font-semibold">Peso</Label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={avaliacao.peso}
                    onChange={(e) => atualizarAvaliacao(avaliacao.id, 'peso', Number(e.target.value))}
                    className="border-red-200 focus:border-red-500"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removerAvaliacao(avaliacao.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Recuperação */}
          {situacaoAtual.precisaRecuperacao && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
              <h4 className="font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Recuperação Necessária (Nota menor que 6.0)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-yellow-800 font-semibold">Nota da Recuperação</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={notaRecuperacao || ''}
                    onChange={(e) => setNotaRecuperacao(e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Digite a nota da recuperação"
                    className="border-yellow-300 focus:border-yellow-500"
                  />
                </div>
                <div className="flex items-end">
                  <div className="text-center">
                    <Label className="text-sm text-yellow-700">Status</Label>
                    <p className={`text-lg font-bold ${
                      situacaoAtual.aprovado ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {situacaoAtual.aprovado ? 'Aprovado' : 'Reprovado'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resultado */}
          <div className="p-4 bg-red-100 rounded-lg border border-red-300">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <Label className="text-sm text-red-700">Nota das Avaliações</Label>
                <p className="text-2xl font-bold text-red-800">
                  {notaAtual.toFixed(2)}
                </p>
              </div>
              <div>
                <Label className="text-sm text-red-700">Nota Final</Label>
                <p className="text-2xl font-bold text-red-800">
                  {situacaoAtual.notaFinalComRecuperacao.toFixed(2)}
                </p>
              </div>
              <div>
                <Label className="text-sm text-red-700">Frequência</Label>
                <p className="text-2xl font-bold text-green-600">
                  {calcularFrequencia(diasLetivos, faltas).toFixed(1)}%
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Button onClick={calcularEAtualizar} className="bg-red-800 hover:bg-red-900">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calcular e Salvar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotasEditor;
