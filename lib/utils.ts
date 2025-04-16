import { Camera } from "@/types/canvas";
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
    y: Math.round(ev.clientY) - camera.y
  };
};
