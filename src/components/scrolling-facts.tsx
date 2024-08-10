
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




export interface CompanyFactsJson {
    "cik": number;
    "entityName": string;
    "facts": any;
  };

 
  //actual exported component
  interface ScrollingFactsProps {
    clickReaction: React.Dispatch<React.SetStateAction<string>>;
    className: string;
    dataSelectedFunc: any;
    giveLabels: any;
  }

    const ScrollingFacts: React.FC<ScrollingFactsProps> = ({ clickReaction, className, dataSelectedFunc, giveLabels }) => {
        const [bars, setBars] = useState<JSX.Element[]>([]);
        const [dataStatus, setDataStatus] = useState('loading');
    
        useEffect(() => {
            const fetchData = async () => {
                try {
                    //data fetching (no editing!!)
                    const response = await fetch('http://localhost:3000/companyFacts/CIK0001018724');
                    if (!response.ok) {
                        throw new Error('response failed');
                    }
                    const data = await response.json();
                    
                    //turning data into useful array
                    const units = (Object.keys(data.facts));   
                    const labelArray = [];
                    const descriptionArray: string[] = [];
                    const correspondingUnit: string[] = [];
                    let formalLabelObjs: string[] = [];
                    
                    for (let i = 0; i < (units.length); i++) {
                         formalLabelObjs = Object.keys(data.facts[units[i]]);
                        
                        for (let j = 0; j < formalLabelObjs.length; j++) {
                            correspondingUnit.push(units[i]);
                            labelArray.push(data.facts[units[i]][formalLabelObjs[j]].label);
                            descriptionArray.push(data.facts[units[i]][formalLabelObjs[j]].description);
                        }
                    }
                    giveLabels(labelArray);
                    //turning array into jsx elements
                    setBars(labelArray.map((fact, index) => (
                        <div 
                        key={fact} 
                        onClick={() => {
                            clickReaction(fact); 
                            console.log(data.facts);
                            const realUnit = Object.keys(data.facts)
                            //pass in CIK here 
                            const CIK = 'CIK0001018724';
                            dataSelectedFunc(grabData(correspondingUnit[index], formalLabelObjs[index], CIK))
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
    
        const grabData = async(unit: string, label: string, CIK: string) => {
            try {
                const response = await fetch(`http://localhost:3000/companyFacts/${CIK}/${unit}/${label}.json`);
                if (!response.ok) {
                    throw new Error('response failed');
                }
                return response;
            } catch (error) {
                console.error('Error fetching data:', error);
                // TODO: put in graceful error handling with text showing up :)
             } finally {
                    console.log('Data fetching complete');
                }
            
        }
    
        return (
            <div className = {styles.barsWrapper}>
                {bars}
            </div>
        );
    };



export default ScrollingFacts;



//take object 

