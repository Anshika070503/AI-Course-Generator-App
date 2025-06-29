// components/ImageUploader.jsx
import React, { useState } from 'react';

function ImageUploader() {
  const [imageUrl, setImageUrl] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('dr7zhhaee', 'unsigned_preset'); // 🔁 replace with your preset

    const res = await fetch('https://api.cloudinary.com/v1_1/dr7zhhaee/image/upload', {
      method: 'POST',
      body: data,
    });

    const json = await res.json();
    setImageUrl(json.secure_url); // ✅ Cloudinary image URL
  };

  return (
    <div className="p-4 border w-fit rounded-lg">
      <input type="file" onChange={handleImageUpload} />
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="mt-4 w-[200px] h-[200px] object-cover rounded-lg border"
        />
      )}
    </div>
  );
}

export default ImageUploader;
