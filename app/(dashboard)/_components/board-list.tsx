"use client";

import React from "react";

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
    return <div>Try searching for something else</div>;
  }

  if (!data?.length && query.favorites) {
    return <div>No favorite</div>;
  }

  if (!data?.length) {
    return <div>No board at all</div>;
  }

  return <div>BoardList</div>;
};

export default BoardList;
