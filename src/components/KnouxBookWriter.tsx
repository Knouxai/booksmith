"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Book {
  title: string;
  author: string;
  category: string;
  id: string;
}

interface KnouxState {
  activeSection: "writer" | "export";
  showLibrary: boolean;
  showTemplates: boolean;
  isWriting: boolean;
  writingProgress: number;
  currentChapter: number;
  currentPage: number;
  totalPages: number;
  livePreview: string;
  category: string;
}

const KnouxBookWriter: React.FC = () => {
  const [state, setState] = useState<KnouxState>({
    activeSection: "writer",
    showLibrary: false,
    showTemplates: false,
    isWriting: false,
    writingProgress: 0,
    currentChapter: 1,
    currentPage: 1,
    totalPages: 250,
    livePreview: "",
    category: "epic",
  });

  const [inputText, setInputText] = useState("");

  const books: Book[] = [
    {
      id: "1",
      title: "صحيح البخاري",
      author: "الإمام البخاري",
      category: "حديث",
    },
    { id: "2", title: "تفسير ابن كثير", author: "ابن كثير", category: "تفسير" },
    {
      id: "3",
      title: "رياض الصالحين",
      author: "الإمام النووي",
      category: "أخلاق",
    },
    {
      id: "4",
      title: "الفقه الإسلامي",
      author: "وهبة الزحيلي",
      category: "فقه",
    },
  ];

  const templates = [
    "الكتاب الإسلامي الكلاسيكي",
    "البحث الأكاديمي",
    "السيرة الذاتية",
    "القصة التعليمية",
    "الدليل العملي",
    "المذكرات الشخصية",
  ];

  const toggleLibrary = () => {
    setState((prev) => ({ ...prev, showLibrary: !prev.showLibrary }));
  };

  const startWriting = () => {
    setState((prev) => ({ ...prev, isWriting: true, writingProgress: 25 }));
    // Simulate writing progress
    setTimeout(() => {
      setState((prev) => ({ ...prev, writingProgress: 50 }));
    }, 2000);
    setTimeout(() => {
      setState((prev) => ({ ...prev, writingProgress: 75 }));
    }, 4000);
    setTimeout(() => {
      setState((prev) => ({ ...prev, writingProgress: 100 }));
    }, 6000);
  };

  const selectBook = (book: Book) => {
    console.log("Selected book:", book.title);
  };

  const selectTemplate = (category: string, template: string) => {
    setState((prev) => ({ ...prev, showTemplates: false, category }));
    console.log("Selected template:", template);
  };

  return (
    <div className="min-h-screen w-full console-bg matrix-bg font-arabic relative overflow-hidden">
      {/* Background Image */}
      <img
        src="https://placehold.co/1920x1080/000000/000000"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-8">
            <div className="console-text text-2xl font-bold tracking-wider">
              📚✨ KNOuX Kitāb al-Mubīn™
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button
                className={`text-xl font-normal transition-all duration-300 ${
                  state.activeSection === "writer"
                    ? "text-[#fcbe2d]"
                    : "text-white"
                }`}
                onClick={() =>
                  setState((prev) => ({ ...prev, activeSection: "writer" }))
                }
              >
                المحرر
              </button>
              <button
                className={`text-xl font-normal transition-all duration-300 ${
                  state.showLibrary ? "text-[#fcbe2d]" : "text-white"
                }`}
                onClick={toggleLibrary}
              >
                المكتبة
              </button>
              <button
                className="text-white text-xl font-normal transition-all duration-300 hover:text-[#fcbe2d]"
                onClick={() =>
                  setState((prev) => ({ ...prev, showTemplates: true }))
                }
              >
                القوالب
              </button>
              <button
                className={`text-xl font-normal transition-all duration-300 ${
                  state.activeSection === "export"
                    ? "text-[#fcbe2d]"
                    : "text-white"
                }`}
                onClick={() =>
                  setState((prev) => ({ ...prev, activeSection: "export" }))
                }
              >
                التصدير
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button
              className={`px-6 py-3 rounded-full text-base font-normal transition-all duration-300 ${
                state.isWriting
                  ? "bg-[#fcbe2d] text-black border border-[#fcbe2d]"
                  : "bg-[#2d2d2d] text-white border border-white"
              }`}
            >
              دخول
            </Button>
            <Button className="px-6 py-3 bg-[#2d2d2d] border border-white text-white rounded-full text-base font-normal transition-all duration-300 hover:bg-white hover:text-black">
              ابدأ الآن
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex">
          {/* Writing Editor Sidebar */}
          {!state.showLibrary && (
            <div className="w-1/3 p-6">
              <div className="bg-[rgba(45,45,45,0.9)] border border-white/10 rounded-2xl p-6 h-full">
                <h2 className="text-white text-2xl font-bold mb-6">
                  محرر الكتابة الذكي
                </h2>

                {/* Progress Steps */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#fcbe2d]"></div>
                    <span className="text-white text-base">وحدة فهم النية</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${state.writingProgress > 20 ? "bg-[#fcbe2d]" : "bg-gray-600"}`}
                    ></div>
                    <span className="text-white text-base">
                      وحدة بناء الهيكل
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${state.writingProgress > 40 ? "bg-[#fcbe2d]" : "bg-gray-600"}`}
                    ></div>
                    <span className="text-white text-base">وكيل الكتابة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${state.writingProgress > 60 ? "bg-[#fcbe2d]" : "bg-gray-600"}`}
                    ></div>
                    <span className="text-white text-base">مساعد المراجعة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${state.writingProgress > 80 ? "bg-[#fcbe2d]" : "bg-gray-600"}`}
                    ></div>
                    <span className="text-white text-base">
                      وكيل الصور السياقي
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="w-full bg-[#1e1e1e] rounded-lg h-2">
                    <div
                      className="bg-gradient-to-r from-[#fcbe2d] to-[#c99824] h-2 rounded-lg transition-all duration-500"
                      style={{ width: `${state.writingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-white text-sm mt-2">
                    تقدم الكتابة: {Math.round(state.writingProgress)}%
                  </p>
                </div>

                {/* Input Area */}
                <textarea
                  className="w-full h-32 bg-[#1e1e1e] border border-white/20 rounded-lg p-4 text-white text-sm resize-none mb-4"
                  placeholder="اكتب وصفاً لكتابك أو ابدأ بالإملاء الصوتي..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />

                <Button
                  className="w-full bg-gradient-to-r from-[#fcbe2d] to-[#c99824] text-black py-3 rounded-lg font-bold text-base transition-all duration-300 hover:from-[#c99824] hover:to-[#fcbe2d]"
                  onClick={startWriting}
                >
                  🎤 ابدأ الكتابة بالذكاء الاصطناعي
                </Button>
              </div>
            </div>
          )}

          {/* Library Sidebar */}
          {state.showLibrary && (
            <div className="w-1/3 p-6">
              <div className="bg-[rgba(45,45,45,0.9)] border border-white/10 rounded-2xl p-6 h-full">
                <h2 className="text-white text-2xl font-bold mb-6">
                  المكتبة الإسلامية ثلاثية الأبعاد
                </h2>

                <div className="space-y-4 mb-6">
                  {books.map((book) => (
                    <div
                      key={book.id}
                      className="bg-[#1e1e1e] border border-white/10 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:border-[#fcbe2d]/50"
                      onClick={() => selectBook(book)}
                    >
                      <h3 className="text-white text-base font-bold">
                        {book.title}
                      </h3>
                      <p className="text-gray-300 text-sm">{book.author}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-[#fcbe2d] text-black text-xs rounded-full">
                        {book.category}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full bg-[#2d2d2d] border border-white text-white py-3 rounded-lg font-normal text-base transition-all duration-300 hover:bg-white hover:text-black"
                  onClick={toggleLibrary}
                >
                  إغلاق المكتبة
                </Button>
              </div>
            </div>
          )}

          {/* Main Preview Area */}
          <div className="flex-1 p-6">
            <div className="bg-[rgba(30,30,30,0.95)] border border-white/10 rounded-2xl h-full relative overflow-hidden shadow-[0_0_16px_16px_#1e1e1e,42px_-1px_90px_-13px_#01a0d3,-42px_-1px_90px_-13px_#c13ac5]">
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#fcbe2d] to-transparent"></div>

              <div className="p-8 h-full flex flex-col">
                {/* Preview Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white text-3xl font-bold">
                    🔴 ��لبث المباشر - معاينة الكتاب
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-[#fcbe2d] text-sm">
                      الفصل: {state.currentChapter}
                    </span>
                    <span className="text-white text-sm">
                      صفحة {state.currentPage} من {state.totalPages}
                    </span>
                  </div>
                </div>

                {/* Book Preview Content */}
                <div className="flex-1 bg-gradient-to-br from-white to-gray-100 rounded-2xl p-8 relative overflow-hidden">
                  {/* Book Header Accent */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#fcbe2d] to-[#c99824]"></div>

                  {/* Book Title */}
                  <div className="text-center mb-8">
                    <h1 className="text-black text-4xl font-bold mb-4">
                      الكتاب المبين
                    </h1>
                    <p className="text-gray-600 text-base">
                      مؤلف بواسطة محرك Knoux BookSmith Ultra™
                    </p>
                  </div>

                  {/* Book Content */}
                  <div className="text-right leading-7">
                    <div className="mb-6">
                      <h2 className="text-black text-2xl font-bold mb-4 border-b border-[#fcbe2d] pb-2">
                        المقدمة
                      </h2>
                      <p className="text-gray-800 text-lg leading-relaxed">
                        {state.livePreview ||
                          "بسم الله الرحمن الرحيم، الحمد لله رب العالمين..."}
                      </p>
                    </div>

                    {state.writingProgress > 30 && (
                      <div className="mb-6">
                        <h3 className="text-black text-xl font-bold mb-3">
                          الفصل الأول
                        </h3>
                        <p className="text-gray-800 text-base leading-relaxed">
                          وبه نستعين على أمور الدنيا والدين، هذا كتاب مبارك يهدي
                          إلى الحق المبين...
                        </p>
                      </div>
                    )}

                    {state.writingProgress > 60 && (
                      <div className="mb-6">
                        <h3 className="text-black text-xl font-bold mb-3">
                          المبحث الأول
                        </h3>
                        <p className="text-gray-800 text-base leading-relaxed">
                          في هذا المبحث نتناول الأسس والمبادئ التي يقوم عليها
                          هذا العلم الشريف...
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Live Writing Indicator */}
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center gap-2 bg-[rgba(252,190,45,0.1)] px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-[#fcbe2d] rounded-full animate-pulse"></div>
                      <span className="text-[#fcbe2d] text-xs font-bold">
                        جاري الكتابة...
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button
                      className="bg-[#fcbe2d] text-black px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 hover:bg-[#c99824]"
                      onClick={() =>
                        setState((prev) => ({ ...prev, showTemplates: true }))
                      }
                    >
                      اختر قالب
                    </Button>
                    <Button className="bg-[#2d2d2d] border border-white text-white px-4 py-2 rounded-lg font-normal text-sm transition-all duration-300 hover:bg-white hover:text-black">
                      إضافة صورة
                    </Button>
                    <Button className="bg-[#2d2d2d] border border-white text-white px-4 py-2 rounded-lg font-normal text-sm transition-all duration-300 hover:bg-white hover:text-black">
                      تصدير PDF
                    </Button>
                  </div>
                  <div className="text-white text-sm">آخر حفظ: الآن</div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Tools Sidebar */}
          <div className="w-1/3 p-6">
            <div className="bg-[rgba(45,45,45,0.9)] border border-white/10 rounded-2xl p-6 h-full">
              <h2 className="text-white text-2xl font-bold mb-6">
                الأدوات الذكية
              </h2>

              <div className="space-y-4">
                <div className="bg-[#1e1e1e] border border-white/10 rounded-lg p-4">
                  <h3 className="text-[#fcbe2d] text-base font-bold mb-2">
                    🎯 مولد الصور السياقي
                  </h3>
                  <p className="text-gray-300 text-sm">
                    إنشاء صور توضيحية تت��اسب مع المحتوى
                  </p>
                </div>

                <div className="bg-[#1e1e1e] border border-white/10 rounded-lg p-4">
                  <h3 className="text-[#fcbe2d] text-base font-bold mb-2">
                    🎤 الإملاء الصوتي
                  </h3>
                  <p className="text-gray-300 text-sm">
                    تحويل الصوت إلى نص منسق
                  </p>
                </div>

                <div className="bg-[#1e1e1e] border border-white/10 rounded-lg p-4">
                  <h3 className="text-[#fcbe2d] text-base font-bold mb-2">
                    🕌 الوضع الإسلامي
                  </h3>
                  <p className="text-gray-300 text-sm">
                    أذكار الكتابة وتنبيهات الصلاة
                  </p>
                  <div className="mt-2 text-[#fcbe2d] text-xs">
                    سبحان الله وبحمده
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Templates Modal */}
        {state.showTemplates && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-[#2d2d2d] border border-white/20 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <h2 className="text-white text-3xl font-bold mb-6 text-center">
                اختر قالب الكتابة (70 قالباً متخصصاً)
              </h2>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-6">
                  <h3 className="text-[#fcbe2d] text-xl font-bold mb-4">
                    ✨ Knoux-EpicWeaver (الراوي الملحمي)
                  </h3>
                  <div className="space-y-2">
                    {templates.map((template, index) => (
                      <div
                        key={index}
                        className="bg-[#2d2d2d] border border-white/10 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:border-[#fcbe2d]/50"
                        onClick={() => selectTemplate(state.category, template)}
                      >
                        <span className="text-white text-sm">{template}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl p-6">
                  <h3 className="text-[#fcbe2d] text-xl font-bold mb-4">
                    📚 Knoux-ScholarForge (منجم العلماء)
                  </h3>
                  <div className="space-y-2">
                    {templates.slice(0, 4).map((template, index) => (
                      <div
                        key={index}
                        className="bg-[#2d2d2d] border border-white/10 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:border-[#fcbe2d]/50"
                        onClick={() => selectTemplate("scholar", template)}
                      >
                        <span className="text-white text-sm">{template}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-[#fcbe2d] text-black py-3 rounded-lg font-bold text-base transition-all duration-300 hover:bg-[#c99824]"
                onClick={() =>
                  setState((prev) => ({ ...prev, showTemplates: false }))
                }
              >
                إغلاق
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-6">
          <p className="text-white text-base">
            "حيث الكلمة تُبَثّ على الهواء مباشرةً، والكتاب ينبض بالحياة،
            والمعرفة تجد موطنها."
          </p>
          <p className="text-[#fcbe2d] text-sm mt-2">
            Powered by the Knoux BookSmith Ultra™ Engine
          </p>
        </footer>
      </div>
    </div>
  );
};

export default KnouxBookWriter;
