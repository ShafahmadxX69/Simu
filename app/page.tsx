"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [containers, setContainers] = useState([
    [{ model: "", size: "", qty: 1, color: "#cccccc" }]
  ]);

  const addContainer = () => {
    setContainers([...containers, [{ model: "", size: "", qty: 1, color: "#cccccc" }]]);
  };

  const handleChange = (containerIndex: number, boxIndex: number, field: string, value: string) => {
    const newContainers = [...containers];
    const item = newContainers[containerIndex][boxIndex];
    item[field] = field === "qty" ? parseInt(value) || 0 : value;
    setContainers(newContainers);
  };

  const addBoxToContainer = (containerIndex: number) => {
    const newContainers = [...containers];
    newContainers[containerIndex].push({ model: "", size: "", qty: 1, color: "#cccccc" });
    setContainers(newContainers);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar kiri input container */}
      <aside className="w-[25%] bg-gray-100 p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Containers</h2>
          <Button onClick={addContainer}>+ Add Container</Button>
        </div>

        {containers.map((container, i) => (
          <div key={i} className="mb-4">
            <h3 className="font-semibold mb-2">Container {i + 1}</h3>
            {container.map((box, j) => (
              <div key={j} className="grid grid-cols-4 gap-2 mb-1">
                <Input placeholder="Model" value={box.model} onChange={e => handleChange(i, j, 'model', e.target.value)} />
                <Input placeholder="Size" value={box.size} onChange={e => handleChange(i, j, 'size', e.target.value)} />
                <Input type="number" placeholder="QTY" value={box.qty} onChange={e => handleChange(i, j, 'qty', e.target.value)} />
                <Input type="color" value={box.color} onChange={e => handleChange(i, j, 'color', e.target.value)} />
              </div>
            ))}
            <Button size="sm" className="mt-1" onClick={() => addBoxToContainer(i)}>+ Add List</Button>
          </div>
        ))}

        <div className="mt-6">
          <Link href="/model-library">
            <Button variant="outline" className="w-full">Edit Model Library</Button>
          </Link>
        </div>
      </aside>

      {/* Bagian tengah-kanan untuk gambar 3D */}
      <section className="flex-1 bg-white flex justify-center items-center">
        <iframe
          src="/visualizer.html"
          className="w-full h-full border-0"
          title="Container Visualizer"
        />
      </section>
    </div>
  );
}
