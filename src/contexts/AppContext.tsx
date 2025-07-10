"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

// تعريف أنواع البيانات
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  content: string;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
  chapters: Chapter[];
  metadata: BookMetadata;
}

export interface Chapter {
  id: string;
  title: string;
  content: string;
  order: number;
  wordCount: number;
}

export interface BookMetadata {
  language: "ar" | "en";
  genre: string;
  targetAudience: string;
  estimatedReadingTime: number;
  tags: string[];
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  structure: string[];
  prompts: string[];
  style: TemplateStyle;
}

export interface TemplateStyle {
  fontSize: string;
  fontFamily: string;
  lineHeight: string;
  color: string;
  backgroundColor: string;
}

export interface AIRequest {
  id: string;
  type:
    | "text-generation"
    | "text-improvement"
    | "image-generation"
    | "reference-check";
  prompt: string;
  response?: string;
  status: "pending" | "completed" | "error";
  createdAt: Date;
}

export interface UserPreferences {
  theme: "dark" | "light" | "auto";
  language: "ar" | "en";
  autoSave: boolean;
  voiceEnabled: boolean;
  islamicMode: boolean;
  defaultTemplate: string;
}

// حالة التطبيق الأساسية
export interface AppState {
  // الحالة العامة
  isLoading: boolean;
  activeSection: "welcome" | "writer" | "library" | "templates" | "settings";
  currentView: string;

  // الكتب والمحتوى
  currentBook: Book | null;
  books: Book[];
  currentChapter: Chapter | null;

  // القوالب والأدوات
  templates: Template[];
  selectedTemplate: Template | null;

  // طلبات الذكاء الاصطناعي
  aiRequests: AIRequest[];
  aiInProgress: boolean;

  // المكتبة
  libraryBooks: Book[];
  searchQuery: string;
  selectedCategory: string;

  // واجهة المستخدم
  showSidebar: boolean;
  showLibrary: boolean;
  showTemplates: boolean;
  showCommandPalette: boolean;

  // تفضيلات المستخدم
  userPreferences: UserPreferences;

  // التقدم والإحصائيات
  writingProgress: number;
  wordCount: number;
  sessionTime: number;
}

// أنواع الإجراءات
export type AppAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ACTIVE_SECTION"; payload: AppState["activeSection"] }
  | { type: "SET_CURRENT_VIEW"; payload: string }
  | { type: "SET_CURRENT_BOOK"; payload: Book | null }
  | { type: "ADD_BOOK"; payload: Book }
  | { type: "UPDATE_BOOK"; payload: Book }
  | { type: "DELETE_BOOK"; payload: string }
  | { type: "SET_CURRENT_CHAPTER"; payload: Chapter | null }
  | { type: "ADD_CHAPTER"; payload: Chapter }
  | { type: "UPDATE_CHAPTER"; payload: Chapter }
  | { type: "DELETE_CHAPTER"; payload: string }
  | { type: "SET_TEMPLATES"; payload: Template[] }
  | { type: "SELECT_TEMPLATE"; payload: Template }
  | { type: "ADD_AI_REQUEST"; payload: AIRequest }
  | { type: "UPDATE_AI_REQUEST"; payload: AIRequest }
  | { type: "SET_AI_IN_PROGRESS"; payload: boolean }
  | { type: "SET_LIBRARY_BOOKS"; payload: Book[] }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | { type: "SET_SELECTED_CATEGORY"; payload: string }
  | { type: "TOGGLE_SIDEBAR" }
  | { type: "TOGGLE_LIBRARY" }
  | { type: "TOGGLE_TEMPLATES" }
  | { type: "TOGGLE_COMMAND_PALETTE" }
  | { type: "UPDATE_USER_PREFERENCES"; payload: Partial<UserPreferences> }
  | { type: "UPDATE_WRITING_PROGRESS"; payload: number }
  | { type: "UPDATE_WORD_COUNT"; payload: number }
  | { type: "UPDATE_SESSION_TIME"; payload: number }
  | { type: "RESET_STATE" };

