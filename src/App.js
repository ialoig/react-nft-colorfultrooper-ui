import "./styles/App.css"
import { ethers } from "ethers"
import React, { useEffect, useState } from "react"

import ColorfulTrooperNFT from "./utils/ABI/ColorfulTrooperNFT.json"

const GITHUB_LINK = "https://github.com/ialoig"
const ETHERSCAN_LINK = "https://rinkeby.etherscan.io/tx/"
const CONTRACT_ADDR = "0xB63dEe6a8E4417a7e77327ed7137Dd4f853e0485"
const OPENSEA_LINK = "https://testnets.opensea.io/assets/" + CONTRACT_ADDR + "/"
// const TOTAL_MINT_COUNT = 50


// https://github.com/NFT42/Avastars-Contracts
// https://github.com/nounsDAO/nouns-monorepo
// https://blog.simondlr.com/posts/flavours-of-on-chain-svg-nfts-on-ethereum
// https://etherscan.io/address/0x0cfdb3ba1694c2bb2cfacb0339ad7b1ae5932b63#code#F7#L48
// https://github.com/simondlr/neolastics/blob/master/packages/hardhat/contracts/ERC721.sol#L172
// https://github.com/Untitled-Frontier/tlatc/blob/master/packages/hardhat/contracts/AnchorCertificates.sol#L178
// https://github.com/larvalabs/cryptopunks/blob/master/contracts/CryptoPunksMarket.sol#L5

const App = () => {

	const [account, setAccount] = useState()
	const [txAddress, setTxAddress] = useState()
	const [tokenId, setTokenId] = useState()
	const [isMinting, setIsMinting] = useState(false)

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

		if (accounts.length !== 0) {
			const account = accounts[0]

			// checking network
			checkNetwork()
			
			setAccount(account)
			console.log("Account is : ", account)

			// setup listener
			setupEventListener()
		} else {
			console.log("No authorized account found")
		}
	}


	// checking if wallet is connected or not
	const connectWallet = async () => {
		const { ethereum } = window
		if (!ethereum) {
			alert("Get Metamask!")
			return
		}
	
		// checking authorization on user account
		const accounts = await ethereum.request({ method: "eth_requestAccounts" })
	
		if (accounts.length !== 0) {
			const account = accounts[0]

			// checking network
			checkNetwork()

			setAccount(account)
			console.log("Account is : ", account)

			// setup listener
			setupEventListener()
		} else {
			console.log("No authorized account found")
		}
	}


	// check if the network of the connected wallet is correct
	const checkNetwork = () => {
		const { ethereum } = window
		if (!ethereum) {
			const chainID = ethereum.request({ method: "eth_chainId" })
			console.log("Wallet is connected to chaindId:", chainID)

			const rinkebyId = "0x4"
			if (chainID !== rinkebyId) {
				alert("Wallet is not connected to the right network. Please connect to Rinkeby Test network.")
			}
		}
	}


	const askContractToMintNFT = async () => {

		const { ethereum } = window

		if (ethereum) {
			setIsMinting(true)
			const provider = new ethers.providers.Web3Provider(ethereum)
			
			// https://docs.ethers.io/v5/api/signer/#signers
			// A Signer in ethers is an abstraction of an Ethereum Account, 
			// which can be used to sign messages and transactions and 
			// send signed transactions to the Ethereum Network to execute state changing operations.
			const signer = provider.getSigner()
	
			// connecting with the Contract
			const connectedContract = new ethers.Contract(CONTRACT_ADDR, ColorfulTrooperNFT.abi, signer)

			// pop wallet to pay gas
			const tx = await connectedContract.mintNFT()

			// wait to mining NFT
			await tx.wait()

			// setting tx address
			console.log("Etherscan address is :", ETHERSCAN_LINK + tx.hash)
			setTxAddress(ETHERSCAN_LINK + tx.hash)
			setIsMinting(false)
		} else {
			console.log("Ethereum object doesn't exists!")
		}
	}


	const setupEventListener = () => {
		const { ethereum } = window

		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum)
			const signer = provider.getSigner()
	
			// connecting with the Contract
			const connectedContract = new ethers.Contract(CONTRACT_ADDR, ColorfulTrooperNFT.abi, signer)

			//capture event emitted by the contract
			connectedContract.on("NewColorfulTrooperMinted", (from, tokenId) => {
				console.log("event: from: ", from, "tokenId: ", tokenId)
				alert("Hey there! We've minted your NFT and sent it to your wallet")
				setTokenId(tokenId)
			})
		} else {
			console.log("Ethereum object doesn't exists!")
		}
	}

	// Render Not conncted button
	const renderNotConnectedContainer = () => (
		<button 
			className="cta-button connect-wallet-button" 
			onClick={connectWallet}>
			Connect to Wallet
		</button>
	)

	// Render conncted button to mint NFT
	const renderConnectedContainer = () => (
		<button 
			className="cta-button connect-wallet-button" 
			disabled={isMinting}
			onClick={askContractToMintNFT}>
			{isMinting ? "Minting ..." : "Mint NFT"}
		</button>
	)

	return (
		<div className="App">
			<div className="container">
				<div className="header-container">
					<p className="header gradient-text">Colorful Trooper</p>
					<p className="sub-text">
						{"Each unique. Each beautiful. Each colorful. Mint your NFT today."}
					</p>
					{account === undefined && renderNotConnectedContainer()}
					{account && renderConnectedContainer()}
				</div>

				{ txAddress && tokenId &&
				<div>
					<p className="sub-text">
						{"Your NFT has been minted!"}
					</p>
					<p className="sub-text">{"View on "}
						<a
							href={txAddress}
							target="_blank"
							rel="noreferrer"
						>{"Etherscan"}
						</a>
					</p>
					<p className="sub-text">{"View on "}
						<a
							href={OPENSEA_LINK + tokenId}
							target="_blank"
							rel="noreferrer"
						>{"OpenSea"}
						</a>
					</p>
				</div>
				}

				<div className="footer-container">
					<p className="footer-text">{"Build with ❤️ by "}
						<a
							className="footer-text"
							href={GITHUB_LINK}
							target="_blank"
							rel="noreferrer"
						>{"ialoig"}</a></p>
				</div>
			</div>
		</div>
	)
}

export default App
