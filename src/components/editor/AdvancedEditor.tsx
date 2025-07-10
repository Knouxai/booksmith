"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useApp, useBooks, useChapters, useAI } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Link,
  Image,
  Mic,
  MicOff,
  Save,
  Eye,
  EyeOff,
  Type,
  Palette,
  Zap,
  RefreshCw,
  MessageSquare,
  BookOpen,
  Target,
  Hash,
} from "lucide-react";

interface EditorProps {
  className?: string;
}

const AdvancedEditor: React.FC<EditorProps> = ({ className = "" }) => {
  const { state } = useApp();
  const { currentBook, updateBook } = useBooks();
  const { currentChapter, updateChapter } = useChapters();
  const { addAIRequest, setAIInProgress } = useAI();

  const [editorContent, setEditorContent] = useState(
    currentChapter?.content || "",
  );
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);
  const [fontSize, setFontSize] = useState(16);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [isAIAssisting, setIsAIAssisting] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [showAIMenu, setShowAIMenu] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const aiMenuRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<any>(null);

  // تحديث المحتوى عند تغيير الفصل
  useEffect(() => {
    setEditorContent(currentChapter?.content || "");
  }, [currentChapter]);

  // حفظ المحتوى تلقائياً
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (currentChapter && editorContent !== currentChapter.content) {
        const wordCount = editorContent
          .split(" ")
          .filter((word) => word.length > 0).length;
        updateChapter({
          ...currentChapter,
          content: editorContent,
          wordCount,
        });
      }
    }, 1000);

    return () => clearTimeout(saveTimer);
  }, [editorContent, currentChapter, updateChapter]);

  // إعداد التعرف على الصوت
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        (window as any).webkitSpeechRecognition ||
        (window as any).SpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = "ar-SA";

      recognition.current.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript) {
          insertTextAtCursor(finalTranscript);
        }
      };

      recognition.current.onerror = (event: any) => {
        console.error("خطأ في التعرف عل�� الصوت:", event.error);
        setIsVoiceRecording(false);
      };

      recognition.current.onend = () => {
        setIsVoiceRecording(false);
      };
    }
  }, []);

  // إدراج النص في موقع المؤشر
  const insertTextAtCursor = useCallback(
    (text: string) => {
      if (editorRef.current) {
        const start = editorRef.current.selectionStart;
        const end = editorRef.current.selectionEnd;
        const newContent =
          editorContent.substring(0, start) +
          text +
          editorContent.substring(end);
        setEditorContent(newContent);

        // إعادة تعيين موقع المؤشر
        setTimeout(() => {
          if (editorRef.current) {
            editorRef.current.selectionStart = start + text.length;
            editorRef.current.selectionEnd = start + text.length;
            editorRef.current.focus();
          }
        }, 0);
      }
    },
    [editorContent],
  );

  // تنسيق النص
  const formatText = (format: string) => {
    if (!editorRef.current) return;

    const start = editorRef.current.selectionStart;
    const end = editorRef.current.selectionEnd;
    const selectedText = editorContent.substring(start, end);

    let formattedText = "";
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "underline":
        formattedText = `<u>${selectedText}</u>`;
        break;
      case "quote":
        formattedText = `> ${selectedText}`;
        break;
      case "list":
        formattedText = `- ${selectedText}`;
        break;
      case "ordered-list":
        formattedText = `1. ${selectedText}`;
        break;
      case "heading":
        formattedText = `## ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent =
      editorContent.substring(0, start) +
      formattedText +
      editorContent.substring(end);
    setEditorContent(newContent);

    // إعادة التركيز والتحديد
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        editorRef.current.setSelectionRange(
          start,
          start + formattedText.length,
        );
      }
    }, 0);
  };

  // تبديل التسجيل الصوتي
  const toggleVoiceRecording = () => {
    if (recognition.current) {
      if (isVoiceRecording) {
        recognition.current.stop();
      } else {
        recognition.current.start();
        setIsVoiceRecording(true);
      }
    }
  };

  // معالجة النص بالذكاء الاصطناعي
  const handleAIAssist = async (action: string) => {
    if (!selectedText) return;

    setIsAIAssisting(true);
    setAIInProgress(true);

    const request = addAIRequest({
      type: action as any,
      prompt: selectedText,
    });

    // محاكاة معالجة AI
    setTimeout(() => {
      let aiResponse = "";
      switch (action) {
        case "improve":
          aiResponse = `${selectedText} (محسن بالذكاء الاصطناعي)`;
          break;
        case "expand":
          aiResponse = `${selectedText}. وفي هذا السياق، يمكننا أن نوضح المزيد من التفاصيل والمعلومات المتعلقة بهذا الموضوع...`;
          break;
        case "simplify":
          aiResponse = selectedText
            .split(" ")
            .slice(0, Math.ceil(selectedText.split(" ").length * 0.7))
            .join(" ");
          break;
        case "translate":
          aiResponse = `[الترجمة الإنجليزية: ${selectedText}]`;
          break;
        default:
          aiResponse = selectedText;
      }

      // استبدال النص المحدد بالاستجابة
      const start = editorContent.indexOf(selectedText);
      if (start !== -1) {
        const newContent = editorContent.replace(selectedText, aiResponse);
        setEditorContent(newContent);
      }

      setIsAIAssisting(false);
      setAIInProgress(false);
      setShowAIMenu(false);
    }, 2000);
  };

  // معالجة تحديد النص
  const handleTextSelection = () => {
    if (editorRef.current) {
      const start = editorRef.current.selectionStart;
      const end = editorRef.current.selectionEnd;
      const selected = editorContent.substring(start, end);
      setSelectedText(selected);
      setCursorPosition(start);

      if (selected.length > 0) {
        setShowAIMenu(true);
      } else {
        setShowAIMenu(false);
      }
    }
  };

  // حساب الإحصائيات
  const wordCount = editorContent
    .split(" ")
    .filter((word) => word.length > 0).length;
  const charCount = editorContent.length;
  const charCountNoSpaces = editorContent.replace(/\s/g, "").length;
  const paragraphCount = editorContent
    .split("\n\n")
    .filter((p) => p.trim().length > 0).length;
  const readingTime = Math.ceil(wordCount / 200); // 200 كلمة في الدقيقة

  if (!currentChapter) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <BookOpen className="h-12 w-12 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">لا يوجد فصل محدد</h3>
          <p className="text-sm">
            اختر فصلاً من الشريط الجانبي أو أنشئ فصلاً جديداً للبدء في الكتابة
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* شريط الأدوات */}
      {showToolbar && (
        <div
          className="border-b p-3 backdrop-blur-lg"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderColor: "rgba(252, 190, 45, 0.2)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            {/* أدوات التنسيق */}
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("bold")}
                className="text-gray-400 hover:text-white p-1"
                title="عريض (Ctrl+B)"
              >
                <Bold className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("italic")}
                className="text-gray-400 hover:text-white p-1"
                title="مائل (Ctrl+I)"
              >
                <Italic className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("underline")}
                className="text-gray-400 hover:text-white p-1"
                title="تحته خط (Ctrl+U)"
              >
                <Underline className="h-4 w-4" />
              </Button>

              <div className="h-4 w-px bg-gray-600 mx-1" />

              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("heading")}
                className="text-gray-400 hover:text-white p-1"
                title="عنوان"
              >
                <Hash className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("list")}
                className="text-gray-400 hover:text-white p-1"
                title="قائمة نقطية"
              >
                <List className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("ordered-list")}
                className="text-gray-400 hover:text-white p-1"
                title="قائمة مرقمة"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => formatText("quote")}
                className="text-gray-400 hover:text-white p-1"
                title="اقتباس"
              >
                <Quote className="h-4 w-4" />
              </Button>

              <div className="h-4 w-px bg-gray-600 mx-1" />

              {/* التسجيل الصوتي */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleVoiceRecording}
                className={`p-1 ${isVoiceRecording ? "text-red-400" : "text-gray-400 hover:text-white"}`}
                title={
                  isVoiceRecording ? "إيقاف التسجيل" : "بدء التسجيل الصوتي"
                }
                disabled={!recognition.current}
              >
                {isVoiceRecording ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* أدوات العرض والإعدادات */}
            <div className="flex items-center gap-1">
              {/* حجم الخط */}
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-gray-400" />
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-16"
                />
                <span className="text-xs text-gray-400 w-6">{fontSize}</span>
              </div>

              <div className="h-4 w-px bg-gray-600 mx-1" />

              {/* تبديل المعاينة */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className={`p-1 ${showPreview ? "text-yellow-400" : "text-gray-400 hover:text-white"}`}
                title={showPreview ? "إخفاء المعاينة" : "عرض المعاينة"}
              >
                {showPreview ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>

              {/* إخفاء شريط الأدوات */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowToolbar(false)}
                className="text-gray-400 hover:text-white p-1"
                title="إخفاء شريط الأدوات (F11)"
              >
                <Target className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* معلومات الفصل والإحصائيات */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-4 text-gray-400">
              <span>📖 {currentChapter.title}</span>
              <span>📊 {wordCount} كلمة</span>
              <span>📄 {charCount} حرف</span>
              <span>⏱️ {readingTime} دقيقة قراءة</span>
              <span>📑 {paragraphCount} فقرة</span>
            </div>

            {isVoiceRecording && (
              <div className="flex items-center gap-2 text-red-400">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <span>جاري التسجيل...</span>
              </div>
            )}

            {isAIAssisting && (
              <div className="flex items-center gap-2 text-yellow-400">
                <RefreshCw className="h-3 w-3 animate-spin" />
                <span>الذكاء الاصطناعي يعمل...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* منطقة المحرر */}
      <div className="flex-1 flex">
        {/* المحرر */}
        <div className={`${showPreview ? "w-1/2" : "w-full"} relative`}>
          <textarea
            ref={editorRef}
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
            onSelect={handleTextSelection}
            placeholder="ابدأ الكتابة هنا... يمكنك استخدام الإملاء الصوتي أو الكتابة التقليدية"
            className="w-full h-full p-6 bg-transparent text-white resize-none focus:outline-none"
            style={{
              fontSize: `${fontSize}px`,
              lineHeight: lineHeight,
              fontFamily: "'Old Standard TT', serif",
            }}
            dir="rtl"
          />

          {/* قائمة الذكاء الاصطناعي */}
          {showAIMenu && selectedText && (
            <div
              ref={aiMenuRef}
              className="absolute z-10 rounded-lg border backdrop-blur-lg shadow-lg p-2"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.9)",
                borderColor: "rgba(252, 190, 45, 0.3)",
                top: `${Math.min((cursorPosition / editorContent.length) * 100, 80)}%`,
                left: "10px",
              }}
            >
              <div className="text-xs text-yellow-400 mb-2 px-2">
                الذكاء الاصطناعي
              </div>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAIAssist("improve")}
                  className="w-full text-right justify-start text-white hover:bg-gray-700 text-xs py-1"
                  disabled={isAIAssisting}
                >
                  <Zap className="h-3 w-3 ml-2" />
                  تحسين النص
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAIAssist("expand")}
                  className="w-full text-right justify-start text-white hover:bg-gray-700 text-xs py-1"
                  disabled={isAIAssisting}
                >
                  <MessageSquare className="h-3 w-3 ml-2" />
                  توسيع النص
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleAIAssist("simplify")}
                  className="w-full text-right justify-start text-white hover:bg-gray-700 text-xs py-1"
                  disabled={isAIAssisting}
                >
                  <RefreshCw className="h-3 w-3 ml-2" />
                  تبسيط النص
                </Button>
              </div>
            </div>
          )}

          {/* زر إظهار شريط الأدوات عند إخفاؤه */}
          {!showToolbar && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowToolbar(true)}
              className="absolute top-4 left-4 text-gray-400 hover:text-white p-1"
              title="إظهار شريط الأدوات"
            >
              <Target className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* المعاينة الحية */}
        {showPreview && (
          <div className="w-1/2 border-r border-gray-700">
            <div
              className="h-full p-6 overflow-y-auto"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                color: "#000",
              }}
            >
              <div className="max-w-none prose prose-lg">
                <h1
                  className="text-2xl font-bold mb-4"
                  style={{ color: "#000" }}
                >
                  {currentChapter.title}
                </h1>
                <div
                  className="whitespace-pre-wrap leading-relaxed"
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: lineHeight,
                    fontFamily: "'Old Standard TT', serif",
                    direction: "rtl",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: editorContent
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em>$1</em>")
                      .replace(/<u>(.*?)<\/u>/g, "<u>$1</u>")
                      .replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>")
                      .replace(/^## (.*$)/gm, "<h2>$1</h2>")
                      .replace(/^- (.*$)/gm, "<li>$1</li>")
                      .replace(/^\d+\. (.*$)/gm, "<li>$1</li>")
                      .replace(/\n/g, "<br>"),
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedEditor;
