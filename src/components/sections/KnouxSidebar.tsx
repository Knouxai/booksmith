// src/components/sections/KnouxSidebar.tsx
// مثال لشريط جانبي بسيط لمستكشف المشاريع والمكتبة.

import * as React from "react";

export const KnouxSidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-navy-800/50 bg-navy-800/40 px-3 py-5 backdrop-blur-lg">
      <div className="flex flex-col space-y-4">
        {/* قسم المشاريع النشطة */}
        <div className="p-3 bg-navy-700 rounded-md text-off-white">
          <h3 className="font-semibold mb-2">مشاريعي</h3>
          <ul className="space-y-1">
            <li className="cursor-pointer hover:text-gold-400">مشروعي الأخير في علم النفس</li>
            <li className="cursor-pointer hover:text-gold-400">مشروع الرواية الجديدة</li>
          </ul>
        </div>

        {/* قسم المكتبات وقوالب الكتب */}
        <div className="p-3 bg-navy-700 rounded-md text-off-white">
          <h3 className="font-semibold mb-2">محتويات مُضمّنة</h3>
          <ul className="space-y-1">
            <li className="cursor-pointer hover:text-gold-400">المكتبة الإسلامية</li>
            <li className="cursor-pointer hover:text-gold-400">قوالب الكتب</li>
            <li className="cursor-pointer hover:text-gold-400">الإعدادات</li>
          </ul>
        </div>
      </div>
    </aside>
  );
};
