import React, { useState, useEffect } from 'react';
import { socket } from "../socket"

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  // Handle image selection
  const handleImageSelect = async (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      setSelectedImage(selectedImage);

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageBase64 = e.target.result;

        // Emit the image data to the server
        socket.emit('file-message', { image: imageBase64, originalFilename: selectedImage.name });
      };

      reader.readAsDataURL(selectedImage);
    }
  };

  // Receive and display the image URL
//   useEffect(() => {
//     socket.on('image-uploaded', (data) => {
//       const imageUrl = data.url;
//       setImageUrl(imageUrl);
//     });

//     // Clean up the socket.io event listener
//     return () => {
//       socket.off('image-uploaded');
//     };
//   }, []);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageSelect} />
      {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" />}
      {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
    </div>
  );
}

export default ImageUpload;
