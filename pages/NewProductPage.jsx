import React from "react";
import CreateEditForm from "../Components/CreateEditForm";
import NavBar from "../Components/NavBar";
import css from "../styles/NewProductPage.module.scss";

export default function NewProductPage() {
    return (
        <div className={css.global_container}>
            <NavBar />

            <div className={css.edit_form_container}>
                <CreateEditForm />
            </div>
        </div>
    );
}
