"use client";

import React, { useState } from "react";
import { useApp, useUI, useBooks } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  Search,
  Settings,
  User,
  Bell,
  Save,
  Download,
  Upload,
  Menu,
  X,
} from "lucide-react";

const KnouxHeader: React.FC = () => {
  const { state } = useApp();
  const {
    activeSection,
    showSidebar,
    toggleSidebar,
    setActiveSection,
    toggleCommandPalette,
  } = useUI();
  const { currentBook } = useBooks();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // تحديث عداد الكلمات من الكت��ب الحالي
  const currentWordCount = currentBook
    ? currentBook.chapters.reduce(
        (total, chapter) => total + (chapter.content?.split(" ").length || 0),
        0,
      )
    : 0;

  // التنقل بين الأقسام
  const navigationItems = [
    { id: "welcome", label: "الرئيسية", icon: "🏠" },
    { id: "writer", label: "محرر الكتابة", icon: "✍️" },
    { id: "library", label: "المكتبة", icon: "📚" },
    { id: "templates", label: "القوالب", icon: "📋" },
    { id: "settings", label: "الإعدادات", icon: "⚙️" },
  ] as const;

  const handleSaveBook = async () => {
    if (currentBook) {
      // محاكاة حفظ الكتاب
      console.log("حفظ الكتاب:", currentBook.title);
      // يمكن إضافة منطق الحفظ الفعلي هنا
    }
  };

  const handleExportBook = async () => {
    if (currentBook) {
      // محاكاة تصدير الكتاب
      console.log("تصدير الكتاب:", currentBook.title);
      // يمكن إضافة منطق التصدير الفعلي هنا
    }
  };

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-lg"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "rgba(252, 190, 45, 0.3)",
        boxShadow: "0 4px 20px rgba(252, 190, 45, 0.2)",
      }}
    >
      <div className="flex items-center justify-between h-16 px-4">
        {/* الجانب الأيمن - الشعار والتنقل */}
        <div className="flex items-center gap-4">
          {/* زر القائمة الجانبية */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="text-white hover:text-yellow-400 p-2"
          >
            {showSidebar ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          {/* الشعار */}
          <div className="flex items-center gap-3">
            <div
              className="text-2xl font-bold tracking-wider"
              style={{
                color: "#fcbe2d",
                textShadow: "0 0 10px rgba(252, 190, 45, 0.8)",
                fontFamily: "'Old Standard TT', serif",
              }}
            >
              📚✨ KNOuX
            </div>
            <div className="hidden md:block text-sm text-gray-300">
              Kitāb al-Mubīn™
            </div>
          </div>

          {/* التنقل الرئيسي */}
          <nav className="hidden lg:flex items-center gap-2 mr-6">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection(item.id as any)}
                className={`text-sm font-normal transition-all duration-300 px-4 py-2 ${
                  activeSection === item.id
                    ? "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20"
                    : "text-white hover:text-yellow-400 hover:bg-white/5"
                }`}
                style={
                  activeSection === item.id
                    ? {
                        textShadow: "0 0 8px rgba(252, 190, 45, 0.8)",
                      }
                    : {}
                }
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Button>
            ))}
          </nav>
        </div>

        {/* الوسط - معلومات الكتاب الحالي */}
        {currentBook && (
          <div className="hidden md:flex items-center gap-4 text-center">
            <div className="text-sm">
              <div className="text-white font-medium">{currentBook.title}</div>
              <div className="text-gray-400 text-xs">
                {currentBook.chapters.length} فصل •{" "}
                {currentWordCount.toLocaleString()} كلمة
              </div>
            </div>

            {/* شريط التقدم */}
            <div className="w-32 h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${state.writingProgress}%`,
                  background: "linear-gradient(to right, #fcbe2d, #c99824)",
                }}
              />
            </div>
            <div className="text-xs text-gray-400">
              {Math.round(state.writingProgress)}%
            </div>
          </div>
        )}

        {/* الجانب الأيسر - الأدوات والمستخدم */}
        <div className="flex items-center gap-2">
          {/* أدوات الكتاب */}
          {currentBook && (
            <div className="hidden md:flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveBook}
                className="text-white hover:text-green-400 p-2"
                title="حفظ الكتاب"
              >
                <Save className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleExportBook}
                className="text-white hover:text-blue-400 p-2"
                title="تصدير الكتاب"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* البحث السريع */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleCommandPalette}
            className="text-white hover:text-yellow-400 p-2"
            title="البحث السريع (Ctrl+K)"
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* الإشعارات */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-white hover:text-yellow-400 p-2"
              title="الإشعارات"
            >
              <Bell className="h-4 w-4" />
              {state.aiInProgress && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              )}
            </Button>

            {/* قائمة الإشعارات */}
            {showNotifications && (
              <div
                className="absolute left-0 top-full mt-2 w-80 rounded-lg border backdrop-blur-lg shadow-lg"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  borderColor: "rgba(252, 190, 45, 0.3)",
                }}
              >
                <div className="p-4">
                  <h3 className="text-white font-medium mb-3">الإشعارات</h3>

                  {state.aiRequests.length > 0 ? (
                    <div className="space-y-2">
                      {state.aiRequests.slice(-3).map((request) => (
                        <div
                          key={request.id}
                          className="p-2 rounded bg-gray-800/50"
                        >
                          <div className="text-sm text-white">
                            {request.type === "text-generation" &&
                              "🤖 توليد نص"}
                            {request.type === "text-improvement" &&
                              "✨ تحسين نص"}
                            {request.type === "image-generation" &&
                              "🎨 توليد صورة"}
                            {request.type === "reference-check" &&
                              "📖 التحقق من المراجع"}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {request.status === "pending" && "قيد المعالجة..."}
                            {request.status === "completed" && "مكتمل"}
                            {request.status === "error" && "خطأ"}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-sm text-center py-4">
                      لا توجد إشعارات جديدة
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* الإعدادات */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveSection("settings")}
            className="text-white hover:text-yellow-400 p-2"
            title="الإعدادات"
          >
            <Settings className="h-4 w-4" />
          </Button>

          {/* قائمة المستخدم */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="text-white hover:text-yellow-400 p-2"
              title="حساب المستخدم"
            >
              <User className="h-4 w-4" />
            </Button>

            {/* قائمة المستخدم المنسدلة */}
            {showUserMenu && (
              <div
                className="absolute left-0 top-full mt-2 w-48 rounded-lg border backdrop-blur-lg shadow-lg"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  borderColor: "rgba(252, 190, 45, 0.3)",
                }}
              >
                <div className="p-2">
                  <div className="px-3 py-2 text-sm text-gray-300 border-b border-gray-700">
                    الكاتب الإسلامي
                  </div>

                  <button className="w-full text-right px-3 py-2 text-sm text-white hover:bg-gray-700 rounded">
                    الملف الشخصي
                  </button>

                  <button className="w-full text-right px-3 py-2 text-sm text-white hover:bg-gray-700 rounded">
                    كتبي
                  </button>

                  <button className="w-full text-right px-3 py-2 text-sm text-white hover:bg-gray-700 rounded">
                    الإحصائيات
                  </button>

                  <div className="border-t border-gray-700 mt-1 pt-1">
                    <button className="w-full text-right px-3 py-2 text-sm text-red-400 hover:bg-gray-700 rounded">
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* شريط التنقل المحمول */}
      <div className="lg:hidden border-t border-gray-700 px-4 py-2">
        <div className="flex items-center gap-1 overflow-x-auto">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveSection(item.id as any)}
              className={`text-xs whitespace-nowrap px-3 py-1 ${
                activeSection === item.id
                  ? "text-yellow-400 bg-yellow-400/10"
                  : "text-white hover:text-yellow-400"
              }`}
            >
              <span className="mr-1">{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default KnouxHeader;
