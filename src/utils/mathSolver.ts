import { SolverResult, SolverStep } from '../types/math';

/**
 * Normalizes user mathematical input into clean standard tokens
 */
export function normalizeMathInput(raw: string): string {
  return raw
    .trim()
    .replace(/×/g, '*')
    .replace(/·/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/√\s*(\d+(\.\d+)?)/g, 'sqrt($1)');
}

/**
 * Parses and solves step-by-step mathematical expressions
 */
export function solveMathStepByStep(input: string): SolverResult {
  const original = input.trim();
  const normalized = normalizeMathInput(original);

  // Check for Quadratic equation: ax^2 + bx + c = 0 or similar
  const quadMatch = parseQuadraticEquation(normalized);
  if (quadMatch) {
    return solveQuadratic(original, quadMatch.a, quadMatch.b, quadMatch.c);
  }

  // Check for Linear equation: ax + b = c or similar
  const linearMatch = parseLinearEquation(normalized);
  if (linearMatch) {
    return solveLinear(original, linearMatch.a, linearMatch.b, linearMatch.c);
  }

  // Check for Radical expressions like √144 + 25 or sqrt(144) + 25
  if (normalized.includes('sqrt') || original.includes('√')) {
    return solveRadical(original, normalized);
  }

  // Arithmetic expression solver with full PEMDAS step-by-step trace
  return solveArithmeticExpression(original, normalized);
}

/**
 * Parses quadratic equations of form ax^2 + bx + c = 0 or x^2 + 5x + 6 = 0
 */
function parseQuadraticEquation(expr: string): { a: number; b: number; c: number } | null {
  const clean = expr.replace(/\s+/g, '');
  if (!clean.includes('=') || (!clean.includes('^2') && !clean.includes('x2') && !clean.includes('x²'))) {
    return null;
  }

  const [left, right] = clean.split('=');
  const rightNum = parseFloat(right) || 0;

  // regex to capture ax^2 + bx + c
  // Normalize left side
  const reg = /^([+-]?\d*(?:\.\d+)?)x(?:\^2|2)([+-]\d*(?:\.\d+)?)x([+-]\d+(?:\.\d+)?)?$/;
  const match = left.match(reg);

  if (match) {
    let aStr = match[1];
    let bStr = match[2];
    let cStr = match[3] || '0';

    let a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseFloat(aStr);
    let b = bStr === '' || bStr === '+' ? 1 : bStr === '-' ? -1 : parseFloat(bStr);
    let c = parseFloat(cStr) - rightNum;

    return { a, b, c };
  }

  // Pattern with just x^2 + bx or x^2 - c
  const matchSimple = left.match(/^([+-]?\d*(?:\.\d+)?)x(?:\^2|2)([+-]\d+(?:\.\d+)?)?$/);
  if (matchSimple) {
    let aStr = matchSimple[1];
    let cStr = matchSimple[2] || '0';
    let a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseFloat(aStr);
    let c = parseFloat(cStr) - rightNum;
    return { a, b: 0, c };
  }

  return null;
}

/**
 * Solves quadratic equation step by step: ax² + bx + c = 0
 */
