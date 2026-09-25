import { GradeCurriculum } from '../types/math';

export const GRADES_DATA: GradeCurriculum[] = [
  {
    grade: 1,
    title: '1-sinf: Boshlang‘ich matematika asoslari',
    subtitle: 'Sonlar bilan tanishuv, sanash, qo‘shish va ayirish amallari',
    description: '1-sinf o‘quvchilari uchun raqamlar, sonlar tartibi, birliklar va o‘nliklar, 20 ichida qo‘shish va ayirish hamda sodda hayotiy masalalar.',
    topics: [
      {
        id: 'g1-t1',
        title: 'Sonlar va sanoq',
        iconName: 'Hash',
        summary: '0 dan 20 gacha bo‘lgan sonlarni yozish, taqqoslash va tartiblash.',
        theory: [
          'Raqamlar – bu sonlarni yozish uchun ishlatiladigan 10 ta belgi: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.',
          'Sonlar to‘g‘ri sanoq (1, 2, 3...) va teskari sanoq (10, 9, 8...) tartibida aytiladi.',
          'Sonlarni taqqoslashda >, < va = belgilaridan foydalaniladi (masalan: 7 > 4, 5 < 9, 8 = 8).',
        ],
        rules: [
          'Har doim chapdagi son o‘ngdagiga qarab taqqoslanadi.',
          'Nol (0) hech qanday miqdor yo‘qligini bildiradi.',
        ],
        examples: [
          {
            title: 'Sonlarni taqqoslash',
            problem: '8 va 5 sonlarini taqqoslang',
            solution: ['8 soni 5 dan katta, chunki sanoqda 8 keyin keladi.', 'Yozilishi: 8 > 5.'],
            answer: '8 > 5',
          },
        ],
        practice: [
          {
            id: 'g1-p1',
            problem: 'Qaysi son 6 dan katta, ammo 8 dan kichik?',
            options: ['5', '7', '9', '4'],
            correctAnswer: '7',
            explanation: '6 va 8 sonlari orasida 7 soni joylashgan.',
            hint: 'Sonlar qatorini eslang: 6, ?, 8',
          },
        ],
      },
      {
        id: 'g1-t2',
        title: 'Qo‘shish amali',
        iconName: 'Plus',
        summary: 'Ikki yoki undan ortiq to‘plamni birlashtirish va yig‘indini topish.',
        theory: [
          'Qo‘shish amali "+" (plyus) belgisi bilan ko‘rsatiladi.',
          'Qo‘shiluvchi + Qo‘shiluvchi = Yig‘indi.',
          'Qo‘shiluvchilarning o‘rni almashgani bilan yig‘indi o‘zgarmaydi: 3 + 4 = 4 + 3 = 7.',
        ],
        rules: [
          'Nolga har qanday son qo‘shilsa, o‘sha sonning o‘zi chiqadi: a + 0 = a.',
        ],
        examples: [
          {
            title: 'Yig‘indini hisoblash',
            problem: '7 + 5 amalini hisoblang',
            solution: ['7 ga 3 ni qo‘shib 10 hosil qilamiz: 7 + 3 = 10', 'Qolgan 2 ni qo‘shamiz: 10 + 2 = 12'],
            answer: '12',
          },
        ],
        practice: [
          {
            id: 'g1-p2',
            problem: 'Bog‘da 6 ta olma va 4 ta nok pishdi. Jami mevalar soni nechta?',
            options: ['9', '10', '11', '8'],
            correctAnswer: '10',
            explanation: '6 + 4 = 10 ta meva.',
            hint: '6 ga 4 ni qo‘shing.',
          },
        ],
      },
      {
        id: 'g1-t3',
        title: 'Ayirish amali',
        iconName: 'Minus',
        summary: 'Narsalar to‘plamidan bir qismini olib tashlash va qoldiqni aniqlash.',
        theory: [
          'Ayirish amali "−" (minus) belgisi bilan yoziladi.',
          'Kamayuvchi − Ayriluvchi = Ayirma.',
          'Sondan o‘sha sonning o‘zi ayirilsa, 0 hosil bo‘ladi: 9 − 9 = 0.',
        ],
        rules: [
          'Sondan nol ayirilsa, son o‘zgarmaydi: a − 0 = a.',
        ],
        examples: [
          {
            title: 'Ayirmani topish',
            problem: '15 − 7 amalini hisoblang',
            solution: ['15 dan avval 5 ni ayiramiz: 15 − 5 = 10', 'So‘ngra qolgan 2 ni ayiramiz: 10 − 2 = 8'],
            answer: '8',
          },
        ],
        practice: [
          {
            id: 'g1-p3',
            problem: '14 − 6 ayirma nechaga teng?',
            options: ['7', '8', '9', '6'],
            correctAnswer: '8',
            explanation: '14 − 6 = 8.',
            hint: '14 dan 4 ni olib tashlang, so‘ng yana 2 ni oling.',
          },
        ],
      },
      {
        id: 'g1-t4',
        title: 'Oddiy masalalar',
        iconName: 'HelpCircle',
        summary: 'Bitta amalli sodda matnli masalalarni tahlil qilish va yechish.',
        theory: [
          'Masala sharti – nima berilganligi.',
          'Masala savoli – nima topilishi kerakligi.',
          '"Nechta ko‘p" desa qo‘shiladi, "nechta kam" desa ayiriladi.',
        ],
        rules: [
          'Masalani yechishdan oldin shartini yaxshilab o‘qib chiqing.',
        ],
        examples: [
          {
            title: 'Kitoblar masalasi',
            problem: 'Javonda 9 ta kitob bor edi. Anvar yana 4 ta kitob qo‘ydi. Javonda jami nechta kitob bo‘ldi?',
            solution: ['Boshida bor edi: 9 ta', 'Qo‘yildi: 4 ta', 'Jami: 9 + 4 = 13 ta'],
            answer: '13 ta',
          },
        ],
        practice: [
          {
            id: 'g1-p4',
            problem: 'Savatchada 12 ta shaftoli bor edi. Bolalar 5 tasini yeyishdi. Qancha shaftoli qoldi?',
            options: ['6', '7', '8', '9'],
            correctAnswer: '7',
            explanation: '12 − 5 = 7 ta shaftoli qoldi.',
            hint: 'Yeyilgani uchun ayirish kerak.',
          },
        ],
      },
    ],
  },
  {
    grade: 2,
    title: '2-sinf: Ko‘paytirish va bo‘lish olami',
    subtitle: 'Ko‘paytirish jadvali, teng bo‘lish va 100 ichidagi hisob-kitoblar',
    description: 'Ko‘paytirish va bo‘lish mantiqiy ma’nosi, qoldiqsiz bo‘lish, 100 gacha sonlar ustida amallar.',
    topics: [
      {
        id: 'g2-t1',
        title: 'Ko‘paytirish amali',
        iconName: 'X',
        summary: 'Bir xil qo‘shiluvchilar yig‘indisini qisqacha ko‘paytirish orqali ifodalash.',
        theory: [
          'Ko‘paytirish – bir xil sonlarni bir necha bor qo‘shishning qisqa yozuvidir: 4 + 4 + 4 = 4 × 3 = 12.',
          'Ko‘paytuvchi × Ko‘paytuvchi = Ko‘paytma.',
          'O‘rin almashtirish qonuni: a × b = b × a.',
        ],
        rules: [
          'Har qanday sonni 1 ga ko‘paytirsa, o‘sha son chiqadi: a × 1 = a.',
          'Har qanday sonni 0 ga ko‘paytirsa, 0 chiqadi: a × 0 = 0.',
        ],
        examples: [
          {
            title: 'Ko‘paytirish jadvali',
            problem: '6 × 7 ko‘paytmani hisoblang',
            solution: ['Ko‘paytirish jadvaliga asosan: 6 × 7 = 42'],
            answer: '42',
          },
        ],
        practice: [
          {
            id: 'g2-p1',
            problem: 'Har bir qutida 8 tadan qalam bor. 5 ta qutida jami nechta qalam bor?',
            options: ['35', '40', '45', '48'],
            correctAnswer: '40',
            explanation: '8 × 5 = 40 ta qalam.',
            hint: '8 ni 5 ga ko‘paytiring.',
          },
        ],
      },
      {
        id: 'g2-t2',
        title: 'Bo‘lish amali',
        iconName: 'Divide',
        summary: 'Teng bo‘laklarga ajratish va ko‘paytirishga teskari amal.',
        theory: [
          'Bo‘linuvchi ÷ Bo‘luvchi = Bo‘linma.',
          'Nolga bo‘lish mumkin emas!',
          'Sonni o‘ziga bo‘lsa, 1 chiqadi: a ÷ a = 1.',
        ],
        rules: [
          'Nolni har qanday noldan farqli songa bo‘lsa, 0 chiqadi: 0 ÷ b = 0.',
        ],
        examples: [
          {
            title: 'Teng taqsimlash',
            problem: '24 ta daftarni 4 nafar o‘quvchiga teng taqsimlang',
            solution: ['24 ÷ 4 = 6', 'Har bir o‘quvchi 6 tadan daftar oladi.'],
            answer: '6 tadan',
          },
        ],
        practice: [
          {
            id: 'g2-p2',
            problem: '36 ÷ 6 amali natijasi nechaga teng?',
            options: ['4', '5', '6', '7'],
            correctAnswer: '6',
            explanation: '6 × 6 = 36 bo‘lgani uchun 36 ÷ 6 = 6.',
            hint: 'Qaysi sonni 6 ga ko‘paytirsa 36 bo‘ladi?',
          },
        ],
      },
      {
        id: 'g2-t3',
        title: '100 ichidagi sonlar',
        iconName: 'Layers',
        summary: 'O‘nliklar, birliklar va ikki xonali sonlar tuzilishi.',
        theory: [
          'Ikki xonali sonlar o‘nliklar va birliklardan iborat.',
          'Masalan: 47 = 4 ta o‘nlik + 7 ta birlik (40 + 7).',
        ],
        rules: [
          'Ustun shaklida qo‘shish va ayirishda birliklar tagiga birliklar, o‘nliklar tagiga o‘nliklar yoziladi.',
        ],
        examples: [
          {
            title: 'Ustun shaklida qo‘shish',
            problem: '48 + 35 amalini hisoblang',
            solution: ['8 + 5 = 13 (3 birlik yoziladi, 1 o‘nlik dilda)', '4 + 3 + 1 = 8 o‘nlik', 'Natija: 83'],
            answer: '83',
          },
        ],
        practice: [
          {
            id: 'g2-p3',
            problem: '90 − 36 ayirma nechaga teng?',
            options: ['54', '64', '56', '46'],
            correctAnswer: '54',
            explanation: '90 − 30 = 60; 60 − 6 = 54.',
            hint: 'Avval o‘nliklarni, keyin birliklarni ayiring.',
          },
        ],
      },
      {
        id: 'g2-t4',
        title: 'Ikki amalli masalalar',
        iconName: 'FileText',
        summary: 'Ketma-ket ikki bosqichda yechiladigan amaliy masalalar.',
        theory: [
          'Avval qavs ichidagi yoki oraliq savolga javob topiladi, keyin asosiy savol yechiladi.',
        ],
        rules: ['Oraliq natijani aniq belgilab oling.'],
        examples: [
          {
            title: 'Magazin masalasi',
            problem: 'Akmalda 50 so‘m bor edi. U 15 so‘mga qalam va 20 so‘mga daftar sotib oldi. Unda qancha pul qoldi?',
            solution: ['Xaridlar jami: 15 + 20 = 35 so‘m', 'Qolgan pul: 50 − 35 = 15 so‘m'],
            answer: '15 so‘m',
          },
        ],
        practice: [
          {
            id: 'g2-p4',
            problem: 'Avtobusda 25 yo‘lovchi bor edi. Bekatda 8 kishi tushdi va 5 kishi chiqdi. Avtobusda nechta yo‘lovchi bo‘ldi?',
            options: ['22', '24', '20', '26'],
            correctAnswer: '22',
            explanation: '25 − 8 = 17; 17 + 5 = 22.',
            hint: 'Avval tushganlarni ayiring, keyin chiqqanlarni qo‘shing.',
          },
        ],
      },
    ],
  },
  {
    grade: 3,
    title: '3-sinf: Ko‘p xonali sonlar, kasrlar va geometriya',
    subtitle: '1000 ichida hisoblash, kasr tushunchasi va sodda shakllar',
    description: 'Ko‘paytirish va bo‘lish algoritmlari, qoldiqli bo‘lish, oddiy kasrlar bilan tanishuv va geometrik perimetr.',
    topics: [
      {
        id: 'g3-t1',
        title: 'Ko‘paytirish va bo‘lish (1000 ichida)',
        iconName: 'Calculator',
        summary: 'Ko‘p xonali sonlarni bir xonali songa ko‘paytirish va bo‘lish.',
        theory: [
          'Ko‘paytirishni xona birliklari bo‘yicha ajratish: 124 × 3 = (100×3) + (20×3) + (4×3) = 300 + 60 + 12 = 372.',
          'Qoldiqli bo‘lish: Bo‘linuvchi = Bo‘luvchi × To‘liqsiz bo‘linma + Qoldiq (qoldiq < bo‘luvchi).',
        ],
        rules: ['Qoldiq har doim bo‘luvchidan kichik bo‘lishi shart!'],
        examples: [
          {
            title: 'Qoldiqli bo‘lish',
            problem: '27 ni 4 ga bo‘ling',
            solution: ['27 ichida 4 soni 6 marta joylashadi: 4 × 6 = 24', 'Qoldiq: 27 − 24 = 3', 'Javob: 6 (qoldiq 3)'],
            answer: '6 (qoldiq 3)',
          },
        ],
        practice: [
          {
            id: 'g3-p1',
            problem: '45 ÷ 6 amali bajarilganda qoldiq necha bo‘ladi?',
            options: ['2', '3', '4', '1'],
            correctAnswer: '3',
            explanation: '6 × 7 = 42; 45 − 42 = 3 qoldiq.',
            hint: '45 dan kichik 6 ga bo‘linadigan eng katta son 42.',
          },
        ],
      },
      {
        id: 'g3-t2',
        title: 'Kasrlarning boshlang‘ich tushunchasi',
        iconName: 'PieChart',
        summary: 'Butunning teng ulushlari, surat va maxraj.',
        theory: [
          'Butun narsa bir necha teng bo‘lakka bo‘linganda hosil bo‘lgan bo‘laklar kasr deyiladi.',
          'Kasr chizig‘ining tagida maxraj (nechta teng bo‘lakka bo‘lingani), tepasida surat (nechtasi olingani) yoziladi.',
          'Masalan: 1/2 – yarim, 1/4 – chorak.',
        ],
        rules: ['Surati maxrajidan kichik kasr to‘g‘ri kasr deyiladi.'],
        examples: [
          {
            title: 'Pitsa bo‘laklari',
            problem: 'Pitsa 8 ta teng bo‘lakka bo‘lindi va 3 bo‘lagi yeyildi. Pitsaning qanday qismi yeyildi?',
            solution: ['Maxraj – jami bo‘laklar: 8', 'Surat – yeyilgan bo‘laklar: 3', 'Kasr: 3/8'],
            answer: '3/8',
          },
        ],
        practice: [
          {
            id: 'g3-p2',
            problem: 'Kvadrat 4 ta teng qismga bo‘linib, 1 qismi bo‘yaldi. Bo‘yalgan qism qaysi kasrga teng?',
            options: ['1/2', '1/3', '1/4', '3/4'],
            correctAnswer: '1/4',
            explanation: '4 bo‘lakdan 1 tasi olingan, ya’ni 1/4.',
            hint: 'Maxraj 4, surat 1.',
          },
        ],
      },
      {
        id: 'g3-t3',
        title: 'Geometriya va Perimetr',
        iconName: 'Square',
        summary: 'Nuqta, kesma, to‘g‘ri to‘rtburchak, kvadrat va perimetrni hisoblash.',
        theory: [
          'Perimetr (P) – ko‘pburchakning barcha tomonlari uzunliklari yig‘indisidir.',
          'Kvadrat perimetri: P = 4 × a.',
          'To‘g‘ri to‘rtburchak perimetri: P = 2 × (a + b).',
        ],
        rules: ['Barcha tomonlar bir xil o‘lchov birligida (sm, m) bo‘lishi kerak.'],
        examples: [
          {
            title: 'To‘g‘ri to‘rtburchak perimetri',
            problem: 'Bo‘yi 8 sm, eni 5 sm bo‘lgan to‘g‘ri to‘rtburchak perimetrini toping',
            solution: ['P = 2 × (8 + 5) = 2 × 13 = 26 sm'],
            answer: '26 sm',
          },
        ],
        practice: [
          {
            id: 'g3-p3',
            problem: 'Tomoni 7 sm bo‘lgan kvadratning perimetri necha sm?',
            options: ['21 sm', '28 sm', '35 sm', '49 sm'],
            correctAnswer: '28 sm',
            explanation: 'P = 4 × 7 = 28 sm.',
            hint: 'Kvadratning 4 ta tomoni teng: 4 × a.',
          },
        ],
      },
      {
        id: 'g3-t4',
        title: 'Murakkab matnli masalalar',
        iconName: 'BookOpen',
        summary: 'Taqqoslama, narx-miqdor-qiymat munosabatlari.',
        theory: [
          'Narx × Miqdor = Qiymat.',
          'Qiymat ÷ Miqdor = Narx.',
        ],
        rules: ['Savol nima haqidaligiga qarab formulani tanlang.'],
        examples: [
          {
            title: 'Xarid masalasi',
            problem: '1 dona daftar 1200 so‘m. 5 ta daftar qancha turadi?',
            solution: ['1200 × 5 = 6000 so‘m'],
            answer: '6000 so‘m',
          },
        ],
        practice: [
          {
            id: 'g3-p4',
            problem: '4 ta bir xil ruchka uchun 8000 so‘m to‘landi. 1 ta ruchka necha so‘m turadi?',
            options: ['1500 so‘m', '2000 so‘m', '2500 so‘m', '1800 so‘m'],
            correctAnswer: '2000 so‘m',
            explanation: '8000 ÷ 4 = 2000 so‘m.',
            hint: 'Jami pulni ruchkalar soniga bo‘ling.',
          },
        ],
      },
    ],
  },
  {
    grade: 4,
    title: '4-sinf: Ko‘p xonali sonlar va tenglamalar',
    subtitle: 'Murakkab amallar, yuzalar, kasrlar va bir noma’lumli tenglamalar',
    description: 'Million ichida amallar, amallar tartibi qoidasi, yuzani hisoblash (S = a × b), sodda tenglamalarni yechish.',
    topics: [
      {
        id: 'g4-t1',
        title: 'Murakkab arifmetik amallar',
        iconName: 'Cpu',
        summary: 'Qavsli ifodalar va amallar ketma-ketligini to‘g‘ri bajarish.',
        theory: [
          'Amallar tartibi: 1) Qavs ichi; 2) Ko‘paytirish va bo‘lish; 3) Qo‘shish va ayirish.',
          'Barcha amallar chapdan o‘ngga qarab bajariladi.',
        ],
        rules: ['Qavs ichidagi amallar har doim mutlaq ustuvorlikka ega.'],
        examples: [
          {
            title: 'Amallar tartibi',
            problem: '40 + (25 − 5) × 3 amalini hisoblang',
            solution: ['1) Qavs: 25 − 5 = 20', '2) Ko‘paytirish: 20 × 3 = 60', '3) Qo‘shish: 40 + 60 = 100'],
            answer: '100',
          },
        ],
        practice: [
          {
            id: 'g4-p1',
            problem: '50 − 10 × 4 + 8 ifoda qiymatini toping.',
            options: ['168', '18', '28', '22'],
            correctAnswer: '18',
            explanation: '10 × 4 = 40; 50 − 40 = 10; 10 + 8 = 18.',
            hint: 'Avval 10 ni 4 ga ko‘paytiring!',
          },
        ],
      },
      {
        id: 'g4-t2',
        title: 'Kasrlar bilan amallar',
        iconName: 'PieChart',
        summary: 'Bir xil maxrajli kasrlarni qo‘shish va ayirish.',
        theory: [
          'Bir xil maxrajli kasrlarni qo‘shishda maxraj o‘zgarishsiz qoladi, suratlar qo‘shiladi: a/c + b/c = (a+b)/c.',
          'Bir xil maxrajli kasrlarni ayirishda suratlar ayiriladi: a/c − b/c = (a−b)/c.',
        ],
        rules: ['Maxrajlar hech qachon bir-biriga qo‘shilmaydi!'],
        examples: [
          {
            title: 'Kasrlarni qo‘shish',
            problem: '3/7 + 2/7 amalini hisoblang',
            solution: ['(3 + 2) / 7 = 5/7'],
            answer: '5/7',
          },
        ],
        practice: [
          {
            id: 'g4-p2',
            problem: '7/10 − 3/10 ayirma nimaga teng?',
            options: ['4/10', '4/20', '4/0', '10/10'],
            correctAnswer: '4/10',
            explanation: '(7 − 3)/10 = 4/10.',
            hint: 'Maxraj 10 saqlanadi, suratlarni ayiring.',
          },
        ],
      },
      {
        id: 'g4-t3',
        title: 'Boshlang‘ich tenglamalar',
        iconName: 'Key',
        summary: 'Noma’lum x ni topish qoidalari.',
        theory: [
          'Noma’lum qo‘shiluvchini topish uchun yig‘indidan ma’lum qo‘shiluvchi ayiriladi: x + a = b => x = b − a.',
          'Noma’lum ko‘paytuvchini topish uchun ko‘paytma ma’lum ko‘paytuvchiga bo‘linadi: x × a = b => x = b ÷ a.',
        ],
        rules: ['Tenglikning ikkala tomoni teng qiymatga ega bo‘lishi lozim.'],
        examples: [
          {
            title: 'Tenglamani yechish',
            problem: 'x + 45 = 120 tenglamadan x ni toping',
            solution: ['x = 120 − 45', 'x = 75'],
            answer: 'x = 75',
          },
        ],
        practice: [
          {
            id: 'g4-p3',
            problem: '4 × x = 96 tenglamaning ildizi nechaga teng?',
            options: ['22', '24', '26', '28'],
            correctAnswer: '24',
            explanation: 'x = 96 ÷ 4 = 24.',
            hint: '96 ni 4 ga bo‘ling.',
          },
        ],
      },
      {
        id: 'g4-t4',
        title: 'Yuzani o‘lchash (S = a × b)',
        iconName: 'Grid',
        summary: 'To‘g‘ri to‘rtburchak va kvadrat yuzasini kvadrat birliklarda hisoblash.',
        theory: [
          'To‘g‘ri to‘rtburchak yuzi: S = a × b.',
          'Kvadrat yuzi: S = a × a = a².',
          '1 m² = 100 dm² = 10 000 sm².',
        ],
        rules: ['Yuzaning o‘lchov birligi kvadrat birlikda bo‘ladi (sm², m²).'],
        examples: [
          {
            title: 'Xona yuzasini topish',
            problem: 'Xonaning uzunligi 6 m, kengligi 4 m. Uning pol yuzasi qancha?',
            solution: ['S = 6 × 4 = 24 m²'],
            answer: '24 m²',
          },
        ],
        practice: [
          {
            id: 'g4-p4',
            problem: 'Tomoni 9 sm bo‘lgan kvadratning yuzi necha sm²?',
            options: ['36 sm²', '72 sm²', '81 sm²', '90 sm²'],
            correctAnswer: '81 sm²',
            explanation: 'S = 9 × 9 = 81 sm².',
            hint: 'Kvadrat yuzi tomonining kvadratiga teng.',
          },
        ],
      },
    ],
  },
  {
    grade: 5,
    title: '5-sinf: Natural sonlar, o‘nli kasrlar va foiz',
    subtitle: 'EKUB, EKUK, oddiy va o‘nli kasrlar, foiz tushunchasi',
    description: 'Tub va murakkab sonlar, bo‘linish belgilari, aralash sonlar, o‘nli kasrlar ustida 4 ta amal va boshlang‘ich foiz.',
    topics: [
      {
        id: 'g5-t1',
        title: 'Natural sonlar, EKUB va EKUK',
        iconName: 'ListOrdered',
        summary: 'Bo‘linish alomatlari, tub ko‘paytuvchilarga ajratish, eng katta umumiy bo‘luvchi va eng kichik umumiy karrali.',
        theory: [
          'Bo‘linish belgilari: 2 ga (oxiri juft), 3 ga (raqamlar yig‘indisi 3 ga bo‘linsa), 5 ga (oxiri 0 yoki 5).',
          'EKUB (a, b) – ikkala son ham bo‘linadigan eng katta natural son.',
          'EKUK (a, b) – ikkala songa ham bo‘linadigan eng kichik natural son.',
        ],
        rules: ['EKUB(a, b) × EKUK(a, b) = a × b'],
        examples: [
          {
            title: 'EKUB va EKUK ni topish',
            problem: '12 va 18 sonlarining EKUB va EKUK ini toping',
            solution: ['12 = 2² × 3', '18 = 2 × 3²', 'EKUB(12, 18) = 2 × 3 = 6', 'EKUK(12, 18) = 2² × 3² = 36'],
            answer: 'EKUB=6, EKUK=36',
          },
        ],
        practice: [
          {
            id: 'g5-p1',
            problem: '24 va 36 sonlarining EKUBi nechaga teng?',
            options: ['6', '8', '12', '18'],
            correctAnswer: '12',
            explanation: '24 va 36 sonlarining ikkisi ham 12 ga qoldiqsiz bo‘linadi.',
            hint: 'Ikkala sonning umumiy bo‘luvchilaridan eng kattasini tanlang.',
          },
        ],
      },
      {
        id: 'g5-t2',
        title: 'Oddiy kasrlar ustida amallar',
        iconName: 'Percent',
        summary: 'Har xil maxrajli kasrlarni qo‘shish, ayirish, ko‘paytirish va bo‘lish.',
        theory: [
          'Har xil maxrajli kasrlarni qo‘shish uchun avval umumiy maxraj (EKUK) topiladi.',
          'Kasrlarni ko‘paytirish: a/b × c/d = (a×c)/(b×d).',
          'Kasrlarni bo‘lish: a/b ÷ c/d = a/b × d/c = (a×d)/(b×c).',
        ],
        rules: ['Bo‘lish amali ikkinchi kasrning teskarisiga ko‘paytirishga aylanadi.'],
        examples: [
          {
            title: 'Kasrlarni ko‘paytirish',
            problem: '2/3 × 5/7 amalini bajaring',
            solution: ['(2 × 5) / (3 × 7) = 10/21'],
            answer: '10/21',
          },
        ],
        practice: [
          {
            id: 'g5-p2',
            problem: '3/4 ÷ 2/5 amali natijasi qaysi?',
            options: ['6/20', '15/8', '8/15', '5/6'],
            correctAnswer: '15/8',
            explanation: '3/4 × 5/2 = (3×5)/(4×2) = 15/8 = 1 7/8.',
            hint: 'Ikkinchi kasrni to‘ntarib ko‘paytiring.',
          },
        ],
      },
      {
        id: 'g5-t3',
        title: 'O‘nli kasrlar',
        iconName: 'Layers',
        summary: 'Maxraji 10, 100, 1000 bo‘lgan sonlarning vergul bilan yozilishi va amallar.',
        theory: [
          'Verguldan keyingi birinchi raqam – o‘ndan birlar, ikkinchisi – yuzdan birlar xonasi.',
          'O‘nli kasrlarni qo‘shish va ayirishda vergullar ustma-ust tushishi shart.',
          'O‘nli kasrlarni ko‘paytirishda vergul hisobga olinmasdan ko‘paytirilib, natijada ikkala ko‘paytuvchidagi jami verguldan keyingi raqamlar sonicha ajratiladi.',
        ],
        rules: ['Sonni 10, 100 ga ko‘paytirganda vergul o‘ngga siljiydi, bo‘lganda chapga siljiydi.'],
        examples: [
          {
            title: 'O‘nli kasrlarni ko‘paytirish',
            problem: '2.5 × 0.4 amalini hisoblang',
            solution: ['25 × 4 = 100', 'Jami 2 ta raqam verguldan keyin: 1.00 = 1'],
            answer: '1',
          },
        ],
        practice: [
          {
            id: 'g5-p3',
            problem: '4.8 ÷ 0.6 amali nechaga teng?',
            options: ['0.8', '8', '80', '0.08'],
            correctAnswer: '8',
            explanation: 'Vergulni bitta o‘ngga suramiz: 48 ÷ 6 = 8.',
            hint: 'Ikkala sonni ham 10 ga ko‘paytiring: 48 ÷ 6.',
          },
        ],
      },
      {
        id: 'g5-t4',
        title: 'Foiz tushunchasi',
        iconName: 'PieChart',
        summary: 'Sonning yuzdan bir qismi (1%). Foizga doir asosiy masalalar.',
        theory: [
          '1% = 1/100 = 0.01.',
          'Sonning foizini topish: Sonni foiz ko‘rsatkichiga ko‘paytirib 100 ga bo‘linadi.',
          '100% – butun son, 50% – yarmi, 25% – choragi.',
        ],
        rules: ['Foizni o‘nli kasrga aylantirish uchun 100 ga bo‘linadi (masalan: 35% = 0.35).'],
        examples: [
          {
            title: 'Sonning foizini topish',
            problem: '200 ning 15% ini toping',
            solution: ['200 × 15 / 100 = 2 × 15 = 30'],
            answer: '30',
          },
        ],
        practice: [
          {
            id: 'g5-p4',
            problem: 'Sinfdagi 30 nafar o‘quvchining 60% i qizlar. Sinfda nechta qiz bor?',
            options: ['16', '18', '20', '15'],
            correctAnswer: '18',
            explanation: '30 × 60 / 100 = 18 nafar qiz.',
            hint: '30 ni 0.6 ga ko‘paytiring.',
          },
        ],
      },
    ],
  },
  {
    grade: 6,
    title: '6-sinf: Musbat va manfiy sonlar, nisbat va proportsiya',
    subtitle: 'Ratsional sonlar, koordinata to‘g‘ri chizig‘i, tenglamalar va proportsiya',
    description: 'Butun sonlar, modul tushunchasi, manfiy sonlar ustida amallar, proportsiyaning asosiy xossasi, doira yuzi va silindr.',
    topics: [
      {
        id: 'g6-t1',
        title: 'Musbat va manfiy sonlar (Ratsional sonlar)',
        iconName: 'Compass',
        summary: 'Noldan kichik sonlar, koordinata to‘g‘ri chizig‘i va sonning moduli.',
        theory: [
          'Manfiy sonlar "−" ishorasi bilan yoziladi va koordinata o‘qida 0 dan chapda joylashadi.',
          'Modul (|a|) – sonning koordinata boshidan masofasidir va har doim nomanfiy: |-7| = 7, |5| = 5.',
          'Manfiy sonlar o‘rtasida qaysi birining moduli kichik bo‘lsa, o‘sha son katta: -2 > -9.',
        ],
        rules: [
          '(+) · (+) = (+)',
          '(−) · (−) = (+)',
          '(+) · (−) = (−)',
        ],
        examples: [
          {
            title: 'Manfiy sonlarni ko‘paytirish',
            problem: '(-6) × (-8) amalini hisoblang',
            solution: ['Ikkala son manfiy, shuning uchun natija musbat bo‘ladi: +48'],
            answer: '48',
          },
        ],
        practice: [
          {
            id: 'g6-p1',
            problem: '-15 + 9 ifoda qiymatini toping.',
            options: ['-24', '-6', '6', '24'],
            correctAnswer: '-6',
            explanation: 'Turli ishorali sonlarni qo‘shishda kattasining modulidan kichigi ayirilib, kattasining ishorasi qo‘yiladi: -(15-9) = -6.',
            hint: 'Qaysi sonning moduli katta bo‘lsa o‘shaning ishorasi qoladi.',
          },
        ],
      },
      {
        id: 'g6-t2',
        title: 'Proportsiya va uning asosiy xossasi',
        iconName: 'GitCommit',
        summary: 'Ikki nisbatning tengligi va chetki hadlar ko‘paytmasi.',
        theory: [
          'a : b = c : d tenglik proportsiya deyiladi.',
          'Proportsiyaning asosiy xossasi: Chetki hadlar ko‘paytmasi o‘rta hadlar ko‘paytmasiga teng: a × d = b × c.',
          'To‘g‘ri proportsional va teskari proportsional miqdorlar.',
        ],
        rules: ['a/b = c/d bo‘lsa, a · d = b · c.'],
        examples: [
          {
            title: 'Proportsiyadan noma’lumni topish',
            problem: 'x / 4 = 15 / 6 proportsiyadan x ni toping',
            solution: ['6 × x = 4 × 15', '6x = 60', 'x = 10'],
            answer: 'x = 10',
          },
        ],
        practice: [
          {
            id: 'g6-p2',
            problem: '3 : 5 = 12 : x proportsiyadan x ni toping.',
            options: ['15', '20', '25', '18'],
            correctAnswer: '20',
            explanation: '3 × x = 5 × 12 => 3x = 60 => x = 20.',
            hint: '5 ni 12 ga ko‘paytirib, 3 ga bo‘ling.',
          },
        ],
      },
      {
        id: 'g6-t3',
        title: 'Algebraik ifodalar va qavslarni ochish',
        iconName: 'Code',
        summary: 'O‘xshash hadlarni ixchamlash va qavs oldidagi ishoralar.',
        theory: [
          'Qavs oldida "+" tursa, qavs ichidagi hadlarning ishorasi o‘zgarmaydi.',
          'Qavs oldida "−" tursa, qavs ichidagi har bir had qarama-qarshi ishoraga o‘zgaradi: -(a - b) = -a + b.',
          'Taqsimot qonuni: a(b + c) = ab + ac.',
        ],
        rules: ['Faqat harfiy qismi bir xil bo‘lgan hadlar (o‘xshash hadlar) o‘zaro qo‘shiladi yoki ayiriladi.'],
        examples: [
          {
            title: 'Ixchamlash',
            problem: '4(2x − 3) + 5x ifodani ixchamlang',
            solution: ['8x − 12 + 5x = (8x + 5x) − 12 = 13x − 12'],
            answer: '13x − 12',
          },
        ],
        practice: [
          {
            id: 'g6-p3',
            problem: '5x − (3x − 7) ifodani soddalashtiring.',
            options: ['2x − 7', '2x + 7', '8x − 7', '8x + 7'],
            correctAnswer: '2x + 7',
            explanation: 'Minus ishorasi qavs ichidagilarni o‘zgartiradi: 5x − 3x + 7 = 2x + 7.',
            hint: 'Qavs oldidagi minus qavs ichidagi -7 ni +7 ga aylantiradi.',
          },
        ],
      },
      {
        id: 'g6-t4',
        title: 'Doira va aylananing uzunligi',
        iconName: 'Circle',
        summary: 'π (pi) soni, aylana uzunligi (C = 2πr) va doira yuzi (S = πr²).',
        theory: [
          'π ≈ 3.14159... – aylananing uzunligini uning diametriga nisbati.',
          'Aylana uzunligi: C = 2πr = πd.',
          'Doira yuzi: S = πr².',
        ],
        rules: ['Radius (r) diametrning (d) yarmiga teng: r = d/2.'],
        examples: [
          {
            title: 'Doira yuzini topish',
            problem: 'Radiusi 5 sm bo‘lgan doira yuzini toping (π = 3.14 deb oling)',
            solution: ['S = π × r² = 3.14 × 5² = 3.14 × 25 = 78.5 sm²'],
            answer: '78.5 sm²',
          },
        ],
        practice: [
          {
            id: 'g6-p4',
            problem: 'Radiusi 7 sm bo‘lgan aylananing uzunligini toping (π = 22/7 deb oling).',
            options: ['22 sm', '44 sm', '88 sm', '154 sm'],
            correctAnswer: '44 sm',
            explanation: 'C = 2 × (22/7) × 7 = 44 sm.',
            hint: 'C = 2πr formulasidan foydalaning.',
          },
        ],
      },
    ],
  },
  {
    grade: 7,
    title: '7-sinf: Algebra asoslari, darajalar va chiziqli funksiyalar',
    subtitle: 'Qisqa ko‘paytirish formulalari, birhad va ko‘phadlar, burchaklar va uchburchaklar',
    description: 'Natural ko‘rsatkichli daraja, ko‘phadlarni ko‘paytuvchilarga ajratish, chiziqli tenglamalar, burchaklar turlari va uchburchaklar tengligi alomatlari.',
    topics: [
      {
        id: 'g7-t1',
        title: 'Natural ko‘rsatkichli daraja',
        iconName: 'Zap',
        summary: 'Daraja xossalari, ko‘paytirish va bo‘lish qoidalari.',
        theory: [
          'aⁿ = a · a · ... · a (n marta).',
          'aᵐ · aⁿ = aᵐ⁺ⁿ',
          'aᵐ ÷ aⁿ = aᵐ⁻ⁿ (a ≠ 0)',
          '(aᵐ)ⁿ = aᵐⁿ',
          '(a · b)ⁿ = aⁿ · bⁿ',
          'a⁰ = 1 (a ≠ 0)',
        ],
        rules: ['Asoslari bir xil bo‘lsa, ko‘paytirilganda darajalar qo‘shiladi, bo‘linganda ayiriladi.'],
        examples: [
          {
            title: 'Darajani soddalashtirish',
            problem: '(x³ · x⁵) ÷ x⁴ ifodani soddalashtiring',
            solution: ['x³⁺⁵ = x⁸', 'x⁸ ÷ x⁴ = x⁸⁻⁴ = x⁴'],
            answer: 'x⁴',
          },
        ],
        practice: [
          {
            id: 'g7-p1',
            problem: '2⁴ · 2³ qiymati nechaga teng?',
            options: ['32', '64', '128', '256'],
            correctAnswer: '128',
            explanation: '2⁴⁺³ = 2⁷ = 128.',
            hint: '2 ning 7-darajasini hisoblang.',
          },
        ],
      },
      {
        id: 'g7-t2',
        title: 'Qisqa ko‘paytirish formulalari',
        iconName: 'Sparkles',
        summary: 'Yig‘indi va ayirmaning kvadrati, kvadratlar ayirmasi.',
        theory: [
          '(a + b)² = a² + 2ab + b²',
          '(a − b)² = a² − 2ab + b²',
          'a² − b² = (a − b)(a + b)',
          '(a + b)³ = a³ + 3a²b + 3ab² + b³',
          'a³ − b³ = (a − b)(a² + ab + b²)',
        ],
        rules: ['Kvadratlar ayirmasi formulasini ayirmaning kvadratidan adashtirmang!'],
        examples: [
          {
            title: 'Kvadratlar ayirmasi',
            problem: '51² − 49² ni oson usulda hisoblang',
            solution: ['(51 − 49)(51 + 49) = 2 × 100 = 200'],
            answer: '200',
          },
        ],
        practice: [
          {
            id: 'g7-p2',
            problem: '(x + 5)² ifodani ko‘phad shaklida yozing.',
            options: ['x² + 25', 'x² + 10x + 25', 'x² + 5x + 25', 'x² + 10x + 10'],
            correctAnswer: 'x² + 10x + 25',
            explanation: '(a+b)² = a² + 2ab + b² => x² + 2·x·5 + 5² = x² + 10x + 25.',
            hint: 'O‘rta hadni (2ab) unutmang!',
          },
        ],
      },
      {
        id: 'g7-t3',
        title: 'Bir noma’lumli chiziqli tenglamalar',
        iconName: 'Maximize2',
        summary: 'ax = b va ax + b = cx + d ko‘rinishidagi tenglamalar.',
        theory: [
          'Chiziqli tenglama ax = b ko‘rinishida bo‘ladi.',
          'Agar a ≠ 0 bo‘lsa, yagona yechim: x = b/a.',
          'Agar a = 0 va b = 0 bo‘lsa, cheksiz ko‘p yechimga ega.',
          'Agar a = 0 va b ≠ 0 bo‘lsa, yechim yo‘q.',
        ],
        rules: ['Tenglikning bir tomonidan ikkinchisiga o‘tkazilgan hadning ishorasi qarama-qarshisiga o‘zgaradi.'],
        examples: [
          {
            title: 'Tenglama yechish',
            problem: '3x − 7 = 5x + 9 tenglamani yeching',
            solution: ['3x − 5x = 9 + 7', '-2x = 16', 'x = 16 / (-2) = -8'],
            answer: 'x = -8',
          },
        ],
        practice: [
          {
            id: 'g7-p3',
            problem: '2x + 5 = 17 tenglamaning yechimini toping.',
            options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
            correctAnswer: 'x = 6',
            explanation: '2x = 17 − 5 = 12 => x = 12 / 2 = 6.',
            hint: '2x = 12.',
          },
        ],
      },
      {
        id: 'g7-t4',
        title: 'Geometriya: Uchburchaklar tengligi alomatlari',
        iconName: 'Triangle',
        summary: 'Uchburchaklarning 3 ta tenglik alomati va burchaklar yig‘indisi.',
        theory: [
          'Uchburchak ichki burchaklari yig‘indisi har doim 180° ga teng.',
          '1-alomat (TBT): Ikki tomon va ular orasidagi burchak bo‘yicha.',
          '2-alomat (BTB): Bir tomon va unga yopishgan ikki burchak bo‘yicha.',
          '3-alomat (TTT): Uchta tomon bo‘yicha.',
        ],
        rules: ['Tashqi burchak o‘ziga qo‘shni bo‘lmagan ikki ichki burchak yig‘indisiga teng.'],
        examples: [
          {
            title: 'Burchakni topish',
            problem: 'Uchburchakning ikki burchagi 50° va 70°. Uchinchi burchakni toping.',
            solution: ['180° − (50° + 70°) = 180° − 120° = 60°'],
            answer: '60°',
          },
        ],
        practice: [
          {
            id: 'g7-p4',
            problem: 'Teng yonli uchburchakning uchidagi burchagi 40° ga teng. Asosidagi burchaklari necha gradusdan?',
            options: ['60°', '70°', '80°', '50°'],
            correctAnswer: '70°',
            explanation: '(180° − 40°) / 2 = 140° / 2 = 70°.',
            hint: 'Teng yonli uchburchakning asosidagi burchaklari teng bo‘ladi.',
          },
        ],
      },
    ],
  },
  {
    grade: 8,
    title: '8-sinf: Kvadrat ildizlar, kvadrat tenglamalar va Pifagor teoremasi',
    subtitle: 'Arifmetik kvadrat ildiz, diskriminant, Viyet teoremasi va to‘g‘ri burchakli uchburchak',
    description: 'Irratsional sonlar, kvadrat tenglamalarni yechish usullari, to‘rtburchaklar (parallelogramm, romb, trapetsiya) va Pifagor teoremasi.',
    topics: [
      {
        id: 'g8-t1',
        title: 'Arifmetik kvadrat ildiz',
        iconName: 'CheckSquare',
        summary: '√a tushunchasi, xossalari va ildiz ostidan ko‘paytuvchi chiqarish.',
        theory: [
          'Nomanfiy a sonining arifmetik kvadrat ildizi deb, kvadrati a ga teng bo‘lgan nomanfiy songa aytiladi.',
          '√(a · b) = √a · √b (a ≥ 0, b ≥ 0)',
          '√(a / b) = √a / √b (b > 0)',
          '√(a²) = |a|',
        ],
        rules: ['Kvadrat ildiz ostida manfiy son bo‘lishi mumkin emas (haqiqiy sonlar maydonida).'],
        examples: [
          {
            title: 'Ildiz ostidan chiqarish',
            problem: '√72 ni soddalashtiring',
            solution: ['72 = 36 × 2', '√72 = √(36 × 2) = √36 × √2 = 6√2'],
            answer: '6√2',
          },
        ],
        practice: [
          {
            id: 'g8-p1',
            problem: '√144 + 25 ifodaning qiymati nechaga teng?',
            options: ['37', '17', '169', '13'],
            correctAnswer: '37',
            explanation: '√144 = 12; 12 + 25 = 37.',
            hint: '12² = 144.',
          },
        ],
      },
      {
        id: 'g8-t2',
        title: 'Kvadrat tenglamalar va Diskriminant',
        iconName: 'Activity',
        summary: 'ax² + bx + c = 0 to‘liq kvadrat tenglama va D = b² − 4ac formulasi.',
        theory: [
          'Diskriminant: D = b² − 4ac.',
          'D > 0 bo‘lsa: 2 ta haqiqiy ildiz x₁,₂ = (-b ± √D) / (2a).',
          'D = 0 bo‘lsa: 1 ta ildiz x = -b / (2a).',
          'D < 0 bo‘lsa: haqiqiy ildizlari yo‘q.',
        ],
        rules: ['Agar tenglamada b=0 yoki c=0 bo‘lsa, u chala kvadrat tenglama deyiladi.'],
        examples: [
          {
            title: 'Kvadrat tenglama yechish',
            problem: 'x² + 5x + 6 = 0 tenglamani yeching',
            solution: [
              'a = 1, b = 5, c = 6',
              'D = 5² − 4·1·6 = 25 − 24 = 1',
              'x₁ = (-5 + √1) / 2 = -4 / 2 = -2',
              'x₂ = (-5 − √1) / 2 = -6 / 2 = -3',
            ],
            answer: 'x₁ = -2, x₂ = -3',
          },
        ],
        practice: [
          {
            id: 'g8-p2',
            problem: 'x² − 9x + 20 = 0 tenglamaning ildizlarini toping.',
            options: ['x₁ = 2, x₂ = 10', 'x₁ = 4, x₂ = 5', 'x₁ = -4, x₂ = -5', 'x₁ = 1, x₂ = 20'],
            correctAnswer: 'x₁ = 4, x₂ = 5',
            explanation: 'D = 81 − 80 = 1; x₁ = (9+1)/2 = 5, x₂ = (9-1)/2 = 4.',
            hint: 'Viyet bo‘yicha: yig‘indisi 9, ko‘paytmasi 20 bo‘lgan sonlar.',
          },
        ],
      },
      {
        id: 'g8-t3',
        title: 'Viyet teoremasi',
        iconName: 'Share2',
        summary: 'Keltirilgan kvadrat tenglamada (x² + px + q = 0) ildizlar va koeffitsiyentlar munosabati.',
        theory: [
          'x₁ + x₂ = -p (yoki -b/a)',
          'x₁ · x₂ = q (yoki c/a)',
          'Ildizlari orqali kvadrat tenglama tuzish: x² − (x₁ + x₂)x + (x₁x₂) = 0.',
        ],
        rules: ['Keltirilmagan tenglamada har bir hadni avval a ga bo‘lib olinadi.'],
        examples: [
          {
            title: 'Ildizlarni og‘zaki topish',
            problem: 'x² − 7x + 12 = 0 tenglama ildizlarini Viyet teoremasi bilan toping',
            solution: ['x₁ + x₂ = 7', 'x₁ · x₂ = 12', 'Bunday sonlar: 3 va 4'],
            answer: 'x₁ = 3, x₂ = 4',
          },
        ],
        practice: [
          {
            id: 'g8-p3',
            problem: 'x² + 8x + 15 = 0 tenglamaning ildizlari yig‘indisi nechaga teng?',
            options: ['8', '-8', '15', '-15'],
            correctAnswer: '-8',
            explanation: 'Viyet teoremasiga ko‘ra x₁ + x₂ = -p = -8.',
            hint: 'x₁ + x₂ = -p.',
          },
        ],
      },
      {
        id: 'g8-t4',
        title: 'Pifagor teoremasi',
        iconName: 'Triangle',
        summary: 'To‘g‘ri burchakli uchburchakda katetlar va gipotenuza munosabati: a² + b² = c².',
        theory: [
          'To‘g‘ri burchakli uchburchakda gipotenuzaning kvadrati katetlar kvadratlari yig‘indisiga teng: c² = a² + b².',
          'Gipotenuzani topish: c = √(a² + b²).',
          'Katetni topish: a = √(c² − b²).',
          'Misr uchburchagi: tomonlari 3, 4, 5 bo‘lgan uchburchak.',
        ],
        rules: ['Gipotenuza to‘g‘ri burchak qarshisida yotadi va eng uzun tomon hisoblanadi.'],
        examples: [
          {
            title: 'Gipotenuzani hisoblash',
            problem: 'Katetlari 6 sm va 8 sm bo‘lgan to‘g‘ri burchakli uchburchak gipotenuzasini toping',
            solution: ['c² = 6² + 8² = 36 + 64 = 100', 'c = √100 = 10 sm'],
            answer: '10 sm',
          },
        ],
        practice: [
          {
            id: 'g8-p4',
            problem: 'Gipotenuzasi 13 sm va bir kateti 5 sm bo‘lgan to‘g‘ri burchakli uchburchakning ikkinchi katetini toping.',
            options: ['8 sm', '10 sm', '12 sm', '14 sm'],
            correctAnswer: '12 sm',
            explanation: 'b = √(13² − 5²) = √(169 − 25) = √144 = 12 sm.',
            hint: 'b² = c² − a².',
          },
        ],
      },
    ],
  },
  {
    grade: 9,
    title: '9-sinf: Tenglamalar sistemasi, progressiyalar va trigonometriya asoslari',
    subtitle: 'Ikki noma’lumli sistemalar, arifmetik va geometrik progressiya, sin, cos, tg',
    description: 'Tenglamalar sistemasini o‘rniga qo‘yish va qo‘shish usullari, n-had va dastlabki hadlar yig‘indisi formulalari, o‘tkir burchak trigonometrik funksiyalari.',
    topics: [
      {
        id: 'g9-t1',
        title: 'Tenglamalar sistemasi',
        iconName: 'Layers',
        summary: 'Ikki noma’lumli chiziqli va chiziqli bo‘lmagan sistemalarni yechish.',
        theory: [
          'O‘rniga qo‘yish usuli: bir noma’lum ikkinchisi orqali ifodalanib boshqa tenglamaga qo‘yiladi.',
          'Algebraik qo‘shish usuli: koeffitsiyentlar tenglashtirilib hadma-had qo‘shiladi yoki ayiriladi.',
        ],
        rules: ['Topilgan qiymatlar juftligi (x; y) ikkala tenglamani ham qanoatlantirishi shart.'],
        examples: [
          {
            title: 'Sistemani yechish',
            problem: '{ x + y = 10; x − y = 4 } sistemasini yeching',
            solution: ['Hadma-had qo‘shamiz: 2x = 14 => x = 7', 'y ni topamiz: 7 + y = 10 => y = 3'],
            answer: '(7; 3)',
          },
        ],
        practice: [
          {
            id: 'g9-p1',
            problem: '{ 2x + y = 11; y = 3 } sistemasidan x ning qiymatini toping.',
            options: ['3', '4', '5', '6'],
            correctAnswer: '4',
            explanation: '2x + 3 = 11 => 2x = 8 => x = 4.',
            hint: 'y ning o‘rniga 3 ni qo‘ying.',
          },
        ],
      },
      {
        id: 'g9-t2',
        title: 'Arifmetik va geometrik progressiya',
        iconName: 'TrendingUp',
        summary: 'aₙ = a₁ + (n−1)d va bₙ = b₁ · qⁿ⁻¹ formulalari va yig‘indi Sₙ.',
        theory: [
          'Arifmetik progressiya: aₙ = a₁ + (n − 1)d, d – ayirma.',
          'Yig‘indi: Sₙ = (a₁ + aₙ) · n / 2.',
          'Geometrik progressiya: bₙ = b₁ · qⁿ⁻¹, q – maxraj.',
          'Yig‘indi: Sₙ = b₁(qⁿ − 1) / (q − 1) (q ≠ 1).',
        ],
        rules: ['d = aₖ₊₁ − aₖ, q = bₖ₊₁ / bₖ'],
        examples: [
          {
            title: 'Arifmetik progressiya hadi',
            problem: 'a₁ = 3, d = 4 bo‘lsa, a₁₀ ni toping',
            solution: ['a₁₀ = 3 + (10 − 1) · 4 = 3 + 36 = 39'],
            answer: '39',
          },
        ],
        practice: [
          {
            id: 'g9-p2',
            problem: 'Birinchi hadi 2, ayirmasi 5 bo‘lgan arifmetik progressiyaning 5-hadi nechaga teng?',
            options: ['20', '22', '24', '25'],
            correctAnswer: '22',
            explanation: 'a₅ = 2 + (5−1)·5 = 2 + 20 = 22.',
            hint: 'aₙ = a₁ + (n−1)d.',
          },
        ],
      },
      {
        id: 'g9-t3',
        title: 'Trigonometriya asoslari',
        iconName: 'Compass',
        summary: 'To‘g‘ri burchakli uchburchakda sinus, kosinus, tangens va kotangens.',
        theory: [
          'sin α = qarshisidagi katet / gipotenuza.',
          'cos α = yopishgan katet / gipotenuza.',
          'tg α = qarshisidagi katet / yopishgan katet = sin α / cos α.',
          'Asosiy trigonometrik ayniyat: sin²α + cos²α = 1.',
        ],
        rules: ['0° < α < 90° oralig‘ida sin va cos qiymatlari har doim 0 dan 1 gacha bo‘ladi.'],
        examples: [
          {
            title: 'Asosiy ayniyat',
            problem: 'sin α = 0.6 bo‘lsa, cos α ni toping (o‘tkir burchak)',
            solution: ['cos²α = 1 − sin²α = 1 − 0.36 = 0.64', 'cos α = √0.64 = 0.8'],
            answer: '0.8',
          },
        ],
        practice: [
          {
            id: 'g9-p3',
            problem: 'sin 30° ning qiymati nechaga teng?',
            options: ['1/2', '√3/2', '√2/2', '1'],
            correctAnswer: '1/2',
            explanation: 'Standart jadval qiymati: sin 30° = 1/2 = 0.5.',
            hint: '30 gradusli burchak qarshisidagi katet gipotenuzaning yarmiga teng.',
          },
        ],
      },
      {
        id: 'g9-t4',
        title: 'Sinuslar va kosinuslar teoremalari',
        iconName: 'Triangle',
        summary: 'Ixtiyoriy uchburchak tomonlari va burchaklari munosabati.',
        theory: [
          'Sinuslar teoremasi: a / sin A = b / sin B = c / sin C = 2R (R – tashqi chizilgan aylana radiusi).',
          'Kosinuslar teoremasi: c² = a² + b² − 2ab · cos C.',
        ],
        rules: ['Kosinuslar teoremasi Pifagor teoremasining ixtiyoriy uchburchak uchun umumiy holidir (chunki cos 90° = 0).'],
        examples: [
          {
            title: 'Uchinchi tomonni topish',
            problem: 'a = 5, b = 8, C = 60° bo‘lsa, c tomonni toping',
            solution: ['c² = 5² + 8² − 2·5·8·cos 60° = 25 + 64 − 80·(0.5) = 89 − 40 = 49', 'c = √49 = 7'],
            answer: '7',
          },
        ],
        practice: [
          {
            id: 'g9-p4',
            problem: 'Uchburchakda a = 4, b = 6 va ular orasidagi burchak 90° bo‘lsa, c gipotenuza nechaga teng?',
            options: ['√52', '10', '8', '√20'],
            correctAnswer: '√52',
            explanation: 'c² = 4² + 6² = 16 + 36 = 52 => c = √52 = 2√13.',
            hint: 'cos 90° = 0 bo‘lgani uchun Pifagor teoremasi qo‘llaniladi.',
          },
        ],
      },
    ],
  },
  {
    grade: 10,
    title: '10-sinf: Kengaytirilgan trigonometriya, logarifmlar va stereometriya',
    subtitle: 'Trigonometrik tenglamalar, logarifmik funksiyalar va fazoviy shakllar',
    description: 'Birlik aylana, trigonometrik qo‘shish formulalari, ko‘rsatkichli va logarifmik ifodalar/tenglamalar, fazoda to‘g‘ri chiziq va tekisliklar, fazoviy jismlar.',
    topics: [
      {
        id: 'g10-t1',
        title: 'Trigonometrik ayniyatlar va formulalar',
        iconName: 'Activity',
        summary: 'Ikkilangan burchak, qo‘shish formulalari va keltirish qoidalari.',
        theory: [
          'sin(2α) = 2 sin α cos α',
          'cos(2α) = cos²α − sin²α = 2cos²α − 1 = 1 − 2sin²α',
          'sin(α ± β) = sin α cos β ± cos α sin β',
          'cos(α ± β) = cos α cos β ∓ sin α sin β',
        ],
        rules: ['Keltirish formulalarida π/2 va 3π/2 da funksiya nomi o‘zgaradi (sin <-> cos).'],
        examples: [
          {
            title: 'Ikkilangan burchak',
            problem: 'sin α = 0.6 va cos α = 0.8 bo‘lsa, sin 2α ni toping',
            solution: ['sin 2α = 2 · sin α · cos α = 2 · 0.6 · 0.8 = 0.96'],
            answer: '0.96',
          },
        ],
        practice: [
          {
            id: 'g10-p1',
            problem: 'cos² 15° − sin² 15° ifoda qiymatini toping.',
            options: ['1/2', '√3/2', '√2/2', '1'],
            correctAnswer: '√3/2',
            explanation: 'cos²α − sin²α = cos(2α) => cos(2 · 15°) = cos 30° = √3/2.',
            hint: 'Ikkilangan burchak kosinusini eslang.',
          },
        ],
      },
      {
        id: 'g10-t2',
        title: 'Darajali va logarifmik ifodalar',
        iconName: 'Database',
        summary: 'logₐ b ta’rifi, asosiy logarifmik ayniyat va logarifm xossalari.',
        theory: [
          'Ta’rif: logₐ b = c <=> aᶜ = b (a > 0, a ≠ 1, b > 0).',
          'logₐ (xy) = logₐ x + logₐ y',
          'logₐ (x/y) = logₐ x − logₐ y',
          'logₐ (xⁿ) = n · logₐ x',
          'Asosiy logarifmik ayniyat: a^(logₐ b) = b.',
        ],
        rules: ['Manfiy sonning va nolning logarifmi mavjud emas.'],
        examples: [
          {
            title: 'Logarifmni hisoblash',
            problem: 'log₂ 32 + log₃ 27 qiymatini hisoblang',
            solution: ['2⁵ = 32 => log₂ 32 = 5', '3³ = 27 => log₃ 27 = 3', '5 + 3 = 8'],
            answer: '8',
          },
        ],
        practice: [
          {
            id: 'g10-p2',
            problem: 'log₅ 125 ning qiymati nechaga teng?',
            options: ['2', '3', '4', '5'],
            correctAnswer: '3',
            explanation: '5³ = 125 bo‘lgani uchun log₅ 125 = 3.',
            hint: '5 ning nechanchi darajasi 125 ga teng?',
          },
        ],
      },
      {
        id: 'g10-t3',
        title: 'Funksiyalar va ularning xossalari',
        iconName: 'LineChart',
        summary: 'Aniqlanish sohasi (D(f)), qiymatlar to‘plami (E(f)), juft-toqlik va davriylik.',
        theory: [
          'Juft funksiya: f(-x) = f(x) (grafigi OY o‘qiga nisbatan simmetrik).',
          'Toq funksiya: f(-x) = -f(x) (grafigi koordinata boshiga nisbatan simmetrik).',
          'Aniqlanish sohasi: ildiz osti (nomanfiy), maxraj (noldan farqli), logarifm osti (musbat).',
        ],
        rules: ['y = cos x – juft funksiya; y = sin x, y = tg x – toq funksiyalar.'],
        examples: [
          {
            title: 'Aniqlanish sohasini topish',
            problem: 'y = √(x − 4) funksiyaning aniqlanish sohasini toping',
            solution: ['Ildiz osti nomanfiy bo‘lishi kerak: x − 4 ≥ 0 => x ≥ 4', 'D(y) = [4; +∞)'],
            answer: '[4; +∞)',
          },
        ],
        practice: [
          {
            id: 'g10-p3',
            problem: 'Quyidagi funksiyalardan qaysi biri juft funksiya?',
            options: ['y = x³', 'y = x² + 4', 'y = 2x + 1', 'y = sin x'],
            correctAnswer: 'y = x² + 4',
            explanation: 'f(-x) = (-x)² + 4 = x² + 4 = f(x), demak juft.',
            hint: 'x ning o‘rniga -x qo‘yganda o‘zgarmaydigan funksiyani toping.',
          },
        ],
      },
      {
        id: 'g10-t4',
        title: 'Stereometriya: Fazoviy jismlar hajmi va yuzasi',
        iconName: 'Box',
        summary: 'Prizma, piramida, silindr, konus va shar.',
        theory: [
          'Prizma hajmi: V = S_asos · h',
          'Piramida hajmi: V = (1/3) · S_asos · h',
          'Silindr hajmi: V = πr²h, Yon sirt yuzi: S_yon = 2πrh',
          'Konus hajmi: V = (1/3)πr²h',
          'Shar hajmi: V = (4/3)πr³, Sirti yuzi: S = 4πr²',
        ],
        rules: ['Piramida va konus hajmi mos prizma va silindr hajmining uchdan biriga teng.'],
        examples: [
          {
            title: 'Silindr hajmini topish',
            problem: 'Radiusi 3 sm, balandligi 10 sm bo‘lgan silindr hajmini toping',
            solution: ['V = π · r² · h = π · 3² · 10 = 90π sm³'],
            answer: '90π sm³',
          },
        ],
        practice: [
          {
            id: 'g10-p4',
            problem: 'Radiusi 3 sm bo‘lgan sharning sirt yuzini toping.',
            options: ['12π sm²', '27π sm²', '36π sm²', '48π sm²'],
            correctAnswer: '36π sm²',
            explanation: 'S = 4πr² = 4π · 3² = 4π · 9 = 36π sm².',
            hint: 'S = 4πr² formulasidan foydalaning.',
          },
        ],
      },
    ],
  },
  {
    grade: 11,
    title: '11-sinf: Matematik analiz asoslari, hosila, integral va ehtimollar',
    subtitle: 'Hosilalar jadvali, boshlang‘ich funksiya, Nyuton-Leybnits va kombinatorika',
    description: 'Funksiya hosilasi va uning tatbiqlari (urinma tenglamasi, ekstremumlar), aniq va noaniq integral, yuzalarni hisoblash, ehtimollar nazariyasi va statistik taqsimotlar.',
    topics: [
      {
        id: 'g11-t1',
        title: 'Funksiya hosilasi va differensiallash qoidalari',
        iconName: 'TrendingUp',
        summary: 'Hosilaning geometrik va fizik ma’nosi, hosilalar jadvali.',
        theory: [
          'Hosilaning geometrik ma’nosi: k = f′(x₀) = tg α (urinmaning burchak koeffitsiyenti).',
          'Fizik ma’nosi: v(t) = s′(t) (oniy tezlik yo‘lning hosilasidir).',
          'Asosiy formulalar: (xⁿ)′ = n·xⁿ⁻¹; (c)′ = 0; (sin x)′ = cos x; (cos x)′ = −sin x; (eˣ)′ = eˣ; (ln x)′ = 1/x.',
          'Amallar: (u + v)′ = u′ + v′; (u · v)′ = u′v + uv′; (u / v)′ = (u′v − uv′) / v².',
        ],
        rules: ['Murakkab funksiya hosilasi: (f(g(x)))′ = f′(g(x)) · g′(x).'],
        examples: [
          {
            title: 'Hosilani topish',
            problem: 'f(x) = 3x⁴ − 5x² + 7 funksiyaning hosilasini toping',
            solution: ['f′(x) = 3·4x³ − 5·2x + 0 = 12x³ − 10x'],
            answer: '12x³ − 10x',
          },
        ],
        practice: [
          {
            id: 'g11-p1',
            problem: 'f(x) = x³ − 6x funksiyaning x = 2 nuqtadagi hosilasi qiymatini toping.',
            options: ['0', '6', '12', '18'],
            correctAnswer: '6',
            explanation: 'f′(x) = 3x² − 6; f′(2) = 3·(2²) − 6 = 12 − 6 = 6.',
            hint: 'Avval hosilasini oling, keyin x o‘rniga 2 qo‘ying.',
          },
        ],
      },
      {
        id: 'g11-t2',
        title: 'Boshlang‘ich funksiya va Integral asoslari',
        iconName: 'Maximize',
        summary: 'Noaniq integral, aniq integral va Nyuton-Leybnits formulasi.',
        theory: [
          'Agar F′(x) = f(x) bo‘lsa, F(x) funksiya f(x) ning boshlang‘ich funksiyasi deyiladi.',
          '∫ xⁿ dx = xⁿ⁺¹ / (n + 1) + C (n ≠ -1)',
          '∫ (1/x) dx = ln|x| + C',
          '∫ sin x dx = −cos x + C; ∫ cos x dx = sin x + C',
          'Nyuton-Leybnits formulasi: ∫ₐᵇ f(x) dx = F(b) − F(a).',
        ],
        rules: ['Egri chiziqli trapetsiya yuzi S = ∫ₐᵇ f(x) dx orqali hisoblanadi.'],
        examples: [
          {
            title: 'Aniq integralni hisoblash',
            problem: '∫₀² (3x²) dx ni hisoblang',
            solution: ['Boshlang‘ich funksiya: F(x) = x³', 'Nyuton-Leybnits: F(2) − F(0) = 2³ − 0³ = 8'],
            answer: '8',
          },
        ],
        practice: [
          {
            id: 'g11-p2',
            problem: '∫₁³ 2x dx aniq integralining qiymatini toping.',
            options: ['6', '8', '9', '4'],
            correctAnswer: '8',
            explanation: 'F(x) = x²; F(3) − F(1) = 3² − 1² = 9 − 1 = 8.',
            hint: '2x ning boshlang‘ich funksiyasi x².',
          },
        ],
      },
      {
        id: 'g11-t3',
        title: 'Ehtimollar nazariyasi va Kombinatorika',
        iconName: 'Shuffle',
        summary: 'Klassik ehtimollik, o‘rinlashtirish, guruhlash va Bernulli formulasi.',
        theory: [
          'Klassik ehtimollik formulasi: P(A) = m / n (m – qulay hollar, n – barcha teng imkoniyatli hollar).',
          'Guruhlashlar soni: Cₙᵏ = n! / (k!(n − k)!)',
          'O‘rinlashtirishlar soni: Aₙᵏ = n! / (n − k)!',
          '0 ≤ P(A) ≤ 1 (muqarrar hodisa ehtimoli 1, mumkin bo‘lmagan hodisa ehtimoli 0).',
        ],
        rules: ['Faktorial: n! = 1 · 2 · 3 · ... · n; 0! = 1.'],
        examples: [
          {
            title: 'Ehtimollikni hisoblash',
            problem: 'O‘yin zarcho‘pi tashlanganda juft son tushish ehtimolligini toping',
            solution: ['Jami hollar n = 6 (1, 2, 3, 4, 5, 6)', 'Qulay hollar m = 3 (2, 4, 6)', 'P = 3/6 = 1/2 = 0.5'],
            answer: '0.5 (yoki 50%)',
          },
        ],
        practice: [
          {
            id: 'g11-p3',
            problem: 'Qutida 4 ta oq va 6 ta qora shar bor. Tavakkaliga olingan sharning oq bo‘lish ehtimoli qancha?',
            options: ['0.4', '0.6', '0.24', '0.5'],
            correctAnswer: '0.4',
            explanation: 'Jami sharlar: 4 + 6 = 10; Oq sharlar: 4; P = 4/10 = 0.4.',
            hint: 'Oq sharlar sonini jami sharlar soniga bo‘ling.',
          },
        ],
      },
      {
        id: 'g11-t4',
        title: 'Matematik analiz tatbiqlari va ekstremumlar',
        iconName: 'Award',
        summary: 'Funksiyaning o‘sish va kamayish oraliqlari, maksimum va minimum nuqtalari.',
        theory: [
          'Agar biror oraliqda f′(x) > 0 bo‘lsa, funksiya o‘sadi.',
          'Agar f′(x) < 0 bo‘lsa, funksiya kamayadi.',
          'Kritik nuqtalar: f′(x) = 0 yoki hosila mavjud bo‘lmagan nuqtalar.',
          'Hosila ishorasi "+" dan "−" ga o‘zgarsa – maksimum, "−" dan "+" ga o‘zgarsa – minimum.',
        ],
        rules: ['Kesmadagi eng katta va eng kichik qiymatni topish uchun uchlaridagi va kritik nuqtalardagi qiymatlar solishtiriladi.'],
        examples: [
          {
            title: 'Ekstremumni topish',
            problem: 'f(x) = x² − 4x + 5 parabolaning minimum nuqtasini toping',
            solution: ['f′(x) = 2x − 4 = 0 => x = 2', 'f(2) = 2² − 4·2 + 5 = 4 − 8 + 5 = 1'],
            answer: 'x_min = 2, y_min = 1',
          },
        ],
        practice: [
          {
            id: 'g11-p4',
            problem: 'f(x) = x² − 6x + 8 funksiyaning minimum nuqtasi koordinatasi qaysi?',
            options: ['x = 2', 'x = 3', 'x = 4', 'x = -3'],
            correctAnswer: 'x = 3',
            explanation: 'f′(x) = 2x − 6 = 0 => x = 3.',
            hint: 'Hosilani 0 ga tenglang: 2x - 6 = 0.',
          },
        ],
      },
    ],
  },
];
