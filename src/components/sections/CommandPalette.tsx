// src/components/sections/CommandPalette.tsx
// نافذة الأوامر السريعة للوصول السريع للوظائف

import * as React from "react";

export const CommandPalette = () => {
  return (
    <div className="p-6 bg-navy-800 rounded-lg text-off-white">
      <h2 className="text-2xl font-bold mb-4">نافذة الأوامر السريعة</h2>
      <p>استخدم هذه النافذة للوصول السريع إلى الوظائف والأدوات.</p>
      {/* يمكن إضافة قائمة أو بحث للأوامر هنا */}
      <div className="mt-4 border border-navy-700 rounded p-4 text-center text-slate-gray">
        نافذة الأوامر قيد التطوير...
      </div>
    </div>
  );
};
