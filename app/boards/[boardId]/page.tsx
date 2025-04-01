import Room from "@/components/room";
import Canvas from "./_components/canvas";
import CanvasLoading from "./_components/canvas-loading";

interface BoardIdPageProps {
  params: Promise<{
    boardId: string;
  }>;
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { boardId } = await params;

  return (
    <Room roomId={boardId as string} fallback={<CanvasLoading />}>
      <Canvas boardId={boardId as string} />
    </Room>
  );
};

export default BoardIdPage;
