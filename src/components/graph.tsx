'use client';


import { Chart } from "react-google-charts";
import styles from "../app/page.module.css";
import React, { useEffect, useState } from 'react';

interface GraphProps {
    factClicked: string;
    dataSelected: any;
};
let finalData: any = [];
const Graph: React.FC<GraphProps> = ({factClicked, dataSelected}) =>{


    useEffect(() => {
        
        if ((typeof dataSelected === "undefined") || (factClicked === "")){
            console.log('returned');
             return;
        } else {
            
    //start to take data and put it together
    let data: any = [];

    for (let i = 0; i < dataSelected.length; i++){
        let firstDataPoint = parseInt(dataSelected[i].filed);
        data.push([firstDataPoint, dataSelected[i].val]);
    }
    data.shift();
    console.log(data);
    const bars =  [['date filed', factClicked]];
    const graphData = [bars, data];
    finalData = graphData;
    console.log(finalData);
    console.log('ere');
    }
    }, [dataSelected, factClicked]);
   


return(

    <div className = {styles.graph}>
  {((typeof dataSelected === "undefined")||(factClicked == "")||(dataSelected ==='')) ?  
 <h1>pick a topic!</h1> :
  <Chart
   chartType = "LineChart"
    width = "500px"
    height = "500px"
    data = {finalData}
    /> 

   
  }
   </div>
);
};
export default Graph;