// الحالة الأولية
const initialState: AppState = {
  isLoading: false,
  activeSection: "welcome",
  currentView: "main",

  currentBook: null,
  books: [],
  currentChapter: null,

  templates: [],
  selectedTemplate: null,

  aiRequests: [],
  aiInProgress: false,

  libraryBooks: [],
  searchQuery: "",
  selectedCategory: "",

  showSidebar: true,
  showLibrary: false,
  showTemplates: false,
  showCommandPalette: false,

  userPreferences: {
    theme: "dark",
    language: "ar",
    autoSave: true,
    voiceEnabled: true,
    islamicMode: true,
    defaultTemplate: "knoux-epic-weaver",
  },

  writingProgress: 0,
  wordCount: 0,
  sessionTime: 0,
};

// مخفض الحالة
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ACTIVE_SECTION":
      return { ...state, activeSection: action.payload };

    case "SET_CURRENT_VIEW":
      return { ...state, currentView: action.payload };

    case "SET_CURRENT_BOOK":
      return { ...state, currentBook: action.payload };

    case "ADD_BOOK":
      return { ...state, books: [...state.books, action.payload] };

    case "UPDATE_BOOK":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book,
        ),
        currentBook:
          state.currentBook?.id === action.payload.id
            ? action.payload
            : state.currentBook,
      };

    case "DELETE_BOOK":
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
        currentBook:
          state.currentBook?.id === action.payload ? null : state.currentBook,
      };

    case "SET_CURRENT_CHAPTER":
      return { ...state, currentChapter: action.payload };

    case "ADD_CHAPTER":
      if (!state.currentBook) return state;
      const updatedBookWithChapter = {
        ...state.currentBook,
        chapters: [...state.currentBook.chapters, action.payload],
      };
      return {
        ...state,
        currentBook: updatedBookWithChapter,
        books: state.books.map((book) =>
          book.id === updatedBookWithChapter.id ? updatedBookWithChapter : book,
        ),
      };

    case "UPDATE_CHAPTER":
      if (!state.currentBook) return state;
      const updatedBookWithUpdatedChapter = {
        ...state.currentBook,
        chapters: state.currentBook.chapters.map((chapter) =>
          chapter.id === action.payload.id ? action.payload : chapter,
        ),
      };
      return {
        ...state,
        currentBook: updatedBookWithUpdatedChapter,
        books: state.books.map((book) =>
          book.id === updatedBookWithUpdatedChapter.id
            ? updatedBookWithUpdatedChapter
            : book,
        ),
        currentChapter:
          state.currentChapter?.id === action.payload.id
            ? action.payload
            : state.currentChapter,
      };

    case "DELETE_CHAPTER":
      if (!state.currentBook) return state;
      const updatedBookWithoutChapter = {
        ...state.currentBook,
        chapters: state.currentBook.chapters.filter(
          (chapter) => chapter.id !== action.payload,
        ),
      };
      return {
        ...state,
        currentBook: updatedBookWithoutChapter,
        books: state.books.map((book) =>
          book.id === updatedBookWithoutChapter.id
            ? updatedBookWithoutChapter
            : book,
        ),
        currentChapter:
          state.currentChapter?.id === action.payload
            ? null
            : state.currentChapter,
      };

    case "SET_TEMPLATES":
      return { ...state, templates: action.payload };

    case "SELECT_TEMPLATE":
      return { ...state, selectedTemplate: action.payload };

    case "ADD_AI_REQUEST":
      return { ...state, aiRequests: [...state.aiRequests, action.payload] };

    case "UPDATE_AI_REQUEST":
      return {
        ...state,
        aiRequests: state.aiRequests.map((request) =>
          request.id === action.payload.id ? action.payload : request,
        ),
      };

    case "SET_AI_IN_PROGRESS":
      return { ...state, aiInProgress: action.payload };

    case "SET_LIBRARY_BOOKS":
      return { ...state, libraryBooks: action.payload };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };

    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };

    case "TOGGLE_SIDEBAR":
      return { ...state, showSidebar: !state.showSidebar };

    case "TOGGLE_LIBRARY":
      return { ...state, showLibrary: !state.showLibrary };

    case "TOGGLE_TEMPLATES":
      return { ...state, showTemplates: !state.showTemplates };

    case "TOGGLE_COMMAND_PALETTE":
      return { ...state, showCommandPalette: !state.showCommandPalette };

    case "UPDATE_USER_PREFERENCES":
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload },
      };

    case "UPDATE_WRITING_PROGRESS":
      return { ...state, writingProgress: action.payload };

    case "UPDATE_WORD_COUNT":
      return { ...state, wordCount: action.payload };

    case "UPDATE_SESSION_TIME":
      return { ...state, sessionTime: action.payload };

    case "RESET_STATE":
      return initialState;

    default:
      return state;
  }
}

