"use client";

import React from "react";

interface KnouxEpicWeaverProps {
  onTemplateAction?: (action: string, data?: unknown) => void;
}

const KnouxEpicWeaver: React.FC<KnouxEpicWeaverProps> = () => {
  return (
    <div className="p-6 bg-white text-black rounded shadow-md font-sans">
      <h2 className="text-2xl font-bold mb-4">Knoux-EpicWeaver Template Hub</h2>
      <p className="mb-4">
        This template is designed for creating epic narratives, fantasy, sci-fi,
        historical fiction, and serialized works. It provides tools for world
        building, complex character development, and intricate plot planning.
      </p>
      <section className="mb-4">
        <h3 className="text-xl font-semibold mb-2">World Building</h3>
        <p>
          Use this section to define your world’s geography, cultures, history,
          and magic systems.
        </p>
      </section>
      <section className="mb-4">
        <h3 className="text-xl font-semibold mb-2">Character Development</h3>
        <p>
          Create detailed profiles for your characters including backgrounds,
          motivations, and relationships.
        </p>
      </section>
      <section>
        <h3 className="text-xl font-semibold mb-2">Plot Planning</h3>
        <p>
          Outline your story arcs, plot twists, and chapter breakdowns to keep
          your narrative cohesive.
        </p>
      </section>
    </div>
  );
};

export default KnouxEpicWeaver;
