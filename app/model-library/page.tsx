// =========================
// File: app/model-library/page.tsx
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ModelEntry {
  model: string;
  size: string;
  length: number;
  width: number;
  height: number;
}

export default function ModelLibraryPage() {
  const [models, setModels] = useState<ModelEntry[]>([]);

  const addModel = () => {
    setModels([...models, { model: "", size: "", length: 0, width: 0, height: 0 }]);
  };

  const handleChange = (i: number, field: keyof ModelEntry, value: string) => {
    const updated = [...models];
    updated[i][field] = ["length", "width", "height"].includes(field) ? parseFloat(value) || 0 : value;
    setModels(updated);
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Model Library</h1>
      <div className="space-y-2">
        {models.map((m, i) => (
          <div key={i} className="grid grid-cols-5 gap-2">
            <Input placeholder="Model" value={m.model} onChange={e => handleChange(i, "model", e.target.value)} />
            <Input placeholder="Size" value={m.size} onChange={e => handleChange(i, "size", e.target.value)} />
            <Input type="number" placeholder="Length (cm)" value={m.length} onChange={e => handleChange(i, "length", e.target.value)} />
            <Input type="number" placeholder="Width (cm)" value={m.width} onChange={e => handleChange(i, "width", e.target.value)} />
            <Input type="number" placeholder="Height (cm)" value={m.height} onChange={e => handleChange(i, "height", e.target.value)} />
          </div>
        ))}
      </div>
      <Button onClick={addModel}>+ Tambah Model</Button>
    </main>
  );
}
