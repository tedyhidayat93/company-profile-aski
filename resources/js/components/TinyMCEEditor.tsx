import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useConfig } from '@/utils/config';

// Get API key from environment
interface TinyMCEEditorProps {
  value: string;
  onChange: (content: string) => void;
  height?: number;
  menubar?: boolean;
  plugins?: string;
  toolbar?: string;
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({
  value,
  onChange,
  height = 400,
  menubar = true,
  plugins = 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
  toolbar = 'undo redo | formatselect | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code | fullscreen | help'
}) => {

  const { getConfig } = useConfig();

  const apikey = getConfig('tinymce_token', import.meta.env.VITE_JWT_TINYMCE);

  return (
    <Editor
      apiKey={apikey}
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height,
        menubar: false, // Menyembunyikan menu bar atas (File, Edit, dll)
        plugins,
        
        // 1. Matikan fitur auto-collapse agar tidak ada tool yang disembunyikan di balik ikon '...'
        toolbar_mode: 'wrap', 
        
        // 2. Susun dua baris toolbar lengkap tanpa dropdown tersembunyi ala Google Docs
        toolbar1: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough forecolor backcolor | superscript subscript | removeformat',
        toolbar2: 'alignleft aligncenter alignright alignjustify | lineheight | bullist numlist outdent indent | table link image media emoticons | charmap hr | code fullscreen preview',

        content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px; }',
        branding: false,
        relative_urls: false,
        remove_script_host: false,
        convert_urls: true,
        paste_data_images: true,
        images_upload_handler: (blobInfo: any) => new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function () {
            resolve(reader.result as string); 
          };
          reader.readAsDataURL(blobInfo.blob()); 
        }),
      }}
    />
  );
};

export default TinyMCEEditor;
