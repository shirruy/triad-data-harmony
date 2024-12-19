import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const AHTDataUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const uploadData = async (file: File, type: string) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const response = await fetch(
        'https://sgophjadtxbduwkuuqjw.supabase.co/functions/v1/process-aht-data',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

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
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadData(file, type);
    }
  };

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
          <div className="grid grid-cols-1 gap-4">
            <div>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileUpload(e, 'metrics')}
                className="hidden"
                id="metrics-upload"
                disabled={isLoading}
              />
              <label htmlFor="metrics-upload">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                  asChild
                >
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Metrics
                  </span>
                </Button>
              </label>
            </div>
            
            <div>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileUpload(e, 'wave')}
                className="hidden"
                id="wave-upload"
                disabled={isLoading}
              />
              <label htmlFor="wave-upload">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                  asChild
                >
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Wave Data
                  </span>
                </Button>
              </label>
            </div>
            
            <div>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleFileUpload(e, 'team')}
                className="hidden"
                id="team-upload"
                disabled={isLoading}
              />
              <label htmlFor="team-upload">
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={isLoading}
                  asChild
                >
                  <span>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Team Data
                  </span>
                </Button>
              </label>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};