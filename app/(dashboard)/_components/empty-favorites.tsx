import Image from "next/image";

export const EmptyFavorite = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src="/empty-favourites.svg" height={140} width={140} alt="Empty" />
      <h2 className="mt-6 text-2xl font-semibold">No favorite boards</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Try favorite a board
      </p>
    </div>
  );
};

export default EmptyFavorite