"use client";

import { useOrganizationList } from "@clerk/nextjs";
import Item from "./item";

const List = () => {
  // Aggregate pages in order to render an infinite list
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  console.log(userMemberships);

  if (!userMemberships.data?.length) return null;

  return (
    <ul className="space-y-4">
      {userMemberships.data?.map((mem) => (
        <Item
          key={mem.organization.id}
          id={mem.organization.id}
          imageUrl={mem.organization.imageUrl}
          name={mem.organization.name}
        />
      ))}
    </ul>
  );
};

export default List;
