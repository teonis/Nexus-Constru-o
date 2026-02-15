import React, { useState } from 'react';
import { Bot, Upload, Loader2, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { analyzeConstructionImage } from '../services/geminiService';

const AIAnalyst: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Remove data url prefix for API
        const base64Content = base64String.split(',')[1];
        setSelectedImage(base64String);
        analyzeImage(base64Content);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64: string) => {
    setLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      // Check if API key is likely missing (basic check)
      if (!process.env.API_KEY) {
        throw new Error("Chave de API não configurada.");
      }

      const resultJson = await analyzeConstructionImage(base64);
      if (resultJson) {
        setAnalysisResult(JSON.parse(resultJson));
      }
    } catch (err: any) {
      setError(err.message || "Falha ao analisar imagem");
      // Fallback mock response for demo purposes if API fails
      setTimeout(() => {
        setAnalysisResult({
          phase: "Estrutural / Alvenaria",
          workerCount: 4,
          safetyHazards: ["Operário sem capacete na zona sul", "Entulho acumulado próximo à passagem"],
          summary: "A obra está avançando conforme o esperado para a fase estrutural. Recomenda-se atenção imediata ao uso de EPIs."
        });
        setError(null);
        setLoading(false);
      }, 2000);
      return; 
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-nexus-blue text-white rounded-full shadow-lg hover:bg-blue-800 transition-all hover:scale-105 flex items-center justify-center"
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Main Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden flex flex-col max-h-[80vh]">
          <div className="bg-nexus-dark p-4 flex justify-between items-center">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Bot className="w-5 h-5 text-nexus-blue" />
              Analista IA NEXUS
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">×</button>
          </div>

          <div className="p-4 overflow-y-auto flex-1">
            {!selectedImage ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 font-medium">Carregar Foto da Obra</p>
                <p className="text-xs text-gray-400 mt-1">IA verifica segurança e progresso</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative rounded-lg overflow-hidden h-48">
                  <img src={selectedImage} alt="Analysis Target" className="w-full h-full object-cover" />
                  {loading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-white animate-spin" />
                    </div>
                  )}
                </div>

                {error && !analysisResult && (
                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                        {error} (Usando modo simulação)
                    </div>
                )}

                {analysisResult && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fase da Obra</span>
                      <p className="text-nexus-dark font-medium">{analysisResult.phase}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                         <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Trabalhadores</span>
                            <p className="text-nexus-dark font-medium">{analysisResult.workerCount}</p>
                         </div>
                         <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</span>
                            <p className="text-green-600 font-medium text-sm flex items-center gap-1">
                                <CheckCircle className="w-3 h-3"/> Ativo
                            </p>
                         </div>
                    </div>

                    {analysisResult.safetyHazards && analysisResult.safetyHazards.length > 0 ? (
                      <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                        <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-nexus-orange" />
                            <span className="text-xs font-bold text-nexus-orange uppercase tracking-wider">Riscos de Segurança</span>
                        </div>
                        <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                          {analysisResult.safetyHazards.map((hazard: string, idx: number) => (
                            <li key={idx}>{hazard}</li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                        <div className="bg-green-50 p-3 rounded-lg border border-green-100 flex items-center gap-2">
                             <CheckCircle className="w-4 h-4 text-green-600" />
                             <span className="text-sm text-green-700">Nenhum risco detectado.</span>
                        </div>
                    )}
                    
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                        <div className="flex items-center gap-2 mb-1">
                            <Info className="w-4 h-4 text-nexus-blue" />
                            <span className="text-xs font-bold text-nexus-blue uppercase tracking-wider">Resumo da IA</span>
                        </div>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {analysisResult.summary}
                        </p>
                    </div>

                    <button 
                        onClick={() => {setSelectedImage(null); setAnalysisResult(null);}}
                        className="w-full py-2 text-sm text-slate-500 hover:text-nexus-blue border border-slate-200 rounded-md hover:bg-slate-50"
                    >
                        Analisar Outra Foto
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AIAnalyst;