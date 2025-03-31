"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { EmptySearch } from "./empty-search";
import EmptyFavorite from "./empty-favorites";
import EmptyBoards from "./empty-boards";
import BoardCard from "./board-card";
import NewBoardButton from "./new-board-button";
import { Skeleton } from "@/components/ui/skeleton";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.getBoards, { orgId });
  const skeletons = 5;

  /* 
    If the literal value of data is undefined (or null), convex will return null. 
    So in this case, data is undefine that means data is not completely loaded 
  */
  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <NewBoardButton orgId={orgId} disabled />
          {Array(skeletons)
            .fill(null)
            .map((_, i) => (
              <BoardCard.Skeleton key={i} />
            ))}
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorite />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-5 pb-10 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        <NewBoardButton orgId={orgId} />
        {data.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={true}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