// سياق التطبيق
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// مزود السياق
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// خطاف استخدام السياق
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

// خطافات مساعدة للوصول السهل للبيانات والوظائف
export function useBooks() {
  const { state, dispatch } = useApp();

  const addBook = (book: Omit<Book, "id" | "createdAt" | "updatedAt">) => {
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch({ type: "ADD_BOOK", payload: newBook });
    return newBook;
  };

  const updateBook = (book: Book) => {
    const updatedBook = { ...book, updatedAt: new Date() };
    dispatch({ type: "UPDATE_BOOK", payload: updatedBook });
  };

  const deleteBook = (bookId: string) => {
    dispatch({ type: "DELETE_BOOK", payload: bookId });
  };

  const setCurrentBook = (book: Book | null) => {
    dispatch({ type: "SET_CURRENT_BOOK", payload: book });
  };

  return {
    books: state.books,
    currentBook: state.currentBook,
    addBook,
    updateBook,
    deleteBook,
    setCurrentBook,
  };
}

export function useChapters() {
  const { state, dispatch } = useApp();

  const addChapter = (chapter: Omit<Chapter, "id">) => {
    const newChapter: Chapter = {
      ...chapter,
      id: Date.now().toString(),
    };
    dispatch({ type: "ADD_CHAPTER", payload: newChapter });
    return newChapter;
  };

  const updateChapter = (chapter: Chapter) => {
    dispatch({ type: "UPDATE_CHAPTER", payload: chapter });
  };

  const deleteChapter = (chapterId: string) => {
    dispatch({ type: "DELETE_CHAPTER", payload: chapterId });
  };

  const setCurrentChapter = (chapter: Chapter | null) => {
    dispatch({ type: "SET_CURRENT_CHAPTER", payload: chapter });
  };

  return {
    chapters: state.currentBook?.chapters || [],
    currentChapter: state.currentChapter,
    addChapter,
    updateChapter,
    deleteChapter,
    setCurrentChapter,
  };
}

export function useAI() {
  const { state, dispatch } = useApp();

  const addAIRequest = (
    request: Omit<AIRequest, "id" | "createdAt" | "status">,
  ) => {
    const newRequest: AIRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: "pending",
    };
    dispatch({ type: "ADD_AI_REQUEST", payload: newRequest });
    return newRequest;
  };

  const updateAIRequest = (request: AIRequest) => {
    dispatch({ type: "UPDATE_AI_REQUEST", payload: request });
  };

  const setAIInProgress = (inProgress: boolean) => {
    dispatch({ type: "SET_AI_IN_PROGRESS", payload: inProgress });
  };

  return {
    aiRequests: state.aiRequests,
    aiInProgress: state.aiInProgress,
    addAIRequest,
    updateAIRequest,
    setAIInProgress,
  };
}

export function useUI() {
  const { state, dispatch } = useApp();

  return {
    activeSection: state.activeSection,
    currentView: state.currentView,
    showSidebar: state.showSidebar,
    showLibrary: state.showLibrary,
    showTemplates: state.showTemplates,
    showCommandPalette: state.showCommandPalette,
    isLoading: state.isLoading,

    setActiveSection: (section: AppState["activeSection"]) =>
      dispatch({ type: "SET_ACTIVE_SECTION", payload: section }),
    setCurrentView: (view: string) =>
      dispatch({ type: "SET_CURRENT_VIEW", payload: view }),
    toggleSidebar: () => dispatch({ type: "TOGGLE_SIDEBAR" }),
    toggleLibrary: () => dispatch({ type: "TOGGLE_LIBRARY" }),
    toggleTemplates: () => dispatch({ type: "TOGGLE_TEMPLATES" }),
    toggleCommandPalette: () => dispatch({ type: "TOGGLE_COMMAND_PALETTE" }),
    setLoading: (loading: boolean) =>
      dispatch({ type: "SET_LOADING", payload: loading }),
  };
}
