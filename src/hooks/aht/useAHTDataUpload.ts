import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export const useAHTDataUpload = () => {
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

      return response.json();
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload data",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadData, isLoading };
};