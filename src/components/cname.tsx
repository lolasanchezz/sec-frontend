import {useState} from 'react';
import styles from "../app/page.module.css";
import Main from "../app/main/page";

const CName: React.FC<any>  = ({setCIK, setCompanyName, setForm}) => {

 const [cName,setCName] = useState("");
   
  
    
    const fetchData = async(givenTicker: any) => {
        
        if (givenTicker.key === 'Enter'){
        //givenTicker.preventDefault();
        setCName(givenTicker.target.value)
        try {
            setForm("");
            const response = await fetch('api/fetchdata?path=' + 'cname/' + givenTicker.target.value);
                    if (!response.ok) {
                        throw new Error('response failed');
                    }
                    const recievedData = await response.text();
                    const data = recievedData;
                    console.log(data)
                    const cik = (recievedData.substring(0,10))
                    const name = recievedData.substring(10)
                    console.log(cik)
                    setCIK(cik);
                    
                   
                   setCompanyName(name)
                   
                   
                    
        } catch (error){
            console.error(error);
            
            setCIK("not found");
        }
    };
    };

    return (
        <div className = {styles.cidGrabber}> {/* change this style later */}
            <label>
                <input className = {styles.input} name = "company name" type = "text" onKeyDown = {fetchData} placeholder = "or enter company name here"></input>
            </label>
        </div>
    )




}
export default CName;