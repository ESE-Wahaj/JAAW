import React from "react";
import { useNavigate } from "react-router-dom";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiCard,
  EuiText,
  EuiSpacer,
  EuiHeader,
  EuiHeaderSection,
  EuiHeaderLogo,
  EuiHeaderSectionItem,
  EuiHeaderLinks,
  EuiHeaderLink,
} from "@elastic/eui";
import logo from "../assets/HeaderLogo.png";

const About = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* Header */}
      <EuiHeader position="fixed">
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem>
            <EuiHeaderLogo iconType={logo}>About</EuiHeaderLogo>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            <EuiHeaderLinks aria-label="App navigation links">
            <EuiHeaderLink onClick={() => navigate("/login")} isActive>Login</EuiHeaderLink>
              <EuiHeaderLink onClick={() => navigate("/documentation")}>Documentation</EuiHeaderLink>
              <EuiHeaderLink onClick = {() => navigate("/contact")}>Contact</EuiHeaderLink>
            </EuiHeaderLinks>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>

      {/* Main content */}
      <main style={{ paddingTop: "80px" }}>
        {/* Our Team */}
        <EuiText textAlign="center">
          <h2>Our Team</h2>
        </EuiText>
        <EuiSpacer size="xl" />

        {/* Supervisor */}
        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem style={{ maxWidth: "500px" }}>
            <EuiCard
              layout="horizontal"
              title="Dr.Samra Siddiqui"
              description="Supervisor"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="xl" />

        {/* Team Members */}
        <EuiFlexGroup justifyContent="center" gutterSize="m">
          <EuiFlexItem style={{ maxWidth: "400px" }}>
            <EuiCard
              layout="horizontal"
              title="Junaid Ahsan Malik"
              description="Project Manager"
            />
          </EuiFlexItem>
          <EuiFlexItem style={{ maxWidth: "400px" }}>
            <EuiCard
              layout="horizontal"
              title="Muhammad Aqib Abdullah Mughal"
              description="Designer"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="m" />
        <EuiFlexGroup justifyContent="center" gutterSize="m">
          <EuiFlexItem style={{ maxWidth: "400px" }}>
            <EuiCard
              layout="horizontal"
              title="Muhammad Ahmad"
              description="Quality Assurance Engineer"
            />
          </EuiFlexItem >
          <EuiFlexItem style={{ maxWidth: "400px" }}>
            <EuiCard
              layout="horizontal"
              title="Muhammad Wahaj Naveed"
              description="Developer"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
        <EuiSpacer size="xl" />
      </main>
    </>
  );
};

export default About;
