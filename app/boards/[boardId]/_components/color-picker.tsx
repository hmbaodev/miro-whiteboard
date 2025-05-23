"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}

const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="mr-2 flex max-w-[164px] flex-wrap items-center gap-2 border-r border-neutral-200 pr-2">
      <ColorButton color={{ r: 243, g: 82, b: 35 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 249, b: 177 }} onClick={onChange} />
      <ColorButton color={{ r: 68, g: 202, b: 99 }} onClick={onChange} />
      <ColorButton color={{ r: 39, g: 142, b: 237 }} onClick={onChange} />
      <ColorButton color={{ r: 155, g: 105, b: 245 }} onClick={onChange} />
      <ColorButton color={{ r: 252, g: 142, b: 42 }} onClick={onChange} />
      <ColorButton color={{ r: 0, g: 0, b: 0 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 255, b: 255 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 99, b: 132 }} onClick={onChange} />
      <ColorButton color={{ r: 54, g: 162, b: 235 }} onClick={onChange} />
      <ColorButton color={{ r: 75, g: 192, b: 192 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 206, b: 86 }} onClick={onChange} />
      <ColorButton color={{ r: 153, g: 102, b: 255 }} onClick={onChange} />
      <ColorButton color={{ r: 201, g: 203, b: 207 }} onClick={onChange} />
      <ColorButton color={{ r: 255, g: 159, b: 64 }} onClick={onChange} />
    </div>
  );
};

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      className="flex size-6 items-center justify-center transition hover:opacity-75"
      onClick={() => onClick(color)}
    >
      <div
        className="size-full rounded-md border border-neutral-300"
        style={{ background: colorToCss(color) }}
      />
    </button>
  );
};

export default ColorPicker;
