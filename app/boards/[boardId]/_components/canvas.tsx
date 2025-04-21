"use client";

import { useState, useCallback, useMemo } from "react";
import { nanoid } from "nanoid";
import {
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
  useStorage,
  useOthersMapped,
} from "@liveblocks/react";
import { LiveObject } from "@liveblocks/node";

import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
  Side,
  XYWH,
} from "@/types/canvas";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import CursorsPresence from "./cursors-presence";
import LayerPreview from "./layer-preview";
import SelectionBox from "./selection-box";
import {
  connectionIdToColor,
  pointerEventToCanvasPoint,
  resizeBounds,
} from "@/lib/utils";

const MAX_LAYERS = 100;

interface CanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 255,
    g: 255,
    b: 255,
  });

  /** ON WHEEL */
  const onWheel = useCallback((ev: React.WheelEvent) => {
    setCamera({
      x: camera.x - ev.deltaX,
      y: camera.y - ev.deltaY,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  /** RESIZING LAYER */
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: Point) => {
      if (canvasState.mode !== CanvasMode.Resizing) return;

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point,
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      layer?.update(bounds);
    },
    [canvasState],
  );

  /** INSERT LAYER */
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Rectangle
        | LayerType.Text,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor],
  );

  /** RESIZING HANDLER */
  const onResizeHandlePointerDown = useCallback(
    (corner: Side, initialBounds: XYWH) => {
      console.log({ corner, initialBounds });
      history.pause();
      setCanvasState({
        mode: CanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history],
  );

  /** POINTER MOVE HANDLER */
  const onPointerMove = useMutation(
    ({ setMyPresence }, ev: React.PointerEvent) => {
      ev.preventDefault();

      const current = pointerEventToCanvasPoint(ev, camera);

      if (canvasState.mode === CanvasMode.Resizing) {
        resizeSelectedLayer(current);
      }

      setMyPresence({ cursor: current });
    },
    [canvasState, resizeSelectedLayer],
  );

  /** POINTER LEAVE HANDLER */
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  /** POINTER UP HANDLER */
  const onPointerUp = useMutation(
    ({}, ev: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(ev, camera);

      // console.log({
      //   point,
      //   mode: canvasState.mode,
      // });

      if (canvasState.mode === CanvasMode.Inserting) {
        if (
          canvasState.layerType === LayerType.Ellipse ||
          canvasState.layerType === LayerType.Rectangle ||
          canvasState.layerType === LayerType.Text ||
          canvasState.layerType === LayerType.Note
        ) {
          insertLayer(canvasState.layerType, point);
        }
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer, setCanvasState],
  );

  /** LAYER POINTER DOWN HANDLER */
  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, ev: React.PointerEvent, layerId: string) => {
      if (
        canvasState.mode === CanvasMode.Pencil ||
        canvasState.mode === CanvasMode.Inserting
      ) {
        return;
      }

      history.pause(); // when user clicks on a layer, we pause the history because there is still no action yet
      ev.stopPropagation();

      const point = pointerEventToCanvasPoint(ev, camera);

      if (!self.presence.selection.includes(layerId)) {
        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }

      setCanvasState({ mode: CanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode],
  );

  /** SET STROKE COLOR FOR SELECTED LAYER */
  const selections = useOthersMapped((other) => other.presence.selection);
  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = connectionIdToColor(connectionId);
      }
    }
    return layerIdsToColorSelection;
  }, [selections]);

  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className="h-screen w-screen"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds?.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizeHandlePointerDown={onResizeHandlePointerDown} />
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
