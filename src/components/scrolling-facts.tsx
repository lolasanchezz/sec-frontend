
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
    labelsObj: any;
    cik: any;
  }

    const ScrollingFacts: React.FC<ScrollingFactsProps> = ({ clickReaction, dataSelected, dataSelectedFunc, giveLabels, labelsObj, cik }) => {
        const [bars, setBars] = useState('' as any);
        const [dataStatus, setDataStatus] = useState('loading');
        const removedIndexes: number[] = [];
        let firstBarsObj : any;

        useEffect(() => {
            const fetchData = async () => {
                if (cik === ""){
                    setBars(
                <div>
                    <h1>enter in a ticker!</h1>
                </div>
                )
                return;
                }
                try {
                    console.log(cik);
                    //data fetching (no editing!!)
                    const response = await fetch('http://localhost:3000/companyFacts/CIK' + cik);
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
                                
                                
                                    //[(Object.keys(data.facts[units[i]][formalLabelObjs[j]]))[0]])))
                                correspondingUnit.push(units[i]);
                                labelArray.push(data.facts[units[i]][formalLabelObjs[j]].label);
                                
                                descriptionArray.push(data.facts[units[i]][formalLabelObjs[j]].description);
                                subCorrespondingUnit.push((Object.keys(data.facts[units[i]][formalLabelObjs[j]].units))[0]);
                                //checks to see the length of the dataset and whether its too small and whether to exclude it
                                
                                if ((data.facts[units[i]][formalLabelObjs[j]].units[subCorrespondingUnit[(subCorrespondingUnit.length) - 1]]).length <= 2){
                                    removedIndexes.push(labelArray.length);
                                }

                            }
                           

                            
                        }
                    }
                    
                    giveLabels(labelArray);
                    //turning array into jsx elements
                     firstBarsObj = (labelArray.map((fact, index) => (
                        
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
                const tempBars = firstBarsObj;
                for (let i = 0; i < removedIndexes.length; i++){
                    let indexToBeRemoved = removedIndexes[i];
                    
                    //tempBars.splice(indexToBeRemoved, 1);
                };
               setBars(tempBars);

              
                
            };
            
    //run the api call
            
             

   
        fetchData();

        }, [cik]); 
        
        ///getting rid of small data TAKE 2 💯 
       
       
             


    
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

