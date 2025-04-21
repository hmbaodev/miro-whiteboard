"use client";

import { memo } from "react";
import { useMutation, useSelf } from "@liveblocks/react";
import { Trash2, BringToFront, SendToBack } from "lucide-react";

import { Camera, Color } from "@/types/canvas";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";
import ColorPicker from "./color-picker";
import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useDeleteLayers } from "@/hooks/use-delete-layers";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const deleteLayers = useDeleteLayers();

    const selectionBounds = useSelectionBounds();

    const sendToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];

        const arr = liveLayerIds.toArray();

        for (let i = 0; i < arr.length; i++) {
          console.log(arr[i], i);
          if (selection?.includes(arr[i])) {
            indices.push(i);
          }
        }

        for (let i = 0; i < indices.length; i++) {
          console.log(indices[i], i);
          liveLayerIds.move(indices[i], i);
        }
      },
      [selection],
    );

    const bringToFront = useMutation(({storage}) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toArray();

      for (let i = 0; i < arr.length; i++) {
        if (selection?.includes(arr[i])) {
          indices.push(i);
        }
      }

      for (let i = 0; i < indices.length; i++) {
        liveLayerIds.move(indices[i], arr.length - 1 - i);
      }
    }, [selection]) 

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection?.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor],
    );

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
        <div className="flex flex-col gap-y-0.5">
          <Hint label="Bring to front" asChild>
            <Button variant="board" size="icon" onClick={bringToFront}>
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Send to back" side="bottom" asChild>
            <Button variant="board" size="icon" onClick={sendToBack}>
              <SendToBack />
            </Button>
          </Hint>
        </div>
        <div className="ml-2 flex items-center border-l border-neutral-200 pl-2">
          <Hint label="Delete" asChild>
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  },
);

SelectionTools.displayName = "SelectionTools";

export default SelectionTools;
