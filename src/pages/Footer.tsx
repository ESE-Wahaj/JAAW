import React from "react";
import {
  EuiBottomBar,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
} from "@elastic/eui";

const Footer = () => {
  return (
    <div>
      <style>{`
        @media (max-width: 768px) {
          .footer-block {
            height: 150px;
          }
        }
        @media (min-width: 769px) {
          .footer-block {
            height: 0px;
          }
        }
      `}</style>
      <div className="footer-block" />
      <EuiBottomBar position="static" bottom={0}>
        <EuiFlexGroup justifyContent="center" alignItems="center">
          <EuiFlexItem grow={false}>
            <EuiText textAlign="center" color="subdued">
              <p>
                Made with ❤️ by{" "}
                <a href="https://www.instagram.com/junaid.xb/" target="_blank" rel="noopener noreferrer">Junaid,</a>
                <a href="https://www.instagram.com/aqib.a_/" target="_blank" rel="noopener noreferrer"> Aqib,</a>
                <a href="https://www.instagram.com/foiling_flames/" target="_blank" rel="noopener noreferrer"> Ahmed</a>
                {" & "}
                <a href="https://www.instagram.com/wahajnaveed/" target="_blank" rel="noopener noreferrer">Wahaj</a>
              </p>
            </EuiText>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiBottomBar>
    </div>
  );
};

export default Footer;
