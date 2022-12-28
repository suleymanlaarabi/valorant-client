import axios from 'axios';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import FeaturesCard from './FeaturesCard';
import CelebrationIcon from '@mui/icons-material/Celebration';
import gsap from 'gsap';
const Events = () => {
    const [EventInfo, setEventInfo] = useState([])
    useEffect(() => {
        setEventInfo([])
        axios.get("https://valorant-api.com/v1/events?language=fr-FR").then(res => {
            res.data.data.map((event) => {
                setEventInfo(current => [...current, {
                    pseudo: event.displayName,
                    endTime: event.endTime
                }])
            })
        })

    }, [])
    useLayoutEffect(() => {

    }, [EventInfo])
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