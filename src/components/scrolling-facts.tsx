
'use client';

import styles from "../app/page.module.css";
import React, { useEffect, useState } from 'react';
const factTemplate = (label: string, description: string) => {
    return (
        <div className = {styles.factTemplate}>
            <h2>{label}</h2>
            </div>
    );
};




export interface CompanyFactsJson {
    "cik": number;
    "entityName": string;
    "facts": {
        "dei": Array<{
                [key: string]: {
                "label": string;
                "description": string;
                "units": Record<string, {
                    "end": string;
                    "val": number;
                    "accn": string;
                    "fy": number;
                    "fp:": string;
                    "form": string;
                    "filed": string;
                    "frame"?: string;
                }>;
                }
            }>;
        }
  };


  //actual exported component

const ScrollingFacts = (data: CompanyFactsJson, clickReaction : React.Dispatch<React.SetStateAction<string>>) => {
    let bars: JSX.Element[] = [];
    useEffect(() => {
     bars = data.facts.dei.map(fact => (
        <div key={fact.key.label} onClick={() => clickReaction(fact.key.label)}>
            {factTemplate(fact.key.label, fact.key.description)}
        </div>
    ));

}, [data]);



console.log(data);
const dataToShow = data.facts.dei;
return (
    <div>
            {bars}
        </div>
)
};

export default ScrollingFacts;





