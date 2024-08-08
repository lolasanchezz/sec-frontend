
'use client';
import Image from "next/image";
import styles from "./page.module.css";
import ScrollingFacts from "../components/scrolling-facts";
import { CompanyFactsJson } from "../components/scrolling-facts"; 
import React, { useEffect, useState } from 'react';
export default function Home() {

  interface objCompanyFacts {
    'object': CompanyFactsJson;
  }
  type passedDataPoints = Array<{
    "end": string;
    "val": number;
    "accn": string;
    "fy": number;
    "fp:": string;
    "form": string;
    "filed": string;
    "frame"?: string;
  }>;

  const [factClicked, setFactClicked] = useState("");
  const [dataStatus, setDataStatus] = useState('loading');
  let [dataSelected, setDataSelected] = useState({} as passedDataPoints);
 
  

  return (
    <main className={styles.main}>
     <ScrollingFacts clickReaction = {setFactClicked} dataSelectedFunc = {setDataSelected} className = {styles.barsContainer}></ScrollingFacts>
    </main>
  );
  
}
