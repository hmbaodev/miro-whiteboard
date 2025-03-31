"use client";

import {
  DropdownMenuContentProps,
} from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Link2 } from "lucide-react";

interface ActionsProps {
  children: React.ReactNode;
  id: string;
  title: string;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
}

const Actions = ({ children, id, title, side, sideOffset }: ActionsProps) => {
  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("🔗 Link copied! 🔗"))
      .catch((error) => toast.error("😢 Fail to copy link! 😢"));
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(ev) => ev.stopPropagation}
        side={side}
        sideOffset={sideOffset}
        className="z-10 w-56 border bg-white"
      >
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 p-3" onClick={onCopyLink}>
          <Link2 className="size-4" />
          <span>Copy board link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
