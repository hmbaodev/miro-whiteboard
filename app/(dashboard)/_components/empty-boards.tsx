import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.createBoard);
  const router = useRouter();

  const onClick = () => {
    if (!organization) return;

    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("🎉 Board created! 🎉");
        router.push(`/boards/${id}`);
      })
      .catch(() => {
        toast.error("☹️ Fail to create board! ☹️");
      });
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src="/note.svg" height={140} width={140} alt="Empty" />
      <h2 className="mt-6 text-2xl font-semibold">Create your first board</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size="lg" onClick={onClick} disabled={pending}>
          Create a board
        </Button>
      </div>
    </div>
  );
};

export default EmptyBoards;
