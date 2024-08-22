


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
            <h1 className = {hovering ? styles.boxHovered: styles.boxStale}> {hovering ? description: label }</h1>
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
  interface orgData {
    path: string
    longLabel: string
    description: string
    unit: string
    subUnit: string
    label: string
    form?: string
}

    const ScrollingFacts: React.FC<ScrollingFactsProps> = ({ clickReaction, dataSelected, dataSelectedFunc, giveLabels, labelsObj, cik }) => {
        const [bars, setBars] = useState('' as any);
        const [dataStatus, setDataStatus] = useState('loading');
        const removedIndexes: number[] = [];
        
        let firstBarsObj : any;

        //debugging purposes
        //cik = "0000812011"



        useEffect(() => {
            clickReaction("");
            const fetchData = async () => {
                console.log(cik);
                if (cik === ""){
                    setBars(
                <div>
                    <h2>enter in a ticker!</h2>
                </div>
                )
                return;
                } else if (cik == "not found"){
                    setBars(
                        <div>
                            <h2>ticker not found - did you make a typo?</h2>
                        </div>
                    )
                    return;
                };
                
                    
                    //data fetching (no editing!!)
                    if (!(cik == "not found")) {
                    const response = await fetch('http://localhost:3000/companyFacts/CIK' + cik);
                    if (!response.ok) {
                        throw new Error('response failed');
                    }

                    const data = await response.json();
                    
                    //turning data into useful array
                
                   
                    
                    //making mr hashamap
                    
                    

                    
                    const mappedValues: Array<{[key: string]: orgData}> = [];
                    const units = (Object.keys(data.facts));   
                    for (let i = 0; i < (units.length); i++) {

                        let unit = units[i];
                        let subLabels = Object.keys(data.facts[units[i]])
                        
                        for (let i = 0; i < (subLabels.length); i++) {
                            let subLabel = subLabels[i]
                            let Label = data.facts[unit][subLabel].label as string;
                            let description = data.facts[unit][subLabel].description
                            let subUnit = (Object.keys(data.facts[unit][subLabel].units))[0];
                            let path = `${unit}.${subLabel}.units.${subUnit}.`

                            console.log(data.facts[unit]);
                            mappedValues.push({[Label]: {
                                label: Label,
                                path: path,
                                longLabel: subLabel,
                                description: description,
                                subUnit: subUnit,
                                unit: unit
                            }
                             });
                           

                        }
                        
                    }
                    
                    for (let i = 0; i < mappedValues.length; i++){
                        let path:string = mappedValues[i][Object.keys(mappedValues[i])[0]].path
                        
                    }


                    //sorting mapped values again..
                    console.log(mappedValues);
                     let newMappedValues = mappedValues.filter((fact) => (!(fact[Object.keys(fact)[0]].label === null)));
                    
                    newMappedValues = newMappedValues.filter((fact) => (!(fact[Object.keys(fact)[0]].label.includes('Deprecated'))))
                    newMappedValues = newMappedValues.filter((fact) => (data.facts[fact[Object.keys(fact)[0]].unit][fact[Object.keys(fact)[0]].longLabel].units[fact[Object.keys(fact)[0]].subUnit]).length > 3)

                    //now sorting data based on each form


                    
    for (let i = 0; i > newMappedValues.length; i++){
    const majorityElementArr : any[] = [];
    let dataArray = data.facts[newMappedValues[i][Object.keys(newMappedValues[i])[0]].unit][newMappedValues[i][Object.keys(newMappedValues[i])[0]].longLabel].units[newMappedValues[i][Object.keys(newMappedValues[i])[0]].longLabel].units[newMappedValues[i][Object.keys(newMappedValues[i])[0]].subUnit]
    for (let i = 0; i < dataArray.length; i++){
        
        if (!(majorityElementArr.some((element) => Object.keys(element)[0] === dataArray[i].form))) {
            
            const form = dataArray[i].form;
            
            let newObj = {[form] : 0};
            majorityElementArr.push(newObj);
        } else {
            let str = dataArray[i].form;
            const accessedVar = majorityElementArr.findIndex((obj) => Object.keys(obj)[0] === str);
            const newValue = majorityElementArr[accessedVar][str] + 1; 
            
          majorityElementArr[accessedVar][str] = newValue;
        }
       
    };
    let majorityElement = '';
    let majorityElementNumb = 0;
    majorityElementArr.forEach((element:object) => {
        if(Object.values(element)[0] > majorityElementNumb) {
             majorityElement = Object.keys(element)[0];
             majorityElementNumb = Object.values(element)[0];
        } 
    });

    





    };



                   // newMappedValues = newMappedValues.filter((fact) => (data.facts[fact[Object.keys(fact)[0]].unit].units[fact[Object.keys(fact)[0]].subUnit])
                   //^^ work on this future self
                   
                   //getting rid of arrays with values that are the same (bad data)
                 let temp = newMappedValues.filter((fact) => {
                    const values = data.facts[fact[Object.keys(fact)[0]].unit][fact[Object.keys(fact)[0]].longLabel].units[fact[Object.keys(fact)[0]].subUnit].map((element: any) => element.val);
                    console.log(values)
                    const uniqueValues = new Set(values);
                    console.log(uniqueValues)
                    return values.length === uniqueValues.size;
                });  
                 console.log(temp);

                    console.log(newMappedValues);

                    giveLabels(newMappedValues);
                    //turning array into jsx elements
                     firstBarsObj = (newMappedValues.map((fact, index) => (
                        
                        <div 
                        key={Object.keys(fact)[0]} 
                        onClick={() => {
                            
                             
                            clickReaction((Object.keys(fact)[0]).toString());
                            
                            
                            //pass in CIK here 
                            dataSelectedFunc(grabData(data, fact[Object.keys(fact)[0]]));
                           
                            
                        }
                        }
                        className = {styles.barsContainer}>
                            <FactTemplate label = {Object.keys(fact)[0]} description = {fact[(Object.keys(fact)[0])].description}></FactTemplate>
                        </div>
                    )));
                    
                    setDataStatus('ready');
                    
                   


                
                


                //DO NOT DELETE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
               setBars(firstBarsObj);

                } else {
                    
                };
                
            };
            
    //run the api call
            
             

   
        fetchData();

        }, [cik]); 
        
        ///getting rid of small data TAKE 2 💯 
       
       
             


    
        const grabData = (data: any, object: orgData) => {
            let label = object.label;
            
            clickReaction(label);
            
            let dataArray = data.facts[object.unit][object.longLabel].units[object.subUnit];
           console.log(dataArray);
            
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

