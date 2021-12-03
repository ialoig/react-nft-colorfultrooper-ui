import "./styles/App.css"
import React, { useEffect, useState } from "react"


const GITHUB_LINK = "https://github.com/ialoig"
const OPENSEA_LINK = ""
const TOTAL_MINT_COUNT = 50

const App = () => {

	const [account, setAccount] = useState()

	useEffect(() => {
		checkIfWalletIsConnected()
	}, [])


	// checking if wallet is connected or not
	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window
		if (!ethereum) {
			console.log("Wallet not connected")
			return
		} else {
			console.log("Wallet already connected: ", ethereum)
		}

		// checking authorization on user account
		const accounts = await ethereum.request({ method: "eth_accounts" })
		console.log("Accounts authorization found: ", accounts)

		if (accounts.length !== 0) {
			const account = accounts[0]
			setAccount(account)
			console.log("Account is : ", account)
		} else {
			console.log("No authorized account found")
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
						Each unique. Each beautiful. Each colorful. Mint your NFT today.
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
