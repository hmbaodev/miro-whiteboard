const Info = () => {
  return (
    <div className="absolute top-2 left-2 flex h-12 items-center rounded-md bg-white px-1.5 shadow-md">
      {/* TODO: Add information about the opening board */}
      Info
    </div>
  );
};

Info.Skeleton = function InfoSkeleton() {
  return (
    <div className="absolute top-2 left-2 flex h-12 w-[300px] items-center rounded-md bg-white px-1.5 shadow-md" />
  );
};

export default Info;
