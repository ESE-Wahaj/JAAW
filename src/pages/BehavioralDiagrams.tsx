import React, { useEffect, useState } from "react";
import BehaviouralDiagram from "../assets/Behavioural_Diagrams.png";
import classnames from "classnames";
import {
  EuiCard,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiPanel,
  EuiSpacer,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import StructuralDiagrams from "../assets/Structural Diagrams.png";
import { reverse } from "dns";
import { ALIGNMENTS } from "@elastic/eui/src/components/text/text_align";

interface Diagram {
  id: number;
  title: string;
  subDiagrams: any[];// You can define the type of subDiagrams if needed
  Dis: boolean;
}

function BehavioralDiagrams() {
    
  const [selectedDiagramId, setSelectedDiagramId] = useState<number | null>( null );
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

  // Define the hierarchical structure of diagrams
  const behavioralDiagrams: Diagram[] = [
    {
      id: 1,
      title: "Activity Diagram",
      subDiagrams: [
        <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <img
        src={BehaviouralDiagram}
        alt="BehaviouralDiagram"
        style={{
          
          maxWidth: maxWidth,
          margin: "0 auto", // Center the image horizontally
        }}
      />
    </div>
      ],
      Dis: false,
    },
    {
      id: 2,
      title: "Use Case Diagram",
      subDiagrams: [
        <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <img
        src={BehaviouralDiagram}
        alt="BehaviouralDiagram"
        style={{
          
          maxWidth: maxWidth,
          margin: "0 auto", // Center the image horizontally
        }}
      />
    </div>
      ],Dis: false,
    },
    {
      id: 3,
      title: "State Machine Diagram",
      subDiagrams: [
        <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <img
        src={BehaviouralDiagram}
        alt="BehaviouralDiagram"
        style={{
          
          maxWidth: maxWidth,
          margin: "0 auto", // Center the image horizontally
        }}
      />
    </div>
      ],Dis: false,
    },
    {
      id: 4,
      title: "Sequence Diagram",
      subDiagrams: [
        <div style={{ maxWidth: "100%", overflow: "hidden" }}>
      <img
        src={BehaviouralDiagram}
        alt="BehaviouralDiagram"
        style={{
          
          maxWidth: maxWidth,
          margin: "0 auto", // Center the image horizontally
        }}
      />
    </div>
      ],Dis: false,
    },
    {
      id: 5,
      title: "Communication Diagram",
      subDiagrams: [
        <div>
                  <img
                    src={BehaviouralDiagram}
                    alt="BehaviouralDiagram"
                  />
                </div>
      ],Dis: true,
    },
    {
      id: 6,
      title: "Interaction Overview Diagram",
      subDiagrams: [],Dis: true,

    },
    {
      id: 7,
      title: "Timing Diagram",
      subDiagrams: [],Dis: true,
    },
    
    
  ];
  return (
    <div>
      {isPhoneView ? ( // Content for phone users
        <EuiFlexGroup direction="column" gutterSize="s">

<EuiFlexItem>
            <EuiPanel style={{marginLeft: "5%"}}>
              {selectedDiagramId !== null ? (
                <EuiText textAlign="center">
                  <h2>{behavioralDiagrams[selectedDiagramId - 1].title}</h2>
                  <EuiTextColor color="subdued">
                    {behavioralDiagrams[selectedDiagramId - 1].subDiagrams}
                  </EuiTextColor>
                </EuiText>
              ) : (
                <EuiText textAlign="center">
                  <h2>Behavioral Diagrams</h2>
                  <EuiTextColor color="subdued">Select a diagram from the sidebar</EuiTextColor>
                  <div style={{ maxWidth: "100%", overflow: "hidden",  }}>
                    <img src={BehaviouralDiagram} alt="BehaviouralDiagram" style={{ maxWidth: maxWidth, margin: "0 auto" }} />
                  </div>
                </EuiText>
              )}
            </EuiPanel>
          </EuiFlexItem>
          <br />    

          {behavioralDiagrams.map((diagram) => (
            
            <EuiFlexItem  key={diagram.id} style={{marginLeft: "5%"}} >
              <EuiCard
                title={<span style={{ fontSize: "1rem" }}>{diagram.title}</span>}
                isDisabled={diagram.Dis}
                onClick={() => handleDiagramClick(diagram.id)}
              />
            </EuiFlexItem>
          ))}
          
        </EuiFlexGroup>
      ) : ( // Content for other users
        <EuiFlexGroup >
          {/* Sidebar */}
          <EuiFlexItem  grow={false} style={{marginLeft: "5%"}}>
            <EuiFlexGroup  direction="column" gutterSize="s">
              {behavioralDiagrams.map((diagram) => (
                <EuiFlexItem key={diagram.id} >
                  <EuiCard
                    title={<span style={{ fontSize: "1rem" }}>{diagram.title}</span>}
                    isDisabled={diagram.Dis}
                    onClick={() => handleDiagramClick(diagram.id)}
                  />
                </EuiFlexItem>
              ))}
            </EuiFlexGroup>
          </EuiFlexItem>

          {/* Main content */}
          <EuiFlexItem>
            <EuiPanel>
              {selectedDiagramId !== null ? (
                <EuiText textAlign="center">
                  <h2>{behavioralDiagrams[selectedDiagramId - 1].title}</h2>
                  <EuiTextColor color="subdued">
                    {behavioralDiagrams[selectedDiagramId - 1].subDiagrams}
                  </EuiTextColor>
                </EuiText>
              ) : (
                <EuiText textAlign="center">
                  <h2>Behavioral Diagrams</h2>
                  <EuiTextColor color="subdued">Select a diagram from the sidebar</EuiTextColor>
                  <div style={{ maxWidth: "100%", overflow: "hidden" }}>
                    <img src={BehaviouralDiagram} alt="BehaviouralDiagram" style={{ maxWidth: maxWidth, margin: "0 auto" }} />
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


export default BehavioralDiagrams;
