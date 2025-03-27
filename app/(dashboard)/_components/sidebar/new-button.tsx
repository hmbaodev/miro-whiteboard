import { Plus, X } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <button className="flex h-full w-full items-center justify-center rounded-md bg-white/25 opacity-60 hover:opacity-100">
            <Plus className="text-white" />
          </button>
        </div>
      </DialogTrigger>
      {/* Add "org-dialog" custom class */}
      <DialogContent className="org-dialog flex flex-col items-center border-none bg-transparent p-0 shadow-none">
        <DialogTitle className="display-none text-lg font-bold" />
        <div className="relative">
          <DialogClose
            asChild
            className="absolute top-4 right-4 z-[1] cursor-pointer"
          >
            <button>
              <X className="h-5 w-5" />
            </button>
          </DialogClose>
          <CreateOrganization skipInvitationScreen={false} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;
