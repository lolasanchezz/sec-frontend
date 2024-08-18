
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
    dataSelected: any;
  }

    const ScrollingFacts: React.FC<ScrollingFactsProps> = ({ clickReaction, dataSelected, dataSelectedFunc, giveLabels }) => {
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
                    const recievedData = await response.json();
                    const data = recievedData;
                    //turning data into useful array
                    const units = (Object.keys(data.facts));   
                    const labelArray: any[] = [];
                    const descriptionArray: string[] = [];
                    const correspondingUnit: string[] = [];
                    let finalLabelObjs: string[] = [];
                    let formalLabelObjs: string[] = [];
                    const subCorrespondingUnit: string[] = [];
                    
                    for (let i = 0; i < (units.length); i++) {
                        
                        if (Object.keys(data.facts[units[i]])){
                         formalLabelObjs = Object.keys(data.facts[units[i]]);
                         finalLabelObjs = finalLabelObjs.concat(formalLabelObjs);
                         
                        } else {
                            console.log('found null');
                        }
                        for (let j = 0; j < formalLabelObjs.length; j++) {
                            
                            if (data.facts[units[i]][formalLabelObjs[j]].label) {
                                if (((data.facts[units[i]][formalLabelObjs[j]].units[(Object.keys(data.facts[units[i]][formalLabelObjs[j]]))[0]]).length < 2)){
                                    console.log((data.facts[units[i]][formalLabelObjs[j]].units[subCorrespondingUnit[(subCorrespondingUnit.length) - 1]]))
                                    console.log('ranee')

                                   // correspondingUnit.pop();
                                    //labelArray.pop();
                                   // console.log(labelArray[labelArray.length - 1])
                                  //  descriptionArray.pop();
                                  //  subCorrespondingUnit.pop();
                                }
                                
                                correspondingUnit.push(units[i]);
                                labelArray.push(data.facts[units[i]][formalLabelObjs[j]].label);
                                console.log(data.facts[units[i]][formalLabelObjs[j]].label)
                                descriptionArray.push(data.facts[units[i]][formalLabelObjs[j]].description);
                                subCorrespondingUnit.push((Object.keys(data.facts[units[i]][formalLabelObjs[j]].units))[0]);
                                //checks to see the length of the dataset and whether its too small and whether to exclude it
                                


                            }
                           

                            
                        }
                    }1
                    
                    giveLabels(labelArray);
                    //turning array into jsx elements
                    setBars(labelArray.map((fact, index) => (
                        
                        <div 
                        key={fact} 
                        onClick={() => {
                            
                             
                            clickReaction(data.facts[correspondingUnit[index]][finalLabelObjs[index]].label);
                            
                            //pass in CIK here 
                            dataSelectedFunc(grabData(data, correspondingUnit[index], finalLabelObjs[index], subCorrespondingUnit[index]));
                           
                            
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
    
        const grabData = (data: any, unit: string, label: string, subUnit: string ) => {
           
            clickReaction(label);
            

            let dataArray: any = [];
            const subUnitStr = Object.keys(subUnit);
            dataArray = data.facts[unit][label].units[subUnit];
           return dataArray;
        }
    
        return (
            <div className = {styles.barsWrapper}>
                {bars}
            </div>
        );
    };



export default ScrollingFacts;



//take object 

