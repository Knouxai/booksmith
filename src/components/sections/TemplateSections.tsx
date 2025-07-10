import * as React from "react";
import { KnouxCard, KnouxCardHeader, KnouxCardTitle, KnouxCardDescription, KnouxCardContent, KnouxButton, KnouxAccordion, KnouxAccordionItem, KnouxAccordionTrigger, KnouxAccordionContent } from "../ui";
import { Feather, BookOpen, FileText, BookMarked, BrainCircuit, Pencil, Star, Book, File, Users, Settings, PaintBrush, Rocket, Scroll } from "lucide-react";

const sectionsData = [
  {
    id: "epic-weaver",
    label: "✨ Knoux-EpicWeaver (الراوي الملحمي)",
    description: "إنشاء عوالم غنية، حبكات متشعبة، وشخصيات عميقة.",
    icon: Feather,
    templates: [
      "قصص الخيال العلمي المتسلسل (Sci-Fi Saga)",
      "روايات الفانتازيا والملحميات",
      "قصص الجريمة والغموض (Mystery/Thriller)",
      "الروايات التاريخية والخيالية الواقعية",
      "الروايات الاجتماعية والعائلية",
      "الروايات البوليسية وأفلام الجاسوسية",
      "الروايات التي تحدث في عوالم متخيلة وموازية",
      "أعمال أدبية تتطلب بناء عالم مفصل جداً",
      "قصص الأطفال الموجهة لعمر معين مع رسومات متخصصة",
      "روايات تتطلب حبكة فرعية متعددة (Subplot Management)",
    ],
  },
  {
    id: "scholar-forge",
    label: "📚 Knoux-ScholarForge (منجم الأبحاث الأكاديمية)",
    description: "الدقة الأكاديمية، العمق البحثي، والتنظيم المنطقي.",
    icon: BookOpen,
    templates: [
      "الأطروحات والدراسات الأكاديمية الشاملة",
      "الكتب الجامعية",
      "المقالات البحثية العلمية المعتمدة",
      "التحقيقات التاريخية والمقارنات بين المخطوطات",
      "الكتب والموسوعات العلمية المتخصصة",
      "الدراسات الفلسفية والمنطقية",
      "التحليل القانوني ودراسات الحالة القضائية",
      "المعجم والقواميس المتخصصة",
      "الأدلة الإرشادية للمهنيين",
      "الدراسات الأدبية والنقدية",
    ],
  },
  {
    id: "sacred-script",
    label: "📖 Knoux-SacredScript (الكتاب المقدس)",
    description: "التعامل الدقيق مع النصوص المقدسة والشريعة الإسلامية.",
    icon: BookMarked,
    templates: [
      "تفسير القرآن الكريم",
      "شروحات كتب الحديث",
      "كتب الفقه وأصوله",
      "السيرة النبوية الشريفة",
      "العقائد الإسلامية",
      "الرقائق والزهد والأخلاق",
      "المفاهيم والمسائل العقدية لغير المسلمين",
      "كتب الأدعية والأذكار والتضرع إلى الله",
      "موسوعات في التاريخ الإسلامي الحضاري والفكري",
      "تحقيق المخطوطات ووضع شروحات لها",
    ],
  },
  {
    id: "kid-lit-craft",
    label: "🧸 Knoux-KidLitCraft (ورشة الأطفال)",
    description: "كتابة سهلة وممتعة مع دعم مرئي غني للأطفال واليافعين.",
    icon: Star,
    templates: [
      "كتب الصور للأطفال الصغار",
      "قصص أطفال للمبتدئين في القراءة",
      "روايات مغامرات للمرحلة المتوسطة",
      "روايات الخيال والمغامرة للشباب",
      "كتب تعليمية للأطفال",
      "قصص أخلاقية وعبَر",
      "كتب القصائد والأغاني الإيقاعية للأطفال",
      "حكايات ما قبل النوم وسرد القصص القصيرة",
      "كتب تفاعلية تتضمن مسابقات وأنشطة بسيطة",
      "قصص تُسلط الضوء على مواضيع ثقافية أو تاريخية",
    ],
  },
  {
    id: "life-journal",
    label: "✍️ Knoux-LifeJournal (سجل الحياة)",
    description: "توثيق التجارب الإنسانية والسير الشخصية.",
    icon: Scroll,
    templates: [
      "المذكرات الشخصية والسير الذاتية",
      "كتب السفر والمغامرات",
      "اليوميات المتتابعة",
      "توثيق تاريخ العائلة",
      "كتب التطوير الذاتي المستندة للتجارب",
      "قصص وتجارب ملهمة حول الصمود",
      "المقالات الشخصية والنصوص التأملية",
      "الذكريات الجماعية للمجموعات أو المناسبات",
      "الروايات المبنية على تجارب حقيقية",
      "إعداد النصوص لحوارات أو مقابلات مستقبلية",
    ],
  },
  {
    id: "mind-molder",
    label: "🚀 Knoux-MindMolder (صاقل الفكر)",
    description: "تنظيم الأفكار المعقدة بأسلوب منهجي.",
    icon: Rocket,
    templates: [
      "كتب التطوير الذاتي والتحفيز",
      "الكتب التدريبية وإدارة الأعمال",
      "كتب التنمية البشرية وعلم النفس التطبيقي",
      "الأدلة التقنية والبرمجية وعلوم الحاسوب",
      "الكتب الإدارية والاستراتيجية والقيادية",
      "كتب التمويل الشخصي والاستثمار",
      "كتب تعليم مهارة معينة",
      "إعداد أدلة وخطط عمل للشركات الناشئة",
      "تأليف المحاضرات والورش التدريبية",
      "كتب دراسات حالة وتحليلات للمشاكل المعاصرة",
    ],
  },
  {
    id: "creative-canvas",
    label: "📜 Knoux-CreativeCanvas (لوحة الإبداع)",
    description: "أقصى درجات الحرية لإنشاء أنواع إبداعية غير تقليدية.",
    icon: PaintBrush,
    templates: [
      "مجموعات الشعر بأنواعه المختلفة",
      "نصوص المسرح والسيناريو",
      "المقالات الفلسفية والتأملات العميقة",
      "نصوص النقد الأدبي والفني",
      "الأدب الساخر والفكاهي",
      "مؤلفات الخواطر وكتابة الحكمة",
      "المواد المتعلقة بالألعاب والروايات المرئية",
      "إنشاء حوارات معمقة وشخصيات بصرية",
      "موسوعات فنية تعتمد على عرض الأعمال",
      "إعادة تصور مفاهيم عبر صيغ إبداعية غير مسبوقة",
    ],
  },
];

