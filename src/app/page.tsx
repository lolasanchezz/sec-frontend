
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
  
  


  
    console.log(companyFacts);

 
  useEffect(() => {
    console.log('Updated companyFacts:', companyFacts);
  }, [companyFacts]);

  return (
    <main className={styles.main}>
     <ScrollingFacts clickReaction = {setFactClicked} className = {styles.ScrollingFacts}></ScrollingFacts>
    </main>
  );
}
