import { useRouter } from "next/router";
import React from "react";
import CreateEditForm from "../Components/CreateEditForm";
import NavBar from "../Components/NavBar";
import css from "../styles/NewProductPage.module.scss";

export default function NewProductPage(  ) {

 
   const router = useRouter();
   const data = router.query

   console.log(data);
    return (
        <div className={css.global_container}>
            <NavBar />

            <div className={css.edit_form_container}>
                <CreateEditForm dataEdit={data} />
            </div>
        </div>
    );
}
