"use client";

import React, { useState, useRef } from "react";

interface Chapter {
  id: string;
  title: string;
}

interface ChapterManagerProps {
  chapters: Chapter[];
  onChaptersChange: (newChapters: Chapter[]) => void;
  currentChapterId: string | null;
  setCurrentChapterId: (id: string) => void;
}

const ChapterManager: React.FC<ChapterManagerProps> = ({
  chapters,
  onChaptersChange,
  currentChapterId,
  setCurrentChapterId,
}) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const dragOverId = useRef<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragEnter = (id: string) => {
    dragOverId.current = id;
  };

  const handleDragEnd = () => {
    if (draggedId && dragOverId.current && draggedId !== dragOverId.current) {
      const draggedIndex = chapters.findIndex((c) => c.id === draggedId);
      const dragOverIndex = chapters.findIndex((c) => c.id === dragOverId.current);
      const newChapters = [...chapters];
      const [removed] = newChapters.splice(draggedIndex, 1);
      newChapters.splice(dragOverIndex, 0, removed);
      onChaptersChange(newChapters);
    }
    setDraggedId(null);
    dragOverId.current = null;
  };

  return (
    <div>
      {chapters.length === 0 && (
        <p className="text-gray-500">No chapters yet. Add some!</p>
      )}
      <ul>
        {chapters.map((chapter) => (
          <li
            key={chapter.id}
            draggable
            onDragStart={() => handleDragStart(chapter.id)}
            onDragEnter={() => handleDragEnter(chapter.id)}
            onDragEnd={handleDragEnd}
            className={`cursor-pointer p-2 rounded mb-1 select-none ${
              chapter.id === currentChapterId
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setCurrentChapterId(chapter.id)}
          >
            {chapter.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChapterManager;
