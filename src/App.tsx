// src/App.tsx
// المكون الرئيسي الذي يُشكّل نقطة البداية للتطبيق، ويُنسق العرض العام.
// يدمج جميع المكونات والخدمات تحت مظلة Knoux الفاخرة.

import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // لنتوقع استخدام Router لتبديل بين الأقسام الرئيسية.

// استيراد مكونات Knoux المُخصصة لهيكل الواجهة الرئيسي
import { MainLayout } from "./components/layout/MainLayout";
import { KnouxThemeProvider } from "./lib/themeProvider"; // لتطبيق الثيم العام لـ Knoux
import { WelcomeScreen } from "./components/sections/WelcomeScreen"; // شاشة الترحيب
import { LibraryView } from "./components/sections/LibraryView"; // واجهة المكتبة ثلاثية الأبعاد
import { BookCreator } from "./components/sections/BookCreator"; // بيئة كتابة الكتاب مع المعاينة الحية
import { TemplateSelector } from "./components/sections/TemplateSelector"; // واجهة اختيار القوالب
import { SettingsPanel } from "./components/sections/SettingsPanel"; // واجهة الإعدادات العامة للتطبيق
import { CommandPalette } from "./components/sections/CommandPalette"; // للوصول السريع للوظائف

// Hook للوصول إلى بيانات نموذج إذا كنا سنبني النموذج العام هنا.
import { FormProvider, useForm } from "react-hook-form";

function App() {
  // استخدام useForm هنا قد يكون مناسباً إذا كان هناك إعدادات عامة تُدار من خلال نموذج واحد كبير في الصفحة الرئيسية.
  const appMethods = useForm({
    defaultValues: {
      // Set default values for global app settings if any
    },
  });

  // دالة رئيسية لمحاكاة وظائف الذكاء الاصطناعي التي قد تُستدعى.
  // هذه مُجرد إشارات لمكان استدعاء الوظائف الحقيقية.
  const handleAIAction = React.useCallback((action: string, data?: any) => {
    console.log(`AI Action Triggered: ${action}`, data);
    // Placeholder for actual AI service calls.
    alert(`Simulating AI action: ${action}`);
  }, []);

  return (
    // Provider لـ React Contexts المستخدمة في التطبيق (Theme, Form, AI-related if global)
    <KnouxThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <FormProvider {...appMethods}>
        <Router> {/* مُغلّف بروتّر لعرض مختلف الأقسام */}
          <MainLayout> {/* الهيكل العام لتطبيق Knoux: الرأس، الشريط الجانبي، مساحة العمل، وشريط الحالة */}

            {/* مساحة المحتوى الرئيسية التي ستُبَدّل بين الصفحات */}
            <Routes>
              {/* شاشة الترحيب عند فتح التطبيق لأول مرة */}
              <Route path="/" element={<WelcomeScreen onAIAction={handleAIAction} />} />

              {/* عرض قوالب الكتب عند الاختيار من الشريط الجانبي */}
              <Route path="/templates" element={<TemplateSelector />} />

              {/* مساحة إنشاء الكتاب مع المعاينة الحية */}
              <Route path="/create-book" element={<BookCreator />} />

              {/* واجهة المكتبة الإسلامية ثلاثية الأبعاد */}
              <Route path="/library" element={<LibraryView />} />

              {/* قسم الإعدادات العامة */}
              <Route path="/settings" element={<SettingsPanel />} />

              {/* نافذة الأوامر السريعة (إذا كانت مدعومة كنواة عامة) */}
              {/* Route for Command Palette if it's a global overlay component */}
              <Route path="/command-palette" element={<CommandPalette />} />

            </Routes>
          </MainLayout>
        </Router>
      </FormProvider>
    </KnouxThemeProvider>
  );
}

export default App;
