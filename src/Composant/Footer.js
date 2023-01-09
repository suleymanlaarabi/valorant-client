import React from 'react';
import "./css/Footer.css"
import GitHubIcon from '@mui/icons-material/GitHub';
import ErrorIcon from "@mui/icons-material/Error"
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate()
    return (
        <footer className='footer'>
            <h3>Copyright © Suleyman Laarabi 2022</h3>
            <br />
            <div className='FooterLink'>
                <a href="https://github.com/suleymanlaarabidev/valorant-client">
                    <GitHubIcon id='iconFooter' />
                </a>
                <a onClick={() => { navigate("/Report") }}>
                    <ErrorIcon sx={{ fontSize: 50 }} />
                </a>
            </div>


        </footer>
    );
};

export default Footer;