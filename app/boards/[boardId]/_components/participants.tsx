import { Skeleton } from "@/components/ui/skeleton";

const Participants = () => {
  return (
    <div className="absolute top-2 right-2 flex h-12 items-center rounded-md bg-white p-3 shadow-md">
      Participants
    </div>
  );
};

Participants.Skeleton = function ParticipantsSkeleton() {
  return (
    <div className="absolute top-2 right-2 flex h-12 items-center rounded-md bg-white p-3 shadow-md">
      <Skeleton className="size-full" />
    </div>
  );
}

export default Participants;
