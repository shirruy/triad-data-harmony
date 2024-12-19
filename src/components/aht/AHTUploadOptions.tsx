import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAHTDataUpload } from "@/hooks/aht/useAHTDataUpload";

export const AHTUploadOptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { uploadData } = useAHTDataUpload();
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        await uploadData(file, type);
        toast({
          title: "Success",
          description: "Data uploaded successfully",
        });
      } catch (error) {
        console.error('Upload error:', error);
        toast({
          title: "Error",
          description: "Failed to upload data",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <UploadOption
        id="metrics-upload"
        label="Upload Metrics"
        isLoading={isLoading}
        onChange={(e) => handleFileUpload(e, 'metrics')}
      />
      <UploadOption
        id="wave-upload"
        label="Upload Wave Data"
        isLoading={isLoading}
        onChange={(e) => handleFileUpload(e, 'wave')}
      />
      <UploadOption
        id="team-upload"
        label="Upload Team Data"
        isLoading={isLoading}
        onChange={(e) => handleFileUpload(e, 'team')}
      />
    </div>
  );
};

interface UploadOptionProps {
  id: string;
  label: string;
  isLoading: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadOption = ({ id, label, isLoading, onChange }: UploadOptionProps) => (
  <div>
    <input
      type="file"
      accept=".csv"
      onChange={onChange}
      className="hidden"
      id={id}
      disabled={isLoading}
    />
    <label htmlFor={id}>
      <Button
        variant="outline"
        className="w-full"
        disabled={isLoading}
        asChild
      >
        <span>
          <Upload className="mr-2 h-4 w-4" />
          {label}
        </span>
      </Button>
    </label>
  </div>
);