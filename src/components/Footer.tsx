import React from 'react';
import { ActiveTab } from '../types/math';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center text-white font-extrabold text-base">
                ∑
              </div>
              <span className="font-extrabold text-lg text-slate-900 dark:text-white">
                ILMHUB <span className="text-blue-600">MATH</span>
              </span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md leading-relaxed">
              O‘quvchilarga matematikani oson, tushunarli va interaktiv tarzda o‘rgatadigan zamonaviy ta’lim platformasi. 1-sinfdan 11-sinfgacha to‘liq darslik, bosqichma-bosqich masala yechuvchi va AI ustoz.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Asosiy bo‘limlar
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => setActiveTab('solver')} className="hover:text-blue-600">
                  Masala yechish
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('order-of-ops')} className="hover:text-blue-600">
                  Amallar tartibi (PEMDAS)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('grades')} className="hover:text-blue-600">
                  1-11 sinf darsliklari
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tests')} className="hover:text-blue-600">
                  Test tizimi
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Foydali vositalar
            </h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => setActiveTab('formulas')} className="hover:text-blue-600">
                  Formulalar ma’lumotnomasi
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-blue-600">
                  Matematik kalkulyator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('ai-tutor')} className="hover:text-blue-600">
                  AI Matematik Ustoz
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('problems')} className="hover:text-blue-600">
                  Amaliy masalalar
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ILMHUB MATH. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4">
            <span>Davlat ta’lim standarti (DTS) asosida</span>
            <span>•</span>
            <span>O‘zbekiston ta’lim tizimi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
