import React from "react";
import Image from "next/image";
import ges from "../Assets/logo/GES.png";
import dpe from "../Assets/logo/DPE1.png";
import css from "../styles/EnergyChartLogo.module.scss";

export default function EnergyChartLogo() {
    return (
        <div className={css.logo_global_container}>
            <div className={css.logo_container}>
                <Image src={dpe} width={35} height={35} alt="dpe logo" />

                <p> E </p>
            </div>
				<div className={css.logo_container}>
                <Image src={ges} width={35} height={35} alt="ges logo" />

                <p> F</p>
            </div>

        </div>
    );
}
