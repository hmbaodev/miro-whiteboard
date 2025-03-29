import { Button } from "@/components/ui/button";
import Image from "next/image";

const EmptyBoards = () => {
  return (
      <div className="flex h-full flex-col items-center justify-center">
        <Image src="/note.svg" height={140} width={140} alt="Empty" />
        <h2 className="mt-6 text-2xl font-semibold">Create your first board</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Start by creating a board for your organization
        </p>
        <div className="mt-6">
          <Button size="lg">Create a board</Button>
        </div>
      </div>
    );
}

export default EmptyBoards