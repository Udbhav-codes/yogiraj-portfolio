import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../../lib/studio/dataApi";
import type { DbProfile } from "../../../lib/studio/types";
import { TextAreaField, TextField } from "../components/FormField";

export default function ProfilePanel() {
  const [form, setForm] = useState<Omit<DbProfile, "id"> | null>(null);
  const [expertiseText, setExpertiseText] = useState("");
  const [toolsText, setToolsText] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getProfile()
      .then((row) => {
        if (row) {
          const { id: _id, ...rest } = row;
          setForm(rest);
          setExpertiseText(row.expertise.join(", "));
          setToolsText(row.tools.join(", "));
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="font-body text-sm text-pearl/50">Loading…</p>;
  if (!form)
    return (
      <p className="font-body text-sm text-pearl/50">
        No profile row found yet — run the migration in <code>supabase/migrations/0001_init.sql</code> first.
      </p>
    );

  const save = async () => {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      await updateProfile({
        ...form,
        expertise: expertiseText.split(",").map((s) => s.trim()).filter(Boolean),
        tools: toolsText.split(",").map((s) => s.trim()).filter(Boolean),
      });
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => (f ? { ...f, [key]: value } : f));

  return (
    <div className="max-w-2xl space-y-4">
      <p className="font-display text-lg text-pearl">Profile &amp; Contact</p>
      {error && <p className="font-body text-xs text-red-300">{error}</p>}
      {saved && <p className="font-body text-xs text-ocean">Saved.</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField label="Name" value={form.name} onChange={(v) => set("name", v)} />
        <TextField label="Title" value={form.title} onChange={(v) => set("title", v)} />
        <TextField label="Location" value={form.location} onChange={(v) => set("location", v)} />
        <TextField label="Email" value={form.email} onChange={(v) => set("email", v)} />
        <TextField label="Phone" value={form.phone} onChange={(v) => set("phone", v)} />
        <TextField label="Address" value={form.address} onChange={(v) => set("address", v)} />
      </div>
      <TextField label="Tagline" value={form.tagline} onChange={(v) => set("tagline", v)} />
      <TextField label="Sub-tagline" value={form.sub_tagline} onChange={(v) => set("sub_tagline", v)} />
      <TextAreaField label="Bio" value={form.bio} onChange={(v) => set("bio", v)} rows={4} />
      <TextField label="Expertise (comma-separated)" value={expertiseText} onChange={setExpertiseText} />
      <TextField label="Tools (comma-separated)" value={toolsText} onChange={setToolsText} />

      <button
        onClick={save}
        disabled={saving}
        className="rounded-full bg-pearl px-5 py-2 font-body text-xs uppercase tracking-[0.1em] text-midnight disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save Profile"}
      </button>
    </div>
  );
}
