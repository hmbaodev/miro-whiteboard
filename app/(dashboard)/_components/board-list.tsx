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
  const { search } = query;

  const data = []; // TODO: Change to API call

  if (!data?.length && search) {
    return <div>Try searching for something else</div>;
  }

  return <div>BoardList</div>;
};

export default BoardList;
