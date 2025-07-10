"use client";

import React, { useState, useEffect } from "react";
import { useApp, useUI, Template } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  Wand2,
  BookOpen,
  GraduationCap,
  Heart,
  Baby,
  Pen,
  Brain,
  Palette,
  Search,
  Star,
  Eye,
  Download,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Target,
  Zap,
  FileText,
  Settings,
  Share2,
} from "lucide-react";

const TemplateSystem: React.FC = () => {
  const { state, dispatch } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  // فئات القوالب
  const templateCategories = [
    { id: "الكل", name: "جميع القوالب", icon: Grid3X3, color: "#fcbe2d" },
    { id: "epic", name: "الملاحم والخيال", icon: Wand2, color: "#8b5cf6" },
    {
      id: "scholar",
      name: "البحوث الأكاديمية",
      icon: GraduationCap,
      color: "#3b82f6",
    },
    { id: "sacred", name: "الكتب المقدسة", icon: BookOpen, color: "#10b981" },
    { id: "kids", name: "أدب الأطفال", icon: Baby, color: "#f59e0b" },
    { id: "life", name: "السير والمذكرات", icon: Heart, color: "#ef4444" },
    { id: "mind", name: "التنمية الذاتية", icon: Brain, color: "#6366f1" },
    {
      id: "creative",
      name: "الكتابة الإبداعية",
      icon: Palette,
      color: "#ec4899",
    },
  ];

  // تحميل القوالب
  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true);

      // محاكاة البيانات - في التطبيق الحقيقي ستأتي من API
      const mockTemplates: Template[] = [
        // قوالب الملاحم والخيال
        {
          id: "epic-fantasy-novel",
          name: "رواية الفانتازيا الملحمية",
          category: "epic",
          description:
            "قالب شامل لكتابة الروايات الخيالية الملحمية مع بناء العوالم والشخصيات",
          structure: [
            "مقدمة العالم والخلفية",
            "تقديم البطل وصراعه الداخلي",
            "انطلاق الرحلة أو الرسالة",
            "مواجهة التحديات والأعداء",
            "نقطة التحول والكشف الكبير",
            "المعركة النهائية",
            "الخاتمة والدروس المستفادة",
          ],
          prompts: [
            "اكتب مقدمة تصف العالم الخيالي وقوانينه السحرية",
            "قدم البطل الرئيسي مع خلفيته وأهدافه",
            "اكتب مشهد المواجهة الأولى مع القوة المظلمة",
            "طور العلاقات بين الشخصيات وتطورها",
            "اكتب المعركة النهائية بتفاصيل مشوقة",
          ],
          style: {
            fontSize: "18px",
            fontFamily: "'Old Standard TT', serif",
            lineHeight: "1.8",
            color: "#2d3748",
            backgroundColor: "#f7fafc",
          },
        },
        {
          id: "sci-fi-adventure",
          name: "مغامرة الخيال العلمي",
          category: "epic",
          description:
            "قالب للروايات العلمية المستقبلية مع تقنيات متقدمة وعوالم المستقبل",
          structure: [
            "وصف العالم المستقبلي",
            "تقديم التقنيات والاختراعات",
            "الصراع الرئيسي والتهديد",
            "رحلة الاستكشاف والاكتشاف",
            "الحل العلمي والابتكار",
            "عواقب التقدم التكنولوجي",
          ],
          prompts: [
            "صف مدينة المستقبل وتقنياتها المتقدمة",
            "اكتب عن اختراع ثوري يغير العالم",
            "طور صراعاً بين البشر والذكاء الاصطناعي",
            "اكتب مشهد استكشاف كوكب جديد",
          ],
          style: {
            fontSize: "16px",
            fontFamily: "'Inter', sans-serif",
            lineHeight: "1.7",
            color: "#1a202c",
            backgroundColor: "#ffffff",
          },
        },

        // قوالب البحوث الأكاديمية
        {
          id: "academic-thesis",
          name: "الرسالة الأكاديمية",
          category: "scholar",
          description:
            "قالب شامل للرسائل الجامعية والبحوث الأكاديمية مع منهجية علمية",
          structure: [
            "المقدمة وتحديد المشكلة",
            "مراجعة الأدبيات والدراسات السابقة",
            "منهجية البحث والأدوات",
            "تحليل البيانات والنتائج",
            "مناقشة النتائج والتفسير",
            "الخاتمة والتوصيات",
            "المراجع والملاحق",
          ],
          prompts: [
            "اكتب مقدمة تحدد مشكلة البحث وأهميتها",
            "لخص الدراسات السابقة في المجال",
            "اشرح المنهجية المستخدمة في البحث",
            "حلل النتائج واربطها بالفرضيات",
          ],
          style: {
            fontSize: "14px",
            fontFamily: "'Times New Roman', serif",
            lineHeight: "2.0",
            color: "#000000",
            backgroundColor: "#ffffff",
          },
        },

        // قوالب الكتب المقدسة
        {
          id: "quran-tafsir",
          name: "تفسير القرآن الكريم",
          category: "sacred",
          description:
            "قالب متخصص لكتابة تفسير القرآن الكريم مع منهجية علمية إسلامية",
          structure: [
            "مقدمة السورة وسبب النزول",
            "التفسير اللغوي والبلاغي",
            "المعنى الإجمالي للآيات",
            "الأحكام الفقهية المستنبطة",
            "الدروس والعبر",
            "ربط الآيات بالواقع المعاصر",
          ],
          prompts: [
            "اكتب مقدمة عن سورة [اسم السورة] وأسباب نزولها",
            "فسر معاني الكلمات وإعجازها البلاغي",
            "استنبط الأحكام الفقهية من الآيات",
            "اربط تعاليم الآيات بالحياة المعاصرة",
          ],
          style: {
            fontSize: "16px",
            fontFamily: "'Amiri', serif",
            lineHeight: "1.9",
            color: "#2d3748",
            backgroundColor: "#f0fff4",
          },
        },

        // قوالب أدب الأطفال
        {
          id: "kids-story",
          name: "حكاية الأطفال التعليمية",
          category: "kids",
          description: "قالب مرح لكتابة قصص الأطفال مع قيم تربوية وأسلوب بسيط",
          structure: [
            "تقديم الشخصيات والمكان",
            "المشكلة أو التحدي",
            "محاولات الحل والمغامرة",
            "تعلم الدرس المهم",
            "الحل السعيد والنهاية المفرحة",
            "الخلاصة والقيمة المستفادة",
          ],
          prompts: [
            "قدم شخصية طفل مرحة مع حيوانه الأليف",
            "اكتب عن مشكلة يواجهها الطفل في المدرسة",
            "اكتب مغامرة مشوقة للبحث عن الحل",
            "اكتب نهاية سعيدة مع درس مفيد",
          ],
          style: {
            fontSize: "20px",
            fontFamily: "'Comic Sans MS', cursive",
            lineHeight: "1.6",
            color: "#2b6cb0",
            backgroundColor: "#ebf8ff",
          },
        },

        // قوالب السير والمذكرات
        {
          id: "autobiography",
          name: "السيرة الذاتية الملهمة",
          category: "life",
          description:
            "قالب لكتابة السير الذاتية والمذكرات الشخصية بطريقة مؤثرة",
          structure: [
            "الطفولة والتكوين المبكر",
            "التحديات والصعوبات",
            "نقاط التحول والقرارات المهمة",
            "الإنجازات والنجاحات",
            "الدروس المستفادة",
            "النصائح للأجيال القادمة",
          ],
          prompts: [
            "اكتب عن ذكرى من الطفولة شكلت شخصيتك",
            "اكتب عن أكبر تحدٍ واجهته وكيف تغلبت عليه",
            "اكتب عن لحظة غيرت مسار حياتك",
            "شارك أهم درس تعلمته في الحياة",
          ],
          style: {
            fontSize: "16px",
            fontFamily: "'Georgia', serif",
            lineHeight: "1.8",
            color: "#4a5568",
            backgroundColor: "#fffaf0",
          },
        },

        // قوالب التنمية الذاتية
        {
          id: "self-development",
          name: "كتاب التنمية الذاتية",
          category: "mind",
          description: "قالب لكتابة كتب التطوير الشخصي والنمو الذاتي",
          structure: [
            "تحديد المشكلة أو التحدي",
            "فهم الأسباب الجذرية",
            "وضع الخطة والاستراتيجية",
            "الأدوات والتقنيات العملية",
            "قصص نجاح وتطبيقات",
            "خطة العمل والمتابعة",
          ],
          prompts: [
            "حدد مشكلة شائعة يواجهها الناس في [المجال]",
            "اشرح الأسباب النفسية وراء هذه المشكلة",
            "قدم استراتيجية عملية للتغيير",
            "اكتب قصة نجاح ملهمة لشخص تغلب على التحدي",
          ],
          style: {
            fontSize: "15px",
            fontFamily: "'Helvetica', sans-serif",
            lineHeight: "1.7",
            color: "#2d3748",
            backgroundColor: "#f7fafc",
          },
        },
      ];

      setTemplates(mockTemplates);
      setLoading(false);
    };

    loadTemplates();
  }, []);

  // تصفية ا��قوالب
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "الكل" || template.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // تطبيق القالب
  const applyTemplate = (template: Template) => {
    dispatch({ type: "SELECT_TEMPLATE", payload: template });
    // يمكن إضافة منطق إضافي لتطبيق القالب على المحرر
    console.log("تم تطبيق القالب:", template.name);
  };

  // معاينة القالب
  const previewTemplate = (template: Template) => {
    setExpandedTemplate(expandedTemplate === template.id ? null : template.id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <div className="text-white">جاري تحميل القوالب...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* رأسية القوالب */}
      <div
        className="border-b p-4 backdrop-blur-lg"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderColor: "rgba(252, 190, 45, 0.2)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            نظام القوالب الذكية
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">
              {filteredTemplates.length} قالب
            </span>
          </div>
        </div>

        {/* شريط البحث والتصفية */}
        <div className="flex gap-4 mb-4">
          {/* البحث */}
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="البحث في القوالب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-3 pr-10 py-2 text-white text-sm focus:border-yellow-400 focus:outline-none"
            />
          </div>

          {/* تبديل العرض */}
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("grid")}
              className={`p-2 ${viewMode === "grid" ? "text-yellow-400" : "text-gray-400 hover:text-white"}`}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("list")}
              className={`p-2 ${viewMode === "list" ? "text-yellow-400" : "text-gray-400 hover:text-white"}`}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* فئات القوالب */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {templateCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`whitespace-nowrap px-4 py-2 ${
                  selectedCategory === category.id
                    ? "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-700"
                }`}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* قائمة القوالب */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              لم يتم العثور على قوالب
            </h3>
            <p className="text-gray-400">جرب تغيير كلمات البحث أو الفئة</p>
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => {
                  const categoryData = templateCategories.find(
                    (cat) => cat.id === template.category,
                  );
                  const IconComponent = categoryData?.icon || FileText;

                  return (
                    <div
                      key={template.id}
                      className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300"
                    >
                      {/* رأسية البطاقة */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="p-2 rounded-lg"
                            style={{
                              backgroundColor: categoryData?.color + "20",
                            }}
                          >
                            <IconComponent
                              className="h-5 w-5"
                              style={{ color: categoryData?.color }}
                            />
                          </div>
                          <div>
                            <h3 className="text-white font-medium text-sm">
                              {template.name}
                            </h3>
                            <p className="text-gray-400 text-xs">
                              {categoryData?.name}
                            </p>
                          </div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => previewTemplate(template)}
                          className="text-gray-400 hover:text-white p-1"
                        >
                          {expandedTemplate === template.id ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>

                      {/* الوصف */}
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {template.description}
                      </p>

                      {/* الهيكل المختصر */}
                      <div className="mb-4">
                        <div className="text-xs text-gray-400 mb-2">
                          الهيكل ({template.structure.length} أقسام):
                        </div>
                        <div className="space-y-1">
                          {template.structure
                            .slice(0, 3)
                            .map((section, index) => (
                              <div
                                key={index}
                                className="text-xs text-gray-300 truncate"
                              >
                                {index + 1}. {section}
                              </div>
                            ))}
                          {template.structure.length > 3 && (
                            <div className="text-xs text-gray-400">
                              ... و {template.structure.length - 3} أقسام أخرى
                            </div>
                          )}
                        </div>
                      </div>

                      {/* أزرار الإجراءات */}
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => applyTemplate(template)}
                          className="flex-1 bg-yellow-400 text-black hover:bg-yellow-300 text-xs"
                        >
                          <Target className="h-3 w-3 mr-1" />
                          تطبيق
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => previewTemplate(template)}
                          className="px-3 text-gray-400 hover:text-white border-gray-600 text-xs"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>

                      {/* التفاصيل الموسعة */}
                      {expandedTemplate === template.id && (
                        <div className="mt-4 pt-4 border-t border-gray-700">
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-yellow-400 text-sm font-medium mb-2">
                                الهيكل الكامل:
                              </h4>
                              <div className="space-y-1">
                                {template.structure.map((section, index) => (
                                  <div
                                    key={index}
                                    className="text-xs text-gray-300"
                                  >
                                    {index + 1}. {section}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-yellow-400 text-sm font-medium mb-2">
                                أمثلة المطالبات:
                              </h4>
                              <div className="space-y-1">
                                {template.prompts
                                  .slice(0, 2)
                                  .map((prompt, index) => (
                                    <div
                                      key={index}
                                      className="text-xs text-gray-300 italic"
                                    >
                                      "#{prompt}"
                                    </div>
                                  ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-yellow-400 text-sm font-medium mb-2">
                                إعدادات التنسيق:
                              </h4>
                              <div className="text-xs text-gray-300">
                                خط: {template.style.fontFamily} • حجم:{" "}
                                {template.style.fontSize}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTemplates.map((template) => {
                  const categoryData = templateCategories.find(
                    (cat) => cat.id === template.category,
                  );
                  const IconComponent = categoryData?.icon || FileText;

                  return (
                    <div
                      key={template.id}
                      className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div
                            className="p-2 rounded-lg flex-shrink-0"
                            style={{
                              backgroundColor: categoryData?.color + "20",
                            }}
                          >
                            <IconComponent
                              className="h-5 w-5"
                              style={{ color: categoryData?.color }}
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium mb-1">
                              {template.name}
                            </h3>
                            <p className="text-gray-400 text-sm truncate">
                              {template.description}
                            </p>
                            <div className="text-xs text-gray-500 mt-1">
                              {categoryData?.name} • {template.structure.length}{" "}
                              أقسام • {template.prompts.length} مطالبة
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => previewTemplate(template)}
                            className="text-gray-400 hover:text-white border-gray-600"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <Button
                            size="sm"
                            onClick={() => applyTemplate(template)}
                            className="bg-yellow-400 text-black hover:bg-yellow-300"
                          >
                            <Target className="h-4 w-4 mr-2" />
                            تطبيق
                          </Button>
                        </div>
                      </div>

                      {/* التفاصيل الموسعة */}
                      {expandedTemplate === template.id && (
                        <div className="mt-4 pt-4 border-t border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-yellow-400 text-sm font-medium mb-2">
                              الهيكل:
                            </h4>
                            <div className="space-y-1">
                              {template.structure.map((section, index) => (
                                <div
                                  key={index}
                                  className="text-xs text-gray-300"
                                >
                                  {index + 1}. {section}
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-yellow-400 text-sm font-medium mb-2">
                              أمثلة المطالبات:
                            </h4>
                            <div className="space-y-1">
                              {template.prompts.map((prompt, index) => (
                                <div
                                  key={index}
                                  className="text-xs text-gray-300 italic"
                                >
                                  "#{prompt}"
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* شريط المعلومات السفلي */}
      {state.selectedTemplate && (
        <div
          className="border-t p-3 backdrop-blur-lg"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            borderColor: "rgba(252, 190, 45, 0.2)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-white text-sm">
                القالب النشط:{" "}
                <span className="text-yellow-400">
                  {state.selectedTemplate.name}
                </span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  dispatch({ type: "SELECT_TEMPLATE", payload: null as any })
                }
                className="text-gray-400 hover:text-white text-xs"
              >
                إزالة القالب
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white text-xs"
              >
                <Settings className="h-3 w-3 mr-1" />
                تخصيص
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSystem;
