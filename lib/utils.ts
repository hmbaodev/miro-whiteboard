import { Camera, Color } from "@/types/canvas";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const COLORS = ["#dc2626", "#d97706", "#059669", "#7c3aed", "#db2777"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length];
}

export const pointerEventToCanvasPoint = (
  ev: React.PointerEvent,
  camera: Camera,
) => {
  return {
    x: Math.round(ev.clientX) - camera.x,
    y: Math.round(ev.clientY) - camera.y,
  };
};

export const colorToCss = (color: Color) => {
  // Turn RGB color to CSS hex color
  return `#${color.r.toString(16).padStart(2, "0")}${color.g.toString(16).padStart(2, "0")}${color.b.toString(16).padStart(2, "0")}`;
};
