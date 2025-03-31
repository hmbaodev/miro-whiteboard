"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.createBoard);

  const onClick = () => {
    mutate({
      orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("🎉 Board created! 🎉");
        // TODO: Redirect to /board/{id}
        console.log(id);
      })
      .catch((error) => {
        toast.error("Fail to create board");
        console.error(error);
      });
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 flex aspect-[100/127] cursor-pointer flex-col items-center justify-center rounded-lg bg-blue-600 py-6 hover:bg-blue-800",
        (pending || disabled) && "opacity-75 hover:bg-blue-600 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="size-12 stroke-1 text-white" />
      <p className="text-sm font-light text-white">New Board</p>
    </button>
  );
};

export default NewBoardButton;
