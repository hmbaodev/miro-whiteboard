"use client";

import { memo } from "react";
import { useStorage } from "@liveblocks/react";

import { LayerType } from "@/types/canvas";
import Rectangle from "./rectangle";

interface LayerPreviewProps {
  id: string;
  onLayerPointerDown: (ev: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

const LayerPreview = memo(
  ({ id, onLayerPointerDown, selectionColor }: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));

    // console.log({ layer }, "LAYER_PREVIEW");

    if (!layer) {
      return null;
    }

    // console.log(layer.type, "LAYER_PREVIEW_TYPE");

    switch (layer.type) {
      case LayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      default:
        console.warn("Layer type not supported", layer);
        return null;
    }
  },
);

LayerPreview.displayName = "LayerPreview";

export default LayerPreview;
