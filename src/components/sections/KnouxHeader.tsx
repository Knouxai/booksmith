// src/components/sections/KnouxHeader.tsx
// مثال بسيط لرأسية التطبيق بتصميم Knoux

import * as React from "react";

export const KnouxHeader = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b border-navy-800/50 bg-navy-800/50 px-6 py-3 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* شعار Knoux واسم التطبيق */}
        <img src="/assets/icons/knoux-logo-transparent.png" alt="Knoux Logo" className="h-8 w-auto" />
        <span className="text-xl font-serif font-semibold text-gold-400">
          Knoux BookSmith Ultra™
        </span>
      </div>
      <div className="flex items-center gap-4">
        {/* أزرار شريط البحث وواجهة AI والمنبه والملف الشخصي والإعدادات */}
        {/* يمكن إضافة أيقونات وأزرار هنا */}
        <button className="text-slate-gray hover:text-gold-400">بحث</button>
        <button className="text-slate-gray hover:text-gold-400">تنبيهات</button>
        <button className="text-slate-gray hover:text-gold-400">الملف الشخصي</button>
        <button className="text-slate-gray hover:text-gold-400">الإعدادات</button>
      </div>
    </header>
  );
};
