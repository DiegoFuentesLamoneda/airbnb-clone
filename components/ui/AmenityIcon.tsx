import type { AmenityIconName } from "@/types";

/** Mismo criterio que `CategoryIcon`: los trazados son datos, no JSX. */
const PATHS: Record<AmenityIconName, string> = {
  wifi: "M2 8.5a16 16 0 0120 0M5 12a11 11 0 0114 0M8.5 15.5a5 5 0 017 0M12 19h.01",
  kitchen: "M7 3v7a2 2 0 004 0V3M9 10v11M17 3c-1.5 2-2.5 4-2.5 6.5h5C19.5 7 18.5 5 17 3zM17 9.5V21",
  parking: "M4 4h16v16H4zM10 16V8h3a2.5 2.5 0 010 5h-3",
  pool: "M6 4v10M10 4v10M6 8h4M2 18c2 0 2 1.5 4 1.5s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5",
  ac: "M3 5h18v8H3zM6 9h12M6.5 16.5c1 0 1.5 1 1.5 2M12 16.5c1 0 1.5 1 1.5 2M17.5 16.5c1 0 1.5 1 1.5 2",
  tv: "M3 5h18v11H3zM8 20h8M12 16v4",
  washer: "M4 3h16v18H4zM12 9.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7M8 6h.01M11 6h.01",
  workspace: "M4 6h16v9H4zM2 18h20M9.5 15h5",
};

interface AmenityIconProps {
  name: AmenityIconName;
  className?: string;
}

const AmenityIcon = ({ name, className = "h-6 w-6" }: AmenityIconProps) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={PATHS[name]} />
  </svg>
);

export default AmenityIcon;
