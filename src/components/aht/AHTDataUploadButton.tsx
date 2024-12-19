import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AHTUploadOptions } from "./AHTUploadOptions";

export const AHTDataUploadButton = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Upload Data
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Upload AHT Data</SheetTitle>
          <SheetDescription>
            Choose the type of data you want to upload
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 mt-6">
          <AHTUploadOptions />
        </div>
      </SheetContent>
    </Sheet>
  );
};