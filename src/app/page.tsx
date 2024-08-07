
'use client';
import Image from "next/image";
import styles from "./page.module.css";
import ScrollingFacts from "../components/scrolling-facts";
import { companyFactsJson } from "../components/scrolling-facts"; 
import React, { useEffect, useState } from 'react';
export default function Home() {

  const [factClicked, setFactClicked] = useState("");
  const [dataStatus, setDataStatus] = useState('loading');
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/companyFacts/CIK0000812011');
        const [companyFacts, setCompanyFacts] = useState(await response.json());
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setDataStatus('ready');
        
      }
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main}>
     <ScrollingFacts data={companyFacts:companyFactsJson} clickReaction = {setFactClicked} className = {styles.ScrollingFacts}></ScrollingFacts>
    </main>
  );
}
