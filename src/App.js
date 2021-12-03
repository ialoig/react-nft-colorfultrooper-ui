import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import React from "react";

// Constants
const GITHUB_LINK = "https://github.com/ialoig";
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;

const App = () => {
  // Render Methods
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Colorful Trooper</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <p>Build with ❤️ by 
          <a
            className="footer-text"
            href={GITHUB_LINK}
            target="_blank"
            rel="noreferrer"
          >ialoig</a></p>
        </div>
      </div>
    </div>
  );
};

export default App;
