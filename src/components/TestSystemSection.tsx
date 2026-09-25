import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Award,
  Clock,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Filter,
  BarChart2,
  Sparkles,
} from 'lucide-react';
import { TestQuestion, TestResult } from '../types/math';
import { generateTestQuestions, TEST_QUESTIONS_POOL } from '../data/testsData';

interface TestSystemSectionProps {
  initialGrade?: number | null;
}

export const TestSystemSection: React.FC<TestSystemSectionProps> = ({
  initialGrade,
}) => {
  const [questionCount, setQuestionCount] = useState<10 | 20 | 30 | 50>(10);
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>(
    initialGrade || 'all'
  );
  const [activeQuestions, setActiveQuestions] = useState<TestQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [isTestFinished, setIsTestFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [testResult, setTestResult] = useState<TestResult | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTestStarted && !isTestFinished) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestStarted, isTestFinished]);

  const handleStartTest = () => {
    const gradeFilter = selectedGrade === 'all' ? undefined : selectedGrade;
    const questions = generateTestQuestions(questionCount, gradeFilter);
    setActiveQuestions(questions);
    setCurrentIndex(0);
    setUserAnswers({});
    setTimerSeconds(0);
    setIsTestStarted(true);
    setIsTestFinished(false);
    setTestResult(null);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    // Instant saving of user's choice
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleFinishTest = () => {
    let correctCount = 0;
    let wrongCount = 0;

    const answersReport = activeQuestions.map((q) => {
      const selectedIndex = userAnswers[q.id] !== undefined ? userAnswers[q.id] : null;
      const isCorrect = selectedIndex !== null && selectedIndex === q.correctAnswerIndex;

      if (isCorrect) {
        correctCount++;
      } else {
        wrongCount++;
      }

      return {
        questionId: q.id,
        question: q.question,
        selectedOptionIndex: selectedIndex,
        correctOptionIndex: q.correctAnswerIndex,
        isCorrect,
        explanation: q.explanation,
        options: q.options,
      };
    });

    const scorePercentage = Math.round((correctCount / activeQuestions.length) * 100);

    setTestResult({
      totalQuestions: activeQuestions.length,
      correctAnswersCount: correctCount,
      wrongAnswersCount: wrongCount,
      scorePercentage,
      totalPoints: correctCount * 5,
      timeSpentSeconds: timerSeconds,
      answers: answersReport,
    });

    setIsTestFinished(true);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const currentQ = activeQuestions[currentIndex];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold mb-3">
          <CheckCircle2 className="w-4 h-4" />
          <span>INTERAKTIV MATEMATIKA TEST TIZIMI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Bilimingizni sinab ko‘ring
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          10, 20, 30 yoki 50 talik variantlar. Har bir savol 4 ta javob varianti bilan alohida tekshiriladi va to‘liq tushuntiriladi.
        </p>
      </div>

      {/* STATE 1: Test Setup Screen */}
      {!isTestStarted && !isTestFinished && (
        <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          {/* Question Count Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Savollar sonini tanlang:
            </label>
            <div className="grid grid-cols-4 gap-2.5">
              {([10, 20, 30, 50] as const).map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => setQuestionCount(cnt)}
                  className={`py-3 rounded-2xl font-extrabold text-sm sm:text-base transition-all ${
                    questionCount === cnt
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                  }`}
                >
                  {cnt} ta
                </button>
              ))}
            </div>
          </div>

          {/* Grade / Scope Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Sinf bo‘yicha saralash:
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedGrade('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedGrade === 'all'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Barcha sinflar (Aralash)
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((gr) => (
                <button
                  key={gr}
                  onClick={() => setSelectedGrade(gr)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedGrade === gr
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {gr}-sinf
                </button>
              ))}
            </div>
          </div>

          {/* Info Notes */}
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs sm:text-sm text-blue-900 dark:text-blue-200 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-blue-800 dark:text-blue-300">
              <Sparkles className="w-4 h-4" />
              <span>Test qoidalari:</span>
            </div>
            <p>• Har bir savolda 4 ta variant mavjud va faqat 1 tasi to‘g‘ri.</p>
            <p>• Tanlagan javobingiz darhol xotiraga saqlanadi.</p>
            <p>• Test yakunida har bir xato savolning tushuntirishi ko‘rsatiladi.</p>
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartTest}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-lg shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <span>Testni boshlash</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* STATE 2: Active Test in Progress */}
      {isTestStarted && !isTestFinished && currentQ && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Top Progress & Timer Bar */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                Savol {currentIndex + 1} / {activeQuestions.length}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                {currentQ.grade}-sinf • {currentQ.topic}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono font-bold text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
              <span>{formatTime(timerSeconds)}</span>
            </div>
          </div>

          {/* Progress Indicator Dots */}
          <div className="flex gap-1 overflow-x-auto pb-1">
            {activeQuestions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 flex-1 min-w-[8px] rounded-full transition-all ${
                    isCurrent
                      ? 'bg-blue-600 ring-2 ring-blue-300 dark:ring-blue-700'
                      : isAnswered
                      ? 'bg-emerald-500'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                  title={`Savol ${idx + 1}`}
                />
              );
            })}
          </div>

          {/* Question Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white mb-6 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* 4 Choices */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;
                const letter = ['A', 'B', 'C', 'D'][optIdx];

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left font-semibold text-sm sm:text-base transition-all ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-100 shadow-sm ring-1 ring-blue-500'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {letter}
                    </div>
                    <span className="flex-1 font-mono">{optionText}</span>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Navigation / Next / Finish Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-semibold disabled:opacity-40 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Oldingi</span>
              </button>

              {currentIndex < activeQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-blue-500/20"
                >
                  <span>Keyingi</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleFinishTest}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-emerald-500/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Testni yakunlash</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STATE 3: Test Finished - Detailed Evaluation & Error Breakdown */}
      {isTestFinished && testResult && (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
          {/* Summary Score Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-2xl border border-indigo-900/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full inline-block mb-2">
                  Test natijasi tahlili
                </span>
                <h3 className="text-2xl sm:text-3xl font-black">
                  {testResult.scorePercentage >= 85
                    ? "A'lo natija! Tabriklaymiz! 🏆"
                    : testResult.scorePercentage >= 70
                    ? 'Yaxshi natija! 👍'
                    : testResult.scorePercentage >= 50
                    ? "Qoniqarli. Mavzularni qayta takrorlang! 📚"
                    : 'Yana shug‘ullanish zarur. Xatolarni o‘rganib chiqing! ✍️'}
                </h3>
                <p className="text-slate-300 text-sm mt-1">
                  Sarflangan vaqt: {formatTime(testResult.timeSpentSeconds)}
                </p>
              </div>

              {/* Big Score Percentage Dial */}
              <div className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-2xl sm:text-3xl shadow-xl shrink-0">
                {testResult.scorePercentage}%
              </div>
            </div>

            {/* Stats Breakdown Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-center">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-xs text-slate-300 block mb-1">Jami savollar</span>
                <span className="text-lg font-black">{testResult.totalQuestions} ta</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
                <span className="text-xs block mb-1">To‘g‘ri javoblar</span>
                <span className="text-lg font-black">{testResult.correctAnswersCount} ta</span>
              </div>
              <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-500/30 text-rose-300">
                <span className="text-xs block mb-1">Noto‘g‘ri javoblar</span>
                <span className="text-lg font-black">{testResult.wrongAnswersCount} ta</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-300">
                <span className="text-xs block mb-1">Umumiy ball</span>
                <span className="text-lg font-black">{testResult.totalPoints} ball</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleStartTest}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Qayta topshirish</span>
            </button>
            <button
              onClick={() => {
                setIsTestStarted(false);
                setIsTestFinished(false);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all"
            >
              <Filter className="w-4 h-4" />
              <span>Yangi test sozlamalari</span>
            </button>
          </div>

          {/* Detailed Question by Question Review & Error Explanations */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-600" />
              <span>Har bir savol tahlili va xatolar izohi</span>
            </h4>

            {testResult.answers.map((ans, idx) => {
              const letterMap = ['A', 'B', 'C', 'D'];
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-3xl border transition-all ${
                    ans.isCorrect
                      ? 'bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800/80'
                      : 'bg-white dark:bg-slate-900 border-rose-300 dark:border-rose-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400">
                      Savol #{idx + 1}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        ans.isCorrect
                          ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      {ans.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>To‘g‘ri</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Xato</span>
                        </>
                      )}
                    </span>
                  </div>

                  <p className="font-bold text-base sm:text-lg text-slate-900 dark:text-white mb-4">
                    {ans.question}
                  </p>

                  {/* Options review */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {ans.options.map((opt, oIdx) => {
                      const isCorrectChoice = oIdx === ans.correctOptionIndex;
                      const isUserChoice = oIdx === ans.selectedOptionIndex;

                      let style = 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800';
                      if (isCorrectChoice) {
                        style = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
                      } else if (isUserChoice && !ans.isCorrect) {
                        style = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200 line-through';
                      }

                      return (
                        <div
                          key={oIdx}
                          className={`p-3 rounded-xl border text-xs sm:text-sm font-mono flex items-center justify-between ${style}`}
                        >
                          <span>
                            {letterMap[oIdx]}) {opt}
                          </span>
                          {isCorrectChoice && (
                            <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
                              (To‘g‘ri javob)
                            </span>
                          )}
                          {isUserChoice && !isCorrectChoice && (
                            <span className="text-[10px] uppercase font-bold text-rose-600 dark:text-rose-400">
                              (Sizning javobingiz)
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed explanation */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-white block mb-1">
                      💡 Tushuntirish:
                    </span>
                    <p>{ans.explanation}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