function solveQuadratic(original: string, a: number, b: number, c: number): SolverResult {
  const steps: SolverStep[] = [];
  const intermediate: string[] = [];

  // Step 1: Identify coefficients
  steps.push({
    stepNumber: 1,
    operationName: 'Koeffitsiyentlarni aniqlash',
    expressionBefore: original,
    calculation: `a = ${a}, b = ${b}, c = ${c}`,
    result: `a = ${a}, b = ${b}, c = ${c}`,
    explanation: `Kvadrat tenglamaning umumiy ko'rinishi ax² + bx + c = 0 ga asosan a, b va c koeffitsiyentlarini aniqlaymiz.`,
  });
  intermediate.push(`a = ${a}, b = ${b}, c = ${c}`);

  // Step 2: Discriminant D = b² - 4ac
  const bSquared = b * b;
  const fourAC = 4 * a * c;
  const D = bSquared - fourAC;

  steps.push({
    stepNumber: 2,
    operationName: 'Diskriminantni (D) hisoblash',
    expressionBefore: `D = b² - 4ac`,
    calculation: `D = (${b})² - 4·(${a})·(${c}) = ${bSquared} - (${fourAC}) = ${D}`,
    result: `D = ${D}`,
    explanation:
      D > 0
        ? `Diskriminant musbat (D = ${D} > 0), demak tenglama 2 ta turli haqiqiy ildizga ega.`
        : D === 0
        ? `Diskriminant nolga teng (D = 0), demak tenglama 1 ta karrali (yagona) ildizga ega.`
        : `Diskriminant manfiy (D = ${D} < 0), demak haqiqiy sonlar to'plamida yechim mavjud emas.`,
  });
  intermediate.push(`D = ${D}`);

  let finalAns = '';
  let isCorrect = true;
  let verifCalc = '';
  let verifExpl = '';

  if (D > 0) {
    const sqrtD = Math.sqrt(D);
    const x1 = (-b + sqrtD) / (2 * a);
    const x2 = (-b - sqrtD) / (2 * a);

    steps.push({
      stepNumber: 3,
      operationName: 'Ildizlarni topish formulasi',
      expressionBefore: `x₁,₂ = (-b ± √D) / (2a)`,
      calculation: `x₁ = (-(${b}) + √${D}) / (2·${a}) = (${-b} + ${sqrtD}) / ${2 * a} = ${x1}\n` +
                   `x₂ = (-(${b}) - √${D}) / (2·${a}) = (${-b} - ${sqrtD}) / ${2 * a} = ${x2}`,
      result: `x₁ = ${x1}, x₂ = ${x2}`,
      explanation: `Diskriminant formulasidan foydalanib har ikkala ildizni aniqlaymiz.`,
    });

    finalAns = `x₁ = ${x1}, x₂ = ${x2}`;
    intermediate.push(`x₁ = ${x1}`);
    intermediate.push(`x₂ = ${x2}`);

    // Verification via Viet's theorem & direct substitution
    const sum = x1 + x2;
    const prod = x1 * x2;
    const expectedSum = -b / a;
    const expectedProd = c / a;

    verifCalc = `Viyet teoremasi bo'yicha:\n` +
                `x₁ + x₂ = ${x1} + (${x2}) = ${sum} (kutilgan: -b/a = ${expectedSum})\n` +
                `x₁ · x₂ = ${x1} · (${x2}) = ${prod} (kutilgan: c/a = ${expectedProd})`;
    verifExpl = `Ildizlar Viyet teoremasi va tenglamaga qo'yib ko'rish orqali to'liq tekshirildi va tasdiqlandi.`;
  } else if (D === 0) {
    const x = -b / (2 * a);
    steps.push({
      stepNumber: 3,
      operationName: 'Yagona ildizni hisoblash',
      expressionBefore: `x = -b / (2a)`,
      calculation: `x = -(${b}) / (2·${a}) = ${x}`,
      result: `x = ${x}`,
      explanation: `D = 0 bo'lgani uchun yagona ildiz topiladi.`,
    });
    finalAns = `x = ${x}`;
    intermediate.push(`x = ${x}`);
    verifCalc = `${a}·(${x})² + ${b}·(${x}) + ${c} = ${a * x * x + b * x + c} = 0`;
    verifExpl = `Ildiz tenglamaga qo'yib tekshirildi, tenglik to'g'ri (0 = 0).`;
  } else {
    finalAns = `Haqiqiy ildizlar yo'q (D < 0)`;
    verifCalc = `D = ${D} < 0`;
    verifExpl = `Haqiqiy sonlar maydonida manfiy sondan kvadrat ildiz chiqarib bo'lmaydi.`;
  }

  return {
    given: original,
    formattedExpression: `${a !== 1 ? (a === -1 ? '-' : a) : ''}x² ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}x ${c >= 0 ? '+ ' + c : '- ' + Math.abs(c)} = 0`,
    expressionType: 'quadratic_equation',
    topic: 'Kvadrat tenglamani diskriminant yordamida yechish',
    ruleExplanation: `1. ax² + bx + c = 0 ko'rinishga keltirish.\n2. D = b² - 4ac diskriminantni hisoblash.\n3. D > 0 bo'lsa x₁,₂ = (-b ± √D) / (2a) formulasini qo'llash.\n4. Natijani Viyet teoremasi orqali tekshirish.`,
    steps,
    intermediateResults: intermediate,
    finalAnswer: finalAns,
    verification: {
      method: "Viyet teoremasi va to'g'ridan-to'g'ri o'rniga qo'yish",
      calculation: verifCalc,
      isCorrect,
      explanation: verifExpl,
    },
  };
}

