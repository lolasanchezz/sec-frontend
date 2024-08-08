
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

};