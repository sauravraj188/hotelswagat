// // src/components/ImageUploader.tsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useFormContext } from 'react-hook-form';
// import Spinner from './Spinner';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// // assume you have a Spinner component, or use inline

// const ImageUploader: React.FC = () => {
//   const { setValue, watch } = useFormContext<{ imageUrl: string }>();
//   const imageUrl = watch('imageUrl');
//   const [uploading, setUploading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (!event.target.files?.[0]) return;
//     const file = event.target.files[0];

//     const formData = new FormData();
//     formData.append('image', file);

//     setError(null);
//     setUploading(true);
//     try {
//       // Adjust URL as needed; here assuming backend at localhost:8000 or 9000.
//       const response = await axios.post(
//         'https://hotelswagatbackend-1.onrender.com/api/upload',
//         formData,
//         {
//           headers: { 'Content-Type': 'multipart/form-data' },
//         }
//       );
//       const url = response.data.imageUrl;
//       if (url) {
//         setValue('imageUrl', url, { shouldValidate: true });
//       } else {
//         setError('No URL returned from upload');
//       }
//     } catch (err: any) {
//       console.error('Image upload failed:', err);
//       setError(err.response?.data?.message || err.message || 'Upload error');
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       {/* <label className="block text-sm font-medium text-gray-700">Upload Image</label>
//       <div className="flex items-center space-x-4">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           disabled={uploading}
//           className="block"
//         />
//         {uploading && <Spinner className="w-5 h-5 text-gray-500" />}
//       </div> */}
//       <div>
//                     <Label htmlFor="screenshot">Upload Payment Screenshot</Label>
//                     <Input
//                       id="screenshot"
//                       type="file"
//                       accept="image/*"
//                       onChange={handleImageUpload}
//                       className="mt-1"
//                     />
//                     {uploading && <Spinner className="w-5 h-5 text-gray-500" />}
//                   </div>
//       {error && <p className="text-red-600 text-sm">{error}</p>}
//       {imageUrl && (
//         <div className="mt-2">
//           <p className="text-sm text-gray-600 mb-1">Preview:</p>
//           <img
//             src={imageUrl}
//             alt="Uploaded preview"
//             className="w-32 h-32 object-cover border rounded"
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUploader;
// src/components/ImageUploader.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useFormContext } from 'react-hook-form';
import Spinner from './Spinner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ImageUploader: React.FC = () => {
  const { setValue, watch } = useFormContext<{ imageUrl: string }>();
  const imageUrl = watch('imageUrl');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.[0]) return;
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('image', file);

    setError(null);
    setUploading(true);
    try {
      const response = await axios.post(
        'https://hotelswagatbackend-1.onrender.com/api/upload',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      const url = response.data.imageUrl;
      if (url) {
        setValue('imageUrl', url, { shouldValidate: true });
      } else {
        setError('No URL returned from upload');
      }
    } catch (err: any) {
      console.error('Image upload failed:', err);
      setError(err.response?.data?.message || err.message || 'Upload error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="imageUpload">Upload Image</Label>
      <div className="flex items-center space-x-4">
        <Input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          disabled={uploading}
          className="mt-1"
        />
        {uploading && <Spinner className="w-5 h-5 text-gray-500" />}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Uploaded preview"
            className="w-16 h-16 object-cover border rounded"
          />
        )}
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
};

export default ImageUploader;
