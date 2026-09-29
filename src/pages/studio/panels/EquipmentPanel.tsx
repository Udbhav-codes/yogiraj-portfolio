import { useEffect, useState } from "react";
import {
  createEquipmentGroup,
  deleteEquipmentGroup,
  listEquipmentGroups,
  updateEquipmentGroup,
} from "../../../lib/studio/dataApi";
import type { DbEquipmentGroup, NewEquipmentGroup } from "../../../lib/studio/types";
import { TextAreaField, TextField } from "../components/FormField";
import { bySortOrder, moveItem } from "../reorder";

const emptyForm: NewEquipmentGroup = { category: "", items: [], sort_order: 0 };

export default function EquipmentPanel() {
  const [items, setItems] = useState<DbEquipmentGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<NewEquipmentGroup>(emptyForm);
  const [itemsText, setItemsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    listEquipmentGroups()
      .then((rows) => setItems(bySortOrder(rows)))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startNew = () => {
    setForm({ ...emptyForm, sort_order: items.length });
    setItemsText("");
    setEditingId("new");
  };

  const startEdit = (item: DbEquipmentGroup) => {
    setForm({ ...item });
    setItemsText(item.items.join("\n"));
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
      items: itemsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    try {
      if (editingId === "new") await createEquipmentGroup(payload);
      else if (editingId) await updateEquipmentGroup(editingId, payload);
      setEditingId(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this equipment group?")) return;
    await deleteEquipmentGroup(id);
    load();
  };

  const move = async (index: number, direction: -1 | 1) => {
    setBusyId(items[index].id);
    try {
      await moveItem(items, index, direction, updateEquipmentGroup);
      load();
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <p className="font-body text-sm text-pearl/50">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-pearl">BTS Equipment ({items.length})</p>
        {editingId === null && (
          <button
            onClick={startNew}
            className="rounded-full bg-ocean px-4 py-2 font-body text-xs uppercase tracking-[0.1em] text-midnight"
          >
            Add Group
          </button>
        )}
      </div>

      {editingId !== null && (
        <div className="mt-6 space-y-4 rounded-lg border border-pearl/10 bg-pearl/[0.03] p-6">
          {error && <p className="font-body text-xs text-red-300">{error}</p>}
          <TextField
            label="Category"
            required
            placeholder="Camera, Lenses, Lighting…"
            value={form.category}
            onChange={(v) => setForm((f) => ({ ...f, category: v }))}
          />
          <TextAreaField label="Items (one per line)" value={itemsText} onChange={setItemsText} rows={4} />
          <div className="flex gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving || !form.category}
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
        {items.map((g, i) => (
          <div key={g.id} className="flex items-center gap-4 rounded-md border border-pearl/10 p-3">
            <span className="font-body text-xs text-pearl/40">#{i + 1}</span>
            <div className="min-w-0 flex-1">
              <p className="font-body text-sm text-pearl">{g.category}</p>
              <p className="truncate font-body text-xs text-pearl/50">{g.items.join(", ")}</p>
            </div>
            <button
              onClick={() => move(i, -1)}
              disabled={i === 0 || busyId === g.id}
              className="font-body text-xs text-pearl/70 underline disabled:opacity-30"
            >
              Up
            </button>
            <button
              onClick={() => move(i, 1)}
              disabled={i === items.length - 1 || busyId === g.id}
              className="font-body text-xs text-pearl/70 underline disabled:opacity-30"
            >
              Down
            </button>
            <button onClick={() => startEdit(g)} className="font-body text-xs text-pearl/70 underline">
              Edit
            </button>
            <button onClick={() => remove(g.id)} className="font-body text-xs text-red-300 underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
