import React, {useState, useEffect} from 'react';
import './Clock.css'

const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [date, setDate] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
            setDate(new Date().toLocaleDateString());
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="clock">
            {time} {date}
        </div>
    );
};

export default Clock;