"use client";
import { useEffect, useState } from "react";
import Viewer from "./Viewer";

export default function ModelGalleryDynamic() {
  const [index, setIndex] = useState(0);
  const [models, setModels] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/models");
        const data = await res.json();
        setModels(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const next = () => setIndex((i) => (i + 1) % models.length);
  const prev = () => setIndex((i) => (i - 1 + models.length) % models.length);

  if (loading) return <p>Loading models...</p>;
  if (!models.length) return <p>No models found in bucket.</p>;

  const current = models[index];

  return (
    <div className="flex flex-col gap-4 w-full">
      <Viewer modelUrl={current.url} />
      <div className="flex items-center justify-between w-full max-w-md mx-auto">
        <button
          onClick={prev}
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          ← Prev
        </button>

        <span className="text-lg font-medium text-center flex-1">
          {current.name}
        </span>

        <button
          onClick={next}
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next →
        </button>
      </div>
    </div>
  );
}