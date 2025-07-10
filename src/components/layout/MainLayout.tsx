// src/components/layout/MainLayout.tsx
// الهيكل الرئيسي الذي يُشكل نافذة تطبيق Knoux BookSmith Ultra™.
// مستوحى من تصميم Figma ولكن مع تطبيق هوية Knoux في جميع الأجزاء.

import * as React from "react";
import { KnouxHeader } from "../sections/KnouxHeader"; // مثال لمكون الرأس المخصص.
import { KnouxSidebar } from "../sections/KnouxSidebar"; // مثال لمكون الشريط الجانبي المخصص.
import { KnouxStatusBar } from "../sections/KnouxStatusBar"; // مثال لمكون شريط الحالة السفلي.

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    // الحاوية الخارجية الرئيسية للتطبيق، تطبق التخصيصات العامة لواجهة Knoux (مثل التأثيرات الخلفية، إلخ).
    <div className="flex h-screen w-full flex-col bg-navy-900 bg-cover bg-center backdrop-blur-xl"> {/* الخلفية العامة بنمط الزجاج العميق */}

      {/* Header الرئيسي للتطبيق، يُفترض أنه يحتوي على الشعار، قوائم التنقل الرئيسية، أيقونات سريعة */}
      <KnouxHeader />

      <div className="flex flex-1 overflow-hidden"> {/* يُقسم النافذة إلى الشريط الجانبي والمحتوى الرئيسي */}

        {/* الشريط الجانبي للمستكشف والمشاريع والمكتبة */}
        <KnouxSidebar />

        {/* المساحة الرئيسية لعرض المحتوى (المحرر، المعاينة، المكتبة، إلخ) */}
        <main className="flex-1 overflow-auto p-5"> {/* هامش جيد للمحتوى الرئيسي، ويسمح بالمرونة */}
          {children} {/* يتم هنا عرض المكونات مثل BookCreator, LibraryView */}
        </main>
      </div>

      {/* شريط الحالة السفلي للمعلومات الإضافية والوظائف الثانوية */}
      <KnouxStatusBar />

    </div>
  );
};
