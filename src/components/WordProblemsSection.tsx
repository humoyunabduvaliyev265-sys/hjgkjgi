import React, { useState } from 'react';
import {
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle2,
  Filter,
  ArrowRight,
} from 'lucide-react';
import { WORD_PROBLEMS_DATA } from '../data/wordProblemsData';
import { WordProblem } from '../types/math';

interface WordProblemsSectionProps {
  onSendToSolver?: (expr: string) => void;
}

export const WordProblemsSection: React.FC<WordProblemsSectionProps> = ({
  onSendToSolver,
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'all' | 'oson' | 'orta' | 'qiyin'
  >('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const categories = [
    { id: 'all', label: 'Barcha mavzular' },
    { id: 'sonli', label: 'Sonli masalalar' },
    { id: 'harakat', label: 'Harakat masalalari' },
    { id: 'ish', label: 'Ish masalalari' },
    { id: 'foiz', label: 'Foiz masalalari' },
    { id: 'aralashma', label: 'Aralashmalar' },
    { id: 'geometriya', label: 'Geometriya' },
    { id: 'mantiq', label: 'Mantiqiy masalalar' },
  ];

  const filteredProblems = WORD_PROBLEMS_DATA.filter((item) => {
    const diffMatch =
      selectedDifficulty === 'all' || item.difficulty === selectedDifficulty;
    const catMatch =
      selectedCategory === 'all' || item.category === selectedCategory;
    return diffMatch && catMatch;
  });

  const toggleSolution = (id: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleHint = (id: string) => {
    setRevealedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
          <HelpCircle className="w-4 h-4" />
          <span>HAYOTIY VA AMALIY MASALALAR</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Matematik masalalar to‘plami
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Harakat, ish, foiz, aralashmalar va mantiqiy masalalarni qulay maslahatlar va batafsil tahliliy yechimlar bilan o‘rganing.
        </p>
      </div>

      {/* Difficulty Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <button
            onClick={() => setSelectedDifficulty('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedDifficulty === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setSelectedDifficulty('oson')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedDifficulty === 'oson'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800'
            }`}
          >
            🟢 Oson
          </button>
          <button
            onClick={() => setSelectedDifficulty('orta')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedDifficulty === 'orta'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-slate-800'
            }`}
          >
            🟡 O‘rta
          </button>
          <button
            onClick={() => setSelectedDifficulty('qiyin')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedDifficulty === 'qiyin'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800'
            }`}
          >
            🔴 Qiyin
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === c.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-6">
        {filteredProblems.map((problem) => {
          const isSolutionOpen = !!revealedSolutions[problem.id];
          const isHintOpen = !!revealedHints[problem.id];

          const diffBadge =
            problem.difficulty === 'oson' ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Oson
              </span>
            ) : problem.difficulty === 'orta' ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                O‘rta
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                Qiyin
              </span>
            );

          return (
            <div
              key={problem.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  {diffBadge}
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {problem.categoryTitle}
                  </span>
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  {problem.title}
                </h3>
              </div>

              {/* Problem text */}
              <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
                {problem.problem}
              </p>

              {/* Action buttons: Hint & Solution toggle */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => toggleHint(problem.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100 transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{isHintOpen ? 'Maslahatni yashirish' : 'Maslahat olish'}</span>
                </button>

                <button
                  onClick={() => toggleSolution(problem.id)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
                >
                  <span>{isSolutionOpen ? 'Yechimni yashirish' : 'Yechimni ko‘rish'}</span>
                  {isSolutionOpen ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Hint Box */}
              {isHintOpen && (
                <div className="mt-3 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 animate-in fade-in">
                  <strong>💡 Maslahat:</strong> {problem.hint}
                </div>
              )}

              {/* Step by Step Solution Box */}
              {isSolutionOpen && (
                <div className="mt-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5 animate-in fade-in">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-2">
                    Bosqichma-bosqich yechilishi:
                  </span>
                  {problem.steps.map((st, sIdx) => (
                    <div
                      key={sIdx}
                      className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-mono"
                    >
                      {st}
                    </div>
                  ))}
                  <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 font-extrabold text-emerald-600 dark:text-emerald-400 text-sm sm:text-base">
                    Yakuniy javob: {problem.answer}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
