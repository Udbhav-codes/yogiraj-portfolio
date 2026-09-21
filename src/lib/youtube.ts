/** Extracts the 11-char video ID from any common YouTube URL shape, or null if it doesn't match. */
export function extractYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

/** Extracts a playlist ID from a `?list=` param, or null if there isn't one. */
export function extractYouTubePlaylistId(url: string): string | null {
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

export function youtubeThumbnailUrl(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube.com/embed/${id}`;
}

/** Embed URL for an entire playlist — plays as a series with YouTube's own up-next UI. */
export function youtubePlaylistEmbedUrl(playlistId: string): string {
  return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
}

export function isYouTubeEmbedUrl(url: string): boolean {
  return url.includes("youtube.com/embed/");
}
