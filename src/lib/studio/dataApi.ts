import { isSupabaseConfigured } from "../supabase";
import * as remote from "./api";
import * as local from "./localApi";

/**
 * Single entry point the admin panels import from. Routes every call to the
 * real Supabase-backed api.ts when configured, otherwise to the localStorage
 * mock in localApi.ts. Panels never need to know which one is active.
 */
const impl = isSupabaseConfigured ? remote : local;

export const listGalleryImages = impl.listGalleryImages;
export const createGalleryImage = impl.createGalleryImage;
export const updateGalleryImage = impl.updateGalleryImage;
export const deleteGalleryImage = impl.deleteGalleryImage;

export const listHeroImages = impl.listHeroImages;
export const createHeroImage = impl.createHeroImage;
export const updateHeroImage = impl.updateHeroImage;
export const deleteHeroImage = impl.deleteHeroImage;

export const listReels = impl.listReels;
export const createReel = impl.createReel;
export const updateReel = impl.updateReel;
export const deleteReel = impl.deleteReel;

export const listFilms = impl.listFilms;
export const createFilm = impl.createFilm;
export const updateFilm = impl.updateFilm;
export const deleteFilm = impl.deleteFilm;

export const listProjects = impl.listProjects;
export const createProject = impl.createProject;
export const updateProject = impl.updateProject;
export const deleteProject = impl.deleteProject;

export const listServices = impl.listServices;
export const createService = impl.createService;
export const updateService = impl.updateService;
export const deleteService = impl.deleteService;

export const listEquipmentGroups = impl.listEquipmentGroups;
export const createEquipmentGroup = impl.createEquipmentGroup;
export const updateEquipmentGroup = impl.updateEquipmentGroup;
export const deleteEquipmentGroup = impl.deleteEquipmentGroup;

export const getProfile = impl.getProfile;
export const updateProfile = impl.updateProfile;

export const uploadMedia = impl.uploadMedia;
