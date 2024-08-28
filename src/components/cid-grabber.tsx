import {useState} from 'react';
import styles from "../app/page.module.css";
import Main from "../app/main/page";

const CidGrabber: React.FC<any>  = ({setCIK, setCompanyName, setForm}) => {
    const [ticker,setTicker] = useState("");
   
  
    
    const fetchData = async(givenTicker: any) => {
        
        if (givenTicker.key === 'Enter'){
        //givenTicker.preventDefault();
        setTicker(givenTicker.target.value)
        try {
            setForm("");
            const response = await fetch('http://localhost:3000/cik/' + givenTicker.target.value);
                    if (!response.ok) {
                        throw new Error('response failed');
                    }
                    const recievedData = await response.json();
                    const data = recievedData;
                   console.log(recievedData);
                   setCompanyName(data[1])
                   setCIK(data[0]);
                   
                    
        } catch (error){
            //console.error(error);
            
            setCIK("not found");
        }
    };
    };

    return (
        <div className = {styles.cidGrabber}>
            <label>
                <input className = {styles.input} name = "cikInput" type = "text" onKeyDown = {fetchData} placeholder = "enter ticker here"></input>
            </label>
        </div>
    )




}
export default CidGrabber;