import  React, { useState , useEffect } from 'react'

export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div>
            <p> <b>  {date.toLocaleTimeString()}</b></p>
            <p> <b>  {date.toLocaleDateString()}</b></p>

        </div>
    )
}

export default DateTime