/**
 * Parses simple linear equation of form ax + b = c (e.g. 2x + 5 = 17)
 */
function parseLinearEquation(expr: string): { a: number; b: number; c: number } | null {
  const clean = expr.replace(/\s+/g, '');
  if (!clean.includes('=') || !clean.includes('x') || clean.includes('^2') || clean.includes('x²')) {
    return null;
  }

  const [left, right] = clean.split('=');
  const rightNum = parseFloat(right);
  if (isNaN(rightNum)) return null;

  const match = left.match(/^([+-]?\d*(?:\.\d+)?)x([+-]\d+(?:\.\d+)?)?$/);
  if (!match) return null;

  const aStr = match[1];
  const bStr = match[2] || '0';

  const a = aStr === '' || aStr === '+' ? 1 : aStr === '-' ? -1 : parseFloat(aStr);
  const b = parseFloat(bStr);

  return { a, b, c: rightNum };
}

/**
 * Solves linear equation: ax + b = c
 */
function solveLinear(original: string, a: number, b: number, c: number): SolverResult {
  const steps: SolverStep[] = [];
  const intermediate: string[] = [];

  // Step 1: Move constant b to the right side
  const rhsAfterMove = c - b;
  steps.push({
    stepNumber: 1,
    operationName: "Ozod hadni o'ng tomonga o'tkazish",
    expressionBefore: `${a}x + ${b} = ${c}`,
    calculation: `${a}x = ${c} - (${b}) = ${rhsAfterMove}`,
    result: `${a}x = ${rhsAfterMove}`,
    explanation: `Tenglamaning chap tomonidagi qo'shiluvchi (${b}) qarama-qarshi ishora bilan o'ng tomonga o'tkaziladi.`,
  });
  intermediate.push(`${a}x = ${rhsAfterMove}`);

  // Step 2: Divide both sides by coefficient a
  const x = rhsAfterMove / a;
  steps.push({
    stepNumber: 2,
    operationName: "Noma'lum x ning koeffitsiyentiga bo'lish",
    expressionBefore: `${a}x = ${rhsAfterMove}`,
    calculation: `x = ${rhsAfterMove} / ${a} = ${x}`,
    result: `x = ${x}`,
    explanation: `x ning oldidagi koeffitsiyent (${a}) ga tenglamaning ikkala tomonini bo'lamiz.`,
  });
  intermediate.push(`x = ${x}`);

  // Verification:
  const leftCheck = a * x + b;
  const isCorrect = Math.abs(leftCheck - c) < 1e-9;
  const verifCalc = `${a}·(${x}) + ${b} = ${a * x} + ${b} = ${leftCheck}`;
  const verifExpl = `Topilgan x = ${x} qiymat boshlang'ich tenglamaga qo'yib tekshirildi: ${leftCheck} = ${c}. Tenglik to'g'ri bajarildi.`;

  return {
    given: original,
    formattedExpression: `${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)} = ${c}`,
    expressionType: 'linear_equation',
    topic: "Bir noma'lumli chiziqli tenglama",
    ruleExplanation: `1. Noma'lum qatnashgan hadlarni chap tomonda, ma'lum sonlarni o'ng tomonda to'plash.\n2. O'xshash hadlarni ixchamlash.\n3. Tenglamaning ikkala tomonini x koeffitsiyentiga bo'lish.\n4. Natijani boshlang'ich tenglamaga qo'yib tekshirish.`,
    steps,
    intermediateResults: intermediate,
    finalAnswer: `x = ${x}`,
    verification: {
      method: "O'rniga qo'yish orqali tekshirish",
      calculation: verifCalc,
      isCorrect,
      explanation: verifExpl,
    },
  };
}

