
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

  interface objCompanyFacts {
    'object': CompanyFactsJson;
  }
  //actual exported component
  interface ScrollingFactsProps {
    data: CompanyFactsJson;
    clickReaction: React.Dispatch<React.SetStateAction<string>>;
    className: string;
  }

    const ScrollingFacts: React.FC<ScrollingFactsProps> = ({ data, clickReaction, className }) => {
        const [bars, setBars] = useState<JSX.Element[]>([]);
        const [dataStatus, setDataStatus] = useState('loading');
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch('http://localhost:3000/companyFacts/CIK0000812011');
                    if (!response.ok) {
                        throw new Error('response failed');
                    }
                    const data = await response.json();
                    

                    const units = (Object.keys(data.facts));
                    
                    const tempArray = [];
                    
                    for (let i = 0; i < 2; i++) {
                        const unitLabelObjs = Object.keys(data.facts[units[i]]);
                        
                        for (let j = 0; j < unitLabelObjs.length; j++) {
                            
                            tempArray.push(data.facts[units[i]][unitLabelObjs[j]].label);
                        }
                    };
                    console.log(tempArray);
                    console.log('async running');
                    setBars(Object.keys(data.facts.dei).map(fact => (
                        <div key={fact} onClick={() => clickReaction(Object.keys(fact)[0])}>
                            {factTemplate(Object.keys(fact)[0], fact[Object.keys(fact)[0]].description)}
                        </div>
                    )));
                    setDataStatus('ready');
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    console.log('Data fetching complete');
                }
            };
    
            fetchData();
        }, ); 
    
    
        return (
            <div>
                {bars}
            </div>
        );
    };



export default ScrollingFacts;



//take object 

