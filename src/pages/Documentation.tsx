import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiHeaderLink,
  EuiHeaderLinks,
  EuiHeaderLogo,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiPageHeader,
  EuiPanel,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import logo from "../assets/HeaderLogo.png";
import BehavioralDiagrams from "./BehavioralDiagrams"; // Import the BehavioralDiagrams component
import StructuralDiagrams from "./StructuralDiagrams";
import OtherRequirements from "./OtherRequirements";

function Documentation() {
  const navigate = useNavigate();
  const [selectedEntry, setSelectedEntry] = useState("Vision Document");

  const handleEntryClick = (entry:string) => {
    setSelectedEntry(entry);
  };

  return (
    <>
      {/* Header */}
      <EuiHeader position="fixed">
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem>
            <EuiHeaderLogo iconType={logo}>Documentation</EuiHeaderLogo>
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


      
   {/* Header */}
   <EuiPageHeader
        style={{
          position: "fixed",
          top: "56px",
          backgroundColor: "#f5f5f5",
        }}
        paddingSize="s"
        responsive={"reverse"}
        tabs={[
          {
            label: <span style={{ fontSize: "1rem" }}>Vision Document</span>,
            isSelected: selectedEntry === "Vision Document",
            onClick: () => handleEntryClick("Vision Document"),
            style: {
              fontSize: "0.5rem", // Adjust the font size as needed
            },
          },
          {
            label: <span style={{ fontSize: "1rem" }}>Behavioral Diagrams</span>,
            isSelected: selectedEntry === "Behavioral Diagrams",
            onClick: () => handleEntryClick("Behavioral Diagrams"),
          },
          {
            label: <span style={{ fontSize: "1rem" }}>Structural Diagrams</span>,
            isSelected: selectedEntry === "Structural Diagrams",
            onClick: () => handleEntryClick("Structural Diagrams"),
          },
          {
            label: <span style={{ fontSize: "1rem" }}>Other Requirements</span>,
            isSelected: selectedEntry === "Other Requirements",
            onClick: () => handleEntryClick("Other Requirements"),
          },
        ]}
      />

      {/* Sidebar */}
      {/* <div
        className="sidebar"
        style={{
          width: "15%",
          position: "fixed",
          top: "56px",
          bottom: 0,
          overflowY: "auto",
          backgroundColor: "#f5f5f5",
        }}
      >
        <EuiFlexGroup
          direction="row"
          gutterSize="s"
          style={{ padding: "20px" }}
        >
          <EuiFlexItem>
            <EuiButton
              fullWidth
              onClick={() => handleEntryClick("Vision Document")}
              isSelected={selectedEntry === "Vision Document"}
            >
              Vision Document
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButton
              fullWidth
              onClick={() => handleEntryClick("Behavioral Diagrams")}
              isSelected={selectedEntry === "Behavioral Diagrams"}
            >
              Behavioral Diagrams
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButton
              fullWidth
              onClick={() => handleEntryClick("Structural Diagrams")}
              isSelected={selectedEntry === "Structural Diagrams"}
            >
              Structural Diagrams
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButton
              fullWidth
              onClick={() => handleEntryClick("Other Requirements")}
              isSelected={selectedEntry === "Other Requirements"}
            >
              Other Requirements
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div> */}

      {/* Main content */}
      <main
        style={{
          
          paddingTop: "136px",
          width: "95%",
          boxSizing: "border-box",
        }}
      >
        {/* Content based on selected entry */}
        {selectedEntry === "Vision Document" && (
          <EuiFlexGroup
            direction="column"
            alignItems="center"
            style={{ padding: "20px" }}
          >
            <EuiFlexItem>
              <EuiPanel>
                <EuiText textAlign="center">
                  <h2>Vision Document</h2>
                  <EuiTextColor color="subdued">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus ac velit eget velit lobortis lobortis.
                  </EuiTextColor>
                </EuiText>
              </EuiPanel>
            </EuiFlexItem>
          </EuiFlexGroup>
        )}

        {selectedEntry === "Other Requirements" && (
          <EuiFlexGroup
            direction="column"
            alignItems="center"
            style={{ padding: "20px" }}
          >
          </EuiFlexGroup>
        )}

        {selectedEntry === "Behavioral Diagrams" ? (
          <BehavioralDiagrams />
        ) : selectedEntry === "Structural Diagrams" ? (
          <StructuralDiagrams />
        ) : selectedEntry === "Other Requirements" ? (
          <OtherRequirements />
        ):null}
      </main>
    </>
  );
}

export default Documentation;
