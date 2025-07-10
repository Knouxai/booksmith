"use client";

import React, { useState, useEffect } from "react";
import { useApp, useUI, useBooks, useAI } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  Save,
  Wifi,
  WifiOff,
  Activity,
  Clock,
  Target,
  Eye,
  EyeOff,
  Zap,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";

const KnouxStatusBar: React.FC = () => {
  const { state } = useApp();
  const { currentBook } = useBooks();
  const { aiInProgress, aiRequests } = useAI();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionStartTime] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    "saved" | "saving" | "error"
  >("saved");
  const [showDetails, setShowDetails] = useState(false);

  // تحديث الوقت كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // مراقبة حالة الاتصال
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // محاكاة الحفظ التلقائي
  useEffect(() => {
    if (currentBook && state.userPreferences.autoSave) {
      setAutoSaveStatus("saving");
      const timer = setTimeout(() => {
        setAutoSaveStatus("saved");
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentBook?.content, state.userPreferences.autoSave]);

  // حساب إحصائيات الجلسة
  const sessionDuration = Math.floor(
    (currentTime.getTime() - sessionStartTime.getTime()) / 1000,
  );
  const sessionHours = Math.floor(sessionDuration / 3600);
  const sessionMinutes = Math.floor((sessionDuration % 3600) / 60);
  const sessionSeconds = sessionDuration % 60;

  // حساب عدد الكلمات الحالي
  const currentWordCount = currentBook
    ? currentBook.chapters.reduce(
        (total, chapter) =>
          total +
          (chapter.content?.split(" ").filter((word) => word.length > 0)
            .length || 0),
        0,
      )
    : 0;

  // هدف الكلمات اليومي (يمكن جعله قابل للتخصيص)
  const dailyWordGoal = 1000;
  const goalProgress = Math.min((currentWordCount / dailyWordGoal) * 100, 100);

  // حالة طلبات الذكاء الاصطناعي
  const pendingAIRequests = aiRequests.filter(
    (req) => req.status === "pending",
  ).length;
  const completedAIRequests = aiRequests.filter(
    (req) => req.status === "completed",
  ).length;
  const errorAIRequests = aiRequests.filter(
    (req) => req.status === "error",
  ).length;

  // تنسيق الوقت
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ar", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  // تنسيق وقت الجلسة
  const formatSessionTime = () => {
    if (sessionHours > 0) {
      return `${sessionHours}:${sessionMinutes.toString().padStart(2, "0")}:${sessionSeconds.toString().padStart(2, "0")}`;
    }
    return `${sessionMinutes}:${sessionSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <footer
      className="h-8 border-t backdrop-blur-lg flex items-center justify-between px-4 text-xs"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "rgba(252, 190, 45, 0.2)",
      }}
    >
      {/* الجانب الأيمن - معلومات الكتاب والكتابة */}
      <div className="flex items-center gap-4">
        {/* حالة الحفظ */}
        <div className="flex items-center gap-1">
          {autoSaveStatus === "saving" && (
            <>
              <Activity className="h-3 w-3 text-yellow-400 animate-spin" />
              <span className="text-yellow-400">جاري الحفظ...</span>
            </>
          )}
          {autoSaveStatus === "saved" && (
            <>
              <CheckCircle className="h-3 w-3 text-green-400" />
              <span className="text-green-400">محفوظ</span>
            </>
          )}
          {autoSaveStatus === "error" && (
            <>
              <AlertCircle className="h-3 w-3 text-red-400" />
              <span className="text-red-400">خطأ في الحفظ</span>
            </>
          )}
        </div>

        {/* إحصائيات الكتابة */}
        {currentBook && (
          <>
            <div className="text-gray-400">|</div>
            <div className="flex items-center gap-1">
              <Target className="h-3 w-3 text-gray-400" />
              <span className="text-white">
                {currentWordCount.toLocaleString()}
              </span>
              <span className="text-gray-400">كلمة</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-gray-400">الهدف:</span>
              <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${goalProgress}%`,
                    backgroundColor:
                      goalProgress >= 100 ? "#22c55e" : "#fcbe2d",
                  }}
                />
              </div>
              <span className="text-white">{Math.round(goalProgress)}%</span>
            </div>

            <div className="text-gray-400">|</div>
            <div className="flex items-center gap-1">
              <span className="text-gray-400">الفصول:</span>
              <span className="text-white">{currentBook.chapters.length}</span>
            </div>
          </>
        )}

        {/* حالة الذكاء الاصطناعي */}
        {(aiInProgress || aiRequests.length > 0) && (
          <>
            <div className="text-gray-400">|</div>
            <div className="flex items-center gap-2">
              <Zap
                className={`h-3 w-3 ${aiInProgress ? "text-yellow-400 animate-pulse" : "text-gray-400"}`}
              />
              <span className="text-gray-400">AI:</span>
              {pendingAIRequests > 0 && (
                <span className="text-yellow-400">
                  {pendingAIRequests} قيد المعالجة
                </span>
              )}
              {completedAIRequests > 0 && (
                <span className="text-green-400">
                  {completedAIRequests} مكتمل
                </span>
              )}
              {errorAIRequests > 0 && (
                <span className="text-red-400">{errorAIRequests} خطأ</span>
              )}
            </div>
          </>
        )}
      </div>

      {/* الوسط - معلومات القالب والوضع */}
      <div className="flex items-center gap-4">
        {state.selectedTemplate && (
          <>
            <div className="flex items-center gap-1">
              <span className="text-gray-400">القالب:</span>
              <span className="text-yellow-400">
                {state.selectedTemplate.name}
              </span>
            </div>
            <div className="text-gray-400">|</div>
          </>
        )}

        {state.userPreferences.islamicMode && (
          <>
            <div className="flex items-center gap-1">
              <span className="text-green-400">🕌</span>
              <span className="text-green-400">الوضع الإسلامي</span>
            </div>
            <div className="text-gray-400">|</div>
          </>
        )}

        {/* وقت الجلسة */}
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3 text-gray-400" />
          <span className="text-white">{formatSessionTime()}</span>
        </div>
      </div>

      {/* الجانب الأيسر - حالة النظام والوقت */}
      <div className="flex items-center gap-4">
        {/* حالة الاتصال */}
        <div className="flex items-center gap-1">
          {isOnline ? (
            <>
              <Wifi className="h-3 w-3 text-green-400" />
              <span className="text-green-400">متصل</span>
            </>
          ) : (
            <>
              <WifiOff className="h-3 w-3 text-red-400" />
              <span className="text-red-400">غير متصل</span>
            </>
          )}
        </div>

        <div className="text-gray-400">|</div>

        {/* تبديل عرض التفاصيل */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          className="text-gray-400 hover:text-white p-0 h-auto"
          title={showDetails ? "إخفاء التفاصيل" : "عرض التفاصيل"}
        >
          {showDetails ? (
            <EyeOff className="h-3 w-3" />
          ) : (
            <Eye className="h-3 w-3" />
          )}
        </Button>

        <div className="text-gray-400">|</div>

        {/* الوقت الحالي */}
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{formatTime(currentTime)}</span>
        </div>

        {/* معلومات الإصدار */}
        <div className="text-gray-400">|</div>
        <div className="text-gray-400">KNOuX v1.0</div>
      </div>

      {/* لوحة التفاصيل المنبثقة */}
      {showDetails && (
        <div
          className="absolute bottom-full left-4 right-4 mb-1 rounded-lg border backdrop-blur-lg shadow-lg p-4"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            borderColor: "rgba(252, 190, 45, 0.3)",
          }}
        >
          <div className="grid grid-cols-3 gap-6 text-sm">
            {/* إحصائيات الجلسة */}
            <div>
              <h4 className="text-yellow-400 font-medium mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                إحصائيات الجلسة
              </h4>
              <div className="space-y-1 text-gray-300">
                <div>وقت البداية: {formatTime(sessionStartTime)}</div>
                <div>المدة: {formatSessionTime()}</div>
                <div>الكلمات المكتوبة: {currentWordCount}</div>
                <div>
                  الوضع: {state.userPreferences.islamicMode ? "إسلامي" : "عادي"}
                </div>
              </div>
            </div>

            {/* معلومات النظام */}
            <div>
              <h4 className="text-yellow-400 font-medium mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                حالة النظام
              </h4>
              <div className="space-y-1 text-gray-300">
                <div>الاتصال: {isOnline ? "متصل" : "منقطع"}</div>
                <div>
                  الحفظ التلقائي:{" "}
                  {state.userPreferences.autoSave ? "مفعل" : "معطل"}
                </div>
                <div>
                  اللغة:{" "}
                  {state.userPreferences.language === "ar"
                    ? "العربية"
                    : "الإنجليزية"}
                </div>
                <div>
                  السمة:{" "}
                  {state.userPreferences.theme === "dark" ? "داكنة" : "فاتحة"}
                </div>
              </div>
            </div>

            {/* معلومات المشروع */}
            <div>
              <h4 className="text-yellow-400 font-medium mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                المشروع الحالي
              </h4>
              {currentBook ? (
                <div className="space-y-1 text-gray-300">
                  <div>العنوان: {currentBook.title}</div>
                  <div>المؤلف: {currentBook.author}</div>
                  <div>الفئة: {currentBook.category}</div>
                  <div>
                    آخر تحديث: {currentBook.updatedAt.toLocaleString("ar")}
                  </div>
                </div>
              ) : (
                <div className="text-gray-400">لا يوجد مشروع مفتوح</div>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default KnouxStatusBar;
