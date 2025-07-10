// src/components/sections/WelcomeScreen.tsx
// شاشة الترحيب الأولى عند فتح التطبيق

import * as React from "react";

interface WelcomeScreenProps {
  onAIAction?: (action: string, data?: any) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onAIAction }) => {
  return (
    <div className="p-6 bg-navy-800 rounded-lg text-off-white">
      <h2 className="text-2xl font-bold mb-4">مرحبًا بك في Knoux BookSmith Ultra™</h2>
      <p className="mb-6">
        ابدأ رحلتك في إنشاء الكتب الرقمية مع أدواتنا المتقدمة.
      </p>
      <button
        className="px-4 py-2 bg-gold-400 text-navy-900 font-semibold rounded hover:bg-gold-500 transition"
        onClick={() => onAIAction && onAIAction("start")}
      >
        ابدأ الآن
      </button>
    </div>
  );
};
