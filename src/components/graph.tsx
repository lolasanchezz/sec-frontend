'use client';


import { Chart } from "react-google-charts";
import styles from "../app/page.module.css";
import React, { useEffect, useState } from 'react';

interface GraphProps {
    factClicked: string;
    dataSelected: any;
    setForm: any;
};

let data: any = [];

const Graph: React.FC<GraphProps> = ({factClicked, dataSelected, setForm}) =>{
    const [finalData, setFinalData] = useState([]);
    const [url, setUrl] = useState('');

    

   


    
    useEffect(() => {
        
        if ((typeof dataSelected === "undefined") || (!(factClicked)) || (dataSelected ==='')){
            console.log('returned');
             return;
        } else {
            
    //start to take data and put it together
    console.log(factClicked);
    let data: any = [['date filed', factClicked]];

    const majorityElementArr : any[] = [];
    for (let i = 0; i < dataSelected.length; i++){
        
        if (!(majorityElementArr.some((element) => Object.keys(element)[0] === dataSelected[i].form))) {
            
            const form = dataSelected[i].form;
            
            let newObj = {[form] : 0};
            majorityElementArr.push(newObj);
        } else {
            let str = dataSelected[i].form;
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

    console.log(majorityElement, majorityElementNumb);
    for (let i = 0; i < dataSelected.length; i++){
        if(!(dataSelected[i].form === majorityElement)){
            continue;
        }
       // let firstDataPoint = ((dataSelected[i].end)).replace(/-/g, "");
       setForm(majorityElement);
       let firstDataPoint = new Date(dataSelected[i].end);
       
        data.push([firstDataPoint, dataSelected[i].val]);
    }
    
    setFinalData(data);
   


    }
    
    }, [dataSelected, factClicked]);
   


return(

    <div id = "chartDiv" className = {styles.graph}>
        <div id = "chartCont">
  {((typeof dataSelected === "undefined")||(factClicked === "")||(dataSelected ==='')||(!(data))) ?  
 <h1></h1> :
  <Chart
   chartType = "LineChart"
    width = "100%"
    height = "100%"
    data = {finalData}
    
    
    /> 
  }
  </div>

  {((typeof dataSelected === "undefined")||(factClicked === "")||(dataSelected ==='')||(!(data))) ?
  <h1></h1>: 
   <a onClick = {() => {

    const chartContainer = document.querySelector('#chartCont');
    console.log("e");
    
    console.log(chartContainer);
   }}>download graph</a>
}
   </div>
);
};
export default Graph;