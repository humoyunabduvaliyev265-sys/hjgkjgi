import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types/math';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MathSolverSection } from './components/MathSolverSection';
import { OrderOfOperationsSection } from './components/OrderOfOperationsSection';
import { GradesSection } from './components/GradesSection';
import { TestSystemSection } from './components/TestSystemSection';
import { FormulasSection } from './components/FormulasSection';
import { CalculatorSection } from './components/CalculatorSection';
import { AiTutorSection } from './components/AiTutorSection';
import { WordProblemsSection } from './components/WordProblemsSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [solverExpression, setSolverExpression] = useState('18 + (13 - 1) × 4 × 6 - 5');
  const [testGradeFilter, setTestGradeFilter] = useState<number | null>(null);

  // Dark mode state with persistent localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ilmhub_math_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ilmhub_math_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ilmhub_math_dark_mode', 'false');
    }
  }, [darkMode]);

  const handleQuickSolve = (expr: string) => {
    setSolverExpression(expr);
    setActiveTab('solver');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartGradeTest = (grade: number) => {
    setTestGradeFilter(grade);
    setActiveTab('tests');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Tab Router View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              setActiveTab={setActiveTab}
              onQuickSolve={handleQuickSolve}
            />

            {/* Quick Demo Solver Section on Home */}
            <div className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/30">
              <MathSolverSection
                initialExpression={solverExpression}
                onOpenAiTutor={() => setActiveTab('ai-tutor')}
              />
            </div>
          </>
        )}

        {activeTab === 'solver' && (
          <MathSolverSection
            initialExpression={solverExpression}
            onOpenAiTutor={() => setActiveTab('ai-tutor')}
          />
        )}

        {activeTab === 'order-of-ops' && <OrderOfOperationsSection />}

        {activeTab === 'grades' && (
          <GradesSection
            onStartGradeTest={handleStartGradeTest}
            onSendToSolver={handleQuickSolve}
          />
        )}

        {activeTab === 'tests' && (
          <TestSystemSection initialGrade={testGradeFilter} />
        )}

        {activeTab === 'formulas' && (
          <FormulasSection onSendToSolver={handleQuickSolve} />
        )}

        {activeTab === 'calculator' && (
          <CalculatorSection onSendToSolver={handleQuickSolve} />
        )}

        {activeTab === 'ai-tutor' && <AiTutorSection />}

        {activeTab === 'problems' && (
          <WordProblemsSection onSendToSolver={handleQuickSolve} />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
