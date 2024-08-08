
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

  const [factClicked, setFactClicked] = useState("");
  const [dataStatus, setDataStatus] = useState('loading');
  const [companyFacts, setCompanyFacts] = useState({} as CompanyFactsJson);
  let [dataSelected, setDataSelected] = useState();
 
  

  return (
    <main className={styles.main}>
     <ScrollingFacts clickReaction = {setFactClicked} dataSelectedFunc = {setDataSelected} className = {styles.barsContainer}></ScrollingFacts>
    </main>
  );
}
