'use client';

import styles from "../app/page.module.css";
import { Link } from 'react-router-dom';
import Main from "./main"
import {useState} from "react";

const Welcome = () => {
    const [cik,setCIK] = useState("");
    const handleInput = (e: any) => {

    }
    return (
        <>
    <div className = {styles.welcomeCenter}>
        <label>
        <input name = "initCikInput" type = "text" />
        </label>
        <Link to = "./main" state = {{"cik": cik}}>go!</Link>
    </div>
    </>
    )
}

export default Welcome;