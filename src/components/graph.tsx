'use client';


import { Chart } from "react-google-charts";
import styles from "../app/page.module.css";
import React, { useEffect, useState } from 'react';

interface GraphProps {
    factClicked: string;
    dataSelected: any;
};

let data: any = [];

const Graph: React.FC<GraphProps> = ({factClicked, dataSelected}) =>{
    const [finalData, setFinalData] = useState([]);
    const [url, setUrl] = useState('');

    

    const createUrl = () => {
        const chartContainer = document.getElementById('chartDiv');
        const chart = (chartContainer as any)._chart
        if (chart){
         
        const imgUri = chart.getImageURI();
        console.log(imgUri);
        setUrl(imgUri);
        window.open(imgUri);
        }
    };


    
    useEffect(() => {
        
        if ((typeof dataSelected === "undefined") || (!(factClicked)) || (dataSelected ==='')){
            console.log('returned');
             return;
        } else {
            console.log(dataSelected );
    //start to take data and put it together
    let data: any = [['date filed', factClicked]];
    const allFy = (dataSelected.filter((point : any) => point.fp === 'FY')) ? true : false;
    
    const majorityElementArr : any[] = [];
    for (let i = 0; i < dataSelected.length; i++){
        
        if (!(majorityElementArr.some((element) => Object.keys(element)[0] === dataSelected[i].form))) {
            
            const form = dataSelected[i].form;
            console.log(majorityElementArr)
            let newObj = {[form] : 0};
            majorityElementArr.push(newObj);
        } else {
            let str = dataSelected[i].form;
            const accessedVar = majorityElementArr.findIndex((obj) => Object.keys(obj)[0] === str);
            const newValue = majorityElementArr[accessedVar][str] + 1; 
            console.log(newValue)
          majorityElementArr[accessedVar][str] = newValue;
        }
       
    };
  
    for (let i = 0; i < dataSelected.length; i++){
        if((dataSelected[i].fp === 'FY')&&(!allFy)){
            continue;
        }
        let firstDataPoint = parseInt(dataSelected[i].end);
        data.push([firstDataPoint, dataSelected[i].val]);
    }
    
    setFinalData(data);
    console.log(data);
    


    }
    
    }, [dataSelected, factClicked]);
   


return(

    <div id = "chartDiv" className = {styles.graph}>
  {((typeof dataSelected === "undefined")||(factClicked === "")||(dataSelected ==='')||(!(data))) ?  
 <h1>pick a topic!</h1> :
  <Chart
   chartType = "LineChart"
    width = "100%"
    height = "100%"
    data = {finalData}
    /> 
   
    

   
  }
  {((typeof dataSelected === "undefined")||(factClicked === "")||(dataSelected ==='')||(!(data))) ?
  <h1></h1>: 
   <a onClick = {createUrl} href = {url}>download graph</a>
}
   </div>
);
};
export default Graph;