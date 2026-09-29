import { useEffect, useState } from "react";
import {
  createHeroImage,
  deleteHeroImage,
  listGalleryImages,
  listHeroImages,
  updateHeroImage,
} from "../../../lib/studio/dataApi";
import type { DbGalleryImage, DbHeroImage } from "../../../lib/studio/types";

export default function HeroPanel() {
  const [heroItems, setHeroItems] = useState<DbHeroImage[]>([]);
  const [galleryItems, setGalleryItems] = useState<DbGalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    Promise.all([listHeroImages(), listGalleryImages()])
      .then(([hero, gallery]) => {
        setHeroItems([...hero].sort((a, b) => a.sort_order - b.sort_order));
        setGalleryItems(gallery);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const selectedUrls = new Set(heroItems.map((h) => h.image_url));

  const add = async (img: DbGalleryImage) => {
    setBusyId(img.id);
    setError(null);
    try {
      await createHeroImage({ image_url: img.image_url, sort_order: heroItems.length });
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not add image");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (item: DbHeroImage) => {
    setBusyId(item.id);
    setError(null);
    try {
      await deleteHeroImage(item.id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not remove image");
    } finally {
      setBusyId(null);
    }
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= heroItems.length) return;
    const a = heroItems[index];
    const b = heroItems[target];
    setBusyId(a.id);
    setError(null);
    try {
      await Promise.all([
        updateHeroImage(a.id, { sort_order: b.sort_order }),
        updateHeroImage(b.id, { sort_order: a.sort_order }),
      ]);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reorder");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <p className="font-body text-sm text-pearl/50">Loading…</p>;

  return (
    <div className="space-y-10">
      {error && <p className="font-body text-xs text-red-300">{error}</p>}

      <div>
        <p className="font-display text-lg text-pearl">Selected for Hero ({heroItems.length})</p>
        <p className="mt-1 font-body text-xs text-pearl/50">
          These photos appear in the scrolling hero gallery, in this order.
        </p>

        {heroItems.length === 0 ? (
          <p className="mt-4 font-body text-sm text-pearl/40">
            No photos selected yet — add some from the gallery below.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {heroItems.map((item, i) => (
              <div key={item.id} className="group relative overflow-hidden rounded-md border border-pearl/10">
                <img src={item.image_url} alt="" className="aspect-[4/5] w-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-between bg-midnight/0 p-2 opacity-0 transition-opacity group-hover:bg-midnight/70 group-hover:opacity-100">
                  <p className="font-body text-[10px] uppercase tracking-wide text-ocean">#{i + 1}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <button
                        onClick={() => move(i, -1)}
                        disabled={i === 0 || busyId === item.id}
                        className="text-[11px] text-pearl underline disabled:opacity-30"
                      >
                        Up
                      </button>
                      <button
                        onClick={() => move(i, 1)}
                        disabled={i === heroItems.length - 1 || busyId === item.id}
                        className="text-[11px] text-pearl underline disabled:opacity-30"
                      >
                        Down
                      </button>
                    </div>
                    <button
                      onClick={() => remove(item)}
                      disabled={busyId === item.id}
                      className="text-[11px] text-red-300 underline disabled:opacity-30"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="font-display text-lg text-pearl">All Photos ({galleryItems.length})</p>
        <p className="mt-1 font-body text-xs text-pearl/50">
          Pick any photo from the gallery to feature in the hero scroll.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {galleryItems.map((img) => {
            const added = selectedUrls.has(img.image_url);
            return (
              <div key={img.id} className="group relative overflow-hidden rounded-md border border-pearl/10">
                <img src={img.image_url} alt={img.title} className="aspect-[4/5] w-full object-cover" />
                <div className="absolute inset-0 flex flex-col justify-between bg-midnight/0 p-2 opacity-0 transition-opacity group-hover:bg-midnight/70 group-hover:opacity-100">
                  <p className="font-body text-[10px] uppercase tracking-wide text-ocean">{img.category}</p>
                  <p className="font-body text-xs text-pearl">{img.title}</p>
                  <button
                    onClick={() => add(img)}
                    disabled={added || busyId === img.id}
                    className="self-start text-[11px] text-pearl underline disabled:text-pearl/40"
                  >
                    {added ? "Added" : "Add to Hero"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
