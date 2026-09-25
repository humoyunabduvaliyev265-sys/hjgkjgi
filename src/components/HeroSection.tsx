import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  FileSpreadsheet,
  Calculator,
  ArrowRight,
  BrainCircuit,
  GraduationCap,
  Layers,
  Search,
} from 'lucide-react';
import { ActiveTab } from '../types/math';

interface HeroSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onQuickSolve: (expr: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  setActiveTab,
  onQuickSolve,
}) => {
  const [quickInput, setQuickInput] = useState('');

  const sampleExpressions = [
    '18 + (13 - 1) × 4 × 6 - 5',
    '2x + 5 = 17',
    'x² + 5x + 6 = 0',
    '√144 + 25',
  ];

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickInput.trim()) {
      onQuickSolve(quickInput.trim());
      setActiveTab('solver');
    }
  };

  const handleSampleClick = (expr: string) => {
    setQuickInput(expr);
    onQuickSolve(expr);
    setActiveTab('solver');
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute top-36 left-1/2 -translate-x-1/2 w-96 h-96 bg-violet-500 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-semibold mb-6 shadow-xs animate-in fade-in">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>O‘zbekistondagi 1-11 sinflar uchun zamonaviy matematika platformasi</span>
        </div>

        {/* Central Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
          Matematikani{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
            oson o‘rganing!
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-2xl font-medium text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Misolni kiriting — yechimini bosqichma-bosqich ko‘ring.
        </p>

        {/* Hero Interactive Quick Input Box */}
        <div className="max-w-2xl mx-auto mb-8">
          <form
            onSubmit={handleHeroSubmit}
            className="relative flex items-center p-2 rounded-2xl bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all"
          >
            <div className="pl-3 pr-2 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="Masalan: 18 + (13 - 1) × 4 × 6 - 5 yoki 2x + 5 = 17"
              className="w-full py-2.5 text-base sm:text-lg font-mono bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm sm:text-base shadow-md shadow-blue-500/25 transition-all shrink-0 hover:scale-[1.02]"
            >
              <span>Yechish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Clickable Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">Namunalar:</span>
            {sampleExpressions.map((expr, idx) => (
              <button
                key={idx}
                onClick={() => handleSampleClick(expr)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-slate-700 transition-colors border border-slate-200/60 dark:border-slate-700"
              >
                {expr}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Main Action Buttons requested in Brief */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-16">
          <button
            onClick={() => setActiveTab('solver')}
            className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Masala yechish
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Qadam-baqadam
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500 dark:hover:border-emerald-500 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Test boshlash
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              10, 20, 30, 50 savol
            </span>
          </button>

          <button
            onClick={() => setActiveTab('formulas')}
            className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-violet-500 dark:hover:border-violet-500 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Formulalarni ko‘rish
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              13 ta to‘liq bo‘lim
            </span>
          </button>

          <button
            onClick={() => setActiveTab('calculator')}
            className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-500 dark:hover:border-amber-500 hover:-translate-y-1 transition-all duration-200"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Kalkulyator
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Ilmiy & Muhandislik
            </span>
          </button>
        </div>

        {/* Key Features Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
              Amallar tartibi nazorati
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Qavslar, darajalar, ko‘paytirish va qo‘shishning qat’iy ketma-ketligini tushuntiradi. Noto‘g‘ri hisoblashning oldini oladi.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
              1-dan 11-sinfgacha dastur
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Boshlang‘ich sinf sanoqlaridan tortib, 11-sinf oliy matematika asoslari, hosila va integrallar to‘liq qamrab olingan.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">
              AI Matematik Ustoz
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Tushunmagan mavzuingizni so‘rang — sun’iy intellekt sodda o‘zbek tilida, qadam-baqadam va amaliy misollar bilan tushuntiradi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
