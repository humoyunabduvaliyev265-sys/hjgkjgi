import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  FileCheck,
  Award,
} from 'lucide-react';
import { GRADES_DATA } from '../data/gradesData';
import { GradeTopic } from '../types/math';

interface GradesSectionProps {
  onStartGradeTest: (grade: number) => void;
  onSendToSolver: (expr: string) => void;
}

export const GradesSection: React.FC<GradesSectionProps> = ({
  onStartGradeTest,
  onSendToSolver,
}) => {
  const [selectedGrade, setSelectedGrade] = useState<number>(1);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('g1-t1');
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});

  const currentCurriculum = GRADES_DATA.find((g) => g.grade === selectedGrade) || GRADES_DATA[0];
  const currentTopic =
    currentCurriculum.topics.find((t) => t.id === selectedTopicId) || currentCurriculum.topics[0];

  const handleSelectGrade = (grade: number) => {
    setSelectedGrade(grade);
    const curr = GRADES_DATA.find((g) => g.grade === grade);
    if (curr && curr.topics.length > 0) {
      setSelectedTopicId(curr.topics[0].id);
    }
  };

  const handleSelectPracticeOption = (exerciseId: string, option: string) => {
    setPracticeAnswers((prev) => ({ ...prev, [exerciseId]: option }));
  };

  const toggleSolution = (exampleIdx: number) => {
    setRevealedSolutions((prev) => ({
      ...prev,
      [exampleIdx]: !prev[exampleIdx],
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-bold mb-3">
          <GraduationCap className="w-4 h-4" />
          <span>MAKTAB MATEMATIKA KURSI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          1-sinfdan 11-sinfgacha to‘liq darslik
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Davlat ta’lim standartlari asosida tuzilgan mavzular, batafsil qoidalar, yechilgan misollar va amaliy mashqlar.
        </p>
      </div>

      {/* Grade Selector Bar (1 to 11) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
        {GRADES_DATA.map((g) => (
          <button
            key={g.grade}
            onClick={() => handleSelectGrade(g.grade)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 shrink-0 ${
              selectedGrade === g.grade
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {g.grade}-sinf
          </button>
        ))}
      </div>

      {/* Grade Overview Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider bg-white/20 px-3 py-1 rounded-full text-white inline-block mb-2">
            {currentCurriculum.grade}-sinf matematika dasturi
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {currentCurriculum.title}
          </h3>
          <p className="text-white/80 text-sm mt-1 max-w-2xl">
            {currentCurriculum.description}
          </p>
        </div>
        <button
          onClick={() => onStartGradeTest(selectedGrade)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm shadow-md transition-all shrink-0 hover:scale-105"
        >
          <Award className="w-4 h-4 text-blue-600" />
          <span>{selectedGrade}-sinf testini topshirish</span>
        </button>
      </div>

      {/* Main Content Layout: Topics Sidebar + Active Topic Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Topics List */}
        <div className="lg:col-span-4 space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1 mb-2">
            Mavzular ro‘yxati:
          </h4>
          {currentCurriculum.topics.map((t) => {
            const isSelected = t.id === selectedTopicId;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTopicId(t.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 dark:border-blue-500 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h5
                    className={`font-bold text-sm ${
                      isSelected
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {t.title}
                  </h5>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected
                        ? 'text-blue-600 dark:text-blue-400 translate-x-1'
                        : 'text-slate-400'
                    }`}
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {t.summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Detailed Topic Study Material */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Topic Header */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">
                Mavzu
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {currentTopic.title}
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
              {currentTopic.summary}
            </p>
          </div>

          {/* 1. Nazariya va tushuntirish */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Nazariy tushuntirish</span>
            </h4>
            <div className="space-y-2.5">
              {currentTopic.theory.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <p className="leading-relaxed">{line}</p>
                </div>
              ))}
            </div>

            {/* Rules subsection */}
            {currentTopic.rules.length > 0 && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40">
                <span className="text-xs font-extrabold uppercase text-amber-800 dark:text-amber-300 block mb-2">
                  📌 Asosiy qoidalar:
                </span>
                <ul className="space-y-1 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  {currentTopic.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span>•</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 2. Namunaviy misollar (Worked Examples) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Namunaviy misollar va yechimlari</span>
            </h4>

            <div className="space-y-4">
              {currentTopic.examples.map((ex, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {ex.title}
                    </span>
                    <button
                      onClick={() => onSendToSolver(ex.problem)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Kalkulyatorda ochish</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="font-mono text-base font-bold text-slate-900 dark:text-white mb-3">
                    {ex.problem}
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="text-slate-400 text-xs font-semibold block mb-1">
                      Yechilishi:
                    </span>
                    {ex.solution.map((solLine, solIdx) => (
                      <div key={solIdx} className="font-mono">
                        {solLine}
                      </div>
                    ))}
                    <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 font-bold text-emerald-600 dark:text-emerald-400">
                      Javob: {ex.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Mustaqil amaliy mashqlar (Practice) */}
          {currentTopic.practice.length > 0 && (
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Bilimingizni sinab ko‘ring</span>
              </h4>

              <div className="space-y-4">
                {currentTopic.practice.map((pr) => {
                  const selectedOpt = practiceAnswers[pr.id];
                  const isAnswered = selectedOpt !== undefined;
                  const isCorrect = selectedOpt === pr.correctAnswer;

                  return (
                    <div
                      key={pr.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800"
                    >
                      <p className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-3">
                        {pr.problem}
                      </p>

                      {pr.options && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                          {pr.options.map((opt, optIdx) => {
                            const isThisSelected = selectedOpt === opt;
                            let btnStyle =
                              'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-400';
                            if (isAnswered) {
                              if (opt === pr.correctAnswer) {
                                btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold';
                              } else if (isThisSelected) {
                                btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-700 dark:text-rose-300';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleSelectPracticeOption(pr.id, opt)}
                                className={`p-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Immediate feedback */}
                      {isAnswered && (
                        <div
                          className={`p-3 rounded-xl text-xs sm:text-sm ${
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                          }`}
                        >
                          <span className="font-bold block mb-0.5">
                            {isCorrect ? '✅ To‘g‘ri!' : '❌ Noto‘g‘ri!'}
                          </span>
                          <span>{pr.explanation}</span>
                        </div>
                      )}

                      {!isAnswered && pr.hint && (
                        <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-2">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                          <span>Maslahat: {pr.hint}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
