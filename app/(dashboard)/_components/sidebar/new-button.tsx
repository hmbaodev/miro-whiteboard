import { Plus, X } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Hint from "@/components/hint";

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex h-auto w-full flex-col items-stretch">
          <Hint
            label="Create organization"
            side="right"
            align="start"
            sideOffset={18}
          >
            <div className="flex aspect-square h-full w-full items-center justify-center rounded-md bg-white/25 opacity-60 hover:opacity-100">
              <Plus className="text-white" />
            </div>
            {/* Can't use the button tag here, because Hint component also has a button tag (default of Tooltip), it makes conflict (nested buttons) */}
            {/* <button className="flex aspect-square h-full w-full items-center justify-center rounded-md bg-white/25 opacity-60 hover:opacity-100">
              <Plus className="text-white" />
            </button> */}
          </Hint>
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
