// src/components/sections/KnouxStatusBar.tsx
// مثال لشريط الحالة السفلي مع مؤشرات بسيطة

import * as React from "react";

export const KnouxStatusBar = () => {
  const [statusMessage, setStatusMessage] = React.useState("جاهز للكتابة...");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStatusMessage("حفظ تلقائي...");
      setTimeout(() => setStatusMessage("جاهز للكتابة..."), 2000);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="flex h-10 items-center justify-between border-t border-navy-800/50 bg-navy-800/50 px-6 py-1.5 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="text-sm font-sans text-slate-gray">{statusMessage}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <span className="text-xs font-sans text-slate-gray">حفظ محلي</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs font-sans text-red-500">غير متصل</span>
        </div>
      </div>
    </footer>
  );
};
