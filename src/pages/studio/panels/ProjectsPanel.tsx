import { useEffect, useState } from "react";
import { createProject, deleteProject, listProjects, updateProject, uploadMedia } from "../../../lib/studio/dataApi";
import type { DbProject, NewProject } from "../../../lib/studio/types";
import { ImageField, TextAreaField, TextField } from "../components/FormField";

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
  const [galleryText, setGalleryText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    listProjects().then(setItems).catch((e) => setError(e.message)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startNew = () => {
    setForm({ ...emptyForm, sort_order: items.length });
    setGalleryText("");
    setEditingId("new");
  };

  const startEdit = (item: DbProject) => {
    setForm({ ...item });
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
      if (editingId === "new") await createProject(payload);
      else if (editingId) await updateProject(editingId, payload);
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
        {items.map((p) => (
          <div key={p.id} className="flex items-center gap-4 rounded-md border border-pearl/10 p-3">
            <img src={p.cover_url} alt={p.title} className="h-14 w-24 flex-shrink-0 rounded object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-body text-sm text-pearl">{p.title}</p>
              <p className="font-body text-xs text-pearl/50">{p.client}</p>
            </div>
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
