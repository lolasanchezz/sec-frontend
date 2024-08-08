
'use client';

import styles from "../app/page.module.css";
import React, { useEffect, useState } from 'react';
const FactTemplate: React.FC<{ label: string; description: string }> = ({ label, description }) => {

    const [hovering,setHovering] = useState(false);

    return (
        <div className = {styles.factTemplate} onMouseEnter = {() => {
            setHovering(true);
        }} onMouseLeave = {()=> {
            setHovering(false);
        }}>
            <h1>{hovering ? description: label }</h1>
            </div>
    );
};


type passedDataPoints = Array<{
    "end": string;
    "val": number;
    "accn": string;
    "fy": number;
    "fp:": string;
    "form": string;
    "filed": string;
    "frame"?: string;
  }>;

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
  interface ScrollingFactsProps {
    clickReaction: React.Dispatch<React.SetStateAction<string>>;
    className: string;
    dataSelectedFunc: React.Dispatch<React.SetStateAction<passedDataPoints>>;
  }

    const ScrollingFacts: React.FC<ScrollingFactsProps> = ({ clickReaction, className, dataSelectedFunc }) => {
        const [bars, setBars] = useState<JSX.Element[]>([]);
        const [dataStatus, setDataStatus] = useState('loading');
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    //data fetching (no editing!!)
                    const response = await fetch('http://localhost:3000/companyFacts/CIK0000812011');
                    if (!response.ok) {
                        throw new Error('response failed');
                    }
                    const data = await response.json();
                    
                    //turning data into useful array
                    const units = (Object.keys(data.facts));   
                    const labelArray = [];
                    const descriptionArray: string[] = [];
                    
                    for (let i = 0; i < 2; i++) {
                        const unitLabelObjs = Object.keys(data.facts[units[i]]);
                        
                        for (let j = 0; j < unitLabelObjs.length; j++) {
                            
                            labelArray.push(data.facts[units[i]][unitLabelObjs[j]].label);
                            descriptionArray.push(data.facts[units[i]][unitLabelObjs[j]].description);
                        }
                    }
                    console.log('async running');


                    //turning array into jsx elements
                    setBars(labelArray.map((fact, index) => (
                        <div 
                        key={fact} 
                        onClick={() => {
                            clickReaction(fact); 
                            const realUnit = Object.keys(data.facts.units)
                            dataSelectedFunc(fact.units[realUnit[0]])
                        }
                        }
                        className = {styles.barsContainer}>
                            <FactTemplate label = {fact} description = {descriptionArray[index]}></FactTemplate>
                        </div>
                    )));
                    setDataStatus('ready');

                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    console.log('Data fetching complete');
                }
            };
    //run the api call
            fetchData();
        }, []); 
    
    
        return (
            <div className = {styles.barsWrapper}>
                {bars}
            </div>
        );
    };



export default ScrollingFacts;



//take object 

