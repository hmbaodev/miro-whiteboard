import Image from "next/image";
import { CreateOrganization } from "@clerk/nextjs";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const EmptyOrg = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Image src="elements.svg" alt="Empty" width={200} height={200} />
      <h2 className="mt-6 text-2xl font-semibold">Welcome to board</h2>
      <p className="text-muted-foreground mt-2 text-sm">
        Create an organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Create organization</Button>
          </DialogTrigger>
          <DialogContent className="org-dialog">
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
      </div>
    </div>
  );
};

export default EmptyOrg;
