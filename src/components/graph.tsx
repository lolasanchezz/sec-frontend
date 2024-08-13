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

    




    
    useEffect(() => {
        
        if ((typeof dataSelected === "undefined") || (!(factClicked))){
            console.log('returned');
             return;
        } else {
            
    //start to take data and put it together
    let data: any = [['date filed', factClicked]];
    
    for (let i = 0; i < dataSelected.length; i++){
        if(dataSelected[i].fp === 'FY'){
            continue;
        }
        let firstDataPoint = parseInt(dataSelected[i].end);
        data.push([firstDataPoint, dataSelected[i].val]);
    }
    
    setFinalData(data);
    
    const chartContainer = document.getElementById('chartDiv');
    const chart = (chartContainer as any)._chart
    const imgUri = chart.getImageURI();
    setUrl(imgUri);


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
   <a href = {url}>download graph</a>
}
   </div>
);
};
export default Graph;