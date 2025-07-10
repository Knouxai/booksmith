"use client";

import React from "react";

interface LivePreviewProps {
  content: string;
  chapters: { id: string; title: string; content?: string }[];
  images: { url: string; alt?: string; chapterId?: string }[];
  templateHub: string;
}

const LivePreview: React.FC<LivePreviewProps> = ({
  content,
  chapters,
  images,
}) => {
  // Render chapters with titles and content, images inserted by chapter
  return (
    <div className="bg-white text-black p-6 overflow-auto h-full font-sans">
      <h1 className="text-3xl font-bold mb-6 border-b border-gray-300 pb-2">
        Live Preview
      </h1>
      {chapters.length === 0 && (
        <p className="text-gray-500">No chapters to preview yet.</p>
      )}
      {chapters.map((chapter) => (
        <section
          key={chapter.id}
          className="mb-12 border border-gray-200 rounded p-4 shadow-sm"
        >
          <h2 className="text-2xl font-semibold mb-3">{chapter.title}</h2>
          <div className="whitespace-pre-wrap mb-4">
            {chapter.content || content}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {images
              .filter((img) => img.chapterId === chapter.id)
              .map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={img.alt || "Generated Image"}
                  className="max-w-full rounded shadow"
                />
              ))}
          </div>
          <footer className="mt-4 text-sm text-gray-400 border-t border-gray-100 pt-2">
            Page footer for {chapter.title}
          </footer>
        </section>
      ))}
    </div>
  );
};

export default LivePreview;
