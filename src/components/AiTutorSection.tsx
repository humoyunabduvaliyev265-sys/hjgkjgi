import React, { useState } from 'react';
import {
  BrainCircuit,
  Send,
  Sparkles,
  Bot,
  User,
  RefreshCw,
  Lightbulb,
  GraduationCap,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

export const AiTutorSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: "Assalomu alaykum! Men ILMHUB MATH platformasining AI Matematika Ustoziman. \n\nSiz tushunmagan har qanday matematik mavzu, qoida yoki misolni menga yozing. Men uni birdan quruq javobini berish o'rniga, mohiyatini, amallar tartibini va yechish usulini sodda, qiziqarli tilda qadam-baqadam tushuntirib beraman. \n\nSavolingizni yozavering!",
      timestamp: 'Hozir',
    },
  ]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [grade, setGrade] = useState<number | ''>(8);
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    'Men kvadrat tenglamani tushunmayapman',
    'Kasrlarni qo‘shishda umumiy maxraj qanday topiladi?',
    'Pifagor teoremasi qayerda qo‘llaniladi?',
    'Hosilaning geometrik ma’nosi nima?',
    'Trigonometriyada sinus va kosinus nima o‘zi?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const question = textToSend || inputQuestion;
    if (!question.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim(),
          grade: grade || 8,
        }),
      });

      const data = await response.json();
      const reply = data.reply || data.fallback || "Kechirasiz, javob olishda xatolik yuz berdi.";

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch (err: any) {
      console.error(err);
      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: "Kechirasiz, server bilan bog'lanishda vaqtinchalik muammo bo'ldi. Iltimos, qayta urinib ko'ring.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, tutorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 text-xs font-bold mb-3">
          <BrainCircuit className="w-4 h-4" />
          <span>SUN’IY INTELLEKT MATEMATIKA USTOZI</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Matematika Ustozi
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
          Quruq javob emas, chuqur tushuncha. O‘zbek, rus yoki ingliz tillarida har bir qadamni tushunib o‘rganing.
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-[650px]">
        {/* Top Control Bar (Grade level Selector) */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Ustoz AI
              </h3>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Onlayn yordamchi
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              Sinf darajangiz:
            </span>
            <select
              value={grade}
              onChange={(e) => setGrade(Number(e.target.value))}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((g) => (
                <option key={g} value={g}>
                  {g}-sinf o‘quvchisi
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          {messages.map((msg) => {
            const isTutor = msg.sender === 'tutor';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isTutor ? 'justify-start' : 'justify-end'}`}
              >
                {isTutor && (
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    isTutor
                      ? 'bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 shadow-xs'
                      : 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  }`}
                >
                  <p className="whitespace-pre-line font-normal">{msg.text}</p>
                  <span
                    className={`text-[10px] block mt-2 text-right ${
                      isTutor ? 'text-slate-400' : 'text-blue-200'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {!isTutor && (
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-sm">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-amber-500" />
                <span>Ustoz javob tayyorlamoqda...</span>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompt Bubbles */}
        <div className="pt-2 pb-3 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
            Tezkor savollar:
          </span>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-slate-750 text-xs whitespace-nowrap transition-colors border border-slate-200 dark:border-slate-700 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Field */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center gap-2 shrink-0 pt-2"
        >
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Matematik savolingizni yozing (masalan: Kvadrat tenglama nima?)..."
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
          />
          <button
            type="submit"
            disabled={!inputQuestion.trim() || isLoading}
            className="p-3 rounded-2xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white shadow-md shadow-amber-600/20 transition-all shrink-0"
            aria-label="Send"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
