import React, { useRef } from 'react';
import './css/Report.css'
import axios from "axios";

const Report = () => {

    const inputs = useRef([])
    const formRef = useRef()
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
        console.log(inputs.current[0])
    }
    const handleForm = (e) => {
        e.preventDefault()

        axios.get("http://127.0.0.1:4000/report/" + inputs.current[1].value + "/" + inputs.current[0].value).then(res => {
            console.log(res)
        })

    }
    return (
        <div>
            <h2>Report</h2>
            <form ref={formRef} onSubmit={handleForm}>
                <input type="text" placeholder='Bug Subject' ref={addInputs} />
                <textarea ref={addInputs} placeholder='Bug Description' name="" id="" cols="30" rows="10"></textarea>
                <div className="button " style={{ marginBottom: 20, marginTop: 10 }}>
                    <button className="btn btn--light">
                        <span className="btn__inner">
                            <span className="btn__slide"></span>
                            <span className="btn__content">Envoyer</span>
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Report;