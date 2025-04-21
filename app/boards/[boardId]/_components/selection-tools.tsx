"use client";

import { memo } from "react";
import { useMutation, useSelf } from "@liveblocks/react";

import { Camera, Color } from "@/types/canvas";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import ColorPicker from "./color-picker";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const selectionBounds = useSelectionBounds();

    const setFill = useMutation(({ storage }, fill: Color) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);

      selection?.forEach((id) => {
        liveLayers.get(id)?.set("fill", fill);
      });
    }, [selection, setLastUsedColor]);

    if (!selectionBounds) return null;

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute flex rounded-xl border bg-white p-3 shadow-sm select-none"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker onChange={setFill} />
      </div>
    );
  },
);

SelectionTools.displayName = "SelectionTools";

export default SelectionTools;
