import React, { useState } from "react";

import css from "../styles/CreateEditForm.module.scss";
import ImageUploadPreview from "./ImageUploadPreview";

export default function CreateEditForm({ handleAddProduct }) {
    //  const [id, setId] = useState("");

    const [name, setName] = useState("");
    const [adress, setAdress] = useState("");
    const [price, setPrice] = useState(0);
    const [surface, setSurface] = useState(0);
    const [floor, setFloor] = useState(0);
    const [elevator, setElevator] = useState("");
    const [heating, setHeating] = useState("");
    const [textDetailled, setTextDetailled] = useState("");
    const [textSummary, setTextSummary] = useState("");
    const [sellRental, setSellRental] = useState("");
    const [publishDate, setPublishDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [imageUrl, setImageUrl] = useState([]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const isPublished = new Date(publishDate) <= new Date() ? true : false;

        const newProduct = {
            name,
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
            imageUrl,
        };

        if (!imageUrl) {
            alert("Missing image, please add at least one image");
            return;
        }
       handleAddImages()
        handleAddProduct(newProduct);
    };

    const handleAddImages = (e) => {
        setImageUrl(e)
        console.log(imageUrl)
    };


    const resetForm = () => {
        setName("");
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
        setImageUrl([]);
        window.scrollTo(0, 0);
    };

    return (
        <div className={css.global_container}>
            <form onSubmit={handleFormSubmit} className={css.form_container}>
                <div>
                    Product Image
                    <ImageUploadPreview
                        handleAddImages={handleAddImages}
                    ></ImageUploadPreview>
                </div>

                <label className={css.form_name}>
                    Name
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name : "
                        required
                        value={name}
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
                    <select required>
                        <option value="" defaultValue={""}></option>
                        <option value="sell">Sell</option>
                        <option value="location">Location</option>
                    </select>
                </label>

                <label className={css.form_publishDate} value={publishDate}>
                    Publish Date
                    <input required type="date" placeholder="publish date" />
                </label>

                <div>
                    <button className={css.form_submit_button} type="submit">
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
            </form>
        </div>
    );
}
