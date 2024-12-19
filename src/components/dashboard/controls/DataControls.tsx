import { AHTExportButton } from "@/components/aht/AHTExportButton";
import { AHTDataUpload } from "@/components/AHTDataUpload";

interface DataControlsProps {
  canUploadData: boolean;
}

export const DataControls = ({ canUploadData }: DataControlsProps) => {
  if (!canUploadData) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <AHTExportButton />
      <AHTDataUpload />
    </div>
  );
};