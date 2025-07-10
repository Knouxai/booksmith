// src/components/sections/TemplateSelector.tsx
// واجهة اختيار القوالب (7 أقسام × 10 قوالب)

import * as React from "react";

export const TemplateSelector = () => {
  return (
    <div className="p-6 bg-navy-800 rounded-lg text-off-white">
      <h2 className="text-2xl font-bold mb-4">اختيار القوالب</h2>
      <p>اختر من بين مجموعة واسعة من القوالب المصممة مسبقًا لتسهيل إنشاء الكتب.</p>
      {/* يمكن إضافة قائمة أو شبكة للقوالب هنا */}
      <div className="mt-4 border border-navy-700 rounded p-4 text-center text-slate-gray">
        قائمة القوالب قيد التطوير...
      </div>
    </div>
  );
};
