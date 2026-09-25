import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Search,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  ArrowRight,
  Calculator,
} from 'lucide-react';
import { FORMULAS_DATA, FORMULA_CATEGORIES } from '../data/formulasData';
import { FormulaItem } from '../types/math';

interface FormulasSectionProps {
  onSendToSolver?: (expr: string) => void;
}

export const FormulasSection: React.FC<FormulasSectionProps> = ({
  onSendToSolver,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFormulas = FORMULAS_DATA.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.simpleExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyFormula = (id: string, formulaText: string) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 text-xs font-bold mb-3">
          <FileSpreadsheet className="w-4 h-4" />
          <span>MATEMATIKA FORMULALARI QOMUSI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Formulalar ma’lumotnomasi
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Algebra, geometriya, trigonometriya, hosila, integral va stereometriyagacha bo‘lgan barcha asosiy formulalar, ularning qo‘llanilishi va namunaviy misollari.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-xl mx-auto mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Formulani yoki mavzuni qidiring (masalan: Pifagor, diskriminant, yuzasi)..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
        />
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
        {FORMULA_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 shrink-0 ${
              activeCategory === cat.id
                ? 'bg-violet-600 text-white shadow-md shadow-violet-500/25'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Formulas Grid */}
      {filteredFormulas.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Qidiruvingiz bo‘yicha formula topilmadi. Boshqa so‘z bilan izlab ko‘ring.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFormulas.map((item: FormulaItem) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Name & Copy */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-violet-50 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                      {item.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleCopyFormula(item.id, item.formula)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Formulani nusxalash"
                  >
                    {copiedId === item.id ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Big Formula Display Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white font-mono text-lg sm:text-xl font-bold tracking-wide my-3 border border-indigo-900/50 shadow-inner flex items-center justify-between">
                  <span className="text-amber-300">{item.formula}</span>
                </div>

                {/* When to use */}
                <div className="mb-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white font-bold block mb-0.5">
                    Qachon ishlatiladi?
                  </strong>
                  <p className="leading-relaxed">{item.whenToUse}</p>
                </div>

                {/* Simple explanation */}
                <div className="mb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-white font-bold block mb-0.5">
                    Oddiy tushuntirish:
                  </strong>
                  <p className="leading-relaxed">{item.simpleExplanation}</p>
                </div>
              </div>

              {/* Sample Example Box */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 mt-2">
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 block mb-1">
                  💡 Namunaviy misol:
                </span>
                <p className="font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 mb-1 font-semibold">
                  {item.exampleProblem}
                </p>
                <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  Yechimi: {item.exampleSolution}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
