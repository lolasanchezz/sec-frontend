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

    useEffect(() => {
        
        if ((typeof dataSelected === "undefined") || (!(factClicked))){
            console.log('returned');
             return;
        } else {
            
    //start to take data and put it together
    let data: any = [['date filed', factClicked]];
    
    for (let i = 0; i < dataSelected.length; i++){
        //if "fy" is the same
        let firstDataPoint = parseInt(dataSelected[i].end);
        data.push([firstDataPoint, dataSelected[i].val]);
    }
    console.log(data);
    setFinalData(data);
    console.log(finalData);
    console.log('ran');
    }
    
    }, [dataSelected, factClicked]);
   


return(

    <div className = {styles.graph}>
  {((typeof dataSelected === "undefined")||(factClicked === "")||(dataSelected ==='')||(!(data))) ?  
 <h1>pick a topic!</h1> :
  <Chart
   chartType = "LineChart"
    width = "100%"
    height = "100%"
    data = {finalData}
    /> 

   
  }
   </div>
);
};
export default Graph;