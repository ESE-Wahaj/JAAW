import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import {
    EuiHeader,
    EuiHeaderSection,
    EuiHeaderSectionItem,
    EuiHeaderLogo,
    EuiHeaderLinks,
    EuiHeaderLink,
    
} from "@elastic/eui";
import logo from "../assets/HeaderLogo.png"; // Assuming you have your logo imported

const LoginHeader = () => {
    useAuth();
    const navigate = useNavigate();
    return (
        <EuiHeader position="fixed">
            <EuiHeaderSection grow={false}>
                <EuiHeaderSectionItem>

                    <EuiHeaderLogo iconType={logo} >JAAW</EuiHeaderLogo>

                </EuiHeaderSectionItem>
            </EuiHeaderSection>



            <EuiHeaderSection side="right">
                <EuiHeaderLinks aria-label="App navigation links">
                    <EuiHeaderSectionItem>
                    <EuiHeaderLink onClick={() => navigate("/download-app")}  >Download App</EuiHeaderLink>
                    <EuiHeaderLink onClick={() => navigate("/documentation")} >Documentation</EuiHeaderLink>
                    </EuiHeaderSectionItem>
                    <EuiHeaderLink onClick={() => navigate("/about")}>About</EuiHeaderLink>
                    <EuiHeaderLink onClick = {() => navigate("/contact")}>Contact Us</EuiHeaderLink>
                </EuiHeaderLinks>
            </EuiHeaderSection>
        </EuiHeader>
    );
};

export default LoginHeader;
