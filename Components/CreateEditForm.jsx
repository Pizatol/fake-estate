import React, { useState } from "react";
import css from "../styles/CreateEditForm.module.scss";

export default function CreateEditForm() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [adress, setAdress] = useState("");
    const [price, setPrice] = useState(0);
    const [surface, setSurface] = useState(0);
    const [floor, setFloor] = useState(0);
    const [elevator, setElevator] = useState(false);
    const [heating, setHeating] = useState("");
    const [textDetailled, setTextDetailled] = useState("");
    const [textSummary, setTextSummary] = useState("");
    const [sellRental, setSetRental] = useState("");
    const [publishDate, setPublishDate] = new Date()
        .toISOString()
        .split("T")[0];

    return (
        <div className={css.global_container}>
            <h1>CREATE EDIT FORM</h1>
            <form className={css.form_container}>
                <label className={css.form_name}>
                    Name
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Name : "
								required
                    />
                </label>

                <label className={css.form_adress}>
                    Adress
                    <input
                        onChange={(e) => setAdress(e.target.value)}
                        type="text"
                        placeholder="Adress : "
								required
                    />
                </label>

                <label className={css.form_price}>
					 Price
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        type="number"
                        placeholder="Price "
								required
                    />
                </label>

					<label
					 className={css.form_surface}
					>
						Surface
                <input
                    onChange={(e) => setSurface(e.target.value)}
                    type="number"
                    placeholder="Surface"
						  required
                />
					</label>

					<label
					className={css.form_floor}
					 >
						Floor number 
                <input
                    onChange={(e) => setFloor(e.target.value)}
                    type="number"
                    placeholder="Floor"
						  required
                />
					</label>
                <input
                    onChange={(e) => setHeating(e.target.value)}
                    type="text"
                    placeholder="heating"
                />

                <label>
                    Elevator:
                    <select onChange={(e) => setElevator(e.target.value)}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                </label>

                <textarea
                    onChange={(e) => setTextDetailled(e.target.value)}
                    placeholder="Detailled text"
                />
                <textarea
                    onChange={(e) => setTextSummary(e.target.value)}
                    placeholder="Summary text"
                />
                <label>
                    Sell or Locate :
                    <select>
                        <option value="sell">Sell</option>
                        <option value="location">Location</option>
                    </select>
                </label>
                <label>
                    Publish Date
                    <input type="date" placeholder="publish date" />
                </label>
            </form>
        </div>
    );
}
