import "./styles/App.css"
import React, { useEffect } from "react"


const GITHUB_LINK = "https://github.com/ialoig"
const OPENSEA_LINK = ""
const TOTAL_MINT_COUNT = 50

const App = () => {

	useEffect(() => {
		checkIfWalletIsConnected()
	}, [])


	// checking if wallet is connected or not
	const checkIfWalletIsConnected = () => {
		const { ethereum } = window
		if (!ethereum) {
			console.log("Wallet not connected")
		} else {
			console.log("Wallet already connected: ", ethereum)
		}
	}

	// Render Methods
	const renderNotConnectedContainer = () => (
		<button className="cta-button connect-wallet-button">
			Connect to Wallet
		</button>
	)

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
					<p className="footer-text">Build with ❤️ by 
						<a
							className="footer-text"
							href={GITHUB_LINK}
							target="_blank"
							rel="noreferrer"
						>ialoig</a></p>
				</div>
			</div>
		</div>
	)
}

export default App
