import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Camera, Color, Point, Side, XYWH } from "@/types/canvas";

const COLORS = ["#dc2626", "#d97706", "#059669", "#7c3aed", "#db2777"];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const connectionIdToColor = (connectionId: number): string => {
  return COLORS[connectionId % COLORS.length];
};

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

export function resizeBounds(bounds: XYWH, corner: Side, point: Point): XYWH {
  const result = {
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height,
  };

  if ((corner & Side.Left) === Side.Left) {
    result.x = Math.min(point.x, bounds.x + bounds.width);
    result.width = Math.abs(bounds.x + bounds.width - point.x);
  }

  if ((corner & Side.Right) === Side.Right) {
    result.x = Math.min(point.x, bounds.x);
    result.width = Math.abs(point.x - bounds.x);
  }

  if ((corner & Side.Top) === Side.Top) {
    result.y = Math.min(point.y, bounds.y + bounds.height);
    result.height = Math.abs(bounds.y + bounds.height - point.y);
  }

  if ((corner & Side.Bottom) === Side.Bottom) {
    result.y = Math.min(point.y, bounds.y);
    result.height = Math.abs(point.y - bounds.y);
  }

  return result;
}
