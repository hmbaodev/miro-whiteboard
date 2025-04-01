import { Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (ev) => {
    ev.stopPropagation();
    ev.preventDefault();

    onClick();
  };

  return (
    <div className="relative bg-white p-3">
      <p className="max-w-[calc(100%-20px)] truncate text-[13px]">{title}</p>
      <p className="text-muted-foreground truncate text-[11px] opacity-0 transition-opacity group-hover:opacity-100">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "text-muted-foreground absolute top-3 right-3 opacity-0 transition group-hover:opacity-100 hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-75",
        )}
      >
        <Star
          className={cn("size-4", isFavorite && "fill-blue-600 text-blue-600")}
        />
      </button>
    </div>
  );
};

export default Footer;
