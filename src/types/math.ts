export type ActiveTab =
  | 'home'
  | 'solver'
  | 'order-of-ops'
  | 'grades'
  | 'tests'
  | 'formulas'
  | 'calculator'
  | 'ai-tutor'
  | 'problems'
  | 'settings';

export interface SolverStep {
  stepNumber: number;
  operationName: string;
  expressionBefore: string;
  calculation: string;
  result: string;
  explanation: string;
}

export interface SolverResult {
  given: string;
  formattedExpression: string;
  expressionType: 'arithmetic' | 'linear_equation' | 'quadratic_equation' | 'radical' | 'algebraic' | 'ai_solved';
  topic: string;
  ruleExplanation: string;
  steps: SolverStep[];
  intermediateResults: string[];
  finalAnswer: string;
  verification: {
    method: string;
    calculation: string;
    isCorrect: boolean;
    explanation: string;
  };
}

export interface LessonExample {
  title: string;
  problem: string;
  solution: string[];
  answer: string;
  note?: string;
}

export interface PracticeExercise {
  id: string;
  problem: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint: string;
}

export interface GradeTopic {
  id: string;
  title: string;
  iconName: string;
  summary: string;
  theory: string[];
  rules: string[];
  examples: LessonExample[];
  practice: PracticeExercise[];
}

export interface GradeCurriculum {
  grade: number;
  title: string;
  subtitle: string;
  description: string;
  topics: GradeTopic[];
}

export interface FormulaItem {
  id: string;
  name: string;
  category: string;
  formula: string;
  whenToUse: string;
  simpleExplanation: string;
  exampleProblem: string;
  exampleSolution: string;
}

export interface TestQuestion {
  id: string;
  grade: number;
  topic: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface TestResult {
  totalQuestions: number;
  correctAnswersCount: number;
  wrongAnswersCount: number;
  scorePercentage: number;
  totalPoints: number;
  timeSpentSeconds: number;
  answers: {
    questionId: string;
    question: string;
    selectedOptionIndex: number | null;
    correctOptionIndex: number;
    isCorrect: boolean;
    explanation: string;
    options: string[];
  }[];
}

export interface WordProblem {
  id: string;
  title: string;
  difficulty: 'oson' | 'orta' | 'qiyin';
  category:
    | 'sonli'
    | 'harakat'
    | 'ish'
    | 'foiz'
    | 'aralashma'
    | 'geometriya'
    | 'algebra'
    | 'mantiq';
  categoryTitle: string;
  problem: string;
  hint: string;
  steps: string[];
  answer: string;
}
