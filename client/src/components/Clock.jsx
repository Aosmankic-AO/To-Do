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
            <h2 className="clock-time">{time} {date}</h2>
        </div>
    );
};

export default Clock;