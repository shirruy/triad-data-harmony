import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";

export const DataUploader = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);
          console.log("Uploaded data:", data);
          
          toast({
            title: "Data uploaded successfully",
            description: "Your data has been processed and is ready to use.",
            variant: "default",
          });
        } catch (error) {
          toast({
            title: "Error parsing data",
            description: "Please ensure your file contains valid JSON data.",
            variant: "destructive",
          });
        }
      };

      reader.readAsText(file);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Input
        type="file"
        accept=".json"
        onChange={handleFileUpload}
        className="max-w-xs"
        disabled={isUploading}
      />
      <Button variant="outline" disabled={isUploading}>
        <Upload className="mr-2 h-4 w-4" />
        Upload Data
      </Button>
    </div>
  );
};