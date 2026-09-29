import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import * as localStore from "../lib/studio/localApi";
import type {
  DbEquipmentGroup,
  DbFilm,
  DbGalleryImage,
  DbHeroImage,
  DbProfile,
  DbProject,
  DbService,
} from "../lib/studio/types";
import {
  equipment as staticEquipment,
  films as staticFilms,
  gallery as staticGallery,
  heroImages as staticHeroImages,
  profile as staticProfile,
  projects as staticProjects,
  services as staticServices,
  type Film,
  type GalleryCategory,
  type GalleryImage,
  type Project,
} from "./content";

/**
 * Reads live content for the public site. Prefers Supabase when configured;
 * otherwise reads the same localStorage-backed store the admin panel writes
 * to (see lib/studio/localApi.ts), so edits made in /studio show up here
 * immediately — falls back to the static content.ts data only if neither
 * source has anything yet.
 */
function useLiveTable<TRow, TShape>(
  table: string,
  mapRow: (row: TRow) => TShape,
  fallback: TShape[],
  fetchLocal: () => Promise<TRow[]>
) {
  const [data, setData] = useState<TShape[]>(fallback);

  useEffect(() => {
    let cancelled = false;

    const loadLocal = () => {
      fetchLocal().then((rows) => {
        if (!cancelled && rows.length > 0) setData(rows.map(mapRow));
      });
    };

    if (isSupabaseConfigured && supabase) {
      supabase
        .from(table)
        .select("*")
        .order("sort_order", { ascending: true })
        .then(({ data: rows, error }) => {
          if (cancelled || error || !rows || rows.length === 0) return;
          setData((rows as TRow[]).map(mapRow));
        });
      return () => {
        cancelled = true;
      };
    }

    loadLocal();
    window.addEventListener("studio-local-change", loadLocal);
    return () => {
      cancelled = true;
      window.removeEventListener("studio-local-change", loadLocal);
    };
  }, [table]);

  return data;
}

export function useGallery(): GalleryImage[] {
  return useLiveTable<DbGalleryImage, GalleryImage>(
    "gallery_images",
    (row) => ({
      id: row.id,
      category: row.category as GalleryCategory,
      title: row.title,
      img: row.image_url,
      w: row.width,
      h: row.height,
      meta: {
        camera: row.camera ?? "",
        lens: row.lens ?? "",
        location: row.location ?? "",
        year: row.year ?? "",
      },
    }),
    staticGallery,
    localStore.listGalleryImages
  );
}

export function useHeroImages(): string[] {
  return useLiveTable<DbHeroImage, string>(
    "hero_images",
    (row) => row.image_url,
    staticHeroImages,
    localStore.listHeroImages
  );
}

export function useFilms(): Film[] {
  return useLiveTable<DbFilm, Film>(
    "films",
    (row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      duration: row.duration ?? "",
      year: row.year ?? "",
      client: row.client ?? undefined,
      thumb: row.thumb_url,
      description: row.description ?? "",
      award: row.award ?? undefined,
      videoUrl: row.video_url ?? undefined,
    }),
    staticFilms,
    localStore.listFilms
  );
}

export function useProjects(): Project[] {
  return useLiveTable<DbProject, Project>(
    "projects",
    (row) => ({
      id: row.id,
      title: row.title,
      client: row.client ?? "",
      year: row.year ?? "",
      category: row.category ?? "",
      cover: row.cover_url,
      challenge: row.challenge ?? "",
      process: row.process ?? "",
      result: row.result ?? "",
      gallery: row.gallery_urls ?? [],
    }),
    staticProjects,
    localStore.listProjects
  );
}

export function useServices() {
  return useLiveTable<DbService, (typeof staticServices)[number]>(
    "services",
    (row) => ({
      title: row.title,
      desc: row.description,
      deliverables: row.deliverables ?? "",
      timeline: row.timeline ?? "",
    }),
    staticServices,
    localStore.listServices
  );
}

export function useEquipment() {
  return useLiveTable<DbEquipmentGroup, (typeof staticEquipment)[number]>(
    "equipment_groups",
    (row) => ({ category: row.category, items: row.items }),
    staticEquipment,
    localStore.listEquipmentGroups
  );
}

export function useProfile(): typeof staticProfile {
  const [data, setData] = useState(staticProfile);

  useEffect(() => {
    let cancelled = false;

    const applyRow = (r: DbProfile) => {
      if (cancelled) return;
      setData({
        name: r.name,
        title: r.title,
        location: r.location,
        email: r.email,
        phone: r.phone,
        address: r.address,
        behance: staticProfile.behance,
        tagline: r.tagline,
        subTagline: r.sub_tagline,
        bio: r.bio,
        expertise: r.expertise,
        tools: r.tools,
      });
    };

    if (isSupabaseConfigured && supabase) {
      supabase
        .from("profile")
        .select("*")
        .eq("id", 1)
        .maybeSingle()
        .then(({ data: row, error }) => {
          if (error || !row) return;
          applyRow(row as DbProfile);
        });
      return () => {
        cancelled = true;
      };
    }

    const loadLocal = () => localStore.getProfile().then((row) => row && applyRow(row));
    loadLocal();
    window.addEventListener("studio-local-change", loadLocal);
    return () => {
      cancelled = true;
      window.removeEventListener("studio-local-change", loadLocal);
    };
  }, []);

  return data;
}
