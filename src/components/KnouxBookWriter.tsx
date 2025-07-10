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
    writingProgress: 15,
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
    setTimeout(
      () => setState((prev) => ({ ...prev, writingProgress: 50 })),
      2000,
    );
    setTimeout(
      () => setState((prev) => ({ ...prev, writingProgress: 75 })),
      4000,
    );
    setTimeout(
      () => setState((prev) => ({ ...prev, writingProgress: 100 })),
      6000,
    );
  };

  const selectBook = (book: Book) => {
    console.log("Selected book:", book.title);
  };

  const selectTemplate = (category: string, template: string) => {
    setState((prev) => ({ ...prev, showTemplates: false, category }));
    console.log("Selected template:", template);
  };

  return (
    <div
      className="min-h-screen w-full bg-black relative overflow-hidden"
      style={{
        fontFamily: "'Old Standard TT', serif",
        background:
          "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
      }}
    >
      {/* Background Effects */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(252, 190, 45, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(1, 160, 211, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(193, 58, 197, 0.1) 0%, transparent 50%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-8">
            <div
              className="text-2xl font-bold tracking-wider"
              style={{
                color: "#fcbe2d",
                textShadow: "0 0 10px rgba(252, 190, 45, 0.8)",
              }}
            >
              📚✨ KNOuX Kitāb al-Mubīn™
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button
                className={`text-xl font-normal transition-all duration-300 hover:opacity-80 ${
                  state.activeSection === "writer"
                    ? "text-yellow-400"
                    : "text-white"
                }`}
                onClick={() =>
                  setState((prev) => ({ ...prev, activeSection: "writer" }))
                }
              >
                المحرر
              </button>
              <button
                className={`text-xl font-normal transition-all duration-300 hover:opacity-80 ${
                  state.showLibrary ? "text-yellow-400" : "text-white"
                }`}
                onClick={toggleLibrary}
              >
                المكتبة
              </button>
              <button
                className="text-white text-xl font-normal transition-all duration-300 hover:text-yellow-400"
                onClick={() =>
                  setState((prev) => ({ ...prev, showTemplates: true }))
                }
              >
                القوالب
              </button>
              <button
                className={`text-xl font-normal transition-all duration-300 hover:opacity-80 ${
                  state.activeSection === "export"
                    ? "text-yellow-400"
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
            <button
              className="px-6 py-3 rounded-full text-base font-normal transition-all duration-300 border"
              style={{
                backgroundColor: state.isWriting ? "#fcbe2d" : "#2d2d2d",
                color: state.isWriting ? "#000000" : "#ffffff",
                borderColor: state.isWriting ? "#fcbe2d" : "#ffffff",
              }}
            >
              دخول
            </button>
            <button className="px-6 py-3 bg-gray-700 border border-white text-white rounded-full text-base font-normal transition-all duration-300 hover:bg-white hover:text-black">
              ابدأ الآن
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex">
          {/* Writing Editor Sidebar */}
          {!state.showLibrary && (
            <div className="w-1/3 p-6">
              <div
                className="rounded-2xl p-6 h-full backdrop-blur-sm border"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  borderColor: "rgba(252, 190, 45, 0.2)",
                  boxShadow: "0 0 20px rgba(252, 190, 45, 0.3)",
                }}
              >
                <h2 className="text-white text-2xl font-bold mb-6">
                  محرر الكتابة الذكي
                </h2>

                {/* Progress Steps */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: "#fcbe2d",
                        boxShadow: "0 0 10px rgba(252, 190, 45, 0.8)",
                      }}
                    ></div>
                    <span className="text-white text-base">وحدة فهم النية</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          state.writingProgress > 20 ? "#fcbe2d" : "#666666",
                      }}
                    ></div>
                    <span className="text-white text-base">
                      وحدة بناء الهيكل
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          state.writingProgress > 40 ? "#fcbe2d" : "#666666",
                      }}
                    ></div>
                    <span className="text-white text-base">وكيل الكتابة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          state.writingProgress > 60 ? "#fcbe2d" : "#666666",
                      }}
                    ></div>
                    <span className="text-white text-base">مساعد المراجعة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          state.writingProgress > 80 ? "#fcbe2d" : "#666666",
                      }}
                    ></div>
                    <span className="text-white text-base">
                      وكيل الصور السياقي
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="w-full bg-gray-800 rounded-lg h-2">
                    <div
                      className="h-2 rounded-lg transition-all duration-500"
                      style={{
                        width: `${state.writingProgress}%`,
                        background:
                          "linear-gradient(to right, #fcbe2d, #c99824)",
                      }}
                    ></div>
                  </div>
                  <p className="text-white text-sm mt-2">
                    تقدم الكتابة: {Math.round(state.writingProgress)}%
                  </p>
                </div>

                {/* Input Area */}
                <textarea
                  className="w-full h-32 bg-gray-800 border border-gray-600 rounded-lg p-4 text-white text-sm resize-none mb-4"
                  placeholder="اكتب وصف��ً لكتابك أو ابدأ بالإملاء الصوتي..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />

                <button
                  className="w-full py-3 rounded-lg font-bold text-base transition-all duration-300 text-black"
                  style={{
                    background: "linear-gradient(to right, #fcbe2d, #c99824)",
                  }}
                  onClick={startWriting}
                >
                  🎤 ابدأ الكتابة بالذكاء الاصطناعي
                </button>
              </div>
            </div>
          )}

          {/* Library Sidebar */}
          {state.showLibrary && (
            <div className="w-1/3 p-6">
              <div
                className="rounded-2xl p-6 h-full backdrop-blur-sm border"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  borderColor: "rgba(252, 190, 45, 0.2)",
                  boxShadow: "0 0 20px rgba(252, 190, 45, 0.3)",
                }}
              >
                <h2 className="text-white text-2xl font-bold mb-6">
                  المكتبة الإسلامية ثلاثية الأبعاد
                </h2>

                <div className="space-y-4 mb-6">
                  {books.map((book) => (
                    <div
                      key={book.id}
                      className="bg-gray-800 border border-gray-600 rounded-lg p-4 cursor-pointer transition-all duration-300 hover:border-yellow-400"
                      onClick={() => selectBook(book)}
                    >
                      <h3 className="text-white text-base font-bold">
                        {book.title}
                      </h3>
                      <p className="text-gray-300 text-sm">{book.author}</p>
                      <span
                        className="inline-block mt-2 px-3 py-1 text-black text-xs rounded-full"
                        style={{ backgroundColor: "#fcbe2d" }}
                      >
                        {book.category}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className="w-full bg-gray-700 border border-white text-white py-3 rounded-lg font-normal text-base transition-all duration-300 hover:bg-white hover:text-black"
                  onClick={toggleLibrary}
                >
                  إغلاق المكتبة
                </button>
              </div>
            </div>
          )}

          {/* Main Preview Area */}
          <div className="flex-1 p-6">
            <div
              className="rounded-2xl h-full relative overflow-hidden backdrop-blur-lg border"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                borderColor: "rgba(252, 190, 45, 0.3)",
                boxShadow:
                  "0 0 30px rgba(252, 190, 45, 0.4), 0 0 60px rgba(1, 160, 211, 0.2), 0 0 60px rgba(193, 58, 197, 0.2)",
              }}
            >
              {/* Top Accent Line */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #fcbe2d, transparent)",
                }}
              ></div>

              <div className="p-8 h-full flex flex-col">
                {/* Preview Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-white text-3xl font-bold">
                    🔴 البث المباشر - معاينة الكتاب
                  </h2>
                  <div className="flex items-center gap-4">
                    <span className="text-yellow-400 text-sm">
                      الفصل: {state.currentChapter}
                    </span>
                    <span className="text-white text-sm">
                      صفحة {state.currentPage} من {state.totalPages}
                    </span>
                  </div>
                </div>

                {/* Book Preview Content */}
                <div
                  className="flex-1 rounded-2xl p-8 relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%)",
                  }}
                >
                  {/* Book Header Accent */}
                  <div
                    className="absolute top-0 left-0 w-full h-2"
                    style={{
                      background: "linear-gradient(to right, #fcbe2d, #c99824)",
                    }}
                  ></div>

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
                      <h2
                        className="text-black text-2xl font-bold mb-4 pb-2 border-b"
                        style={{ borderColor: "#fcbe2d" }}
                      >
                        المقدمة
                      </h2>
                      <p className="text-gray-800 text-lg leading-relaxed">
                        {state.livePreview ||
                          "بسم الله الرحمن الرحيم، الحمد لله رب العالمين، والصلاة والسلام على أشرف المرسلين، نبينا محمد وعلى آله وصحبه أجمعين. أما بعد، فهذا كتاب مبارك يحتوي على علوم جمة ومعارف واسعة تنفع القارئ في دينه ودنياه..."}
                      </p>
                    </div>

                    {state.writingProgress > 30 && (
                      <div className="mb-6">
                        <h3 className="text-black text-xl font-bold mb-3">
                          الفصل الأول
                        </h3>
                        <p className="text-gray-800 text-base leading-relaxed">
                          وبه نستعين على أمور الدنيا والدين، هذا كتاب مبارك يهدي
                          إلى الحق المبين، ويرشد إلى الصراط المستقيم...
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
                          هذا العلم الشريف، والقواعد التي ترشد الطالب إلى الفهم
                          الصحيح...
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Live Writing Indicator */}
                  <div className="absolute bottom-4 right-4">
                    <div
                      className="flex items-center gap-2 px-3 py-1 rounded-full"
                      style={{ backgroundColor: "rgba(252, 190, 45, 0.1)" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full animate-pulse"
                        style={{ backgroundColor: "#fcbe2d" }}
                      ></div>
                      <span
                        className="text-xs font-bold"
                        style={{ color: "#fcbe2d" }}
                      >
                        جاري الكتابة...
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button
                      className="px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 text-black"
                      style={{ backgroundColor: "#fcbe2d" }}
                      onClick={() =>
                        setState((prev) => ({ ...prev, showTemplates: true }))
                      }
                    >
                      اختر قالب
                    </button>
                    <button className="bg-gray-700 border border-white text-white px-4 py-2 rounded-lg font-normal text-sm transition-all duration-300 hover:bg-white hover:text-black">
                      إضافة صورة
                    </button>
                    <button className="bg-gray-700 border border-white text-white px-4 py-2 rounded-lg font-normal text-sm transition-all duration-300 hover:bg-white hover:text-black">
                      تصدير PDF
                    </button>
                  </div>
                  <div className="text-white text-sm">آخر حفظ: الآن</div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Tools Sidebar */}
          <div className="w-1/3 p-6">
            <div
              className="rounded-2xl p-6 h-full backdrop-blur-sm border"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                borderColor: "rgba(252, 190, 45, 0.2)",
                boxShadow: "0 0 20px rgba(252, 190, 45, 0.3)",
              }}
            >
              <h2 className="text-white text-2xl font-bold mb-6">
                الأدوات الذكية
              </h2>

              <div className="space-y-4">
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <h3
                    className="text-base font-bold mb-2"
                    style={{ color: "#fcbe2d" }}
                  >
                    🎯 مولد الصور السياقي
                  </h3>
                  <p className="text-gray-300 text-sm">
                    إنشاء صور توضيحية تتناسب مع المحتوى
                  </p>
                </div>

                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <h3
                    className="text-base font-bold mb-2"
                    style={{ color: "#fcbe2d" }}
                  >
                    🎤 الإملاء الصوتي
                  </h3>
                  <p className="text-gray-300 text-sm">
                    تحويل الصوت إلى نص منسق
                  </p>
                </div>

                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <h3
                    className="text-base font-bold mb-2"
                    style={{ color: "#fcbe2d" }}
                  >
                    🕌 الوضع الإسلامي
                  </h3>
                  <p className="text-gray-300 text-sm">
                    أذكار الكتابة وتنبيهات الصلاة
                  </p>
                  <div className="mt-2 text-xs" style={{ color: "#fcbe2d" }}>
                    سبحان الله وبحمده
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Templates Modal */}
        {state.showTemplates && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
            <div
              className="rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto backdrop-blur-lg border"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                borderColor: "rgba(252, 190, 45, 0.3)",
                boxShadow: "0 0 40px rgba(252, 190, 45, 0.5)",
              }}
            >
              <h2 className="text-white text-3xl font-bold mb-6 text-center">
                اختر قالب الكتابة (70 قالباً متخصصاً)
              </h2>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-800 border border-gray-600 rounded-2xl p-6">
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "#fcbe2d" }}
                  >
                    ✨ Knoux-EpicWeaver (الراوي الملحمي)
                  </h3>
                  <div className="space-y-2">
                    {templates.map((template, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 border border-gray-600 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:border-yellow-400"
                        onClick={() => selectTemplate(state.category, template)}
                      >
                        <span className="text-white text-sm">{template}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 border border-gray-600 rounded-2xl p-6">
                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "#fcbe2d" }}
                  >
                    📚 Knoux-ScholarForge (منجم العلماء)
                  </h3>
                  <div className="space-y-2">
                    {templates.slice(0, 4).map((template, index) => (
                      <div
                        key={index}
                        className="bg-gray-700 border border-gray-600 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:border-yellow-400"
                        onClick={() => selectTemplate("scholar", template)}
                      >
                        <span className="text-white text-sm">{template}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                className="w-full py-3 rounded-lg font-bold text-base transition-all duration-300 text-black"
                style={{ backgroundColor: "#fcbe2d" }}
                onClick={() =>
                  setState((prev) => ({ ...prev, showTemplates: false }))
                }
              >
                إغلاق
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-6">
          <p className="text-white text-base">
            "حيث الكلمة تُبَثّ على الهواء مباشرةً، والكتاب ينبض بالحياة،
            والمعرفة تجد موطنها."
          </p>
          <p className="text-sm mt-2" style={{ color: "#fcbe2d" }}>
            Powered by the Knoux BookSmith Ultra™ Engine
          </p>
        </footer>
      </div>
    </div>
  );
};

export default KnouxBookWriter;