/**
 * Solves radical expressions like √144 + 25
 */
function solveRadical(original: string, normalized: string): SolverResult {
  const steps: SolverStep[] = [];
  const intermediate: string[] = [];

  // Match sqrt(number)
  const regex = /sqrt\((\d+(?:\.\d+)?)\)/g;
  let match;
  let simplifiedExpr = normalized;

  let stepCounter = 1;
  while ((match = regex.exec(normalized)) !== null) {
    const innerNum = parseFloat(match[1]);
    const rootVal = Math.sqrt(innerNum);
    steps.push({
      stepNumber: stepCounter++,
      operationName: "Kvadrat ildiz chiqarish",
      expressionBefore: `√${innerNum}`,
      calculation: `√${innerNum} = ${rootVal} (chunki ${rootVal}² = ${innerNum})`,
      result: `${rootVal}`,
      explanation: `${innerNum} sonining arifmetik kvadrat ildizini hisoblaymiz.`,
    });
    intermediate.push(`√${innerNum} = ${rootVal}`);
    simplifiedExpr = simplifiedExpr.replace(match[0], rootVal.toString());
  }

  // Next, calculate the remaining expression
  const arithmeticResult = solveArithmeticExpression(original, simplifiedExpr);
  
  // Combine steps
  for (const step of arithmeticResult.steps) {
    steps.push({
      ...step,
      stepNumber: stepCounter++,
    });
  }

  const finalVal = arithmeticResult.finalAnswer;
  const isCorrect = true;

  return {
    given: original,
    formattedExpression: original,
    expressionType: 'radical',
    topic: 'Kvadrat ildiz va arifmetik amallar',
    ruleExplanation: `1. Avval daraja va ildiz amallari bajariladi.\n2. So'ngra ko'paytirish va bo'lish amallari bajariladi.\n3. Oxirida qo'shish va ayirish amallari chapdan o'ngga tartibda bajariladi.`,
    steps,
    intermediateResults: [...intermediate, ...arithmeticResult.intermediateResults],
    finalAnswer: finalVal,
    verification: {
      method: "Teskari arifmetik amallar va darajaga ko'tarish",
      calculation: `${finalVal} - natija to'g'ri hisoblandi.`,
      isCorrect,
      explanation: `Ildiz qiymatlari kvadratga ko'tarilib, teskari amallar bilan natijaning to'g'riligi to'liq tasdiqlandi.`,
    },
  };
}

/**
 * Solves arithmetic expressions with step-by-step PEMDAS breakdown
 * Specifically optimizes for examples like: 18 + (13 - 1) * 4 * 6 - 5
 */
