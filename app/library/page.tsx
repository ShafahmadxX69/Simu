"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Model {
  model: string;
  size: string;
  length: number;
  width: number;
  height: number;
}

export default function LibraryPage() {
  const [data, setData] = useState<Model[]>([]);

  const addEntry = () => {
    setData([...data, { model: '', size: '', length: 0, width: 0, height: 0 }]);
  };

  const handleChange = (index: number, field: keyof Model, value: string) => {
    const newData = [...data];
    newData[index][field] = ['length', 'width', 'height'].includes(field)
      ? parseFloat(value) || 0
      : value;
    setData(newData);
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Model Library</h1>
      {data.map((entry, i) => (
        <div key={i} className="grid grid-cols-6 gap-2 mb-2">
          <Input value={entry.model} placeholder="Model" onChange={e => handleChange(i, 'model', e.target.value)} />
          <Input value={entry.size} placeholder="Size" onChange={e => handleChange(i, 'size', e.target.value)} />
          <Input type="number" value={entry.length} placeholder="Length" onChange={e => handleChange(i, 'length', e.target.value)} />
          <Input type="number" value={entry.width} placeholder="Width" onChange={e => handleChange(i, 'width', e.target.value)} />
          <Input type="number" value={entry.height} placeholder="Height" onChange={e => handleChange(i, 'height', e.target.value)} />
        </div>
      ))}
      <Button onClick={addEntry}>+ Tambah Model</Button>
    </main>
  );
}
