import React, { useState } from 'react';
import { storage } from './firebase-config'; // Import Firebase storage
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const FileUpload = () => {
  const [file, setFile] = useState<File | null>(null); // Explicitly define file type
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // Handle file upload to Firebase Storage
  const handleUpload = () => {
    if (!file) return;

    setIsUploading(true);

    // Create a storage reference
    const storageRef = ref(storage, `images/${file.name}`);

    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor the upload progress
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optional: Track the upload progress (can be used for progress bar)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error("Error uploading file: ", error);
        setIsUploading(false);
      },
      () => {
        // Once upload is complete, get the file URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL); // Store the file URL
          setIsUploading(false);
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>

      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" width={200} />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
