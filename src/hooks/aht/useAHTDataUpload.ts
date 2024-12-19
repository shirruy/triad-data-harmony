import { supabase } from '@/lib/supabase';

export const useAHTDataUpload = () => {
  const uploadData = async (file: File, type: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

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

    return response.json();
  };

  return { uploadData };
};