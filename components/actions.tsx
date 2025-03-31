"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";
import { Link2, Pencil, Trash2 } from "lucide-react";

import ConfirmModal from "./modals/confirm-modal";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useRenameModal } from "@/store/use-modal-rename";

interface ActionsProps {
  children: React.ReactNode;
  id: string;
  title: string;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
}

const Actions = ({ children, id, title, side, sideOffset }: ActionsProps) => {
  const { onOpen } = useRenameModal();
  const { mutate, pending } = useApiMutation(api.board.removeBoard);

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("🔗 Link copied! 🔗"))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => toast.error("😢 Fail to copy link! 😢"));
  };

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("🗑️ Board deleted! 🗑️"))
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .catch((error) => toast.error("☹️ Failed to delete board ☹️"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(ev) => ev.stopPropagation}
        side={side}
        sideOffset={sideOffset}
        className="z-10 w-56 border bg-white"
      >
        <DropdownMenuItem className="cursor-pointer p-3" onClick={onCopyLink}>
          <Link2 className="size-4" />
          <span>Copy board link</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer p-3"
          onClick={() => onOpen(id, title)}
        >
          <Pencil className="size-4" />
          <span>Rename</span>
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete board?"
          description="This will delete the board and all of its content."
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="w-full cursor-pointer justify-start p-3 text-sm font-normal"
          >
            <Trash2 className="size-4" />
            <span>Delete</span>
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
