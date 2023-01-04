import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import FeaturesCard from "./FeaturesCard";
import CelebrationIcon from "@mui/icons-material/Celebration";
import { UserContext } from "../Context/userContext";
const Events = () => {
    const [EventInfo, setEventInfo] = useState([]);
    const { Langage } = useContext(UserContext)
    useEffect(() => {
        setEventInfo([]);
        axios
            .get("https://valorant-api.com/v1/events?language=" + Langage.name)
            .then((res) => {
                res.data.data.map((event) => {
                    setEventInfo((current) => [
                        ...current,
                        {
                            pseudo: event.displayName,
                            endTime: event.endTime,
                        },
                    ]);
                    return 0
                });
            });
    }, []);
    useLayoutEffect(() => { }, [EventInfo]);
    return (
        <>
            {EventInfo.map((data, key) => {
                return (
                    <div key={key}>
                        <FeaturesCard
                            onClick={() => {
                                console.log(data.pseudo);
                            }}
                            title={data.pseudo}
                            description={data.endTime}
                            icon={<CelebrationIcon fontSize="large" className="icon" />}
                        />
                    </div>
                );
            })}
        </>
    );
};

export default Events;
