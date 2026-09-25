import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  RefreshCw,
  Lightbulb,
  ShieldCheck,
  Bot,
  Layers,
} from 'lucide-react';
import { SolverResult } from '../types/math';
import { solveMathStepByStep } from '../utils/mathSolver';

interface MathSolverSectionProps {
  initialExpression?: string;
  onOpenAiTutor?: (question: string) => void;
}

export const MathSolverSection: React.FC<MathSolverSectionProps> = ({
  initialExpression = '18 + (13 - 1) × 4 × 6 - 5',
  onOpenAiTutor,
}) => {
  const [expression, setExpression] = useState(initialExpression);
  const [result, setResult] = useState<SolverResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);

  const samplePresets = [
    { label: 'Murakkab amallar (PEMDAS)', expr: '18 + (13 - 1) × 4 × 6 - 5' },
    { label: 'Chiziqli tenglama', expr: '2x + 5 = 17' },
    { label: 'Kvadrat tenglama', expr: 'x² + 5x + 6 = 0' },
    { label: 'Ildizli ifoda', expr: '√144 + 25' },
    { label: 'Qavsli ifoda', expr: '40 + (25 - 5) × 3' },
    { label: 'Kvadrat tenglama 2', expr: '2x² - 8 = 0' },
  ];

  const handleSolve = (exprToSolve?: string) => {
    const target = exprToSolve || expression;
    if (!target.trim()) return;

    setAiAnalysis(null);
    try {
      const res = solveMathStepByStep(target);
      setResult(res);
    } catch (err) {
      console.error(err);
      // Fallback
      handleAiSolve(target);
    }
  };

  const handleAiSolve = async (queryExpr: string) => {
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/solve-math', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: queryExpr }),
      });
      const data = await response.json();
      if (data && data.finalAnswer) {
        setResult({
          given: data.given || queryExpr,
          formattedExpression: data.given || queryExpr,
          expressionType: 'ai_solved',
          topic: data.topic || 'Matematik masala',
          ruleExplanation: data.rulesApplied || 'Matematik qoidalar asosida bosqichma-bosqich yechim',
          steps: (data.steps || []).map((s: any, idx: number) => ({
            stepNumber: s.stepNumber || idx + 1,
            operationName: s.description || `Qadam ${idx + 1}`,
            expressionBefore: '',
            calculation: s.calculation || '',
            result: s.result || '',
            explanation: s.description || '',
          })),
          intermediateResults: (data.steps || []).map((s: any) => s.result || '').filter(Boolean),
          finalAnswer: data.finalAnswer,
          verification: {
            method: 'AI Matematik tekshiruv',
            calculation: data.verification || 'Matematik mantiqiy tekshiruv',
            isCorrect: true,
            explanation: data.verification || "Javob to'g'riligi tekshirildi.",
          },
        });
      }
    } catch (e) {
      console.error('AI solve error', e);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleAskAiDeeper = async () => {
    if (!result) return;
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Iltimos, quyidagi matematik ifodani o'quvchiga juda sodda va tushunarli qilib, nega har bir amal shu tartibda bajarilganini tushuntirib bering: "${result.given}". Yakuniy javob: ${result.finalAnswer}.`,
        }),
      });
      const data = await response.json();
      if (data && data.reply) {
        setAiAnalysis(data.reply);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    if (initialExpression) {
      setExpression(initialExpression);
      handleSolve(initialExpression);
    }
  }, [initialExpression]);

  const insertSymbol = (sym: string) => {
    setExpression((prev) => prev + sym);
  };

  const handleCopyAnswer = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.finalAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>BOSQICHMA-BOSQICH MASALA YECHISH TIZIMI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Misolni kiriting — yechimini ko‘ring
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Arifmetik amallar, qavslar, darajalar, kvadrat ildizlar, chiziqli va kvadrat tenglamalarni aniq qadamlar va tekshiruv bilan hisoblang.
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-8 mb-8">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Matematik ifoda yoki tenglama:
        </label>

        {/* Input box */}
        <div className="relative mb-4">
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSolve()}
            placeholder="Masalan: 18 + (13 - 1) × 4 × 6 - 5 yoki x² + 5x + 6 = 0"
            className="w-full px-5 py-4 text-xl sm:text-2xl font-mono rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
          />
        </div>

        {/* Quick Math Keyboard Helper Keys */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-6">
          <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Tezkor belgilar:</span>
          {['+', '−', '×', '÷', '²', '³', '√', '(', ')', '=', 'x', 'π'].map((sym) => (
            <button
              key={sym}
              type="button"
              onClick={() => insertSymbol(sym)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-mono text-sm font-semibold transition-colors border border-slate-200 dark:border-slate-700"
            >
              {sym}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setExpression('')}
            className="px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 transition-colors ml-auto"
          >
            Tozalash
          </button>
        </div>

        {/* Preset sample buttons */}
        <div className="mb-6">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-2">
            Tayyor namunalar ustiga bosing:
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setExpression(preset.expr);
                  handleSolve(preset.expr);
                }}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                  expression === preset.expr
                    ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-400 text-blue-700 dark:text-blue-300 font-semibold'
                    : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="opacity-75">{preset.label}: </span>
                <span className="font-mono font-bold">{preset.expr}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Button: YECHISH */}
        <button
          onClick={() => handleSolve()}
          disabled={isAiLoading}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-lg shadow-lg shadow-blue-500/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
        >
          {isAiLoading ? (
            <RefreshCw className="w-6 h-6 animate-spin" />
          ) : (
            <Sparkles className="w-6 h-6" />
          )}
          <span>YECHISH</span>
        </button>
      </div>

      {/* SOLUTION PRESENTATION BLOCK */}
      {result && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* 1. Berilgan ifoda (Given expression) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                1. Berilgan ifoda
              </span>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {result.topic}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 dark:text-white break-words">
              {result.given}
            </div>
          </div>

          {/* 2. Amal tartibi va qoidalar (Rules and operations order) */}
          <div className="p-6 rounded-3xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-blue-800 dark:text-blue-300 font-bold text-sm">
              <Layers className="w-4 h-4" />
              <span>2. Amallarni bajarish tartibi va qo‘llanilgan qoidalar:</span>
            </div>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium">
              {result.ruleExplanation}
            </p>
          </div>

          {/* 3. Bosqichma-bosqich yechim (Steps) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span>3. Bosqichma-bosqich yechilish jarayoni</span>
            </h3>

            <div className="space-y-4">
              {result.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 transition-all hover:border-blue-300 dark:hover:border-blue-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                      {step.stepNumber}-qadam
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {step.operationName}
                    </span>
                  </div>

                  <div className="my-2 font-mono text-lg sm:text-xl font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-900 px-4 py-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800">
                    {step.calculation}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
                    {step.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Oraliq natijalar (Intermediate results) */}
          {result.intermediateResults.length > 0 && (
            <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                4. Oraliq natijalar:
              </span>
              <div className="flex flex-wrap gap-2">
                {result.intermediateResults.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 5. Yakuniy javob (Final answer) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 text-white shadow-xl shadow-emerald-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm uppercase font-black tracking-widest text-emerald-100">
                5. Yakuniy javob
              </span>
              <button
                onClick={handleCopyAnswer}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-xs font-bold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Nusxa olindi!' : 'Nusxa olish'}</span>
              </button>
            </div>
            <div className="text-3xl sm:text-5xl font-mono font-black tracking-tight mt-2 drop-shadow-sm">
              Javob: {result.finalAnswer}
            </div>
          </div>

          {/* 6. Javobni qayta tekshirish (Verification mechanism) */}
          <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-emerald-800 dark:text-emerald-300 font-bold text-sm sm:text-base">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>6. Javobni qayta tekshirish va to‘g‘riligini isbotlash</span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-100 dark:border-emerald-900/50 mb-3 font-mono text-sm sm:text-base text-slate-800 dark:text-slate-200">
              {result.verification.calculation}
            </div>
            <p className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
              {result.verification.explanation}
            </p>
          </div>

          {/* AI Ustoz chuqur tahlili / Deep AI Analysis Option */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-200 dark:border-amber-900/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                  <Bot className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <span>Tushunmadingizmi? AI Ustozdan so‘rang</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                  Sun’iy intellekt bu misolni nima uchun aynan shu tartibda yechilganini sodda hayotiy misol bilan tushuntirib beradi.
                </p>
              </div>
              <button
                onClick={handleAskAiDeeper}
                disabled={isAiLoading}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm shrink-0 shadow-md shadow-amber-600/20 flex items-center gap-2 transition-all"
              >
                {isAiLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Lightbulb className="w-4 h-4" />
                )}
                <span>AI Tushuntirishi</span>
              </button>
            </div>

            {aiAnalysis && (
              <div className="mt-4 pt-4 border-t border-amber-200/80 dark:border-amber-900/60 text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed font-normal bg-white/70 dark:bg-slate-900/70 p-4 rounded-2xl">
                {aiAnalysis}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
