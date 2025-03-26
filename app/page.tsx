import { UserButton } from "@clerk/nextjs";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-y-4">
      <div>This is a screen for authenticated users only</div>
      <div>
        <UserButton />
      </div>
    </div>
  );
};

export default HomePage;
