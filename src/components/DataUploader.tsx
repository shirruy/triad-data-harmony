import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Upload, FileText } from "lucide-react";
import * as XLSX from 'xlsx';
import { RawDataViewer } from "./RawDataViewer";

export const DataUploader = () => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [rawData, setRawData] = useState<any>(null);
  const [fileName, setFileName] = useState("");
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'json') {
        // Handle JSON files
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const content = e.target?.result as string;
            const data = JSON.parse(content);
            console.log("Uploaded JSON data:", data);
            setRawData(data);
            showSuccessToast();
          } catch (error) {
            showErrorToast("Error parsing JSON data");
          }
        };
        reader.readAsText(file);
      } else if (['csv', 'xlsx', 'xls'].includes(fileExtension || '')) {
        // Handle CSV and Excel files
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target?.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: 'array' });
            
            // Get the first worksheet
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            
            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            console.log(`Uploaded ${fileExtension?.toUpperCase()} data:`, jsonData);
            setRawData(jsonData);
            showSuccessToast();
          } catch (error) {
            showErrorToast(`Error parsing ${fileExtension?.toUpperCase()} file`);
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        showErrorToast("Unsupported file format");
      }
    } catch (error) {
      showErrorToast("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const showSuccessToast = () => {
    toast({
      title: "Data uploaded successfully",
      description: "Your data has been processed and is ready to use.",
      variant: "default",
    });
  };

  const showErrorToast = (message: string) => {
    toast({
      title: "Upload failed",
      description: message,
      variant: "destructive",
    });
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept=".json,.csv,.xlsx,.xls"
          onChange={handleFileUpload}
          className="max-w-xs"
          disabled={isUploading}
        />
        <Button variant="outline" disabled={isUploading}>
          <Upload className="mr-2 h-4 w-4" />
          Upload Data
        </Button>
        {rawData && (
          <Button
            variant="secondary"
            onClick={() => setIsViewerOpen(true)}
            className="ml-2"
          >
            <FileText className="mr-2 h-4 w-4" />
            View Raw Data
          </Button>
        )}
      </div>

      <RawDataViewer
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        data={rawData}
        fileName={fileName}
      />
    </>
  );
};