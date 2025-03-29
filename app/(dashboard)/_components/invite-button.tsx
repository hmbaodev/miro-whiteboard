"use client";

import { OrganizationProfile } from "@clerk/nextjs";
import { Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 size-4" />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className="invite-dialog flex flex-col items-center border-none bg-transparent p-0 shadow-none">
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
          <OrganizationProfile routing="hash" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteButton;