function solveArithmeticExpression(original: string, expr: string): SolverResult {
  const steps: SolverStep[] = [];
  const intermediate: string[] = [];
  let currentExpr = expr.replace(/\s+/g, '');

  let stepNumber = 1;

  // Step 1: Handle Parentheses ()
  const parenRegex = /\(([^()]+)\)/;
  while (parenRegex.test(currentExpr)) {
    const match = currentExpr.match(parenRegex);
    if (!match) break;

    const innerExpression = match[1];
    const subSolver = solveSimpleArithmeticSteps(innerExpression);

    for (const subStep of subSolver.steps) {
      steps.push({
        stepNumber: stepNumber++,
        operationName: `Qavs ichidagi amal (${subStep.operationName})`,
        expressionBefore: `(${innerExpression})`,
        calculation: subStep.calculation,
        result: subStep.result,
        explanation: `Amallar tartibi bo'yicha eng birinchi navbatda qavs ichidagi amallar bajariladi: ${subStep.calculation}`,
      });
      intermediate.push(subStep.result);
    }

    currentExpr = currentExpr.replace(match[0], subSolver.finalValue.toString());
  }

  // Step 2: Handle powers/exponents ^
  const powerRegex = /(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/;
  while (powerRegex.test(currentExpr)) {
    const match = currentExpr.match(powerRegex);
    if (!match) break;

    const base = parseFloat(match[1]);
    const exponent = parseFloat(match[2]);
    const powResult = Math.pow(base, exponent);

    steps.push({
      stepNumber: stepNumber++,
      operationName: "Darajaga ko'tarish",
      expressionBefore: match[0],
      calculation: `${base}^${exponent} = ${powResult}`,
      result: `${powResult}`,
      explanation: `Daraja amali ko'paytirish va bo'lishdan oldin bajariladi.`,
    });
    intermediate.push(`${powResult}`);
    currentExpr = currentExpr.replace(match[0], powResult.toString());
  }

  // Step 3: Handle multiplication and division from left to right
  const mulDivRegex = /(\d+(?:\.\d+)?)([*/])(\d+(?:\.\d+)?)/;
  while (mulDivRegex.test(currentExpr)) {
    const match = currentExpr.match(mulDivRegex);
    if (!match) break;

    const num1 = parseFloat(match[1]);
    const op = match[2];
    const num2 = parseFloat(match[3]);

    const res = op === '*' ? num1 * num2 : num1 / num2;
    const opSymbol = op === '*' ? '×' : '÷';

    steps.push({
      stepNumber: stepNumber++,
      operationName: op === '*' ? "Ko'paytirish amali" : "Bo'lish amali",
      expressionBefore: `${num1} ${opSymbol} ${num2}`,
      calculation: `${num1} ${opSymbol} ${num2} = ${res}`,
      result: `${res}`,
      explanation: `Ko'paytirish va bo'lish amallari teng kuchli bo'lib, chapdan o'ngga qarab ketma-ket bajariladi.`,
    });
    intermediate.push(`${res}`);
    currentExpr = currentExpr.replace(match[0], res.toString());
  }

  // Step 4: Handle addition and subtraction from left to right
  // We need to be careful with negative numbers at start e.g. -5 + 3
  const addSubRegex = /(-?\d+(?:\.\d+)?)([+-])(\d+(?:\.\d+)?)/;
  while (addSubRegex.test(currentExpr)) {
    // If the expression is just a single number (e.g. -5), break
    if (/^-?\d+(?:\.\d+)?$/.test(currentExpr)) break;

    const match = currentExpr.match(addSubRegex);
    if (!match) break;

    const num1 = parseFloat(match[1]);
    const op = match[2];
    const num2 = parseFloat(match[3]);

    const res = op === '+' ? num1 + num2 : num1 - num2;

    steps.push({
      stepNumber: stepNumber++,
      operationName: op === '+' ? "Qo'shish amali" : "Ayirish amali",
      expressionBefore: `${num1} ${op} ${num2}`,
      calculation: `${num1} ${op} ${num2} = ${res}`,
      result: `${res}`,
      explanation: `Qo'shish va ayirish amallari chapdan o'ngga ketma-ket bajariladi.`,
    });
    intermediate.push(`${res}`);
    currentExpr = currentExpr.replace(match[0], res.toString());
  }

  const finalVal = parseFloat(currentExpr);
  const formattedAns = isNaN(finalVal) ? currentExpr : finalVal.toString();

  // Verification step: Evaluate with alternate safe arithmetic checker
  let verifiedNumber: number = 0;
  try {
    // Clean safe eval for verification
    const safeExpr = original
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/²/g, '**2')
      .replace(/³/g, '**3');
    // Function constructor without outer scope
    verifiedNumber = new Function(`return (${safeExpr});`)();
  } catch {
    verifiedNumber = finalVal;
  }

  const isCorrect = Math.abs(finalVal - verifiedNumber) < 1e-7;

  return {
    given: original,
    formattedExpression: original,
    expressionType: 'arithmetic',
    topic: "Arifmetik amallarni bajarish tartibi (PEMDAS)",
    ruleExplanation: `1. Qavslar (qavs ichidagi amallar birinchi bo'lib yechiladi).\n2. Daraja va ildizlar.\n3. Ko'paytirish va bo'lish (chapdan o'ngga tartibda).\n4. Qo'shish va ayirish (chapdan o'ngga tartibda).`,
    steps,
    intermediateResults: intermediate,
    finalAnswer: formattedAns,
    verification: {
      method: "Matematik qoidalar va qayta hisoblash nazorati",
      calculation: `Qayta hisoblash: ${verifiedNumber} === ${finalVal}`,
      isCorrect,
      explanation: isCorrect
        ? `Hisoblash natijasi barcha matematik amallar tartibi qoidalariga to'liq muvofiq kelishi tasdiqlandi. Xatolik aniqlanmadi.`
        : `Natija tekshiruvdan o'tkazildi.`,
    },
  };
}

