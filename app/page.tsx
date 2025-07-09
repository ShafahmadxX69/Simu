"use client";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface BoxItem {
  model: string;
  size: string;
  qty: number;
  color: string;
}

export default function HomePage() {
  const [containers, setContainers] = useState<BoxItem[][]>([[]]);

  const addContainer = () => {
    setContainers([...containers, []]);
  };

  const addBoxToContainer = (index: number) => {
    const updated = [...containers];
    updated[index].push({ model: '', size: '', qty: 1, color: '#cccccc' });
    setContainers(updated);
  };

  const updateBox = (containerIndex: number, boxIndex: number, field: keyof BoxItem, value: string) => {
    const updated = [...containers];
    updated[containerIndex][boxIndex][field] = field === 'qty' ? parseInt(value) || 0 : value;
    setContainers(updated);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-[25%] bg-gray-100 p-4 overflow-y-auto border-r">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Container List</h2>
          <Button onClick={addContainer}>+ Add</Button>
        </div>

        {containers.map((container, ci) => (
          <div key={ci} className="mb-4">
            <h3 className="font-semibold mb-2">Container {ci + 1}</h3>
            {container.map((box, bi) => (
              <div key={bi} className="grid grid-cols-4 gap-2 mb-1">
                <Input value={box.model} placeholder="Model" onChange={e => updateBox(ci, bi, 'model', e.target.value)} />
                <Input value={box.size} placeholder="Size" onChange={e => updateBox(ci, bi, 'size', e.target.value)} />
                <Input value={box.qty} type="number" placeholder="QTY" onChange={e => updateBox(ci, bi, 'qty', e.target.value)} />
                <Input value={box.color} type="color" onChange={e => updateBox(ci, bi, 'color', e.target.value)} />
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={() => addBoxToContainer(ci)}>+ Add List</Button>
          </div>
        ))}

        <div className="mt-6">
          <Link href="/library">
            <Button className="w-full">Model Library</Button>
          </Link>
        </div>
      </aside>

      <main className="flex-1">
        <iframe src="/visualizer.html" className="w-full h-full border-0" title="Container View" />
      </main>
    </div>
  );
}
