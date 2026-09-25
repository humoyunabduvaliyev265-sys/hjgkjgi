import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Play,
  RotateCcw,
} from 'lucide-react';

export const OrderOfOperationsSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const simulationSteps = [
    {
      step: 0,
      title: "Boshlang‘ich ifoda",
      expression: "18 + (13 − 1) × 4 × 6 − 5",
      highlight: "(13 − 1)",
      explanation: "Ifodaga nazar tashlaymiz. Qoidaga binoan eng birinchi navbatda qavs ichidagi amal bajariladi.",
      ruleName: "1-qoida: Qavslar birinchi o‘rinda",
    },
    {
      step: 1,
      title: "1-bosqich: Qavs ichidagi amal",
      expression: "18 + 12 × 4 × 6 − 5",
      calculation: "13 − 1 = 12",
      highlight: "12 × 4",
      explanation: "Qavs yechildi (13 − 1 = 12). Endi ifodada qo‘shish, ko‘paytirish va ayirish qoldi. Ko‘paytirish amallari chapdan o‘ngga tartibda bajariladi.",
      ruleName: "3-qoida: Ko‘paytirish va bo‘lish",
    },
    {
      step: 2,
      title: "2-bosqich: Birinchi ko‘paytirish",
      expression: "18 + 48 × 6 − 5",
      calculation: "12 × 4 = 48",
      highlight: "48 × 6",
      explanation: "12 ni 4 ga ko‘paytirdik: 48. Navbatdagi ko‘paytirish amali: 48 × 6.",
      ruleName: "3-qoida: Ko‘paytirish va bo‘lish",
    },
    {
      step: 3,
      title: "3-bosqich: Ikkinchi ko‘paytirish",
      expression: "18 + 288 − 5",
      calculation: "48 × 6 = 288",
      highlight: "18 + 288",
      explanation: "Barcha ko‘paytirish amallari bajarildi. Endi faqat qo‘shish va ayirish qoldi. Ular teng kuchli bo‘lgani uchun chapdan o‘ngga tartibda bajariladi: 18 + 288.",
      ruleName: "4-qoida: Qo‘shish va ayirish",
    },
    {
      step: 4,
      title: "4-bosqich: Qo‘shish amali",
      expression: "306 − 5",
      calculation: "18 + 288 = 306",
      highlight: "306 − 5",
      explanation: "18 ga 288 ni qo‘shdik: 306. Oxirgi amal ayirish qoldi: 306 − 5.",
      ruleName: "4-qoida: Qo‘shish va ayirish",
    },
    {
      step: 5,
      title: "5-bosqich: Yakuniy ayirish va natija",
      expression: "301",
      calculation: "306 − 5 = 301",
      highlight: "301",
      explanation: "Yakuniy javob: 301. Barcha amallar tartib bilan bekamu ko‘st bajarildi!",
      ruleName: "Yakuniy javob",
    },
  ];

  const rulesData = [
    {
      priority: 1,
      badge: "1-O‘RIN",
      name: "Qavslar (Parentheses)",
      icon: "( )",
      color: "from-blue-600 to-indigo-600",
      description: "Eng yuqori ustuvorlikka ega. Agar bir nechta ichma-ich qavs bo‘lsa, eng ichkaridagi qavsdan boshlab yechiladi.",
      example: "5 × (3 + 4) = 5 × 7 = 35",
      pitfall: "Agar qavs ochilmasdan oldin 5 ni 3 ga ko‘paytirsangiz xato natija chiqadi.",
    },
    {
      priority: 2,
      badge: "2-O‘RIN",
      name: "Daraja va ildiz (Exponents & Roots)",
      icon: "xⁿ / √",
      color: "from-indigo-600 to-violet-600",
      description: "Qavsdan keyingi navbat darajaga ko‘tarish va kvadrat ildiz chiqarish amallariga tegishlidir.",
      example: "3 × 2³ + √16 = 3 × 8 + 4 = 24 + 4 = 28",
      pitfall: "Avval ko‘paytirish emas, avval 2³ = 8 hisoblanadi!",
    },
    {
      priority: 3,
      badge: "3-O‘RIN",
      name: "Ko‘paytirish va bo‘lish (Multiplication & Division)",
      icon: "× / ÷",
      color: "from-violet-600 to-purple-600",
      description: "Bu amallar o‘zaro teng huquqlidir. Shuning uchun ular chapdan o‘ngga qarab qaysi biri birinchi kelsa, shu tartibda bajariladi.",
      example: "20 ÷ 4 × 2 = 5 × 2 = 10 (avval bo‘lish, keyin ko‘paytirish)",
      pitfall: "Bo‘lish va ko‘paytirishda doimo chapdan o‘ngga qarab yuriladi.",
    },
    {
      priority: 4,
      badge: "4-O‘RIN",
      name: "Qo‘shish va ayirish (Addition & Subtraction)",
      icon: "+ / −",
      color: "from-purple-600 to-pink-600",
      description: "Eng oxirgi bosqichda bajariladigan amallar. Ular ham o‘zaro teng kuchli bo‘lib, ifodada chapdan o‘ngga ketma-ket yechiladi.",
      example: "15 − 7 + 4 = 8 + 4 = 12",
      pitfall: "Avval 7 + 4 ni qo‘shib 15 dan 11 ni ayirish xatodir (chunki qavs yo‘q).",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>MATEMATIKA ASOSLARI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Amallarni bajarish tartibi (PEMDAS)
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Matematikada to‘g‘ri javobga erishishning asosi amallar tartibiga qat’iy rioya qilishdir.
        </p>
      </div>

      {/* 4 Core Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {rulesData.map((rule) => (
          <div
            key={rule.priority}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md relative overflow-hidden group hover:border-indigo-400 dark:hover:border-indigo-600 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {rule.badge}
              </span>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr text-white font-mono font-bold flex items-center justify-center text-sm shadow-sm"
                   style={{
                     background: `linear-gradient(135deg, ${
                       rule.priority === 1 ? '#2563eb, #4f46e5' :
                       rule.priority === 2 ? '#4f46e5, #7c3aed' :
                       rule.priority === 3 ? '#7c3aed, #9333ea' : '#9333ea, #db2777'
                     })`
                   }}
              >
                {rule.icon}
              </div>
            </div>

            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-2">
              {rule.priority}. {rule.name}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              {rule.description}
            </p>

            {/* Example Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 mb-3">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Namunaviy misol:
              </span>
              <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {rule.example}
              </span>
            </div>

            {/* Pitfall Alert */}
            <div className="text-xs text-amber-700 dark:text-amber-300/90 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-xl border border-amber-200/70 dark:border-amber-900/40">
              ⚠️ <strong>Diqqat:</strong> {rule.pitfall}
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Step-by-Step Simulator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-2xl border border-indigo-900/50 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTERAKTIV AMALLAR TARTIBI SIMULYATORI</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">
              18 + (13 − 1) × 4 × 6 − 5 qadamma-qadam
            </h3>
          </div>

          {/* Stepper Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeStepIndex === 0}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-xs font-bold transition-all"
            >
              Orqaga
            </button>
            <button
              onClick={() => setActiveStepIndex((prev) => Math.min(simulationSteps.length - 1, prev + 1))}
              disabled={activeStepIndex === simulationSteps.length - 1}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-xs font-bold transition-all flex items-center gap-1"
            >
              <span>Keyingi</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveStepIndex(0)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs transition-all"
              title="Boshidan boshlash"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex gap-2 mb-6">
          {simulationSteps.map((s, idx) => (
            <div
              key={idx}
              onClick={() => setActiveStepIndex(idx)}
              className={`h-1.5 flex-1 rounded-full cursor-pointer transition-all ${
                idx === activeStepIndex
                  ? 'bg-blue-400'
                  : idx < activeStepIndex
                  ? 'bg-indigo-400'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Current State Display */}
        <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10">
          <div className="flex items-center justify-between text-xs text-indigo-300 font-bold uppercase tracking-wider mb-2">
            <span>{simulationSteps[activeStepIndex].title}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {simulationSteps[activeStepIndex].ruleName}
            </span>
          </div>

          <div className="font-mono text-2xl sm:text-4xl font-extrabold my-4 tracking-wider text-amber-300">
            {simulationSteps[activeStepIndex].expression}
          </div>

          {simulationSteps[activeStepIndex].calculation && (
            <div className="text-sm sm:text-base font-mono bg-white/10 px-3.5 py-2 rounded-xl inline-block mb-3 border border-white/10">
              ⚡ {simulationSteps[activeStepIndex].calculation}
            </div>
          )}

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {simulationSteps[activeStepIndex].explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
