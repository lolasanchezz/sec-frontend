
'use client';
import Image from "next/image";
import styles from "./page.module.css";
import ScrollingFacts from "../components/scrolling-facts";
import { CompanyFactsJson } from "../components/scrolling-facts"; 
import React, { useEffect, useState } from 'react';
import Graph from "../components/graph";
import CidGrabber from "@/components/cid-grabber";


export default function Home() {

  interface objCompanyFacts {
    'object': CompanyFactsJson;
  }
  type passedDataPoints = Array<any>;

  const [factClicked, setFactClicked] = useState("");
  const [dataStatus, setDataStatus] = useState('loading');
  let [dataSelected, setDataSelected] = useState('' as any);
  let [allLabels, setAllLabels] = useState([] as Array<string>);
 let [company, setCompany] = useState("" as any)
  

  return (
    <main className={styles.main}>
      <div className = {styles.leftBar}>
        <CidGrabber setCIK = {setCompany}></CidGrabber>
     <ScrollingFacts clickReaction = {setFactClicked} dataSelectedFunc = {setDataSelected} className = {styles.barsContainer} giveLabels = {setAllLabels} dataSelected = {dataSelected} labelsObj = {allLabels} cik = {company}></ScrollingFacts>
     </div>
     <Graph factClicked = {factClicked} dataSelected = {dataSelected}></Graph>
    </main>
  );
  
}
