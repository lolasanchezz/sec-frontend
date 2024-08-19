import {useState} from 'react';



const CidGrabber: React.FC<any>  = (givenTicker) => {
    const [ticker,setTicker] = useState("GOOG");
    
    givenTicker.preventDefault();
            let tickerForm = givenTicker.target;
            let tickerData = new FormData(tickerForm);
            console.log(tickerData);
    
    const fetchData = async() => {
        
        try {
            
            /*
            const response = await fetch('http://localhost:3000/cik/' + ticker);
                    if (!response.ok) {
                        throw new Error('response failed');
                    }
                    const recievedData = await response.json();
                    const data = recievedData;
                    */
                    
        } catch (error){
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit = {fetchData}>
                <input name = "cikInput"></input>
            </form>
        </div>
    )




}
export default CidGrabber;