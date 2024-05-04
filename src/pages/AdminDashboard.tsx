import React, { useState, useEffect } from 'react';
// import { appIdFromMeetings, serverSecretFromMeetings, validTillDateFromMeetings } from "./JoinMeeting";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiButton,
  EuiFieldText,
  EuiPanel,
  EuiCard,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';

function AdminDashboard() {
  // State variables to store appId and serverSecret
  const [appIdInput, setAppIdInput] = useState('');
  const [serverSecretInput, setServerSecretInput] = useState('');
  const [validTillDate, setValidTillDate] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [newValueCheck, setNewValueCheck] = useState(true);

  const DefaultAppId = 1740873369;
  const DefaultServerSecret = "4ec48dfc76136444118292304a99ee0b";
  const defaultValidTillDate = "30-May-2024";

  // useEffect to retrieve stored values from local storage on component mount
  useEffect(() => {
    const storedAppId = localStorage.getItem('appIdInput');
    const storedServerSecret = localStorage.getItem('serverSecretInput');
    const storedValidTillDate = localStorage.getItem('validTillDate');
    const storedLastUpdated = localStorage.getItem('lastUpdated');
    const storedNewValueCheck = localStorage.getItem('newValueCheck');

    if (storedAppId) {
      setAppIdInput(storedAppId);
    } else {
      setAppIdInput(DefaultAppId.toString());
    }

    if (storedServerSecret) {
      setServerSecretInput(storedServerSecret);
    } else {
      setServerSecretInput(DefaultServerSecret);
    }

    if (storedValidTillDate) {
      setValidTillDate(storedValidTillDate);
    } else {
      setValidTillDate(defaultValidTillDate);
    }

    if (storedLastUpdated) {
      setLastUpdated(storedLastUpdated);
    }

    if (storedNewValueCheck) {
      setNewValueCheck(JSON.parse(storedNewValueCheck));
    }
  }, []);

  // Function to handle saving the user input
  const handleSave = () => {
    
    // Check if inputs are empty or invalid
    if (appIdInput === '' || serverSecretInput === '' || validTillDate === '') {
      alert('Please enter valid values');
      return;
    } else if (appIdInput.length !== 10 || serverSecretInput.length !== 32) {
      alert('Please enter valid values');
      return;
    // } else if (String(appIdFromMeetings) === appIdInput && String(serverSecretFromMeetings) === serverSecretInput) {
    //   alert('Already saved');
      return;
    }

    // Save inputs to local storage
    localStorage.setItem('lastUpdated', new Date().toLocaleDateString());
    localStorage.setItem('appIdInput', appIdInput);
    localStorage.setItem('serverSecretInput', serverSecretInput);
    localStorage.setItem('validTillDate', validTillDate);
    setLastUpdated(new Date().toLocaleDateString());
    setSavedMessage('Successfully saved');
    setNewValueCheck(false);
    localStorage.setItem('newValueCheck', JSON.stringify(false));
    setTimeout(() => setSavedMessage(''), 3000); // Hide message after 3 seconds
  };

  // Function to reset to default values
const resetToDefault = () => {

    setValidTillDate(defaultValidTillDate);
    setNewValueCheck(true);
    localStorage.setItem('newValueCheck', 'true');
};

  return (
    <>
      <div style={{ paddingTop: "80px", display: "flex", justifyContent: "center" }}>
        <EuiFlexGroup style={{ maxWidth: 600 }}>
          <EuiFlexItem>
            <EuiPanel paddingSize="l">
              <EuiCard
                layout="horizontal"
                title="ZegoCloud"
              />
              <EuiSpacer size="l" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFormRow label="App Id" >
                    <EuiFieldText
                      placeholder="Enter your App Id"
                      value={appIdInput}
                      onChange={(e) => setAppIdInput(e.target.value)}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow label="Current App Id" >
                    <EuiFieldText
                    //   value={appIdFromMeetings}
                      readOnly
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer size="s" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFormRow label="Server Secret" >
                    <EuiFieldText
                      placeholder="Enter your Server Secret"
                      value={serverSecretInput}
                      onChange={(e) => setServerSecretInput(e.target.value)}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow label="Current Server Secret" >
                    <EuiFieldText
                    //   value={serverSecretFromMeetings}
                      readOnly
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer size="s" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFormRow label="Valid Till Date" >
                    <EuiFieldText
                      placeholder="Enter valid till date"
                      value={validTillDate}
                      onChange={(e) => setValidTillDate(e.target.value)}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow label="Valid Till Date" helpText={`Last Updated ${lastUpdated}`}>
                    <EuiFieldText
                    //   value={validTillDateFromMeetings}
                      readOnly
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGroup justifyContent="flexStart" alignItems="center">
                <EuiSpacer size="xl" />
                <EuiText color="success">{savedMessage}</EuiText>
                <EuiButton fill onClick={handleSave}>Save</EuiButton>
                <EuiButton fill onClick={resetToDefault}>Reset to Default</EuiButton>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
      <div style={{ paddingTop: "80px", display: "flex", justifyContent: "center" }}>
        <EuiFlexGroup style={{ maxWidth: 600 }}>
          <EuiFlexItem>
            <EuiPanel paddingSize="l">
              <EuiCard
                layout="horizontal"
                title="ZegoCloud"
              />
              <EuiSpacer size="l" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFormRow label="App Id" >
                    <EuiFieldText
                      placeholder="Enter your App Id"
                      value={appIdInput}
                      onChange={(e) => setAppIdInput(e.target.value)}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow label="Current App Id" >
                    <EuiFieldText
                    //   value={appIdFromMeetings}
                      readOnly
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer size="s" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFormRow label="Server Secret" >
                    <EuiFieldText
                      placeholder="Enter your Server Secret"
                      value={serverSecretInput}
                      onChange={(e) => setServerSecretInput(e.target.value)}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow label="Current Server Secret" >
                    <EuiFieldText
                    //   value={serverSecretFromMeetings}
                      readOnly
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiSpacer size="s" />
              <EuiFlexGroup>
                <EuiFlexItem>
                  <EuiFormRow label="Valid Till Date" >
                    <EuiFieldText
                      placeholder="Enter valid till date"
                      value={validTillDate}
                      onChange={(e) => setValidTillDate(e.target.value)}
                    />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow label="Valid Till Date" helpText={`Last Updated ${lastUpdated}`}>
                    <EuiFieldText
                    //   value={validTillDateFromMeetings}
                      readOnly
                    />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGroup>
              <EuiFlexGroup justifyContent="flexStart" alignItems="center">
                <EuiSpacer size="xl" />
                <EuiText color="success">{savedMessage}</EuiText>
                <EuiButton fill onClick={handleSave}>Save</EuiButton>
                <EuiButton fill onClick={resetToDefault}>Reset to Default</EuiButton>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  );
}

// Exporting user-entered values
export const appIdInput = localStorage.getItem('appIdInput') ;
export const serverSecretInput = localStorage.getItem('serverSecretInput') ;
export const validTillDate = localStorage.getItem('validTillDate') ;
export const newValueCheck = localStorage.getItem('newValueCheck') ;
console.log(appIdInput, serverSecretInput, validTillDate, newValueCheck);

export default AdminDashboard;
