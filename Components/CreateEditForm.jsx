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

export default function CreateEditForm({ dataEdit }) {
    const { user, setUser } = useContext(LoginContext);
    FirebaseAuthService.subscribeToAuthChanges(setUser);

    const dataCollectionRef = collection(db, "test");

    const imageListRef = ref(storage, "/images");

    const [globalData, setGlobalData] = useState([]);

    const edit = dataEdit;
    const id = edit.id;

    const [reference, setReference] = useState(0);
    const [adress, setAdress] = useState("");
    const [goodType, setGoodType] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState();
    const [surface, setSurface] = useState();
    const [nbRooms, setNbRooms] = useState();
    const [floor, setFloor] = useState(0);
    const [elevator, setElevator] = useState("");
    const [heating, setHeating] = useState("");
    const [textDetailled, setTextDetailled] = useState("");
    // const [textSummary, setTextSummary] = useState("");
    const [sellRental, setSellRental] = useState("");

    const [stateImage, setStateImage] = useState([]);    

    const [uploadImage, setUploadImage] = useState([])

    const [test, setTest] = useState([])
    console.log(stateImage);

    const [entry, setEntry] = useState("");
    const [livingRoom, setLivingRoom] = useState("");
    const [bedRoom, setBedRoom] = useState("");
    const [desk, setDesk] = useState("");
    const [bathroom, setBathroom] = useState("");
    const [toilet, setToilet] = useState("");
    const [diningRoom, setDiningRoom] = useState("");
    const [parking, setParking] = useState("");

    const [itemParticulariry, setItemParticulariry] = useState("");
    const [particularityList, setParticularityList] = useState([]);

    const addParticularity = () => {
        if (itemParticulariry === "") {
            return;
        }
      
        if (particularityList === []) {
            
            setParticularityList(itemParticulariry);
            alert('ok')
        } else {
            setParticularityList((prev) => [...prev, itemParticulariry]);
           
        }
        setItemParticulariry("");
    };

    const resetParticularity = () => {
        setParticularityList([]);
        setItemParticulariry("");
    };

    const [publishDate, setPublishDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const isPublished = new Date(publishDate) <= new Date() ? true : false;

        const newProduct = {
            reference,
            adress,
            city,
            goodType,
            price,
            nbRooms,
            surface,
            floor,
            elevator,
            heating,
            textDetailled,
            // textSummary,
            sellRental,
            isPublished,
            uploadImage,
            entry,
            livingRoom,
            bedRoom,
            desk,
            bathroom,
            toilet,
            diningRoom,
            parking,
            particularityList,
            publishDate: new Date(publishDate),
        };

        try {
            await addDoc(dataCollectionRef, newProduct);
            alert("Product added successfully");
            resetForm();
        } catch (error) {
            console.log(error.message);
            alert("Error adding product");
        }
    };

    const resetForm = () => {
        setReference("");
        setAdress("");
        setPrice("");
        setCity("");
        setGoodType("");
        setSurface("");
        setFloor("");
        setNbRooms("");
        setElevator("");
        setHeating("");
        setTextDetailled("");
        // setTextSummary("");
        setSellRental("");
        setEntry("");
        setLivingRoom("");
        setBedRoom("");
        setDesk("");
        setBathroom("");
        setToilet("");
        setDiningRoom("");
        setParking("");
        setPublishDate(new Date().toISOString().split("T")[0]);
        setStateImage([]);
        setUploadImage([]);
        setParticularityList([]);
        setItemParticulariry("");
        window.scrollTo(0, 0);
    };

    // IMAGE PREVIEW ***************



    // FETCH DATA
    const fetchData = async () => {
        const data = await getDocs(dataCollectionRef);
        setGlobalData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };


    useEffect(() => {

        if (edit) {
            setReference(edit.reference);
            setAdress(edit.adress);
            setPrice(edit.price);
            setCity(edit.city);
            setGoodType(edit.goodType);
            setSurface(edit.surface);
            setFloor(edit.floor);
            setNbRooms(edit.nbRooms);
            setElevator(edit.elevator);
            setHeating(edit.heating);
            setTextDetailled(edit.heating);
            // setTextSummary(edit.textSummary);
            setSellRental(edit.sellRental);
            setEntry(edit.entry);
            setLivingRoom(edit.livingRoom);
            setBedRoom(edit.bedRoom);
            setDesk(edit.desk);
            setBathroom(edit.bathroom);
            setToilet(edit.toilet);
            setDiningRoom(edit.toilet);
            setParking(edit.parking);
            setPublishDate(new Date().toISOString().split("T")[0]);
            setPublishDate(edit.publishDate);
            setStateImage(edit.uploadImage);
        }

    }, []);

        // fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps

      
            // setParticularityList(edit.particularityList);
            // setItemParticulariry(edit.particulariry);
            
            // setUploadImage();




    
    // IMAGE UPLOAD
    const onImageUpload = (e) => {        

        const name = stateImage.name + v4();
        const imageRef = ref(storage, `/images/${name}`);

        uploadBytes(imageRef, stateImage).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                {
                    stateImage
                        ? setUploadImage((prev) => [...prev, { url, name }])
                        : setUploadImage({ url, name })
                }
            });
        });
    };

    const deleteImage = (e) => {
        const imageSelectRef = ref(storage, `/images/${e.name}`);

        deleteObject(imageSelectRef)
            .then(() => {
                const filterArr = uploadImage.filter(
                    (item) => item.name !== e.name
                );
                setUploadImage(filterArr);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    // EDIT
    const handleEdit = async () => {
        const newdoc = doc(db, "test", id);
        const newProduct = {
            reference,
            adress,
            city,
            goodType,
            price,
            nbRooms,
            surface,
            floor,
            elevator,
            heating,
            textDetailled,
            // textSummary,
            sellRental,
            isPublished,
            uploadImage,
            entry,
            livingRoom,
            bedRoom,
            desk,
            bathroom,
            toilet,
            diningRoom,
            parking,
            particularityList,
            publishDate: new Date(publishDate),
        };
        try {
            await updateDoc(newdoc, newProduct);
            alert(" product updated");
        } catch (error) {
            console.log(error.message);
        }
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
                            type="number"
                            placeholder="Reference : "
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
                    <label className={css.form_adress}>
                        City
                        <input
                            onChange={(e) => setCity(e.target.value)}
                            type="text"
                            placeholder="City : "
                            required
                            value={city}
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

                    <label
                        onChange={(e) => setGoodType(e.target.value)}
                        className={css.form_select}
                        value={goodType}
                        required
                    >
                        Type :
                        <select>
                            <option value="none" selected disabled hidden>
                                Select
                            </option>
                            <option value="appartement">Appartement</option>
                            <option value="maison">Maison</option>
                            <option value="chateau">Château</option>
                        </select>
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
                    <label className={css.form_surface}>
                        Room Numbers
                        <input
                            onChange={(e) => setNbRooms(e.target.value)}
                            type="number"
                            placeholder="Room numbers"
                            required
                            value={nbRooms}
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

                    <label className={css.form_select} required>
                        Elevator:
                        <select
                            required
                            value={elevator}
                            onChange={(e) => setElevator(e.target.value)}
                        >
                            <option value="none" selected disabled hidden>
                                Select
                            </option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                    {/* +++++++++ */}
                    <div className={css.details_items_rooms}>
                        <input
                            onChange={(e) => setEntry(e.target.value)}
                            type="number"
                            placeholder="Entrée"
                            required
                            value={entry}
                        />
                        <input
                            onChange={(e) => setLivingRoom(e.target.value)}
                            type="number"
                            placeholder="salon"
                            required
                            value={livingRoom}
                        />
                        <input
                            onChange={(e) => setBedRoom(e.target.value)}
                            type="number"
                            placeholder="chambre"
                            required
                            value={bedRoom}
                        />
                        <input
                            onChange={(e) => setDesk(e.target.value)}
                            type="number"
                            placeholder="bureau"
                            required
                            value={desk}
                        />
                        <input
                            onChange={(e) => setBathroom(e.target.value)}
                            type="number"
                            placeholder="salle de bain"
                            required
                            value={bathroom}
                        />
                        <input
                            onChange={(e) => setToilet(e.target.value)}
                            type="number"
                            placeholder="toilettes"
                            required
                            value={toilet}
                        />
                        <input
                            onChange={(e) => setDiningRoom(e.target.value)}
                            type="number"
                            placeholder="salle à manger"
                            required
                            value={diningRoom}
                        />
                        <input
                            onChange={(e) => setParking(e.target.value)}
                            type="number"
                            placeholder="parking"
                            required
                            value={parking}
                        />
                        {/*  entrée salon chambre bureau salleDeBain toilettes salleAManger parking */}
                    </div>

                    {/* ++++++++++++ */}

                    <div>
                        <p>Particularités</p>

                        <label>
                            <input
                                type="text"
                                placeholder="Add item"
                                onChange={(e) =>
                                    setItemParticulariry(e.target.value)
                                }
                                value={itemParticulariry}
                            />
                            <button type="button" onClick={addParticularity}>
                                Add
                            </button>
                            <button type="button" onClick={resetParticularity}>
                                reset
                            </button>
                        </label>
                        {particularityList
                            ? particularityList.map((e, index) => (
                                  <li key={index}> {e} </li>
                              ))
                            : null}
                    </div>

                    {/* +++++++++++ */}
                    {/* <label className={css.form_summaryText}>
                        Summary
                        <textarea
                            onChange={(e) => setTextSummary(e.target.value)}
                            placeholder="Summary text"
                            required
                            value={textSummary}
                        />
                    </label> */}

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
                        className={css.form_select}
                        value={sellRental}
                        required
                    >
                        Sell or Locate :
                        <select>
                            <option value="none" selected disabled hidden>
                                Select
                            </option>
                            <option value="achat">Sell</option>
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
                        {edit ? (
                            <div>
                                <button
                                    onClick={() => handleEdit(id)}
                                    className={css.form_submit_button}
                                    type="submit"
                                >
                                    Edit{" "}
                                </button>

                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className={css.form_cancel_button}
                                >
                                    RESET
                                </button>
                            </div>
                        ) : (
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
                        )}
                    </div>
                </div>

                <div className={css.right_part}>
                    <div className={css.global_container_preview}>
                        <input
                            required
                            type="file"
                            onChange={(e) => setStateImage(e.target.files[0])}
                        />

                        <button type="button" onClick={onImageUpload}>
                            {" "}
                            Upload{" "}
                        </button>

                        <div className={css.image_container_preview}>
                            {uploadImage
                                ? uploadImage.map((img, index) => (
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
                                                  deleteImage(img);
                                              }}
                                          >
                                              delete
                                          </button>
                                      </div>
                                  ))
                                : null}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe enim rem natus consequatur maiores necessitatibus velit adipisci! Quos ipsam architecto quas sapiente hic. Qui iure nobis eos, esse illo a.
//

// Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium fuga excepturi officiis. Impedit, vel. Voluptas ad optio quam ipsam quidem ratione voluptate dolor laborum sequi, officiis commodi animi suscipit, facilis amet assumenda debitis nobis aperiam pariatur? Voluptate molestias distinctio dignissimos! Est magni corrupti mollitia dolor numquam id deleniti repellendus. Sed!
