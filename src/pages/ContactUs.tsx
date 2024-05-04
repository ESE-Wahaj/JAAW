import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiTextArea,
  EuiButton,
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
import { addDoc, collection } from "firebase/firestore";
import { firebaseDB } from "../utils/firebaseConfig";

const ContactUs: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      await addDoc(collection(firebaseDB, "contactForms"), {
        name,
        email,
        message,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      {/* Header */}
      <EuiHeader position="fixed">
        <EuiHeaderSection grow={false}>
          <EuiHeaderSectionItem>
            <EuiHeaderLogo iconType={logo}>Contact Us</EuiHeaderLogo>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
        <EuiHeaderSection side="right">
          <EuiHeaderSectionItem>
            <EuiHeaderLinks aria-label="App navigation links">
            <EuiHeaderLink onClick={() => navigate("/login")} isActive>Login</EuiHeaderLink>
              <EuiHeaderLink onClick={() => navigate("/documentation")}>Documentation</EuiHeaderLink>
              <EuiHeaderLink onClick={() => navigate("/about")}>About</EuiHeaderLink>
            </EuiHeaderLinks>
          </EuiHeaderSectionItem>
        </EuiHeaderSection>
      </EuiHeader>

      {/* Main content */}
      <main style={{ paddingTop: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "400px" }}>
          <EuiText>
            <h2>Fill this form and we will reach out to you</h2>
          </EuiText>
          <EuiSpacer size="xl" />

          <EuiForm component="form" onSubmit={handleSubmit}>
            <EuiFormRow label="Name" fullWidth>
              <EuiFieldText
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </EuiFormRow>
            <EuiFormRow label="Email" fullWidth>
              <EuiFieldText
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </EuiFormRow>
            <EuiFormRow label="Message" fullWidth>
              <EuiTextArea
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </EuiFormRow>
            <EuiButton type="submit" fill>
              Submit
            </EuiButton>
          </EuiForm>
        </div>

        {submitted && (
          <EuiText>
            <p>Thank you for reaching out. We will get back to you soon.</p>
          </EuiText>
        )}
      </main>
    </>
  );
};

export default ContactUs;
