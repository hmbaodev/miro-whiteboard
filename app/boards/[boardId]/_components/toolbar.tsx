import {
  Circle,
  Pencil,
  MousePointer2,
  Square,
  StickyNote,
  Type,
  Undo2,
  Redo2,
} from "lucide-react";

import ToolButton from "./tool-button";

const Toolbar = () => {
  return (
    <div className="absolute top-[50%] left-2 flex -translate-y-[50%] flex-col gap-y-4">
      <div className="flex flex-col items-center gap-y-1 rounded-md bg-white p-1.5 shadow-md">
        <ToolButton
          label="Select"
          icon={MousePointer2}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Text"
          icon={Type}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Sticky Note"
          icon={StickyNote}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Rectangle"
          icon={Square}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Ellipse"
          icon={Circle}
          onClick={() => {}}
          isActive={false}
        />
        <ToolButton
          label="Pen"
          icon={Pencil}
          onClick={() => {}}
          isActive={false}
        />
      </div>
      <div className="flex flex-col items-center rounded-md bg-white p-1.5 shadow-md">
        <ToolButton
          label="Undo"
          icon={Undo2}
          onClick={() => {}}
          isActive={true}
        />
        <ToolButton
          label="Redo"
          icon={Redo2}
          onClick={() => {}}
          isActive={true}
        />
      </div>
    </div>
  );
};

export const ToolbarSkeleton = () => {
  return (
    <div className="absolute top-[50%] left-2 flex h-[360px] w-[52px] -translate-y-[50%] flex-col gap-y-4 rounded-md bg-white shadow-md" />
  );
};

export default Toolbar;
