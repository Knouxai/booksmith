"use client";

import React, { useState } from "react";

interface AIImageEngineProps {
  onAddImage: (image: { url: string; alt?: string }) => void;
}

const styles = [
  "Realistic",
  "Cartoon",
  "Watercolor",
  "Photographic",
];

const aspectRatios = [
  { label: "1:1", value: "1:1" },
  { label: "4:3", value: "4:3" },
  { label: "16:9", value: "16:9" },
];

const AIImageEngine: React.FC<AIImageEngineProps> = ({ onAddImage }) => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState(styles[0]);
  const [aspectRatio, setAspectRatio] = useState(aspectRatios[0].value);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    // Simulate AI image generation API call
    setTimeout(() => {
      const generatedImage = {
        url: "https://via.placeholder.com/400x300?text=" + encodeURIComponent(style + " " + aspectRatio),
        alt: prompt,
      };
      onAddImage(generatedImage);
      setIsGenerating(false);
      setPrompt("");
    }, 2000);
  };

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded bg-white text-black">
      <h3 className="text-lg font-semibold mb-2">Knoux-AI Image Engine</h3>
      <textarea
        className="w-full p-2 border border-gray-400 rounded resize-none mb-2"
        rows={3}
        placeholder="Enter description for image generation..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex justify-between mb-2">
        <select
          className="border border-gray-400 rounded p-1"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          {styles.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          className="border border-gray-400 rounded p-1"
          value={aspectRatio}
          onChange={(e) => setAspectRatio(e.target.value)}
        >
          {aspectRatios.map((ar) => (
            <option key={ar.value} value={ar.value}>
              {ar.label}
            </option>
          ))}
        </select>
      </div>
      <button
        className="px-4 py-2 bg-black text-white rounded disabled:opacity-50"
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? "Generating..." : "Generate Image"}
      </button>
    </div>
  );
};

export default AIImageEngine;
