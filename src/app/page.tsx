'use client';

import styles from "../app/page.module.css";
import { useRouter } from 'next/navigation'
import graphLogo from './graphLogo.png';
import Main from "../app/main/page"
import {useState} from "react";
import Image from 'next/image'

const Welcome = () => {
  const router = useRouter();
    let cik = "";

    
    return (
        <>
    <div className = {styles.welcomeCenter}>
      <Image sizes = "(max-width: 50%)" className = {styles.image} src = {graphLogo} alt = "logo"></Image>
      <p className = {styles.desc}>graphing all available data from the sec</p>
        <button onClick = {() => router.push('/main')}>go!</button>
       
    </div>
    </>
    )
}

export default Welcome;