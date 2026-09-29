import { useEffect, useState } from "react";
import { createProject, deleteProject, listProjects, updateProject, uploadMedia } from "../../../lib/studio/dataApi";
import type { DbProject, NewProject } from "../../../lib/studio/types";
import { ImageField, NumberField, TextAreaField, TextField } from "../components/FormField";
import { bySortOrder, moveItem, setPriority } from "../reorder";

const emptyForm: NewProject = {
  title: "",
  client: "",
  category: "",
  year: "",
  cover_url: "",
  challenge: "",
  process: "",
  result: "",
  gallery_urls: [],
  sort_order: 0,
};

export default function ProjectsPanel() {
  const [items, setItems] = useState<DbProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<NewProject>(emptyForm);
  const [priority, setPriorityInput] = useState(1);
  const [galleryText, setGalleryText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    listProjects()
      .then((rows) => setItems(bySortOrder(rows)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startNew = () => {
    setForm({ ...emptyForm, sort_order: items.length });
    setPriorityInput(items.length + 1);
    setGalleryText("");
    setEditingId("new");
  };

  const startEdit = (item: DbProject) => {
    setForm({ ...item });
    setPriorityInput(items.findIndex((i) => i.id === item.id) + 1);
    setGalleryText(item.gallery_urls.join("\n"));
    setEditingId(item.id);
  };

  const cancel = () => {
    setEditingId(null);
    setError(null);
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      gallery_urls: galleryText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      let saved: DbProject;
      let list: DbProject[];
      if (editingId === "new") {
        saved = await createProject({ ...payload, sort_order: items.length });
        list = [...items, saved];
      } else if (editingId) {
        saved = await updateProject(editingId, payload);
        list = items.map((i) => (i.id === saved.id ? saved : i));
      } else {
        return;
      }
      await setPriority(list, saved.id, priority, updateProject);
      setEditingId(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    load();
  };

  const move = async (index: number, direction: -1 | 1) => {
    setBusyId(items[index].id);
    try {
      await moveItem(items, index, direction, updateProject);
      load();
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <p className="font-body text-sm text-pearl/50">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-pearl">Projects ({items.length})</p>
        {editingId === null && (
          <button
            onClick={startNew}
            className="rounded-full bg-ocean px-4 py-2 font-body text-xs uppercase tracking-[0.1em] text-midnight"
          >
            Add Project
          </button>
        )}
      </div>

      {editingId !== null && (
        <div className="mt-6 space-y-4 rounded-lg border border-pearl/10 bg-pearl/[0.03] p-6">
          {error && <p className="font-body text-xs text-red-300">{error}</p>}
          <ImageField
            label="Cover Image"
            value={form.cover_url}
            onChange={(v) => setForm((f) => ({ ...f, cover_url: v }))}
            onUpload={uploadMedia}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Title" required value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
            <TextField label="Client" value={form.client ?? ""} onChange={(v) => setForm((f) => ({ ...f, client: v }))} />
            <TextField label="Category" value={form.category ?? ""} onChange={(v) => setForm((f) => ({ ...f, category: v }))} />
            <TextField label="Year" value={form.year ?? ""} onChange={(v) => setForm((f) => ({ ...f, year: v }))} />
            <NumberField
              label="Priority (position)"
              value={priority}
              onChange={setPriorityInput}
              min={1}
              max={editingId === "new" ? items.length + 1 : items.length}
              hint={`1 = shown first, ${items.length + (editingId === "new" ? 1 : 0)} = shown last`}
            />
          </div>
          <TextAreaField label="Challenge" value={form.challenge ?? ""} onChange={(v) => setForm((f) => ({ ...f, challenge: v }))} />
          <TextAreaField label="Process" value={form.process ?? ""} onChange={(v) => setForm((f) => ({ ...f, process: v }))} />
          <TextAreaField label="Result" value={form.result ?? ""} onChange={(v) => setForm((f) => ({ ...f, result: v }))} />
          <TextAreaField
            label="Gallery image URLs (one per line)"
            value={galleryText}
            onChange={setGalleryText}
            rows={4}
          />
          <div className="flex gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving || !form.title || !form.cover_url}
              className="rounded-full bg-pearl px-5 py-2 font-body text-xs uppercase tracking-[0.1em] text-midnight disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button onClick={cancel} className="font-body text-xs uppercase tracking-[0.1em] text-pearl/60">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 space-y-2">
        {items.map((p, i) => (
          <div key={p.id} className="flex items-center gap-4 rounded-md border border-pearl/10 p-3">
            <span className="font-body text-xs text-pearl/40">#{i + 1}</span>
            <img src={p.cover_url} alt={p.title} className="h-14 w-24 flex-shrink-0 rounded object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-body text-sm text-pearl">{p.title}</p>
              <p className="font-body text-xs text-pearl/50">{p.client}</p>
            </div>
            <button
              onClick={() => move(i, -1)}
              disabled={i === 0 || busyId === p.id}
              className="font-body text-xs text-pearl/70 underline disabled:opacity-30"
            >
              Up
            </button>
            <button
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1 || busyId === p.id}
              className="font-body text-xs text-pearl/70 underline disabled:opacity-30"
            >
              Down
            </button>
            <button onClick={() => startEdit(p)} className="font-body text-xs text-pearl/70 underline">
              Edit
            </button>
            <button onClick={() => remove(p.id)} className="font-body text-xs text-red-300 underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
