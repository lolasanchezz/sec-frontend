'use client';
import styles from "../page.module.css";
import ScrollingFacts from "../../components/scrolling-facts";
import { CompanyFactsJson } from "../../components/scrolling-facts"; 
import React, { useEffect, useState } from 'react';
import Graph from "../../components/graph";
import CidGrabber from "@/components/cid-grabber";
import CName from "@/components/cname"
const Main = ()  => {
  interface objCompanyFacts {
    'object': CompanyFactsJson;
  }
  type passedDataPoints = Array<any>;
  const [factClicked, setFactClicked] = useState("");
  const [dataStatus, setDataStatus] = useState('loading');
  let [dataSelected, setDataSelected] = useState('' as any);
  let [allLabels, setAllLabels] = useState([] as Array<string>);
 let [company, setCompany] = useState("" as any);
 let [companyName, setCompanyName] = useState("" as any);
 const [form, setForm] = useState("")
  
  return (
    
    
    <main className={styles.main}>
    {(!(company == "")) ?  
    <>
        <div className={styles.leftBar}>
          <CidGrabber setCIK={setCompany} setCompanyName={setCompanyName} setForm={setForm}></CidGrabber>
          <ScrollingFacts clickReaction={setFactClicked} dataSelectedFunc={setDataSelected} className={styles.barsContainer} giveLabels={setAllLabels} dataSelected={dataSelected} labelsObj={allLabels} cik={company}></ScrollingFacts>
        </div>
      
        <div className={styles.rightBar}>
          <div className={styles.header}>
            {(companyName) ? <h2 className={styles.companyName}>showing {companyName.toLowerCase()}</h2> : <p></p>}
            {(form) ? <p> showing {form} form data</p> : <p></p>}
            <h1>{factClicked}</h1>
          </div>
          <Graph factClicked={factClicked} dataSelected={dataSelected} setForm={setForm}></Graph>
        </div>
        </>
 :
 <div className={styles.initContainer}>
 <CidGrabber setCIK={setCompany} setCompanyName={setCompanyName} setForm={setForm}></CidGrabber>
 <h1>enter in a ticker!</h1>
 <CName setCIK={setCompany} setCompanyName={setCompanyName} setForm={setForm}></CName>
 <h1>or enter in a company name</h1>
 </div>
  }
      </main>
  );
 
}
export default Main;