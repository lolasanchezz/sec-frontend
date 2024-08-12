
'use client';
import Image from "next/image";
import styles from "./page.module.css";
import ScrollingFacts from "../components/scrolling-facts";
import { CompanyFactsJson } from "../components/scrolling-facts"; 
import React, { useEffect, useState } from 'react';
import Graph from "../components/graph";
export default function Home() {

  interface objCompanyFacts {
    'object': CompanyFactsJson;
  }
  type passedDataPoints = Array<any>;

  const [factClicked, setFactClicked] = useState("");
  const [dataStatus, setDataStatus] = useState('loading');
  let [dataSelected, setDataSelected] = useState('' as any);
  let [allLabels, setAllLabels] = useState([] as Array<string>);
 
  

  return (
    <main className={styles.main}>
     <ScrollingFacts clickReaction = {setFactClicked} dataSelectedFunc = {setDataSelected} className = {styles.barsContainer} giveLabels = {setAllLabels} dataSelected = {dataSelected}></ScrollingFacts>
     <Graph factClicked = {factClicked} dataSelected = {dataSelected}></Graph>
    </main>
  );
  
}
