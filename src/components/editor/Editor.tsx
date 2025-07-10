"use client";

import React, { useEffect, useRef } from "react";

interface EditorProps {
  content: string;
  onContentChange: (newContent: string) => void;
  currentChapterId: string | null;
  templateHub: string;
}

const Editor: React.FC<EditorProps> = ({
  content,
  onContentChange,
  currentChapterId,
  templateHub,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Placeholder for AI content generation or other editor side effects
  }, [templateHub]);

  // Auto resize textarea height based on content
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
    onContentChange(target.value);
  };

  return (
    <div className="flex flex-col h-full">
      <textarea
        ref={textareaRef}
        className="flex-1 w-full p-4 border border-gray-300 rounded resize-none font-sans text-black bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all"
        value={content}
        onChange={handleInput}
        placeholder="Start writing your book here..."
        spellCheck={true}
      />
      <div className="mt-2 text-sm text-gray-600">
        {currentChapterId
          ? `Editing Chapter ID: ${currentChapterId}`
          : "No chapter selected"}
      </div>
    </div>
  );
};

export default Editor;
