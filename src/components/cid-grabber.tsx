import {useState} from 'react';



const CidGrabber: React.FC<any>  = ({setCIK}) => {
    const [ticker,setTicker] = useState("GOOG");
    
  
    
    const fetchData = async(givenTicker: any) => {
        if (givenTicker.key === 'Enter'){
        //givenTicker.preventDefault();
        setTicker(givenTicker.target.value)
        console.log(givenTicker.target.value);
        try {
        
            const response = await fetch('http://localhost:3000/cik/' + givenTicker.target.value);
                    if (!response.ok) {
                        throw new Error('response failed');
                    }
                    const recievedData = await response.text();
                    const data = recievedData;
                   console.log(data);
                   
                   setCIK(data);
                   
                    
        } catch (error){
            console.error(error);
            setCIK("not found");
        }
    };
    };

    return (
        <div>
            <label> enter a ticker
                <input name = "cikInput" type = "text" onKeyDown = {fetchData}></input>
            </label>
        </div>
    )




}
export default CidGrabber;