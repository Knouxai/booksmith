"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useApp, useUI } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  Search,
  Filter,
  BookOpen,
  Download,
  Star,
  Eye,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Calendar,
  User,
  Tag,
  Globe,
  Bookmark,
  Share2,
  ExternalLink,
  Volume2,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

interface IslamicBook {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  publishYear?: number;
  language: "ar" | "en";
  pages: number;
  rating: number;
  downloads: number;
  tags: string[];
  coverImage: string;
  pdfUrl?: string;
  audioUrl?: string;
  isFavorite: boolean;
  isBookmarked: boolean;
  readingProgress: number;
}

const IslamicLibrary: React.FC = () => {
  const { state } = useApp();
  const [books, setBooks] = useState<IslamicBook[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [selectedAuthor, setSelectedAuthor] = useState<string>("الكل");
  const [sortBy, setSortBy] = useState<
    "title" | "author" | "rating" | "downloads" | "year"
  >("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(12);
  const [selectedBook, setSelectedBook] = useState<IslamicBook | null>(null);
  const [showBookDetails, setShowBookDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  // فئات الكتب الإسلامية
  const categories = [
    "الكل",
    "القرآن الكريم وعلومه",
    "الحديث الشريف",
    "الفقه",
    "العقيدة",
    "السيرة النبوية",
    "التاريخ الإسلامي",
    "الأخلاق والآدا��",
    "الدعوة والإرشاد",
    "التفسير",
    "اللغة العربية",
    "الفلسفة الإسلامية",
    "الأدب الإسلامي",
    "كتب الأطفال",
  ];

  // محاكاة تحميل الكتب من API
  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);

      // محاكاة البيانات - في التطبيق الحقيقي ستأتي من API
      const mockBooks: IslamicBook[] = [
        {
          id: "1",
          title: "صحيح البخاري",
          author: "الإمام البخاري",
          category: "الحديث الشريف",
          description:
            "أصح كتاب بعد كتاب الله، يحتوي على أحاديث صحيحة منتقاة بعناية فائقة",
          publishYear: 846,
          language: "ar",
          pages: 2420,
          rating: 4.9,
          downloads: 125000,
          tags: ["حديث", "صحيح", "فقه", "عبادات"],
          coverImage:
            "https://placehold.co/300x400/1a1a1a/fcbe2d?text=صحيح+البخاري",
          pdfUrl: "/books/sahih-bukhari.pdf",
          audioUrl: "/audio/sahih-bukhari.mp3",
          isFavorite: false,
          isBookmarked: true,
          readingProgress: 15,
        },
        {
          id: "2",
          title: "تفسير ابن كثير",
          author: "ابن كثير",
          category: "التفسير",
          description:
            "من أشهر كتب التفسير، يجمع بين التفسير بالمأثور والدراية",
          publishYear: 1365,
          language: "ar",
          pages: 3200,
          rating: 4.8,
          downloads: 98000,
          tags: ["تفسير", "قرآن", "علوم قرآنية"],
          coverImage:
            "https://placehold.co/300x400/1a1a1a/fcbe2d?text=تفسير+ابن+كثير",
          pdfUrl: "/books/tafsir-ibn-kathir.pdf",
          isFavorite: true,
          isBookmarked: false,
          readingProgress: 5,
        },
        {
          id: "3",
          title: "رياض الصالحين",
          author: "الإمام النووي",
          category: "الأخلاق والآداب",
          description:
            "مجموعة مختارة من الأحاديث النبوية في الأخلاق والآداب الإسلامية",
          publishYear: 1277,
          language: "ar",
          pages: 680,
          rating: 4.7,
          downloads: 156000,
          tags: ["أخلاق", "آداب", "أحاديث", "تربية"],
          coverImage:
            "https://placehold.co/300x400/1a1a1a/fcbe2d?text=رياض+الصالح��ن",
          pdfUrl: "/books/riyadh-salihin.pdf",
          audioUrl: "/audio/riyadh-salihin.mp3",
          isFavorite: false,
          isBookmarked: true,
          readingProgress: 45,
        },
        {
          id: "4",
          title: "السيرة النبوية لابن هشام",
          author: "ابن هشام",
          category: "السيرة النبوية",
          description:
            "سيرة مفصلة للنبي محمد صلى الله عليه وسلم مع التحليل والشرح",
          publishYear: 833,
          language: "ar",
          pages: 1200,
          rating: 4.6,
          downloads: 87000,
          tags: ["سيرة", "تاريخ", "غزوات", "صحابة"],
          coverImage:
            "https://placehold.co/300x400/1a1a1a/fcbe2d?text=السيرة+النبوية",
          pdfUrl: "/books/sirah-ibn-hisham.pdf",
          isFavorite: true,
          isBookmarked: false,
          readingProgress: 0,
        },
        {
          id: "5",
          title: "فقه السنة",
          author: "سيد سابق",
          category: "الفقه",
          description: "كتاب شامل في الفقه الإسلامي مع الأدلة من القرآن والسنة",
          publishYear: 1945,
          language: "ar",
          pages: 1800,
          rating: 4.5,
          downloads: 76000,
          tags: ["فقه", "أحكام", "عبادات", "معاملات"],
          coverImage:
            "https://placehold.co/300x400/1a1a1a/fcbe2d?text=فقه+السنة",
          pdfUrl: "/books/fiqh-sunnah.pdf",
          isFavorite: false,
          isBookmarked: true,
          readingProgress: 25,
        },
        {
          id: "6",
          title: "الأسماء الحسنى",
          author: "عبد الرزاق البدر",
          category: "العقيدة",
          description: "دراسة شاملة لأسماء الله الحسنى وصفاته العلى",
          publishYear: 2000,
          language: "ar",
          pages: 450,
          rating: 4.8,
          downloads: 34000,
          tags: ["عقيدة", "أسماء الله", "توحيد"],
          coverImage:
            "https://placehold.co/300x400/1a1a1a/fcbe2d?text=الأسماء+الحسنى",
          pdfUrl: "/books/asma-husna.pdf",
          audioUrl: "/audio/asma-husna.mp3",
          isFavorite: true,
          isBookmarked: true,
          readingProgress: 80,
        },
      ];

      setBooks(mockBooks);
      setLoading(false);
    };

    loadBooks();
  }, []);

  // تصفية وترتيب الكتب
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "الكل" || book.category === selectedCategory;
      const matchesAuthor =
        selectedAuthor === "الكل" || book.author === selectedAuthor;

      return matchesSearch && matchesCategory && matchesAuthor;
    });

    // ترتيب الكتب
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [books, searchTerm, selectedCategory, selectedAuthor, sortBy, sortOrder]);

  // تقسيم الكتب للصفحات
  const totalPages = Math.ceil(filteredAndSortedBooks.length / booksPerPage);
  const currentBooks = filteredAndSortedBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage,
  );

  // الحصول على قائمة المؤلفين
  const authors = useMemo(() => {
    const authorSet = new Set(["الكل"]);
    books.forEach((book) => authorSet.add(book.author));
    return Array.from(authorSet);
  }, [books]);

  // إضافة/إزالة من المفضلة
  const toggleFavorite = (bookId: string) => {
    setBooks(
      books.map((book) =>
        book.id === bookId ? { ...book, isFavorite: !book.isFavorite } : book,
      ),
    );
  };

  // إضافة/إزالة من العلامات المرجعية
  const toggleBookmark = (bookId: string) => {
    setBooks(
      books.map((book) =>
        book.id === bookId
          ? { ...book, isBookmarked: !book.isBookmarked }
          : book,
      ),
    );
  };

  // عرض تفاصيل الكتاب
  const showDetails = (book: IslamicBook) => {
    setSelectedBook(book);
    setShowBookDetails(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <div className="text-white">جاري تحميل المكتبة...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* رأسية المكتبة */}
      <div
        className="border-b p-4 backdrop-blur-lg"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          borderColor: "rgba(252, 190, 45, 0.2)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-yellow-400">
            المكتبة الإسلامية ثلاثية الأبعاد
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">
              {filteredAndSortedBooks.length} كتاب
            </span>
          </div>
        </div>

        {/* شريط البحث والتصفية */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* البحث */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="البحث في الكتب..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-3 pr-10 py-2 text-white text-sm focus:border-yellow-400 focus:outline-none"
            />
          </div>

          {/* فئة الكتاب */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-yellow-400 focus:outline-none"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* المؤلف */}
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-yellow-400 focus:outline-none"
          >
            {authors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>

          {/* الترتيب */}
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:border-yellow-400 focus:outline-none"
            >
              <option value="title">العنوان</option>
              <option value="author">المؤلف</option>
              <option value="rating">التقييم</option>
              <option value="downloads">التحميلات</option>
              <option value="year">سنة النشر</option>
            </select>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className="text-gray-400 hover:text-white p-2"
            >
              {sortOrder === "asc" ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* أدوات العرض */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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

          {/* إحصائيات سريعة */}
          <div className="text-sm text-gray-400">
            عرض {currentBooks.length} من {filteredAndSortedBooks.length} كتاب
          </div>
        </div>
      </div>

      {/* قائمة الكتب */}
      <div className="flex-1 overflow-y-auto p-4">
        {currentBooks.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              لم يتم العثور على كتب
            </h3>
            <p className="text-gray-400">جرب تغيير معايير البحث أو التصفية</p>
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentBooks.map((book) => (
                  <div
                    key={book.id}
                    className="group bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                    onClick={() => showDetails(book)}
                  >
                    {/* غلاف الكتاب */}
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* شريط التقدم */}
                      {book.readingProgress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                          <div
                            className="h-full bg-yellow-400 transition-all duration-300"
                            style={{ width: `${book.readingProgress}%` }}
                          />
                        </div>
                      )}

                      {/* أيقونات الإجراءات */}
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(book.id);
                          }}
                          className={`p-1 rounded-full backdrop-blur-sm ${
                            book.isFavorite
                              ? "text-red-400 bg-black/50"
                              : "text-white bg-black/30"
                          }`}
                        >
                          <Star
                            className="h-3 w-3"
                            fill={book.isFavorite ? "currentColor" : "none"}
                          />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(book.id);
                          }}
                          className={`p-1 rounded-full backdrop-blur-sm ${
                            book.isBookmarked
                              ? "text-yellow-400 bg-black/50"
                              : "text-white bg-black/30"
                          }`}
                        >
                          <Bookmark
                            className="h-3 w-3"
                            fill={book.isBookmarked ? "currentColor" : "none"}
                          />
                        </Button>
                      </div>
                    </div>

                    {/* معلومات الكتاب */}
                    <div className="p-4">
                      <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-gray-400 text-xs mb-2">
                        {book.author}
                      </p>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1">
                          <Star
                            className="h-3 w-3 text-yellow-400"
                            fill="currentColor"
                          />
                          <span className="text-gray-300">{book.rating}</span>
                        </div>

                        <div className="flex items-center gap-1 text-gray-400">
                          <Download className="h-3 w-3" />
                          <span>{(book.downloads / 1000).toFixed(0)}k</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {currentBooks.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300 cursor-pointer"
                    onClick={() => showDetails(book)}
                  >
                    {/* صورة مصغرة */}
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-12 h-16 object-cover rounded"
                    />

                    {/* معلومات الكتاب */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium mb-1 truncate">
                        {book.title}
                      </h3>
                      <p className="text-gray-400 text-sm">{book.author}</p>
                      <p className="text-gray-500 text-xs">{book.category}</p>
                    </div>

                    {/* إحصائيات */}
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-gray-300 mb-1">
                        <Star
                          className="h-3 w-3 text-yellow-400"
                          fill="currentColor"
                        />
                        <span>{book.rating}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {book.pages} صفحة
                      </div>
                    </div>

                    {/* إجراءات */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(book.id);
                        }}
                        className={`p-1 ${book.isFavorite ? "text-red-400" : "text-gray-400 hover:text-red-400"}`}
                      >
                        <Star
                          className="h-4 w-4"
                          fill={book.isFavorite ? "currentColor" : "none"}
                        />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(book.id);
                        }}
                        className={`p-1 ${book.isBookmarked ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"}`}
                      >
                        <Bookmark
                          className="h-4 w-4"
                          fill={book.isBookmarked ? "currentColor" : "none"}
                        />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* تنقل الصفحات */}
      {totalPages > 1 && (
        <div className="border-t border-gray-700 p-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="text-gray-400 hover:text-white"
          >
            <ChevronRight className="h-4 w-4 mr-2" />
            السابق
          </Button>

          <div className="flex items-center gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
              if (page > totalPages) return null;

              return (
                <Button
                  key={page}
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 ${
                    currentPage === page
                      ? "text-yellow-400 bg-yellow-400/10"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="text-gray-400 hover:text-white"
          >
            التالي
            <ChevronLeft className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}

      {/* نافذة تفاصيل الكتاب */}
      {showBookDetails && selectedBook && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border backdrop-blur-lg"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.95)",
              borderColor: "rgba(252, 190, 45, 0.3)",
            }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {selectedBook.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBookDetails(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* غلاف الكتاب */}
                <div className="space-y-4">
                  <img
                    src={selectedBook.coverImage}
                    alt={selectedBook.title}
                    className="w-full aspect-[3/4] object-cover rounded-lg"
                  />

                  {/* أزرار الإجراءات */}
                  <div className="space-y-2">
                    <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-300">
                      <Eye className="h-4 w-4 mr-2" />
                      قراءة الكتاب
                    </Button>

                    {selectedBook.pdfUrl && (
                      <Button
                        variant="outline"
                        className="w-full text-white border-gray-600"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        تحميل PDF
                      </Button>
                    )}

                    {selectedBook.audioUrl && (
                      <Button
                        variant="outline"
                        className="w-full text-white border-gray-600"
                      >
                        <Volume2 className="h-4 w-4 mr-2" />
                        الكتاب الصوتي
                      </Button>
                    )}
                  </div>
                </div>

                {/* تفاصيل الكتاب */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                      معلومات الكتاب
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">المؤلف:</span>
                        <span className="text-white mr-2">
                          {selectedBook.author}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">الفئة:</span>
                        <span className="text-white mr-2">
                          {selectedBook.category}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">عدد الصفحات:</span>
                        <span className="text-white mr-2">
                          {selectedBook.pages}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">سنة النشر:</span>
                        <span className="text-white mr-2">
                          {selectedBook.publishYear}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">التقييم:</span>
                        <div className="inline-flex items-center mr-2">
                          <Star
                            className="h-4 w-4 text-yellow-400 mr-1"
                            fill="currentColor"
                          />
                          <span className="text-white">
                            {selectedBook.rating}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-400">التحميلات:</span>
                        <span className="text-white mr-2">
                          {selectedBook.downloads.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                      الوصف
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedBook.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                      الكلمات المفتاحية
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBook.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedBook.readingProgress > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                        تقدم القراءة
                      </h3>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${selectedBook.readingProgress}%` }}
                        />
                      </div>
                      <p className="text-gray-400 text-sm mt-1">
                        {selectedBook.readingProgress}% مكتمل
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IslamicLibrary;
