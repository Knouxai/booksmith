"use client";

import React, { useState } from "react";
import { useApp, useUI, useBooks, useChapters } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  Plus,
  FileText,
  FolderOpen,
  BookOpen,
  Edit3,
  Trash2,
  ChevronRight,
  ChevronDown,
  Search,
  Filter,
  Star,
  Clock,
  MoreVertical,
} from "lucide-react";

const KnouxSidebar: React.FC = () => {
  const { state } = useApp();
  const { showSidebar } = useUI();
  const { books, currentBook, setCurrentBook, addBook, deleteBook } =
    useBooks();
  const { chapters, currentChapter, setCurrentChapter, addChapter } =
    useChapters();

  const [expandedBooks, setExpandedBooks] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState<"all" | "recent" | "favorites">(
    "all",
  );
  const [showBookActions, setShowBookActions] = useState<string | null>(null);

  // إنشاء كتاب جديد
  const createNewBook = () => {
    const newBook = addBook({
      title: `كتاب جديد ${books.length + 1}`,
      author: "الكاتب الإسلامي",
      category: "عام",
      content: "",
      chapters: [],
      metadata: {
        language: "ar",
        genre: "عام",
        targetAudience: "عام",
        estimatedReadingTime: 0,
        tags: [],
      },
    });
    setCurrentBook(newBook);
  };

  // إنشاء فصل جديد
  const createNewChapter = () => {
    if (!currentBook) return;

    const newChapter = addChapter({
      title: `الفصل ${chapters.length + 1}`,
      content: "",
      order: chapters.length + 1,
      wordCount: 0,
    });
    setCurrentChapter(newChapter);
  };

  // تبديل توسيع الكتاب
  const toggleBookExpansion = (bookId: string) => {
    const newExpanded = new Set(expandedBooks);
    if (newExpanded.has(bookId)) {
      newExpanded.delete(bookId);
    } else {
      newExpanded.add(bookId);
    }
    setExpandedBooks(newExpanded);
  };

  // تصفية الكتب
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    switch (filterBy) {
      case "recent":
        // آخر 7 أيام
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return matchesSearch && book.updatedAt > weekAgo;
      case "favorites":
        // يمكن إضافة نظام المفضلة لاحقاً
        return matchesSearch;
      default:
        return matchesSearch;
    }
  });

  // حساب إحصائيات سريعة
  const totalWords = books.reduce(
    (total, book) =>
      total +
      book.chapters.reduce(
        (bookTotal, chapter) =>
          bookTotal + (chapter.content?.split(" ").length || 0),
        0,
      ),
    0,
  );

  if (!showSidebar) {
    return null;
  }

  return (
    <aside
      className="w-80 border-l backdrop-blur-lg flex flex-col h-full"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        borderColor: "rgba(252, 190, 45, 0.2)",
      }}
    >
      {/* رأسية الشريط الجانبي */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold text-lg">مشاريعي</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={createNewBook}
            className="text-yellow-400 hover:text-yellow-300 p-2"
            title="إنشاء كتاب جديد"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* شريط البحث */}
        <div className="relative mb-3">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="البحث في الكتب..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-3 pr-10 py-2 text-white text-sm focus:border-yellow-400 focus:outline-none"
          />
        </div>

        {/* مرشحات */}
        <div className="flex gap-1">
          {[
            { id: "all", label: "الكل", icon: FolderOpen },
            { id: "recent", label: "حديث", icon: Clock },
            { id: "favorites", label: "مفضل", icon: Star },
          ].map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant="ghost"
              size="sm"
              onClick={() => setFilterBy(id as any)}
              className={`text-xs px-2 py-1 ${
                filterBy === id
                  ? "text-yellow-400 bg-yellow-400/10"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon className="h-3 w-3 mr-1" />
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className="p-4 border-b border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-yellow-400 text-xl font-bold">
              {books.length}
            </div>
            <div className="text-gray-400 text-xs">كتاب</div>
          </div>
          <div>
            <div className="text-yellow-400 text-xl font-bold">
              {totalWords.toLocaleString()}
            </div>
            <div className="text-gray-400 text-xs">كلمة</div>
          </div>
        </div>
      </div>

      {/* قائمة الكتب */}
      <div className="flex-1 overflow-y-auto">
        {filteredBooks.length === 0 ? (
          <div className="p-4 text-center">
            <BookOpen className="h-12 w-12 text-gray-500 mx-auto mb-3" />
            <div className="text-gray-400 text-sm">
              {searchTerm ? "لم يتم العثور على كتب مطا��قة" : "لا توجد كتب بعد"}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={createNewBook}
              className="text-yellow-400 hover:text-yellow-300 mt-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              إنشاء كتاب جديد
            </Button>
          </div>
        ) : (
          <div className="p-2">
            {filteredBooks.map((book) => (
              <div key={book.id} className="mb-2">
                {/* عنوان الكتاب */}
                <div className="group relative">
                  <div
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                      currentBook?.id === book.id
                        ? "bg-yellow-400/10 border border-yellow-400/20"
                        : "hover:bg-gray-700/50"
                    }`}
                    onClick={() => {
                      setCurrentBook(book);
                      toggleBookExpansion(book.id);
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookExpansion(book.id);
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      {expandedBooks.has(book.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>

                    <FileText
                      className={`h-4 w-4 ${
                        currentBook?.id === book.id
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    />

                    <div className="flex-1 min-w-0">
                      <div
                        className={`text-sm font-medium truncate ${
                          currentBook?.id === book.id
                            ? "text-yellow-400"
                            : "text-white"
                        }`}
                      >
                        {book.title}
                      </div>
                      <div className="text-xs text-gray-400 truncate">
                        {book.chapters.length} فصل • {book.category}
                      </div>
                    </div>

                    {/* قائمة الإجراءات */}
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowBookActions(
                            showBookActions === book.id ? null : book.id,
                          );
                        }}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-white p-1"
                      >
                        <MoreVertical className="h-3 w-3" />
                      </Button>

                      {showBookActions === book.id && (
                        <div
                          className="absolute left-0 top-full mt-1 w-32 rounded-lg border backdrop-blur-lg shadow-lg z-10"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.9)",
                            borderColor: "rgba(252, 190, 45, 0.3)",
                          }}
                        >
                          <div className="p-1">
                            <button
                              className="w-full text-right px-2 py-1 text-xs text-white hover:bg-gray-700 rounded flex items-center gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                // تحرير الكتاب
                                setShowBookActions(null);
                              }}
                            >
                              <Edit3 className="h-3 w-3" />
                              تحرير
                            </button>
                            <button
                              className="w-full text-right px-2 py-1 text-xs text-red-400 hover:bg-gray-700 rounded flex items-center gap-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (
                                  confirm("هل أنت متأكد من حذف هذا الكتاب؟")
                                ) {
                                  deleteBook(book.id);
                                }
                                setShowBookActions(null);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                              حذف
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* فصول الكتاب */}
                {expandedBooks.has(book.id) && book.chapters.length > 0 && (
                  <div className="mr-6 mt-1 space-y-1">
                    {book.chapters.map((chapter) => (
                      <div
                        key={chapter.id}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-all ${
                          currentChapter?.id === chapter.id
                            ? "bg-blue-400/10 border border-blue-400/20"
                            : "hover:bg-gray-700/30"
                        }`}
                        onClick={() => setCurrentChapter(chapter)}
                      >
                        <BookOpen
                          className={`h-3 w-3 ${
                            currentChapter?.id === chapter.id
                              ? "text-blue-400"
                              : "text-gray-500"
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-xs truncate ${
                              currentChapter?.id === chapter.id
                                ? "text-blue-400"
                                : "text-gray-300"
                            }`}
                          >
                            {chapter.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {chapter.wordCount} كلمة
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* زر إضافة فصل جد��د */}
                {expandedBooks.has(book.id) && currentBook?.id === book.id && (
                  <div className="mr-6 mt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={createNewChapter}
                      className="w-full text-gray-400 hover:text-yellow-400 text-xs py-1 h-auto"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      إضافة فصل جديد
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* معلومات الكتاب الحالي */}
      {currentBook && (
        <div className="p-4 border-t border-gray-700">
          <div className="text-sm">
            <div className="text-white font-medium mb-2">الكتاب الحالي</div>
            <div className="text-gray-400 text-xs space-y-1">
              <div>📖 {currentBook.title}</div>
              <div>✍️ {currentBook.author}</div>
              <div>📁 {currentBook.category}</div>
              <div>
                📊{" "}
                {currentBook.chapters
                  .reduce(
                    (total, chapter) =>
                      total + (chapter.content?.split(" ").length || 0),
                    0,
                  )
                  .toLocaleString()}{" "}
                كلمة
              </div>
              <div>
                📅 آخر تحديث: {currentBook.updatedAt.toLocaleDateString("ar")}
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default KnouxSidebar;
