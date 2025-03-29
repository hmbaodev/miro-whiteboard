"use client";

import React from "react";
import { EmptySearch } from "./empty-search";
import EmptyFavorite from "./empty-favorites";
import EmptyBoards from "./empty-boards";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = []; // TODO: Change to API call

  if (!data?.length && query.search) {
    return <EmptySearch /> 
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorite/> 
  }

  if (!data?.length) {
    return <EmptyBoards />
  }

  return <div>BoardList</div>;
};

export default BoardList;
