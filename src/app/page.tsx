
'use client';
import Image from "next/image";
import styles from "./page.module.css";
import ScrollingFacts from "../components/scrolling-facts";
import { CompanyFactsJson } from "../components/scrolling-facts"; 
import React, { useEffect, useState } from 'react';
export default function Home() {

  interface objCompanyFacts {
    "object": any;
  }

  const [factClicked, setFactClicked] = useState("");
  const [dataStatus, setDataStatus] = useState('loading');
  const initObj : objCompanyFacts = { 'object': {}};
  const [companyFacts, setCompanyFacts] = useState(initObj);
  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/companyFacts/CIK0000812011');
        setCompanyFacts({'object': (await response.json()) as CompanyFactsJson});
        
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
     <ScrollingFacts data={companyFacts.object} clickReaction = {setFactClicked} className = {styles.ScrollingFacts}></ScrollingFacts>
    </main>
  );
}
