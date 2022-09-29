import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import css from "../styles/CreateEditForm.module.scss";
import Image from "next/image";
import FirebaseAuthService from "../Firebase/FirebaseAuthService";
import { db } from "../Firebase/FirebaseConfig";
import { storage } from "../Firebase/FirebaseConfig";
import { v4 } from "uuid";
import {
    uploadBytes,
    ref,
    listAll,
    getDownloadURL,
    refFromURL,
    deleteObject,
} from "firebase/storage";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    startAfter,
    deleteField,
} from "firebase/firestore";

import ImageUploadPreview from "./ImageUploadPreview";

export default function CreateEditForm() {
    const { user, setUser } = useContext(LoginContext);
    FirebaseAuthService.subscribeToAuthChanges(setUser);

    const dataCollectionRef = collection(db, "test");

    const imageListRef = ref(storage, "/images");

    const [products, setProducts] = useState([]);

    const [globalData, setGlobalData] = useState([]);

    const [reference, setReference] = useState("");
    const [adress, setAdress] = useState("");
    const [price, setPrice] = useState(0);
    const [surface, setSurface] = useState(0);
    const [floor, setFloor] = useState(0);
    const [elevator, setElevator] = useState("");
    const [heating, setHeating] = useState("");
    const [textDetailled, setTextDetailled] = useState("");
    const [textSummary, setTextSummary] = useState("");
    const [sellRental, setSellRental] = useState("");

    const [stateImage, setStateImage] = useState([]);
    const [dataImage, setDataImage] = useState([]);

    const [publishDate, setPublishDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const handleFormSubmit = async (e) => {
        // e.preventDefault();
        const isPublished = new Date(publishDate) <= new Date() ? true : false;

        const newProduct = {
            reference,
            adress,
            price,
            surface,
            floor,
            elevator,
            heating,
            textDetailled,
            textSummary,
            sellRental,
            publishDate: new Date(publishDate),
            isPublished,
            dataImage,
        };

        if (!dataImage) {
            alert("Missing image, please add at least one image");
            return;
        }

        try {
            await addDoc(dataCollectionRef, newProduct);
            resetForm();
            alert("Product added successfully");
        } catch (error) {
            console.log(error.message);
            alert("Error adding product");
        }
    };

    const resetForm = () => {
        setReference("");
        setAdress("");
        setPrice("");
        setSurface("");
        setFloor("");
        setElevator("");
        setHeating("");
        setTextDetailled("");
        setTextSummary("");
        setSellRental("");
        setPublishDate(new Date().toISOString().split("T")[0]);
        setStateImage([]);
        setDataImage([]);
        window.scrollTo(0, 0);
    };

    // IMAGE PREVIEW ***************

    const onImageState = (e) => {
        // setstateImage((prev) => [...prev, e]);
        setStateImage(e);
    };

    // FETCH DATA
    const fetchData = async () => {
        const data = await getDocs(dataCollectionRef);
        setGlobalData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // IMAGE UPLOAD
    const onImageUpload = (e) => {
        if (stateImage === null) return;

        const name = stateImage.name + v4();
        const imageRef = ref(storage, `/images/${name}`);

        uploadBytes(imageRef, stateImage).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                {
                    stateImage
                        ? setDataImage((prev) => [...prev, { url, name }])
                        : setDataImage({ url, name });
                }
            });
        });
    };

    // RELOAD
    console.log("RELOAD");

    // DELETE
    const deleteFromFirebase = (id, image) => {
        console.log("deleteFromFirebase", id, image);
    };

    // *****************
    return (
        <div className={css.global_container}>
            <form onSubmit={handleFormSubmit} className={css.form_container}>
                <div className={css.left_part}>
                    <label className={css.form_name}>
                        Ref
                        <input
                            onChange={(e) => setReference(e.target.value)}
                            type="text"
                            placeholder="Name : "
                            required
                            value={reference}
                        />
                    </label>

                    <label className={css.form_adress}>
                        Adress
                        <input
                            onChange={(e) => setAdress(e.target.value)}
                            type="text"
                            placeholder="Adress : "
                            required
                            value={adress}
                        />
                    </label>

                    <label className={css.form_price}>
                        Price
                        <input
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                            placeholder="Price "
                            required
                            value={price}
                        />
                    </label>

                    <label className={css.form_surface}>
                        Surface
                        <input
                            onChange={(e) => setSurface(e.target.value)}
                            type="number"
                            placeholder="Surface"
                            required
                            value={surface}
                        />
                    </label>

                    <label className={css.form_floor}>
                        Floor number
                        <input
                            onChange={(e) => setFloor(e.target.value)}
                            type="number"
                            placeholder="Floor"
                            required
                            value={floor}
                        />
                    </label>
                    <label className={css.form_heating}>
                        Heating
                        <input
                            onChange={(e) => setHeating(e.target.value)}
                            type="text"
                            placeholder="heating"
                            required
                            value={heating}
                        />
                    </label>

                    <label className={css.form_elevator} required>
                        Elevator:
                        <select
                            required
                            value={elevator}
                            onChange={(e) => setElevator(e.target.value)}
                        >
                            <option value="" defaultValue={""}></option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>

                    <label className={css.form_summaryText}>
                        Summary
                        <textarea
                            onChange={(e) => setTextSummary(e.target.value)}
                            placeholder="Summary text"
                            required
                            value={textSummary}
                        />
                    </label>

                    <label className={css.form_detailledText}>
                        Detail
                        <textarea
                            onChange={(e) => setTextDetailled(e.target.value)}
                            placeholder="Detailled text"
                            required
                            value={textDetailled}
                        />
                    </label>

                    <label
                        onChange={(e) => setSellRental(e.target.value)}
                        className={css.form_sellLocate}
                        value={sellRental}
                        required
                    >
                        Sell or Locate :
                        <select>
                            <option value="" defaultValue={""}></option>
                            <option value="sell">Sell</option>
                            <option value="location">Location</option>
                        </select>
                    </label>

                    <label className={css.form_publishDate} value={publishDate}>
                        Publish Date
                        <input
                            required
                            type="date"
                            placeholder="publish date"
                        />
                    </label>

                    <div>
                        <button
                            className={css.form_submit_button}
                            type="submit"
                        >
                            SUBMIT
                        </button>
                        <button
                            type="button"
                            onClick={resetForm}
                            className={css.form_cancel_button}
                        >
                            RESET
                        </button>
                    </div>
                </div>

                <div className={css.right_part}>
                    <div className={css.global_container_preview}>
                        <input
                            required
                            type="file"
                            onChange={(e) => onImageState(e.target.files[0])}
                        />

                        <button type="button" onClick={onImageUpload}>
                            {" "}
                            Upload{" "}
                        </button>

                        <div className={css.image_container_preview}>
                            {dataImage.map((img, index) => (
                                <div className={css.image} key={index}>
                                    <Image
                                        src={img.url}
                                        layout="responsive"
                                        width={300}
                                        height={200}
                                        alt={img}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
