import axios from "axios";
import gsap from "gsap";
import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
import ModalAgents from "../Composant/ModalAgents";
import { UserContext } from "../Context/userContext";
import "./css/Agents.css";
const Agents = () => {
    const [AgentInfo, setAgentInfo] = useState([]);
    const [AllAgentInfo, setAllAgentInfo] = useState([]);
    const [NumberAgentsDisplay, setNumberAgentsDisplay] = useState(0);
    const [MoreAgentState, setMoreAgentState] = useState(false);

    const addMoreAgent = () => {
        if (NumberAgentsDisplay > AllAgentInfo.length) {
            console.log("true", NumberAgentsDisplay, AllAgentInfo.length)
            setMoreAgentState(true)

            return;
        } else {
            setMoreAgentState(false)
            console.log("false", NumberAgentsDisplay, AllAgentInfo.length)

            var Agents = []
            for (var i = 0; i < NumberAgentsDisplay; i++) {


                Agents.push({
                    pseudo: AllAgentInfo[i].displayName,
                    description: AllAgentInfo[i].description,
                    imageLink: AllAgentInfo[i].fullPortraitV2,
                    uuid: AllAgentInfo[i].uuid,
                })

            }
            setAgentInfo(Agents)
        }
    }

    useEffect(() => {
        axios
            .get(
                "https://valorant-api.com/v1/agents?language=fr-FR&isPlayableCharacter=true"
            )
            .then((res) => {
                setAllAgentInfo(res.data.data)

                setNumberAgentsDisplay(3)



            });
    }, [

    ])
    useLayoutEffect(() => {
        addMoreAgent()

    }, [
        NumberAgentsDisplay
    ])


    useLayoutEffect(() => {
        gsap
            .to(".title", { opacity: 1, duration: 0.4, stagger: 0.3, y: 100 })
            .then(() => {
                gsap.to(".animate", {
                    opacity: 1,
                    duration: 0.4,

                    y: 100,
                });
            });
    }, [AgentInfo]);

    const [AgentClicked, setAgentClicked] = useState({
        pseudo: "",
        imageLink: "",
        description: "",
        uuid: "",
        isClicked: false,
        isFavoris: false
    });

    const closeModal = () => {
        setAgentClicked({ ...AgentClicked, isClicked: false });
    };

    return (
        <div className="AgentsPage">
            {AgentClicked.isClicked && (
                <ModalAgents agentInfo={AgentClicked} close={closeModal} />
            )}

            <h2 className="title">Agents</h2>

            <div className="Agents ">
                {AgentInfo.map((agent, key) => {
                    return (
                        <div
                            className="Agent animate"
                            onClick={() => {
                                setAgentClicked({
                                    ...AgentClicked,
                                    pseudo: agent.pseudo,
                                    imageLink: agent.imageLink,
                                    description: agent.description,
                                    isClicked: true,
                                    uuid: agent.uuid,
                                    isFavoris: false
                                });
                            }}
                            key={key}
                        >
                            <h2>{agent.pseudo}</h2>

                            <img placeholder="test" src={agent.imageLink} alt="Comming Soon" />
                        </div>
                    );
                })}
                <div
                    className="animate ButtonMoreAgent"
                    onClick={() => {
                        setNumberAgentsDisplay(NumberAgentsDisplay + 3)
                    }}
                >
                    <button className="btn btn--light">
                        <span className="btn__inner">
                            <span className="btn__slide"></span>
                            <span className="btn__content">{MoreAgentState ? "Aucun Agents a rajouter" : "Plus D'Agents"}</span>
                        </span>
                    </button>

                </div>
            </div>

        </div>
    );
};

export default Agents;
