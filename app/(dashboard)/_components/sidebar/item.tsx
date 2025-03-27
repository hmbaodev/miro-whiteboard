"use client";

import Image from "next/image";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="relative aspect-square">
      <Image
        src={imageUrl}
        alt={name}
        fill
        onClick={onClick}
        className={cn(
          "cursor-pointer rounded-md opacity-75 transition hover:opacity-100",
          isActive && "opacity-100",
        )}
      />
    </div>
  );
};

export default Item;