export const TemplateSections: React.FC = () => {
  const [expandedSection, setExpandedSection] = React.useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8">
      {sectionsData.map(section => {
        const Icon = section.icon;
        return (
          <KnouxCard key={section.id} className="bg-navy-800/50 backdrop-blur-md border border-gold-400/30 shadow-lg">
            <KnouxCardHeader>
              <KnouxCardTitle className="flex items-center gap-3 text-gold-400 text-xl font-serif cursor-pointer" onClick={() => toggleSection(section.id)}>
                <Icon className="h-6 w-6" />
                {section.label}
              </KnouxCardTitle>
              <KnouxCardDescription>{section.description}</KnouxCardDescription>
            </KnouxCardHeader>
            <KnouxCardContent>
              <KnouxAccordion type="single" collapsible value={expandedSection} onValueChange={setExpandedSection}>
                <KnouxAccordionItem value={section.id}>
                  <KnouxAccordionTrigger>{section.label} القوالب</KnouxAccordionTrigger>
                  <KnouxAccordionContent>
                    <ul className="list-disc list-inside space-y-1 text-slate-300">
                      {section.templates.map((template, idx) => (
                        <li key={idx} className="cursor-pointer hover:text-gold-400 transition">{template}</li>
                      ))}
                    </ul>
                  </KnouxAccordionContent>
                </KnouxAccordionItem>
              </KnouxAccordion>
            </KnouxCardContent>
            <KnouxCardFooter className="flex justify-end">
              <KnouxButton variant="outline" size="sm">استعراض المزيد</KnouxButton>
            </KnouxCardFooter>
          </KnouxCard>
        );
      })}
    </div>
  );
};
