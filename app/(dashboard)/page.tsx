"use client";

import { useOrganization } from "@clerk/nextjs";

import EmptyOrg from "./_components/empty-org";
import BoardsList from "./_components/boards-list";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization();

  return (
    <div className="h-[calc(100%-80px)] flex-1 p-6">
      {organization ? (
        <BoardsList orgId={organization.id} query={searchParams} />
      ) : (
        <EmptyOrg />
      )}
    </div>
  );
};

export default DashboardPage;
