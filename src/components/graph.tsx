import { Chart } from "react-google-charts";
import styles from "../app/page.module.css";

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
    let data: Array<[number, number]> = [[0, 0]];
    for (let i = 0; i < dataSelected.length; i++){
        let firstDataPoint = parseInt(dataSelected[i].filed);
        data.push([firstDataPoint, dataSelected[i].val]);
    }
    data.shift();
    const bars =  [['date filed', factClicked]];
    const graphData = [bars, data];





return(
    <div className = {styles.graph}>
    <Chart
    chartType = "LineChart"
    width = "500px"
    height = "500px"
    data = {graphData}
    />
    </div>
);
};
export default Graph;