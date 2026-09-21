import { useEffect, useState, type ChangeEvent } from "react";
import { createFilm, deleteFilm, listFilms, updateFilm, uploadMedia } from "../../../lib/studio/dataApi";
import type { DbFilm, NewFilm } from "../../../lib/studio/types";
import {
  extractYouTubeId,
  extractYouTubePlaylistId,
  youtubeEmbedUrl,
  youtubePlaylistEmbedUrl,
  youtubeThumbnailUrl,
} from "../../../lib/youtube";
import { ImageField, TextAreaField, TextField } from "../components/FormField";

const emptyForm: NewFilm = {
  title: "",
  category: "",
  year: "",
  duration: "",
  award: "",
  client: "",
  description: "",
  thumb_url: "",
  video_url: "",
  sort_order: 0,
};

type VideoSource = "upload" | "youtube";

export default function FilmsPanel() {
  const [items, setItems] = useState<DbFilm[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | "new" | null>(null);
  const [form, setForm] = useState<NewFilm>(emptyForm);
  const [videoSource, setVideoSource] = useState<VideoSource>("upload");
  const [youtubeInput, setYoutubeInput] = useState("");
  const [youtubeError, setYoutubeError] = useState<string | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    listFilms().then(setItems).catch((e) => setError(e.message)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const startNew = () => {
    setForm({ ...emptyForm, sort_order: items.length });
    setVideoSource("upload");
    setYoutubeInput("");
    setYoutubeError(null);
    setEditingId("new");
  };

  const startEdit = (item: DbFilm) => {
    setForm({ ...item });
    const isYouTube = !!item.video_url && item.video_url.includes("youtube.com/embed/");
    setVideoSource(isYouTube ? "youtube" : "upload");
    setYoutubeInput(isYouTube ? item.video_url! : "");
    setYoutubeError(null);
    setEditingId(item.id);
  };

  const cancel = () => {
    setEditingId(null);
    setError(null);
  };

  const handleVideoFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingVideo(true);
    try {
      const url = await uploadMedia(file);
      setForm((f) => ({ ...f, video_url: url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Video upload failed");
    } finally {
      setUploadingVideo(false);
      e.target.value = "";
    }
  };

  const handleYoutubeInput = (value: string) => {
    setYoutubeInput(value);
    setYoutubeError(null);
    if (!value.trim()) {
      setForm((f) => ({ ...f, video_url: "" }));
      return;
    }
    const videoId = extractYouTubeId(value);
    const playlistId = extractYouTubePlaylistId(value);

    // A link with a video ID AND no explicit video selected in the URL (just ?list=)
    // is a playlist link — embed the whole series. Otherwise embed the single video.
    if (playlistId && !value.includes("watch?v=") && !value.includes("youtu.be/")) {
      setForm((f) => ({
        ...f,
        video_url: youtubePlaylistEmbedUrl(playlistId),
        thumb_url: f.thumb_url || (videoId ? youtubeThumbnailUrl(videoId) : f.thumb_url),
      }));
      return;
    }
    if (!videoId) {
      setYoutubeError("Couldn't find a video or playlist ID in that link.");
      return;
    }
    setForm((f) => ({
      ...f,
      video_url: youtubeEmbedUrl(videoId),
      thumb_url: f.thumb_url || youtubeThumbnailUrl(videoId),
    }));
  };

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      if (editingId === "new") await createFilm(form);
      else if (editingId) await updateFilm(editingId, form);
      setEditingId(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this film?")) return;
    await deleteFilm(id);
    load();
  };

  if (loading) return <p className="font-body text-sm text-pearl/50">Loading…</p>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg text-pearl">Films ({items.length})</p>
        {editingId === null && (
          <button
            onClick={startNew}
            className="rounded-full bg-ocean px-4 py-2 font-body text-xs uppercase tracking-[0.1em] text-midnight"
          >
            Add Film
          </button>
        )}
      </div>

      {editingId !== null && (
        <div className="mt-6 space-y-4 rounded-lg border border-pearl/10 bg-pearl/[0.03] p-6">
          {error && <p className="font-body text-xs text-red-300">{error}</p>}
          <ImageField
            label="Thumbnail"
            value={form.thumb_url}
            onChange={(v) => setForm((f) => ({ ...f, thumb_url: v }))}
            onUpload={uploadMedia}
          />

          <div>
            <span className="mb-1 block font-body text-xs uppercase tracking-[0.1em] text-pearl/50">Video</span>
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={() => setVideoSource("upload")}
                className={`rounded-full px-4 py-1.5 font-body text-[11px] uppercase tracking-[0.08em] transition-colors ${
                  videoSource === "upload" ? "bg-ocean text-midnight" : "border border-pearl/15 text-pearl/60"
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setVideoSource("youtube")}
                className={`rounded-full px-4 py-1.5 font-body text-[11px] uppercase tracking-[0.08em] transition-colors ${
                  videoSource === "youtube" ? "bg-ocean text-midnight" : "border border-pearl/15 text-pearl/60"
                }`}
              >
                YouTube Link
              </button>
            </div>

            {videoSource === "upload" ? (
              <div className="flex items-center gap-3">
                <label className="cursor-pointer rounded-full border border-pearl/20 px-4 py-2 font-body text-[11px] uppercase tracking-[0.08em] text-pearl/70 hover:border-ocean hover:text-ocean">
                  {uploadingVideo ? "Uploading…" : "Choose Video File"}
                  <input type="file" accept="video/*" onChange={handleVideoFile} disabled={uploadingVideo} className="hidden" />
                </label>
                {form.video_url && !form.video_url.includes("youtube.com/embed/") && (
                  <span className="font-body text-xs text-pearl/50">Video attached ✓</span>
                )}
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=…"
                  value={youtubeInput}
                  onChange={(e) => handleYoutubeInput(e.target.value)}
                  className="w-full rounded-md border border-pearl/15 bg-midnight px-3 py-2 font-body text-sm text-pearl outline-none focus:border-ocean"
                />
                {youtubeError && <p className="mt-1 font-body text-xs text-red-300">{youtubeError}</p>}
                {form.video_url?.includes("youtube.com/embed/") && (
                  <p className="mt-1 font-body text-xs text-ocean">Video linked ✓ — thumbnail auto-filled if it was empty.</p>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Title" required value={form.title} onChange={(v) => setForm((f) => ({ ...f, title: v }))} />
            <TextField label="Category" value={form.category} onChange={(v) => setForm((f) => ({ ...f, category: v }))} />
            <TextField label="Year" value={form.year ?? ""} onChange={(v) => setForm((f) => ({ ...f, year: v }))} />
            <TextField label="Duration" placeholder="01:20" value={form.duration ?? ""} onChange={(v) => setForm((f) => ({ ...f, duration: v }))} />
            <TextField label="Client" value={form.client ?? ""} onChange={(v) => setForm((f) => ({ ...f, client: v }))} />
            <TextField label="Award (optional)" value={form.award ?? ""} onChange={(v) => setForm((f) => ({ ...f, award: v }))} />
          </div>
          <TextAreaField label="Description" value={form.description ?? ""} onChange={(v) => setForm((f) => ({ ...f, description: v }))} />
          <div className="flex gap-3 pt-2">
            <button
              onClick={save}
              disabled={saving || !form.title || !form.thumb_url}
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
        {items.map((film) => (
          <div key={film.id} className="flex items-center gap-4 rounded-md border border-pearl/10 p-3">
            <img src={film.thumb_url} alt={film.title} className="h-14 w-24 flex-shrink-0 rounded object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-body text-sm text-pearl">{film.title}</p>
              <p className="font-body text-xs text-pearl/50">
                {film.category} · {film.year}
              </p>
            </div>
            <button onClick={() => startEdit(film)} className="font-body text-xs text-pearl/70 underline">
              Edit
            </button>
            <button onClick={() => remove(film.id)} className="font-body text-xs text-red-300 underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
