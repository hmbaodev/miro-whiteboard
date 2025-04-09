"use client";

import { useQuery } from "convex/react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Menu } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Hint from "@/components/hint";
import { useRenameModal } from "@/store/use-modal-rename";
import Actions from "@/components/actions";

interface InfoProps {
  boardId: string;
}

const poppins = Poppins({ subsets: ["latin"], weight: "600" });

const TabSeparator = () => {
  return <div className="px-1.5 text-neutral-300">|</div>;
};

const Info = ({ boardId }: InfoProps) => {
  const currentBoard = useQuery(api.board.getBoard, {
    id: boardId as Id<"boards">,
  });
  const { onOpen } = useRenameModal();

  if (!currentBoard) {
    return <InfoSkeleton />;
  }

  return (
    <div className="absolute top-2 left-2 flex h-12 items-center rounded-md bg-white px-1.5 shadow-md">
      <Hint label="Back to dashboard" side="bottom">
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image src="/moro-logo.svg" alt="Moro" width={40} height={40} />
            <span
              className={cn(
                "ml-2 text-xl font-semibold text-black",
                poppins.className,
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Rename" side="bottom" asChild={true}>
        <Button
          variant="board"
          className="cursor-pointer px-2 text-base font-normal"
          onClick={() => onOpen(currentBoard._id, currentBoard.title)}
        >
          {currentBoard.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions
        id={currentBoard._id}
        title={currentBoard.title}
        side="bottom"
        sideOffset={10}
      >
        <div>
          <Hint label="Main menu" side="bottom" asChild={true}>
            <Button variant="board" size="icon">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 flex h-12 w-[300px] items-center rounded-md bg-white px-1.5 shadow-md" />
  );
};

export default Info;
