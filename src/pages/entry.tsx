'use client';

import styles from "../app/page.module.css";
import {useRouter} from 'next/router'
import Main from "../app/main/page"
import {useState} from "react";

const Welcome = () => {
    const router = useRouter();
    let cik = "";

    const handleInput = (e: any) => {
        if (e.key === 'Enter'){
        cik = e.target.value;
        console.log(cik)
        router.push('/main')
        }
    }
    return (
        <>
    <div className = {styles.welcomeCenter}>
        <label>
        <input name = "initCikInput" type = "text" onKeyDown = {handleInput}/>
        </label>
       
    </div>
    </>
    )
}

export default Welcome;