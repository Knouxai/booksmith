// src/components/sections/BookCreator.tsx
// الواجهة الرئيسية لإنشاء الكتاب مع المعاينة الحية

import * as React from "react";

export const BookCreator = () => {
  return (
    <div className="p-6 bg-navy-800 rounded-lg text-off-white">
      <h2 className="text-2xl font-bold mb-4">بيئة إنشاء الكتاب</h2>
      <p>اكتب وعاين كتابك مباشرة باستخدام أدواتنا المتقدمة.</p>
      {/* يمكن إضافة محرر نصوص ومعاينة حية هنا */}
      <div className="mt-4 border border-navy-700 rounded p-4 text-center text-slate-gray">
        محرر الكتاب قيد التطوير...
      </div>
    </div>
  );
};
