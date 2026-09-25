import React, { useState } from 'react';
import {
  Calculator as CalcIcon,
  Delete,
  RotateCcw,
  Sparkles,
  History,
  ArrowRight,
  Check,
  Copy,
} from 'lucide-react';

interface CalculatorSectionProps {
  onSendToSolver: (expr: string) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({
  onSendToSolver,
}) => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [isRad, setIsRad] = useState(false); // Deg / Rad mode
  const [history, setHistory] = useState<{ expr: string; res: string }[]>([]);
  const [copied, setCopied] = useState(false);

  const appendToDisplay = (val: string) => {
    if (display === '0' && val !== '.' && !['+', '−', '×', '÷'].includes(val)) {
      setDisplay(val);
    } else {
      setDisplay((prev) => prev + val);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleFunction = (fn: string) => {
    if (fn === 'sqr') {
      // x²
      setDisplay((prev) => prev + '²');
    } else if (fn === 'cube') {
      // x³
      setDisplay((prev) => prev + '³');
    } else if (fn === 'sqrt') {
      // √
      setDisplay((prev) => (prev === '0' ? '√' : prev + '√'));
    } else if (fn === 'power') {
      setDisplay((prev) => prev + '^');
    } else if (fn === 'percent') {
      setDisplay((prev) => prev + '%');
    } else if (['sin', 'cos', 'tan', 'log', 'ln'].includes(fn)) {
      setDisplay((prev) => (prev === '0' ? `${fn}(` : `${prev}${fn}(`));
    } else if (fn === 'pi') {
      setDisplay((prev) => (prev === '0' ? 'π' : prev + 'π'));
    } else if (fn === 'e') {
      setDisplay((prev) => (prev === '0' ? 'e' : prev + 'e'));
    }
  };

  const calculateResult = () => {
    try {
      let expr = display;
      setExpression(expr);

      // Preprocessing
      let jsExpr = expr
        .replace(/×/g, '*')
        .replace(/·/g, '*')
        .replace(/÷/g, '/')
        .replace(/−/g, '-')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/²/g, '**2')
        .replace(/³/g, '**3')
        .replace(/\^/g, '**')
        .replace(/√(\d+(\.\d+)?)/g, 'Math.sqrt($1)')
        .replace(/√/g, 'Math.sqrt')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(');

      // Handle sin, cos, tan with deg/rad consideration
      if (!isRad) {
        // Degree mode: angle * (Math.PI / 180)
        jsExpr = jsExpr.replace(/sin\(([^()]+)\)/g, 'Math.sin(($1) * Math.PI / 180)');
        jsExpr = jsExpr.replace(/cos\(([^()]+)\)/g, 'Math.cos(($1) * Math.PI / 180)');
        jsExpr = jsExpr.replace(/tan\(([^()]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');
      } else {
        jsExpr = jsExpr.replace(/sin\(/g, 'Math.sin(');
        jsExpr = jsExpr.replace(/cos\(/g, 'Math.cos(');
        jsExpr = jsExpr.replace(/tan\(/g, 'Math.tan(');
      }

      // Handle %
      jsExpr = jsExpr.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

      // Safe evaluate
      const calculated = new Function(`return (${jsExpr});`)();
      let resStr = '';
      if (typeof calculated === 'number') {
        // Fix float precision issues
        resStr = Math.abs(calculated) < 1e-12 ? '0' : Number(calculated.toFixed(8)).toString();
      } else {
        resStr = calculated.toString();
      }

      setDisplay(resStr);
      setHistory((prev) => [{ expr: display, res: resStr }, ...prev.slice(0, 7)]);
    } catch (err) {
      setDisplay('Xato');
    }
  };

  const handleCopyResult = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-xs font-bold mb-3">
          <CalcIcon className="w-4 h-4" />
          <span>ILMIY & MUHANDISLIK KALKULYATORI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Professional matematika kalkulyatori
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Arifmetika, trigonometriya, darajalar, ildizlar, logarifmlar va o‘zgarmaslar (π, e) bilan aniq hisoblang.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Calculator Body */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
          {/* Top Options Bar (Deg/Rad toggle, Copy, Transfer to Solver) */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setIsRad(!isRad)}
              className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              Rejim: <span className="text-blue-600 dark:text-blue-400">{isRad ? 'RAD' : 'DEG'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyResult}
                className="flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                title="Natijani nusxalash"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Nusxalandi' : 'Nusxa'}</span>
              </button>
              <button
                onClick={() => onSendToSolver(display)}
                className="flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors"
                title="Masala yechish bo‘limida bosqichma-bosqich ko‘rish"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                <span>Bosqichma-bosqich yechish</span>
              </button>
            </div>
          </div>

          {/* Calculator Screen Display */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white font-mono text-right mb-6 shadow-inner border border-slate-800">
            <div className="text-xs text-slate-400 h-5 tracking-wider truncate">
              {expression}
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight overflow-x-auto whitespace-nowrap text-amber-300 py-1">
              {display}
            </div>
          </div>

          {/* Keypad Buttons Grid */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-2.5">
            {/* Row 1: Sci functions */}
            <button
              onClick={() => handleFunction('sin')}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm font-mono transition-colors"
            >
              sin
            </button>
            <button
              onClick={() => handleFunction('cos')}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm font-mono transition-colors"
            >
              cos
            </button>
            <button
              onClick={() => handleFunction('tan')}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm font-mono transition-colors"
            >
              tan
            </button>
            <button
              onClick={() => handleFunction('pi')}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm font-mono transition-colors"
            >
              π
            </button>
            <button
              onClick={handleClear}
              className="py-3 rounded-xl bg-rose-100 dark:bg-rose-950/60 hover:bg-rose-200 dark:hover:bg-rose-900 text-rose-700 dark:text-rose-300 font-bold text-xs sm:text-sm transition-colors"
            >
              AC (Tozalash)
            </button>

            {/* Row 2: Powers, Roots, Log */}
            <button
              onClick={() => handleFunction('sqr')}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm font-mono transition-colors"
            >
              x²
            </button>
            <button
              onClick={() => handleFunction('cube')}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm font-mono transition-colors"
            >
              x³
            </button>
            <button
              onClick={() => handleFunction('power')}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm font-mono transition-colors"
            >
              xʸ
            </button>
            <button
              onClick={() => handleFunction('sqrt')}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm font-mono transition-colors"
            >
              √x
            </button>
            <button
              onClick={handleBackspace}
              className="py-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm flex items-center justify-center transition-colors"
            >
              <Delete className="w-4 h-4" />
            </button>

            {/* Row 3: Log, ln, Brackets, Div */}
            <button
              onClick={() => handleFunction('log')}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm font-mono transition-colors"
            >
              log
            </button>
            <button
              onClick={() => handleFunction('ln')}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm font-mono transition-colors"
            >
              ln
            </button>
            <button
              onClick={() => appendToDisplay('(')}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm font-mono transition-colors"
            >
              (
            </button>
            <button
              onClick={() => appendToDisplay(')')}
              className="py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm font-mono transition-colors"
            >
              )
            </button>
            <button
              onClick={() => appendToDisplay(' ÷ ')}
              className="py-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-extrabold text-base transition-colors"
            >
              ÷
            </button>

            {/* Row 4: 7, 8, 9, Mul */}
            <button
              onClick={() => appendToDisplay('7')}
              className="py-3.5 rounded-xl bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white font-extrabold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
            >
              7
            </button>
            <button
              onClick={() => appendToDisplay('8')}
              className="py-3.5 rounded-xl bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white font-extrabold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
            >
              8
            </button>
            <button
              onClick={() => appendToDisplay('9')}
              className="py-3.5 rounded-xl bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white font-extrabold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
            >
              9
            </button>
            <button
              onClick={() => handleFunction('percent')}
              className="py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-base transition-colors"
            >
              %
            </button>
            <button
              onClick={() => appendToDisplay(' × ')}
              className="py-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-extrabold text-base transition-colors"
            >
              ×
            </button>

            {/* Row 5: 4, 5, 6, Sub */}
            <button
              onClick={() => appendToDisplay('4')}
              className="py-3.5 rounded-xl bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white font-extrabold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
            >
              4
            </button>
            <button
              onClick={() => appendToDisplay('5')}
              className="py-3.5 rounded-xl bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white font-extrabold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
            >
              5
            </button>
            <button
              onClick={() => appendToDisplay('6')}
              className="py-3.5 rounded-xl bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white font-extrabold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
            >
              6
            </button>
            <button
              onClick={() => handleFunction('e')}
              className="py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-sm font-mono transition-colors"
            >
              e
            </button>
            <button
              onClick={() => appendToDisplay(' − ')}
              className="py-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-extrabold text-base transition-colors"
            >
              −
            </button>

            {/* Row 6: 1, 2, 3, Add */}
            <button
              onClick={() => appendToDisplay('1')}
              className="py-3.5 rounded-xl bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white font-extrabold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
            >
              1
            </button>
            <button
              onClick={() => appendToDisplay('2')}
              className="py-3.5 rounded-xl bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white font-extrabold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
            >
              2
            </button>
            <button
              onClick={() => appendToDisplay('3')}
              className="py-3.5 rounded-xl bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white font-extrabold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors"
            >
              3
            </button>
            <button
              onClick={() => appendToDisplay('.')}
              className="py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-extrabold text-lg transition-colors"
            >
              .
            </button>
            <button
              onClick={() => appendToDisplay(' + ')}
              className="py-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-extrabold text-base transition-colors"
            >
              +
            </button>

            {/* Row 7: 0, =, etc. */}
            <button
              onClick={() => appendToDisplay('0')}
              className="py-3.5 rounded-xl bg-white dark:bg-slate-800/90 text-slate-900 dark:text-white font-extrabold text-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors col-span-2"
            >
              0
            </button>
            <button
              onClick={() => appendToDisplay('00')}
              className="py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm transition-colors"
            >
              00
            </button>
            <button
              onClick={calculateResult}
              className="col-span-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white font-black text-xl shadow-lg shadow-blue-500/25 hover:from-blue-700 hover:to-violet-700 transition-all"
            >
              =
            </button>
          </div>
        </div>

        {/* History Log Panel */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-4 h-4 text-amber-500" />
              <span>Hisob-kitoblar tarixi</span>
            </h3>
            {history.length > 0 && (
              <button
                onClick={() => setHistory([])}
                className="text-xs text-rose-500 hover:underline"
              >
                Tozalash
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <p className="text-xs text-slate-400 py-8 text-center">
              Hozircha hisob-kitoblar tarixi mavjud emas. Biror amalni bajaring.
            </p>
          ) : (
            <div className="space-y-2.5">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setDisplay(item.res)}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 cursor-pointer hover:border-blue-400 transition-all"
                >
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                    {item.expr}
                  </div>
                  <div className="text-base font-mono font-bold text-slate-900 dark:text-white flex items-center justify-between mt-1">
                    <span>= {item.res}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSendToSolver(item.expr);
                      }}
                      className="text-[11px] text-blue-600 hover:underline flex items-center gap-0.5"
                    >
                      <span>Yechish</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
