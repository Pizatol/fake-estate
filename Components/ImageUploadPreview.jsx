import React, { useState, useRef, useEffect } from "react";
import { v4 as uuid } from "uuid";
import css from "../styles/ImageUploadPreview.module.scss";
import FirebaseStorageService from "../Firebase/FirebaseStorageService";
import firebaseConfig from "../Firebase/FirebaseConfig";
import Image from "next/image";
import {
    uploadBytes,
    ref,
    listAll,
    getDownloadURL,
    refFromURL,
    deleteObject,
} from "firebase/storage";

export default function ImageUploadPreview({
    onImageState,
    onImageUpload,
    imageFetched,
    onDeleteImage,
    reference
}) {
    const [imagesUrl, setImagesUrl] = useState([]);

    // const imageListRef = ref(firebaseConfig.storage, `${id}`);

    useEffect(() => {
        setImagesUrl(imageFetched);
    }, [imageFetched]);

    return (
        <>
            <div className={css.global_container}>
                <input
                    required
                    type="file"
                    onChange={(e) => {
                        onImageState(e.target.files[0]);
                    }}
                />

                <button type="button" onClick={onImageUpload}>
                    {" "}
                    Upload{" "}
                </button>
                <div className={css.image_container}>
                    {imagesUrl.map((img, index) => (
                        <div className={css.image} key={index}>
                            <Image
                                src={img.url}
                                layout="responsive"
                                width={300}
                                height={200}
                                alt={img}
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    onDeleteImage();
                                }}
                            >
                                cancel
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
