import type { ChangeEvent } from "react";

const baseInput =
  "w-full rounded-md border border-pearl/15 bg-midnight px-3 py-2 font-body text-sm text-pearl outline-none transition-colors focus:border-ocean placeholder:text-pearl/30";

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-body text-xs uppercase tracking-[0.1em] text-pearl/50">{label}</span>
      <input
        type="text"
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={baseInput}
      />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block font-body text-xs uppercase tracking-[0.1em] text-pearl/50">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className={baseInput}
      />
    </label>
  );
}

export function ImageField({
  label,
  value,
  onChange,
  onUpload,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await onUpload(file);
      onChange(url);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      e.target.value = "";
    }
  };

  return (
    <label className="block">
      <span className="mb-1 block font-body text-xs uppercase tracking-[0.1em] text-pearl/50">{label}</span>
      <div className="flex items-center gap-3">
        {value && (
          <img src={value} alt="" className="h-12 w-12 flex-shrink-0 rounded object-cover" />
        )}
        <input
          type="text"
          value={value}
          placeholder="Paste an image URL…"
          onChange={(e) => onChange(e.target.value)}
          className={baseInput}
        />
        <label className="flex-shrink-0 cursor-pointer rounded-full border border-pearl/20 px-3 py-2 font-body text-[11px] uppercase tracking-[0.08em] text-pearl/70 hover:border-ocean hover:text-ocean">
          Upload
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>
      </div>
    </label>
  );
}
