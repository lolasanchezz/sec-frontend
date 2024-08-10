'use client';


import { Chart } from "react-google-charts";
import styles from "../app/page.module.css";
import React, { useEffect, useState } from 'react';

interface GraphProps {
    factClicked: string;
    dataSelected: Array<{
        "end": string;
        "val": number;
        "accn": string;
        "fy": number;
        "fp:": string;
        "form": string;
        "filed": string;
        "frame"?: string;
      }>;
};

const Graph: React.FC<GraphProps> = ({factClicked, dataSelected}) =>{
    const graphDataObj: {"data": Array<any>} = {"data": []};
   const [dataObtained, setDataObtained] = useState(false);
    useEffect(() => {
        console.log(dataSelected.length);
        console.log()
        if (dataSelected.length == undefined){
            console.log('returned');
             return;
        } else {
    let data: Array<[number, number]> = [[0, 0]];
    for (let i = 0; i < dataSelected.length; i++){
        let firstDataPoint = parseInt(dataSelected[i].filed);
        console.log(firstDataPoint + 'e');
        console.log('e');
        data.push([firstDataPoint, dataSelected[i].val]);
    }
    data.shift();
    console.log(data);
    const bars =  [['date filed', factClicked]];
    const graphData = [bars, data];
    graphDataObj.data = graphData;

    }
    }, [dataSelected, factClicked]);
    if (dataObtained){
        const graphData = graphDataObj.data;
    };


return(

    <div className = {styles.graph}>
  {dataObtained ?  <Chart
    chartType = "LineChart"
    width = "500px"
    height = "500px"
    data = {graphDataObj.data}
    /> : <h1></h1>}
    </div>
);
};
export default Graph;