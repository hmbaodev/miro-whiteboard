import { Plus, X } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
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
            {/* Can't use the button tag here, because Hint component also has a button tag (default of Tooltip), it makes conflict (nested buttons) */}
            <div className="flex aspect-square h-full w-full items-center justify-center rounded-md bg-white/25 opacity-60 hover:opacity-100">
              <Plus className="text-white" />
            </div>
          </Hint>
        </div>
      </DialogTrigger>
      {/* Add "org-dialog" custom class */}
      <DialogContent className="org-dialog flex flex-col items-center border-none bg-transparent p-0 shadow-none">
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
        </VisuallyHidden>
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
