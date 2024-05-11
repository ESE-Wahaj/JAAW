import React, { useEffect, useState } from "react";
import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import Structural_Diagrams from "../assets/Structural Diagrams.png";
import OtherRequirementimg from "../assets/OtherRequirements.png";
import ER_Diagrams from "../assets/ER_Diagram.png";
// import CompositeStructureDiagramImage from "../assets/CompositeStructureDiagram.png";
import DeploymentDiagramImage from "../assets/DeploymentDiagram.png";
import ArchitectureDiagram from "../assets/ArchitectureDiagram.png";
import PackageDiagramImage from "../assets/PackageDiagram.png";
import ProfileDiagramImage from "../assets/ProfileDiagram.png";
import ClassDiagramImage from "../assets/ClassDiagram.png";
import ObjectDiagramImage from "../assets/ObjectDiagram.png";
import ComponentDiagramImage from "../assets/ComponentDiagram.png";

interface Diagram {
  id: number;
  title: string;
  image: any[];

  disabled: boolean;
}

function OtherRequirements() {
  const [selectedDiagramId, setSelectedDiagramId] = useState<number | null>(
    null
  );


  const [maxWidth, setMaxWidth] = useState("100%");
  const [isPhoneView, setIsPhoneView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const newMaxWidth = window.innerWidth <= 768 ? "100%" : "80%";
      setMaxWidth(newMaxWidth);
      setIsPhoneView(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Initial setup
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  const handleDiagramClick = (id: number) => {
    setSelectedDiagramId(id);
  };

  const structuralDiagrams: Diagram[] = [

    {
      id: 1,
      title: "Architecture Diagram",
      image: [ArchitectureDiagram],
      disabled: false,
    },
    // {
    //   id: 2,
    //   title: "Package Diagram",
    //   image: [Structural_Diagrams],
    //   disabled: false,
    // },
    // {
    //   id: 3,
    //   title: "ER Diagram",
    //   image: [ER_Diagrams],
    //   disabled: false,
    // },
    // {
    //   id: 4,
    //   title: "Class Diagram",
    //   image: [Structural_Diagrams],
    //   disabled: false,
    // },
    // {
    //   id: 5,
    //   title: "Object Diagram",
    //   image: [Structural_Diagrams],
    //   disabled: false,
    // },
    // {
    //   id: 6,
    //   title: "Component Diagram",
    //   image: [Structural_Diagrams],
    //   disabled: false,
    // },
    // {
    //   id: 7,
    //   title: "Composite Structure Diagram",
    //   image: [Structural_Diagrams],
    //   disabled: true,
    // },
    // Add other diagrams here...
  ];
  return (
    <div>
      {isPhoneView ? ( // Content for phone users



        <EuiFlexGroup direction="column" gutterSize="s">

          <EuiFlexItem>
            <EuiPanel style={{ marginLeft: "5%" }}>
              {selectedDiagramId !== null ? (
                <>
                  <EuiText textAlign="center">
                    <h2>{structuralDiagrams[selectedDiagramId - 1].title}</h2>
                    <img
                      src={structuralDiagrams[selectedDiagramId - 1].image[0]}
                      alt={structuralDiagrams[selectedDiagramId - 1].title}
                      style={{ maxWidth: "100%", margin: "0 auto" }}
                    />
                  </EuiText>
                </>
              ) : (
                <EuiText textAlign="center">
                  <h2>Structural Diagrams</h2>
                  <EuiTextColor color="subdued">Select a diagram from the sidebar</EuiTextColor>
                  <div style={{ maxWidth: "100%", overflow: "hidden" }}>
                    <img
                      src={Structural_Diagrams}
                      alt="Structural Diagrams"
                      style={{ maxWidth: maxWidth, margin: "0 auto" }}
                    />
                  </div>
                </EuiText>
              )}
            </EuiPanel>
          </EuiFlexItem>

          {structuralDiagrams.map((diagram) => (
            <EuiFlexItem key={diagram.id} style={{ marginLeft: "5%" }}>
              <EuiCard
                title={<span style={{ fontSize: "1rem" }}>{diagram.title}</span>}
                onClick={() => handleDiagramClick(diagram.id)}
                isDisabled={diagram.disabled}
              />
            </EuiFlexItem>
          ))}
        </EuiFlexGroup>
      ) : ( // Content for other users
        <EuiFlexGroup direction="row" gutterSize="xl">
          {/* Sidebar */}
          <EuiFlexItem grow={false} style={{ marginLeft: "5%" }}>
            <EuiFlexGroup direction="column" gutterSize="s">
              {structuralDiagrams.map((diagram) => (
                <EuiFlexItem key={diagram.id}>
                  <EuiCard
                    title={<span style={{ fontSize: "1rem" }}>{diagram.title}</span>}
                    onClick={() => handleDiagramClick(diagram.id)}
                    isDisabled={diagram.disabled}
                  />
                </EuiFlexItem>
              ))}
            </EuiFlexGroup>
          </EuiFlexItem>

          {/* Main content */}
          <EuiFlexItem>
            <EuiPanel>
              {selectedDiagramId !== null ? (
                <>
                  <EuiText textAlign="center">
                    <h2>{structuralDiagrams[selectedDiagramId - 1].title}</h2>
                    <img
                      src={structuralDiagrams[selectedDiagramId - 1].image[0]}
                      alt={structuralDiagrams[selectedDiagramId - 1].title}
                      style={{ maxWidth: "100%", margin: "0 auto" }}
                    />
                  </EuiText>
                </>
              ) : (
                <EuiText textAlign="center">
                  <h2>Other Requirements</h2>
                  <EuiTextColor color="subdued">Select from the sidebar on left</EuiTextColor>
                  <div style={{ maxWidth: "100%", overflow: "hidden" }}>
                    <img
                      src={OtherRequirementimg}
                      alt="Other Requirements"
                      style={{ maxWidth: maxWidth, margin: "0 auto" }}
                    />
                  </div>
                </EuiText>
              )}
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      )}
    </div>
  );
}
export default OtherRequirements;
