import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RawDataViewerProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  fileName: string;
}

export const RawDataViewer = ({
  isOpen,
  onClose,
  data,
  fileName,
}: RawDataViewerProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Raw Data: {fileName}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full mt-4">
          <pre className="text-sm whitespace-pre-wrap bg-muted p-4 rounded-md">
            {JSON.stringify(data, null, 2)}
          </pre>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};