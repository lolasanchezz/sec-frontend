
'use client';
import Image from "next/image";
import styles from "./page.module.css";
import ScrollingFacts from "../components/scrolling-facts";
import React, { useEffect, useState } from 'react';
export default function Home() {

  const [factClicked, setFactClicked] = useState(null);
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/companyFacts/CIK0000812011');
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <main className={styles.main}>
     <ScrollingFacts data={apiData} clickReaction = {setFactClicked} className = {styles.ScrollingFacts}></ScrollingFacts>
    </main>
  );
}
