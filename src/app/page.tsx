'use client';

import styles from "../app/page.module.css";
import { useRouter } from 'next/navigation'
import Main from "./main/page"
import {useState} from "react";
import Image from 'next/image'

const Welcome = () => {
  const router = useRouter();
    let cik = "";

    
    return (
        <>
    <div className = {styles.welcomeCenter}>
      
      <Image sizes = "(max-width: 50%)" width = "50" height = "50" className = {styles.image} src = "/images/graphLogo.png" alt = "logo"></Image>
      <h1 className = {styles.title}>graph the sec</h1>
      <p className = {styles.desc}>graphing all available data from the sec</p>
        <button onClick = {() => router.push('/main')}>go!</button>
       
    </div>
    </>
    )
}

export default Welcome;