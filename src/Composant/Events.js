import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FeaturesCard from './FeaturesCard';
import CelebrationIcon from '@mui/icons-material/Celebration';
const Events = () => {
    const [EventInfo, setEventInfo] = useState([])
    useEffect(() => {
        setEventInfo([])
        axios.get("https://valorant-api.com/v1/events").then(res => {
            res.data.data.map((event) => {
                setEventInfo(current => [...current, {
                    pseudo: event.displayName,
                    endTime: event.endTime
                }])
            })
        })
    }, [])
    return (
        <>
            {EventInfo.map((data, key) => {
                return <div key={key}>
                    <FeaturesCard onClick={() => { console.log(data.pseudo) }} title={data.pseudo} description={data.endTime} icon={<CelebrationIcon fontSize='large' className='icon' />} />
                </div>


            })}
        </>
    );
};

export default Events;