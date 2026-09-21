import { useEffect, useState } from "react";
import { createService, deleteService, listServices, updateService } from "../../../lib/studio/dataApi";
import type { DbService, NewService } from "../../../lib/studio/types";
import { TextAreaField, TextField } from "../components/FormField";

const emptyForm: NewService = {
  title: "",
  description: "",
  deliverables: "",
  timeline: "",
  sort_order: 0,
};

export default function ServicesPanel() {
  const [items, setItems] = useState<DbService[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<NewService>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    listServices().then(setItems).catch((e) => setError(e.message)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startNew = () => {
    setForm({ ...emptyForm, sort_order: items.length });
    setEditingId("new");
  };

  const startEdit = (item: DbService) => {
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
      if (editingId === "new") await createService(form);
      else if (editingId) await updateService(editingId, form);
      setEditingId(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await deleteService(id);
    load();
  };

  if (loading) return <p className="font-body text-sm text-pearl/50">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-pearl">Services ({items.length})</p>
        {editingId === null && (
          <button
            onClick={startNew}
            className="rounded-full bg-ocean px-4 py-2 font-body text-xs uppercase tracking-[0.1em] text-midnight"
          >
            Add Service
          </button>
        )}
      </div>

      {editingId !== null && (
        <div className="mt-6 space-y-4 rounded-lg border border-pearl/10 bg-pearl/[0.03] p-6">
          {error && <p className="font-body text-xs text-red-300">{error}</p>}
          <TextField label="Title" required value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
          <TextAreaField label="Description" value={form.description} onChange={(v) => setForm((f) => ({ ...f, description: v }))} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Deliverables" value={form.deliverables ?? ""} onChange={(v) => setForm((f) => ({ ...f, deliverables: v }))} />
            <TextField label="Timeline" value={form.timeline ?? ""} onChange={(v) => setForm((f) => ({ ...f, timeline: v }))} />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving || !form.title}
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
        {items.map((s) => (
          <div key={s.id} className="flex items-center gap-4 rounded-md border border-pearl/10 p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-body text-sm text-pearl">{s.title}</p>
              <p className="truncate font-body text-xs text-pearl/50">{s.description}</p>
            </div>
            <button onClick={() => startEdit(s)} className="font-body text-xs text-pearl/70 underline">
              Edit
            </button>
            <button onClick={() => remove(s.id)} className="font-body text-xs text-red-300 underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
