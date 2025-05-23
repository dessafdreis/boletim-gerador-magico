
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Calculator } from 'lucide-react';
import { Avaliacao, BimestreDetalhado, calcularNotaBimestre, calcularFrequencia } from '@/data/gradeStructure';

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

  const adicionarAvaliacao = () => {
    const novaAvaliacao: Avaliacao = {
      id: Date.now().toString(),
      tipo: 'prova',
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
    
    const novosDados: BimestreDetalhado = {
      avaliacoes,
      diasLetivos,
      faltas,
      frequencia,
      notaFinal
    };
    
    onUpdate(novosDados);
  };

  const cores = {
    1: 'bg-green-500',
    2: 'bg-blue-500', 
    3: 'bg-yellow-500',
    4: 'bg-red-500'
  };

  return (
    <Card className="w-full">
      <CardHeader className={`${cores[bimestre as keyof typeof cores]} text-white`}>
        <CardTitle>{disciplina} - {bimestre}º Bimestre</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Frequência */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <Label>Dias Letivos</Label>
              <Input
                type="number"
                value={diasLetivos}
                onChange={(e) => setDiasLetivos(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Faltas</Label>
              <Input
                type="number"
                value={faltas}
                onChange={(e) => setFaltas(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Avaliações */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Avaliações</h4>
              <Button onClick={adicionarAvaliacao} size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-red-900">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Avaliação
              </Button>
            </div>

            {avaliacoes.map((avaliacao) => (
              <div key={avaliacao.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border border-gray-200 rounded-lg">
                <div>
                  <Label>Tipo</Label>
                  <Select value={avaliacao.tipo} onValueChange={(value) => atualizarAvaliacao(avaliacao.id, 'tipo', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prova">Prova</SelectItem>
                      <SelectItem value="trabalho">Trabalho</SelectItem>
                      <SelectItem value="teste">Teste</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Nome</Label>
                  <Input
                    value={avaliacao.nome}
                    onChange={(e) => atualizarAvaliacao(avaliacao.id, 'nome', e.target.value)}
                    placeholder="Ex: Prova 1"
                  />
                </div>
                <div>
                  <Label>Nota (0-10)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={avaliacao.nota}
                    onChange={(e) => atualizarAvaliacao(avaliacao.id, 'nota', Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Peso</Label>
                  <Input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={avaliacao.peso}
                    onChange={(e) => atualizarAvaliacao(avaliacao.id, 'peso', Number(e.target.value))}
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

          {/* Resultado */}
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <Label className="text-sm text-gray-600">Nota Final</Label>
                <p className="text-2xl font-bold text-blue-600">
                  {calcularNotaBimestre(avaliacoes).toFixed(2)}
                </p>
              </div>
              <div>
                <Label className="text-sm text-gray-600">Frequência</Label>
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
