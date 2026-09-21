import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import GalleryPanel from "./panels/GalleryPanel";
import FilmsPanel from "./panels/FilmsPanel";
import ProjectsPanel from "./panels/ProjectsPanel";
import ServicesPanel from "./panels/ServicesPanel";
import EquipmentPanel from "./panels/EquipmentPanel";
import ProfilePanel from "./panels/ProfilePanel";

const TABS = [
  { key: "gallery", label: "Gallery", panel: GalleryPanel },
  { key: "films", label: "Films", panel: FilmsPanel },
  { key: "projects", label: "Projects", panel: ProjectsPanel },
  { key: "services", label: "Services", panel: ServicesPanel },
  { key: "equipment", label: "BTS Kit", panel: EquipmentPanel },
  { key: "profile", label: "Profile", panel: ProfilePanel },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export default function StudioDashboard() {
  const { user, signOut } = useAuth();
  const [active, setActive] = useState<TabKey>("gallery");

  const ActivePanel = TABS.find((t) => t.key === active)?.panel ?? GalleryPanel;

  return (
    <div className="min-h-screen bg-midnight">
      <div className="flex items-center justify-between border-b border-pearl/10 px-6 py-5 sm:px-10">
        <div>
          <p className="font-display text-xl tracking-[0.15em] text-pearl">STUDIO</p>
          <p className="mt-1 font-body text-xs text-pearl/50">{user?.email}</p>
        </div>
        <button
          onClick={signOut}
          className="rounded-full border border-pearl/20 px-4 py-2 font-body text-xs uppercase tracking-[0.1em] text-pearl/70 transition-colors hover:border-ocean hover:text-ocean"
        >
          Sign Out
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-pearl/10 px-6 py-3 sm:px-10">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`flex-shrink-0 rounded-full px-4 py-2 font-body text-xs uppercase tracking-[0.1em] transition-colors ${
              active === t.key ? "bg-ocean text-midnight" : "text-pearl/60 hover:text-pearl"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="px-6 py-8 sm:px-10">
        <ActivePanel />
      </div>
    </div>
  );
}
