import { useEffect, useState } from "react";
import { createReel, deleteReel, listReels, updateReel } from "../../../lib/studio/dataApi";
import type { DbReel } from "../../../lib/studio/types";
import { bySortOrder, moveItem } from "../reorder";

export default function ReelsPanel() {
  const [items, setItems] = useState<DbReel[]>([]);
  const [loading, setLoading] = useState(true);
  const [newUrl, setNewUrl] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    listReels()
      .then((rows) => setItems(bySortOrder(rows)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const add = async () => {
    const url = newUrl.trim();
    if (!url) return;
    setError(null);
    try {
      await createReel({ url, sort_order: items.length });
      setNewUrl("");
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not add reel");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Remove this reel?")) return;
    await deleteReel(id);
    load();
  };

  const move = async (index: number, direction: -1 | 1) => {
    setBusyId(items[index].id);
    try {
      await moveItem(items, index, direction, updateReel);
      load();
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <p className="font-body text-sm text-pearl/50">Loading…</p>;

  return (
    <div>
      <p className="font-display text-lg text-pearl">Reels ({items.length})</p>
      <p className="mt-1 font-body text-xs text-pearl/50">
        Paste an Instagram Reel link to add it. Order here is the order they appear on the site.
      </p>

      {error && <p className="mt-3 font-body text-xs text-red-300">{error}</p>}

      <div className="mt-4 flex gap-3">
        <input
          type="text"
          value={newUrl}
          placeholder="https://www.instagram.com/reel/…"
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          className="w-full rounded-md border border-pearl/15 bg-midnight px-3 py-2 font-body text-sm text-pearl outline-none focus:border-ocean"
        />
        <button
          onClick={add}
          disabled={!newUrl.trim()}
          className="flex-shrink-0 rounded-full bg-ocean px-4 py-2 font-body text-xs uppercase tracking-[0.1em] text-midnight disabled:opacity-50"
        >
          Add Reel
        </button>
      </div>

      <div className="mt-6 space-y-2">
        {items.map((item, i) => (
          <div key={item.id} className="flex items-center gap-4 rounded-md border border-pearl/10 p-3">
            <span className="font-body text-xs text-pearl/40">#{i + 1}</span>
            <p className="min-w-0 flex-1 truncate font-body text-sm text-pearl">{item.url}</p>
            <button
              onClick={() => move(i, -1)}
              disabled={i === 0 || busyId === item.id}
              className="font-body text-xs text-pearl/70 underline disabled:opacity-30"
            >
              Up
            </button>
            <button
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1 || busyId === item.id}
              className="font-body text-xs text-pearl/70 underline disabled:opacity-30"
            >
              Down
            </button>
            <button onClick={() => remove(item.id)} className="font-body text-xs text-red-300 underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
