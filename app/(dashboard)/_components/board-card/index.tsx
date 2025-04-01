"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import Overlay from "./overlay";
import Footer from "./footer";
import Actions from "@/components/actions";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favoriteBoard,
  );
  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavoriteBoard,
  );

  // const handleFavorite = useMutation(api.board.favoriteBoard);
  // const handleUnfavorite = useMutation(api.board.unfavoriteBoard);

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id })
        .then(() => toast.success("🥳 Unfavorite board completed! 🥳"))
        .catch(() => toast.error("☹️ Fail to unfavorite board! ☹️"));
    } else {
      onFavorite({ id, orgId })
        .then(() => toast.success("🥳 Favorite board completed! 🥳"))
        .catch(() => toast.error("☹️ Fail to favorite board! ☹️"));
    }
  };

  return (
    <div className="group flex aspect-[100/127] flex-col justify-between overflow-hidden rounded-lg border">
      <div className="relative flex-1 bg-amber-50">
        <Link href={`/boards/${id}`}>
          <Image src={imageUrl} alt={title} className="object-fit" fill />
          <Overlay />
        </Link>
        <Actions id={id} title={title} side="right">
          <button className="absolute top-1 right-1 cursor-pointer px-3 py-2 opacity-0 transition-opacity outline-none group-hover:opacity-100">
            <MoreHorizontal className="text-white opacity-75 transition-opacity hover:opacity-100" />
          </button>
        </Actions>
      </div>
      <Footer
        title={title}
        authorLabel={authorLabel}
        createdAtLabel={createdAtLabel}
        isFavorite={isFavorite}
        onClick={toggleFavorite}
        disabled={pendingFavorite || pendingUnfavorite}
      />
    </div>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="aspect-[100/127] overflow-hidden rounded-lg">
      <Skeleton className="h-full w-full" />
    </div>
  );
};

export default BoardCard;
