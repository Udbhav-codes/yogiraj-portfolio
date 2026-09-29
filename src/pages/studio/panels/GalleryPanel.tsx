import { useEffect, useState } from "react";
import {
  createGalleryImage,
  deleteGalleryImage,
  listGalleryImages,
  updateGalleryImage,
  uploadMedia,
} from "../../../lib/studio/dataApi";
import type { DbGalleryImage, NewGalleryImage } from "../../../lib/studio/types";
import { galleryCategories } from "../../../data/content";
import { ImageField, TextField } from "../components/FormField";
import { bySortOrder, moveItem } from "../reorder";

const emptyForm: NewGalleryImage = {
  title: "",
  category: galleryCategories[0],
  image_url: "",
  camera: "",
  lens: "",
  location: "",
  year: "",
  width: 4,
  height: 5,
  sort_order: 0,
};

export default function GalleryPanel() {
  const [items, setItems] = useState<DbGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<NewGalleryImage>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    listGalleryImages()
      .then((rows) => setItems(bySortOrder(rows)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startNew = () => {
    setForm({ ...emptyForm, sort_order: items.length });
    setEditingId("new");
  };

  const startEdit = (item: DbGalleryImage) => {
    setForm({ ...item });
    setEditingId(item.id);
  };

  const cancel = () => {
    setEditingId(null);
    setError(null);
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      if (editingId === "new") {
        await createGalleryImage(form);
      } else if (editingId) {
        await updateGalleryImage(editingId, form);
      }
      setEditingId(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    await deleteGalleryImage(id);
    load();
  };

  const move = async (index: number, direction: -1 | 1) => {
    setBusyId(items[index].id);
    try {
      await moveItem(items, index, direction, updateGalleryImage);
      load();
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <p className="font-body text-sm text-pearl/50">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-pearl">Gallery ({items.length})</p>
        {editingId === null && (
          <button
            onClick={startNew}
            className="rounded-full bg-ocean px-4 py-2 font-body text-xs uppercase tracking-[0.1em] text-midnight"
          >
            Add Image
          </button>
        )}
      </div>

      {editingId !== null && (
        <div className="mt-6 space-y-4 rounded-lg border border-pearl/10 bg-pearl/[0.03] p-6">
          {error && <p className="font-body text-xs text-red-300">{error}</p>}
          <ImageField
            label="Image"
            value={form.image_url}
            onChange={(v) => setForm((f) => ({ ...f, image_url: v }))}
            onUpload={uploadMedia}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Title" required value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
            <label className="block">
              <span className="mb-1 block font-body text-xs uppercase tracking-[0.1em] text-pearl/50">Category</span>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full rounded-md border border-pearl/15 bg-midnight px-3 py-2 font-body text-sm text-pearl outline-none focus:border-ocean"
              >
                {galleryCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <TextField label="Camera" value={form.camera ?? ""} onChange={(v) => setForm((f) => ({ ...f, camera: v }))} />
            <TextField label="Lens" value={form.lens ?? ""} onChange={(v) => setForm((f) => ({ ...f, lens: v }))} />
            <TextField label="Location" value={form.location ?? ""} onChange={(v) => setForm((f) => ({ ...f, location: v }))} />
            <TextField label="Year" value={form.year ?? ""} onChange={(v) => setForm((f) => ({ ...f, year: v }))} />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving || !form.title || !form.image_url}
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

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((img, i) => (
          <div key={img.id} className="group relative overflow-hidden rounded-md border border-pearl/10">
            <img src={img.image_url} alt={img.title} className="aspect-[4/5] w-full object-cover" />
            <div className="absolute inset-0 flex flex-col justify-between bg-midnight/0 p-2 opacity-0 transition-opacity group-hover:bg-midnight/70 group-hover:opacity-100">
              <p className="font-body text-[10px] uppercase tracking-wide text-ocean">
                #{i + 1} · {img.category}
              </p>
              <p className="font-body text-xs text-pearl">{img.title}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0 || busyId === img.id}
                  className="text-[11px] text-pearl underline disabled:opacity-30"
                >
                  Up
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1 || busyId === img.id}
                  className="text-[11px] text-pearl underline disabled:opacity-30"
                >
                  Down
                </button>
                <button onClick={() => startEdit(img)} className="text-[11px] text-pearl underline">
                  Edit
                </button>
                <button onClick={() => remove(img.id)} className="text-[11px] text-red-300 underline">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
