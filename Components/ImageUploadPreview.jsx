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
import { reload } from "firebase/auth";

export default function ImageUploadPreview( {handleAddImages} ) {
    const [imagesUrl, setImagesUrl] = useState([]);
    const [imagesUpload, setImagesUpload] = useState(null);

    const imageListRef = ref(firebaseConfig.storage, "Images/");

    

    useEffect(() => {
        fetchImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchImages = () => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                const name = item.name;
                getDownloadURL(item).then((url) => {
                    setImagesUrl((prev) => [...prev, { name, url }]);
                });
            });
        });
    };

    const uploadImages = () => {
        if (imagesUpload === null) return;

        // changer le random par le ID du dossier
        const imageRef = ref(firebaseConfig.storage, `Images/${uuid()}`);
        uploadBytes(imageRef, imagesUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImagesUrl((prev) => [...prev, url]);
                handleAddImages(imagesUrl)
                window.location.reload();
            });
        });
    };

    const deleteFromFirebase = (e) => {
        const deleteImgRef = ref(firebaseConfig.storage, `Images/${e.name}`);
        deleteObject(deleteImgRef).then(() => {
            alert("Successfully deleted ");
            window.location.reload();
        });


    };
    return (
        <>
            <div className={css.global_container}>
                <input
                    type="file"
                    onChange={(e) => {
                        setImagesUpload(e.target.files[0]);
                    }}
                />

                <button onClick={uploadImages}> Upload </button>
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
                                onClick={() => {
                                    deleteFromFirebase(img);
                                }}
                            >
                                XX
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
