import React, { useState } from "react";
import LoginHeader from "./LoginHeader";
import {
  EuiButton,
 
  EuiHeader,
 
  EuiHeaderLink,
 
  EuiHeaderLinks,
 
  EuiHeaderLogo,
 
  EuiHeaderSection,
 
  EuiHeaderSectionItem,
 
  EuiPageHeader,
  EuiPageHeaderSection,
  EuiTitle,
} from "@elastic/eui";
import logo from "../assets/HeaderLogo.png";
import { useNavigate } from "react-router-dom";

const DownloadApp: React.FC = () => {
    const navigate = useNavigate();
    const [selectedEntry, setSelectedEntry] = useState("Vision Document");
  
    const handleDownload = () => {
      // Replace 'Your-APK-File-Path' with the relative path to your APK file
      const apkPath = 'Your-APK-File-Path';
      
      // Create a temporary link element and trigger the download
      const a = document.createElement("a");
      a.href = apkPath;
      a.download = "JAAW.apk"; // Change 'Your-App-Name' to the name of your app
      document.body.appendChild(a);
      a.click();
  
      // Cleanup
      document.body.removeChild(a);
    };

  return (
    <>
    {/* Header */}
    <EuiHeader position="fixed">
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem>
            <EuiHeaderLogo iconType={logo}>Download App</EuiHeaderLogo>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            <EuiHeaderLinks aria-label="App navigation links">
              <EuiHeaderLink
                onClick={() => navigate("/login")}
                isActive={selectedEntry === "Login"}
              >
                Login
              </EuiHeaderLink>
              <EuiHeaderLink
                onClick={() => navigate("/documentation")}
                isActive={selectedEntry === "Documentation"}
              >
                Documentation
              </EuiHeaderLink>
              <EuiHeaderLink
                onClick={() => navigate("/about")}
                isActive={selectedEntry === "About"}
              >
                About
              </EuiHeaderLink>
              <EuiHeaderLink
                onClick={() => navigate("/contact")}
                isActive={selectedEntry === "Contact"}
              >
                Contact Us
              </EuiHeaderLink>
            </EuiHeaderLinks>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>
      <div
      style={{ paddingTop: "80px" }}
      >
            <EuiTitle
            
            >
              <h2>Download Our App</h2>
            </EuiTitle>
    
          <p>
            Download our app to access all the features and stay connected
            wherever you go!
          </p>
          <EuiButton fill onClick={handleDownload}>
            Download Now
          </EuiButton>
          </div>
    </>
  );
};

export default DownloadApp;