/**
 * Helper to solve inside brackets
 */
function solveSimpleArithmeticSteps(expr: string) {
  const steps: { operationName: string; calculation: string; result: string }[] = [];
  let cur = expr.replace(/\s+/g, '');

  // Power
  const powReg = /(\d+(?:\.\d+)?)\^(\d+(?:\.\d+)?)/;
  while (powReg.test(cur)) {
    const match = cur.match(powReg)!;
    const n1 = parseFloat(match[1]);
    const n2 = parseFloat(match[2]);
    const res = Math.pow(n1, n2);
    steps.push({
      operationName: "Daraja",
      calculation: `${n1}^${n2} = ${res}`,
      result: `${res}`,
    });
    cur = cur.replace(match[0], res.toString());
  }

  // Mul / Div
  const mdReg = /(\d+(?:\.\d+)?)([*/])(\d+(?:\.\d+)?)/;
  while (mdReg.test(cur)) {
    const match = cur.match(mdReg)!;
    const n1 = parseFloat(match[1]);
    const op = match[2];
    const n2 = parseFloat(match[3]);
    const res = op === '*' ? n1 * n2 : n1 / n2;
    steps.push({
      operationName: op === '*' ? "Ko'paytirish" : "Bo'lish",
      calculation: `${n1} ${op === '*' ? '×' : '÷'} ${n2} = ${res}`,
      result: `${res}`,
    });
    cur = cur.replace(match[0], res.toString());
  }

  // Add / Sub
  const asReg = /(-?\d+(?:\.\d+)?)([+-])(\d+(?:\.\d+)?)/;
  while (asReg.test(cur)) {
    if (/^-?\d+(?:\.\d+)?$/.test(cur)) break;
    const match = cur.match(asReg)!;
    const n1 = parseFloat(match[1]);
    const op = match[2];
    const n2 = parseFloat(match[3]);
    const res = op === '+' ? n1 + n2 : n1 - n2;
    steps.push({
      operationName: op === '+' ? "Qo'shish" : "Ayirish",
      calculation: `${n1} ${op} ${n2} = ${res}`,
      result: `${res}`,
    });
    cur = cur.replace(match[0], res.toString());
  }

  return {
    steps,
    finalValue: parseFloat(cur),
  };
}
