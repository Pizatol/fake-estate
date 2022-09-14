import React, { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";

import FirebaseStorageService from "../Firebase/FirebaseStorageService";
import Image from "next/image";

export default function ImageUploadPreview({
    basePath,
    existingImageUrl,
    handleUploadFinish,
    handleUploadCancel,
}) {
    const [uploadProgress, setUploadProgress] = useState(-1);
    const [imageUrl, setImageUrl] = useState("");

    const fileInputRef = useRef();

    useEffect(() => {
        if (existingImageUrl) {
            setImageUrl(existingImageUrl);
        } else {
            setImageUrl("");
            fileInputRef.current.value = null;
        }
    }, [existingImageUrl]);

    const handleFileChanged = async (e) => {
        const files = e.target.files;
        const file = files[0];

        if (!file) {
            alert("File select failed. Please try again");
            return;
        }

        const generatedFileIfd = uuid();

        try {
            const downloadUrl = await FirebaseStorageService.uploadFile(
                file,
                `${basePath}/${generatedFileIfd}`,
                setUploadProgress
            );

            setImageUrl(downloadUrl);
            handleUploadFinish(downloadUrl);
        } catch (error) {
            setUploadProgress(-1);
            fileInputRef.current.value = null;
            alert(error.message);
            throw error;
        }
    };

    const handleCancelImageClick = () => {
      FirebaseStorageService.deleteFile(imageUrl);
        fileInputRef.current.value = null;
        setImageUrl("");
        setUploadProgress(-1);
        handleUploadCancel();
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChanged}
                ref={fileInputRef}
                hidden={uploadProgress > -1 || imageUrl}
            />
             {!imageUrl && uploadProgress > -1 ? (
        <div>
          <label htmlFor="file">Upload Progress:</label>
          <progress id="file" value={uploadProgress} max="100">
            {uploadProgress}%
          </progress>
          <span>{uploadProgress}%</span>
        </div>
      ) : null}

      {imageUrl ? (
        <div >
          {/* <img src={imageUrl} alt={imageUrl} /> */}
          <Image
            src={imageUrl}
            width={100}
            height={100}
            alt={imageUrl}
          />
          <button
            type="button"
            onClick={handleCancelImageClick}
            
          >
            Cancel Image
          </button>
        </div>
      ) : null}
        </div>
    );
}
