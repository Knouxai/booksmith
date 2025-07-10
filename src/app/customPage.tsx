"use client";

import React from "react";

export default function CustomPage() {
  return (
    <div className="min-h-screen bg-white text-black font-sans px-6 py-12 max-w-7xl mx-auto">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold mb-4">تطبيقنا</h1>
        <p className="text-lg text-gray-700">
          مرحبًا بكم في تطبيقنا. اكتشف أقسامنا وخدماتنا المصممة لتلبية احتياجاتك.
        </p>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-black inline-block pb-2">
          أقسامنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-black rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">القسم الأول</h3>
            <p>وصف مختصر للقسم الأول يوضح ما يقدمه.</p>
          </div>
          <div className="p-6 border border-black rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">القسم الثاني</h3>
            <p>وصف مختصر للقسم الثاني يوضح ما يقدمه.</p>
          </div>
          <div className="p-6 border border-black rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">القسم الثالث</h3>
            <p>وصف مختصر للقسم الثالث يوضح ما يقدمه.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 border-b-2 border-black inline-block pb-2">
          خدماتنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border border-black rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">الخدمة الأولى</h3>
            <p>وصف مختصر للخدمة الأولى يوضح ما توفره.</p>
          </div>
          <div className="p-6 border border-black rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">الخدمة الثانية</h3>
            <p>وصف مختصر للخدمة الثانية يوضح ما توفره.</p>
          </div>
          <div className="p-6 border border-black rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">الخدمة الثالثة</h3>
            <p>وصف مختصر للخدمة الثالثة يوضح ما توفره.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
