"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { SectionCard } from "@/components/section-card";

interface TodoItem {
  id: string;
  label: string;
  completed: boolean;
}

interface TodoListCardProps {
  title?: string;
  subtitle?: string;
  initialItems?: Array<{ label: string; completed?: boolean }>;
}

export function TodoListCard({
  title = "To-Do List",
  subtitle = "A quiet running list for anything still to lock in.",
  initialItems = []
}: TodoListCardProps) {
  const [items, setItems] = useState<TodoItem[]>(
    initialItems.map((item) => ({
      id: crypto.randomUUID(),
      label: item.label,
      completed: item.completed ?? false
    }))
  );
  const [draft, setDraft] = useState("");

  const orderedItems = useMemo(
    () => [...items].sort((left, right) => Number(left.completed) - Number(right.completed)),
    [items]
  );

  const addItem = () => {
    const value = draft.trim();
    if (!value) {
      return;
    }

    setItems((current) => [
      ...current,
      { id: crypto.randomUUID(), label: value, completed: false }
    ]);
    setDraft("");
  };

  const toggleItem = (id: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <SectionCard title={title} subtitle={subtitle}>
      <div className="space-y-4">
        <div className="flex gap-3">
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                addItem();
              }
            }}
            placeholder="Add a new item"
            className="flex-1 rounded-[18px] border border-[#e7dccd] bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-gold"
          />
          <button
            type="button"
            onClick={addItem}
            className="inline-flex h-[50px] items-center justify-center gap-2 rounded-full border border-white/70 bg-white/75 px-4 text-sm font-medium text-ink/72 transition-all duration-300 hover:bg-white hover:text-ink"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {orderedItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-[20px] border border-[#ece1d4] bg-[#fffcf8] px-4 py-3"
            >
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
                  item.completed
                    ? "border-olive bg-olive/90"
                    : "border-[#cdbca6] bg-white hover:border-olive/70"
                }`}
                aria-label={item.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                <span
                  className={`h-2 w-2 rounded-full bg-white transition ${
                    item.completed ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>

              <p
                className={`flex-1 text-sm transition ${
                  item.completed ? "text-ink/40 line-through" : "text-ink/78"
                }`}
              >
                {item.label}
              </p>

              <button
                type="button"
                onClick={() => deleteItem(item.id)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#8c6158] transition hover:bg-[#f6ede5]"
                aria-label={`Delete ${item.label}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}
