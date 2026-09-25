import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// Server-side Gemini client initialization as required by skill guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Matematik Ustoz Endpoint
app.post('/api/ai-tutor', async (req, res) => {
  try {
    const { question, grade, history = [] } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Savol kiritilmadi" });
    }

    const systemPrompt = `Siz "ILMHUB MATH" ta'lim platformasining do'stona, tajribali va professional Matematika Ustozi (AI Ustoz)siz.
Qoidalar:
1. O'zbek tilida (lotin alifbosida) javob bering (agar foydalanuvchi rus yoki ingliz tilida so'rasa, o'sha tilda ham javob bera olasiz).
2. O'quvchining sinfiga (${grade ? grade + '-sinf' : 'maktab darajasi'}) mos, sodda, tushunarli va qiziqarli tilda tushuntiring.
3. Javobni birdan aytib qo'yishdan ko'ra, tushunchaning mantiqiy ma'nosini va yechish usulini bosqichma-bosqich tushuntiring.
4. Har bir qadamni aniq tartibda ko'rsating.
5. Har doim mavzuga oid 1 ta amaliy mustahkamlovchi misol va uning yechilish ko'rsatmasini bering.
6. Matematik belgilarni chiroyli va o'qilishi oson qilib yozing (masalan, x², √a, a/b, ±).`;

    const contents = [
      {
        role: 'user',
        parts: [{ text: `${systemPrompt}\n\nO'quvchi savoli: "${question}"` }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
    });

    const reply = response.text || "Kechirasiz, javob shakllantirishda xatolik yuz berdi.";
    res.json({ reply });
  } catch (error: any) {
    console.error("AI Tutor error:", error);
    res.status(500).json({
      error: error?.message || "AI xizmati bilan bog'lanishda xatolik yuz berdi",
      fallback: "Hozirda AI xizmati band bo'lishi mumkin. Siz saytdagi tayyor qoidalar, formulalar va masalalar bo'limidan foydalanishingiz mumkin."
    });
  }
});

// Advanced Problem Solver & Verification with Gemini
app.post('/api/solve-math', async (req, res) => {
  try {
    const { expression } = req.body;
    if (!expression) {
      return res.status(400).json({ error: "Ifoda kiritilmadi" });
    }

    const prompt = `Quyidagi matematik ifodani yoki masalani bosqichma-bosqich yeching va javobni qayta tekshiring:
"${expression}"

Javobingizni quyidagi JSON formatida qaytaring:
{
  "given": "${expression}",
  "topic": "Mavzu nomi (masalan: Arifmetik ifoda, Chiziqli tenglama, Kvadrat tenglama)",
  "rulesApplied": "Qo'llanilgan amallar tartibi va matematik qoidalar",
  "steps": [
    { "stepNumber": 1, "description": "Tushuntirish", "calculation": "hisob-kitob", "result": "oraliq natija" }
  ],
  "finalAnswer": "Yakuniy natija",
  "verification": "Javobni qayta tekshirish usuli va tekshiruv natijasi (to'g'riligi isboti)"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error("Solver error:", error);
    res.status(500).json({
      error: error?.message || "Misolni yechishda xatolik",
    });
  }
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ILMHUB MATH server running on port ${PORT}`);
  });
}

startServer();
