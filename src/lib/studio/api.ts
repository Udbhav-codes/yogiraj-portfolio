import { supabase } from "../supabase";
import type {
  DbEquipmentGroup,
  DbFilm,
  DbGalleryImage,
  DbHeroImage,
  DbProfile,
  DbProject,
  DbReel,
  DbService,
  NewEquipmentGroup,
  NewFilm,
  NewGalleryImage,
  NewHeroImage,
  NewProject,
  NewReel,
  NewService,
} from "./types";

function requireClient() {
  if (!supabase) throw new Error("Supabase isn't configured.");
  return supabase;
}

async function listTable<T>(table: string): Promise<T[]> {
  const { data, error } = await requireClient()
    .from(table)
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as T[];
}

async function insertRow<TNew extends object, T>(table: string, row: TNew): Promise<T> {
  const { data, error } = await requireClient().from(table).insert(row as never).select().single();
  if (error) throw new Error(error.message);
  return data as T;
}

async function updateRow<TNew extends object, T>(table: string, id: string, row: Partial<TNew>): Promise<T> {
  const { data, error } = await requireClient().from(table).update(row as never).eq("id", id).select().single();
  if (error) throw new Error(error.message);
  return data as T;
}

async function deleteRow(table: string, id: string): Promise<void> {
  const { error } = await requireClient().from(table).delete().eq("id", id);
  if (error) throw new Error(error.message);
}

// ── Gallery ───────────────────────────────────────────────────────────────
export const listGalleryImages = () => listTable<DbGalleryImage>("gallery_images");
export const createGalleryImage = (row: NewGalleryImage) =>
  insertRow<NewGalleryImage, DbGalleryImage>("gallery_images", row);
export const updateGalleryImage = (id: string, row: Partial<NewGalleryImage>) =>
  updateRow<NewGalleryImage, DbGalleryImage>("gallery_images", id, row);
export const deleteGalleryImage = (id: string) => deleteRow("gallery_images", id);

// ── Hero images ───────────────────────────────────────────────────────────
export const listHeroImages = () => listTable<DbHeroImage>("hero_images");
export const createHeroImage = (row: NewHeroImage) => insertRow<NewHeroImage, DbHeroImage>("hero_images", row);
export const updateHeroImage = (id: string, row: Partial<NewHeroImage>) =>
  updateRow<NewHeroImage, DbHeroImage>("hero_images", id, row);
export const deleteHeroImage = (id: string) => deleteRow("hero_images", id);

// ── Films ─────────────────────────────────────────────────────────────────
export const listFilms = () => listTable<DbFilm>("films");
export const createFilm = (row: NewFilm) => insertRow<NewFilm, DbFilm>("films", row);
export const updateFilm = (id: string, row: Partial<NewFilm>) => updateRow<NewFilm, DbFilm>("films", id, row);
export const deleteFilm = (id: string) => deleteRow("films", id);

// ── Reels ─────────────────────────────────────────────────────────────────
export const listReels = () => listTable<DbReel>("reels");
export const createReel = (row: NewReel) => insertRow<NewReel, DbReel>("reels", row);
export const updateReel = (id: string, row: Partial<NewReel>) => updateRow<NewReel, DbReel>("reels", id, row);
export const deleteReel = (id: string) => deleteRow("reels", id);

// ── Projects ──────────────────────────────────────────────────────────────
export const listProjects = () => listTable<DbProject>("projects");
export const createProject = (row: NewProject) => insertRow<NewProject, DbProject>("projects", row);
export const updateProject = (id: string, row: Partial<NewProject>) =>
  updateRow<NewProject, DbProject>("projects", id, row);
export const deleteProject = (id: string) => deleteRow("projects", id);

// ── Services ──────────────────────────────────────────────────────────────
export const listServices = () => listTable<DbService>("services");
export const createService = (row: NewService) => insertRow<NewService, DbService>("services", row);
export const updateService = (id: string, row: Partial<NewService>) =>
  updateRow<NewService, DbService>("services", id, row);
export const deleteService = (id: string) => deleteRow("services", id);

// ── Equipment groups ──────────────────────────────────────────────────────
export const listEquipmentGroups = () => listTable<DbEquipmentGroup>("equipment_groups");
export const createEquipmentGroup = (row: NewEquipmentGroup) =>
  insertRow<NewEquipmentGroup, DbEquipmentGroup>("equipment_groups", row);
export const updateEquipmentGroup = (id: string, row: Partial<NewEquipmentGroup>) =>
  updateRow<NewEquipmentGroup, DbEquipmentGroup>("equipment_groups", id, row);
export const deleteEquipmentGroup = (id: string) => deleteRow("equipment_groups", id);

// ── Profile (singleton) ───────────────────────────────────────────────────
export async function getProfile(): Promise<DbProfile | null> {
  const { data, error } = await requireClient().from("profile").select("*").eq("id", 1).maybeSingle();
  if (error) throw new Error(error.message);
  return data as DbProfile | null;
}

export async function updateProfile(row: Partial<Omit<DbProfile, "id">>): Promise<DbProfile> {
  const { data, error } = await requireClient()
    .from("profile")
    .update(row)
    .eq("id", 1)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as DbProfile;
}

// ── Storage: image upload to the public "media" bucket ──────────────────────
export async function uploadMedia(file: File): Promise<string> {
  const client = requireClient();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await client.storage.from("media").upload(path, file, { upsert: false });
  if (error) throw new Error(error.message);
  const { data } = client.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
