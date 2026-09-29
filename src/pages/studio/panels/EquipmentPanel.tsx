import { useEffect, useState } from "react";
import {
  createEquipmentGroup,
  deleteEquipmentGroup,
  listEquipmentGroups,
  updateEquipmentGroup,
} from "../../../lib/studio/dataApi";
import type { DbEquipmentGroup, NewEquipmentGroup } from "../../../lib/studio/types";
import { NumberField, TextAreaField, TextField } from "../components/FormField";
import { bySortOrder, moveItem, setPriority } from "../reorder";

const emptyForm: NewEquipmentGroup = { category: "", items: [], sort_order: 0 };

export default function EquipmentPanel() {
  const [items, setItems] = useState<DbEquipmentGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<NewEquipmentGroup>(emptyForm);
  const [priority, setPriorityInput] = useState(1);
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
    setPriorityInput(items.length + 1);
    setItemsText("");
    setEditingId("new");
  };

  const startEdit = (item: DbEquipmentGroup) => {
    setForm({ ...item });
    setPriorityInput(items.findIndex((i) => i.id === item.id) + 1);
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
      let saved: DbEquipmentGroup;
      let list: DbEquipmentGroup[];
      if (editingId === "new") {
        saved = await createEquipmentGroup({ ...payload, sort_order: items.length });
        list = [...items, saved];
      } else if (editingId) {
        saved = await updateEquipmentGroup(editingId, payload);
        list = items.map((i) => (i.id === saved.id ? saved : i));
      } else {
        return;
      }
      await setPriority(list, saved.id, priority, updateEquipmentGroup);
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
          <NumberField
            label="Priority (position)"
            value={priority}
            onChange={setPriorityInput}
            min={1}
            max={editingId === "new" ? items.length + 1 : items.length}
            hint={`1 = shown first, ${items.length + (editingId === "new" ? 1 : 0)} = shown last`}
          />
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
