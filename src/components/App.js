import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.css";
import Web3 from "web3";
import 'bootstrap/dist/css/bootstrap.min.css'

import WildersC from "../abis/WildersC.json";
import WildersU from "../abis/WildersU.json";
import WildersR from "../abis/WildersR.json";
import WildersL from "../abis/WildersL.json";

import ChestWildersC from "../abis/ChestWildersC.json";
import ChestWildersU from "../abis/ChestWildersU.json";
import ChestWildersR from "../abis/ChestWildersR.json";
import ChestWildersL from "../abis/ChestWildersL.json";

import FormAndPreview from "../components/FormAndPreview/FormAndPreview";
import AccountDetails from "./AccountDetails/AccountDetails";
import ContractNotDeployed from "./ContractNotDeployed/ContractNotDeployed";
import ConnectToMetamask from "./ConnectMetamask/ConnectToMetamask";
import Loading from "./Loading/Loading";
import Navbar from "./Navbar/Navbar";
import MyWildersC from "./MyWildersC/MyWildersC";
import ChangeMintPrice from "./ChangeMintPrice/ChangeMintPrice";

import data from "../data/metadata.json";
import datau from "../data/metadatau.json";
import datar from "../data/metadatar.json";
import datal from "../data/metadatal.json";

import {db} from "../firebase-config";
import {collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, setDoc, arrayUnion, arrayRemove, runTransaction } from "firebase/firestore";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountAddress: "",
      accountBalance: "",
      loading: true,
      metamaskConnected: false,
      contractDetected: false,

      contractOwner: "",
      mintPrice: 0,
      mintPriceWc: 0,
      mintPriceCWILDC: 0,
      mintPriceWu: 0,
      mintPriceCWILDU: 0,
      mintPriceWr: 0,
      mintPriceCWILDR: 0,
      mintPriceWl: 0,
      mintPriceCWILDL: 0,

      WildersCContract: null,
      WildersCCount: 0,
      WildersC: [],

      WildersUContract: null,
      WildersUCount: 0,
      WildersU: [],

      WildersRContract: null,
      WildersRCount: 0,
      WildersR: [],

      WildersLContract: null,
      WildersLCount: 0,
      WildersL: [],

      totalTokensMinted: 0,
      totalTokensOwnedByAccount: 0, 

      CWILDCContractAddress: '0xF597bd5A11D8D173aE1756809b66347cF7a04DE0',
      CWILDCContractOwner: '0x3198C6ecbAa86ea56c750B0eb35f35BEC97b54d4',
      CWILDCContract: null,
      CWILDUContractAddress: '0xEAA639C187879c6D78219bBDB32665f6562cd6e7',
      CWILDUContractOwner: '0x3198C6ecbAa86ea56c750B0eb35f35BEC97b54d4',
      CWILDUContract: null,
      CWILDRContractAddress: '0xD150C2Efa7511587582B1305BA9CF631a9BfE36E',
      CWILDRContractOwner: '0x3198C6ecbAa86ea56c750B0eb35f35BEC97b54d4',
      CWILDRContract: null,
      CWILDLContractAddress: '0x734d0ED56d8567EcEb0BaB160e61106f54E3a6fB',
      CWILDLContractOwner: '0x3198C6ecbAa86ea56c750B0eb35f35BEC97b54d4',  
      
      CWILDLContract: null,
      
    };
  }

  componentDidMount = async () => {
    await this.loadWeb3();
    await this.loadBlockchainData();
  };


  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    }
    else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false });
    } else {
      this.setState({ metamaskConnected: true });
      this.setState({ loading: true });
      this.setState({ accountAddress: accounts[0] });
      let accountBalance = await web3.eth.getBalance(accounts[0]);
      accountBalance = web3.utils.fromWei(accountBalance, "Ether");
      this.setState({ accountBalance });
      const networkId = await web3.eth.net.getId();
      const networkData = WildersC.networks[networkId];
      let j=0;
      if (networkData) {
        console.log(j++);
        const WildersCContract = web3.eth.Contract(
          WildersC.abi,
          networkData.address
        );
        console.log(j++);
        this.setState({ WildersCContract });
        this.setState({ contractDetected: true });
        console.log(j++);
        const WildersCCount = await WildersCContract.methods
          .WilderscFCounter()
          .call();
        this.setState({ WildersCCount });
        console.log(j++);
        var i;
        for (i = 1; i <= WildersCCount; i++) {
          const WilderscF = await WildersCContract.methods
            .allWildersC(i)
            .call();
          this.setState({
            WildersC: [...this.state.WildersC, WilderscF],
          });
        }
        console.log(j++);
        let totalTokensMinted = await WildersCContract.methods
          .getNumberOfTokensMinted()
          .call();
        console.log(j++);
        totalTokensMinted = totalTokensMinted.toNumber();
        this.setState({ totalTokensMinted });
        let totalTokensOwnedByAccount = await WildersCContract.methods
          .getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress)
          .call();
        totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber();
        console.log(j++);
        this.setState({ totalTokensOwnedByAccount });
        let contractOwner = await WildersCContract.methods
          .getOwner()
          .call();
        this.setState({ contractOwner });
        console.log(j++);
        let mintPrice = await WildersCContract.methods
          .getMintPrice()
          .call();
        this.setState({ mintPrice });
        console.log(j++);

        this.setState({ contractOwner });
        let mintPriceWc = await WildersCContract.methods
          .getMintPrice()
          .call();
        this.setState({ mintPriceWc });
        
        console.log(j++);

        const networkDataU = WildersU.networks[networkId];
        console.log(j++);

        if (networkDataU) {
        const WildersUContract = web3.eth.Contract(
          WildersU.abi,
          networkDataU.address
        );
        console.log(j++);
        this.setState({ WildersUContract });
        this.setState({ contractDetected: true });
        console.log(j++);
        const WildersUCount = await WildersUContract.methods
          .WildersuFCounter()
          .call();
          console.log(j++);
          this.setState({ WildersUCount });
        var i;
        for (i = 1; i <= WildersUCount; i++) {
          const WildersuF = await WildersUContract.methods
            .allWildersU(i)
            .call();
          this.setState({
            WildersU: [...this.state.WildersU, WildersuF],
          });
        }
        console.log(j++);
        let totalTokensMinted = await WildersUContract.methods
          .getNumberOfTokensMinted()
          .call();
        totalTokensMinted = totalTokensMinted.toNumber();
        this.setState({ totalTokensMinted });
        console.log(j++);
        let totalTokensOwnedByAccount = await WildersUContract.methods
          .getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress)
          .call();
        totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber();
        console.log(j++);
        this.setState({ totalTokensOwnedByAccount });
        let contractOwner = await WildersUContract.methods
          .getOwner()
          .call();
        this.setState({ contractOwner });
        console.log(j++);
        let mintPrice = await WildersUContract.methods
          .getMintPrice()
          .call();
        this.setState({ mintPrice });

        console.log(j++);

        this.setState({ contractOwner });
        let mintPriceWu = await WildersUContract.methods
          .getMintPrice()
          .call();
          console.log(j++);
          this.setState({ mintPriceWu });
      }

      const networkDataR = WildersR.networks[networkId];

        if (networkDataR) {
          this.setState({ loading: true });
        const WildersRContract = web3.eth.Contract(
          WildersR.abi,
          networkDataR.address
        );
        console.log(j++);
        this.setState({ WildersRContract });
        this.setState({ contractDetected: true });
        const WildersRCount = await WildersRContract.methods
          .WildersrFCounter()
          .call();
        this.setState({ WildersRCount });
        console.log(j++);
        var i;
        for (i = 1; i <= WildersRCount; i++) {
          const WildersrF = await WildersRContract.methods
            .allWildersR(i)
            .call();
          this.setState({
            WildersR: [...this.state.WildersR, WildersrF],
          });
        }
        console.log(j++);
        let totalTokensMinted = await WildersRContract.methods
          .getNumberOfTokensMinted()
          .call();
        totalTokensMinted = totalTokensMinted.toNumber();
        this.setState({ totalTokensMinted });
        let totalTokensOwnedByAccount = await WildersRContract.methods
          .getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress)
          .call();
        totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber();
        console.log(j++);
        this.setState({ totalTokensOwnedByAccount });
        let contractOwner = await WildersRContract.methods
          .getOwner()
          .call();
        this.setState({ contractOwner });
        console.log(j++);
        let mintPrice = await WildersRContract.methods
          .getMintPrice()
          .call();
        this.setState({ mintPrice });

        console.log(j++);
        this.setState({ contractOwner });
        let mintPriceWr = await WildersRContract.methods
          .getMintPrice()
          .call();
        this.setState({ mintPriceWr });
      }


      const networkDataL = WildersL.networks[networkId];

      if (networkDataL) {
        const WildersLContract = web3.eth.Contract(
          WildersL.abi,
          networkDataL.address
        );
        console.log(j++);
        this.setState({ WildersLContract });
        this.setState({ contractDetected: true });
        const WildersLCount = await WildersLContract.methods
          .WilderslFCounter()
          .call();
        this.setState({ WildersLCount });
        console.log(j++);
        var i;
        for (i = 1; i <= WildersLCount; i++) {
          const WilderslF = await WildersLContract.methods
            .allWildersL(i)
            .call();
          this.setState({
            WildersL: [...this.state.WildersL, WilderslF],
          });
        }
        console.log(j++);
        let totalTokensMinted = await WildersLContract.methods
          .getNumberOfTokensMinted()
          .call();
        totalTokensMinted = totalTokensMinted.toNumber();
        this.setState({ totalTokensMinted });
        console.log(j++);
        let totalTokensOwnedByAccount = await WildersLContract.methods
          .getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress)
          .call();
        totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber();
        this.setState({ totalTokensOwnedByAccount });
        console.log(j++);
        let contractOwner = await WildersLContract.methods
          .getOwner()
          .call();
        this.setState({ contractOwner });
        console.log(j++);
        let mintPrice = await WildersLContract.methods
          .getMintPrice()
          .call();
        this.setState({ mintPrice });

        console.log(j++);
        this.setState({ contractOwner });
        let mintPriceWl = await WildersLContract.methods
          .getMintPrice()
          .call();
        this.setState({ mintPriceWl });
        console.log(j++);
      }

      const CWILDCContract = web3.eth.Contract(
          ChestWildersC.abi,
          this.state.CWILDCContractAddress
        );
        this.setState({ CWILDCContract });

        console.log(j++);
      const CWILDUContract = web3.eth.Contract(
          ChestWildersU.abi,
          this.state.CWILDUContractAddress
        );
        this.setState({ CWILDUContract });

      const CWILDRContract = web3.eth.Contract(
          ChestWildersR.abi,
          this.state.CWILDRContractAddress
        );
        this.setState({ CWILDRContract });
        console.log(j++);

      const CWILDLContract = web3.eth.Contract(
          ChestWildersL.abi,
          this.state.CWILDLContractAddress
        );
        this.setState({ CWILDLContract });

        this.setState({ loading: false });
        console.log(j++);


      }

      else {
        this.setState({ contractDetected: false });
      }
    }
  };

  connectToMetamask = async () => {
    await window.ethereum.enable();
    this.setState({ metamaskConnected: true });
    window.location.reload();
  };





  mintMyNFT = async (tokenPrice) => {
    this.setState({ loading: true });


    let WilderscFCounter = await this.state.WildersCContract.methods
      .WilderscFCounter()
      .call();
    WilderscFCounter = WilderscFCounter.toNumber();
    WilderscFCounter = WilderscFCounter + 1;
    WilderscFCounter = '#' + WilderscFCounter;
    console.log(WilderscFCounter);
  };

  mintMyNFTU = async (tokenPrice) => {
    this.setState({ loading: true });

    let WildersuFCounter = await this.state.WildersUContract.methods
      .WildersuFCounter()
      .call();
    WildersuFCounter = WildersuFCounter.toNumber();
    WildersuFCounter = WildersuFCounter + 1;
    WildersuFCounter = '#' + WildersuFCounter;
    console.log(WildersuFCounter);
  };

  mintMyNFTR = async (tokenPrice) => {
    this.setState({ loading: true });

    let WildersrFCounter = await this.state.WildersRContract.methods
      .WildersrFCounter()
      .call();
    WildersrFCounter = WildersrFCounter.toNumber();
    WildersrFCounter = WildersrFCounter + 1;
    WildersrFCounter = '#' + WildersrFCounter;
    console.log(WildersrFCounter);

  };

  mintMyNFTL = async (tokenPrice) => {
    this.setState({ loading: true });

    let WilderslFCounter = await this.state.WildersLContract.methods
      .WilderslFCounter()
      .call();
    WilderslFCounter = WilderslFCounter.toNumber();
    WilderslFCounter = WilderslFCounter + 1;
    WilderslFCounter = '#' + WilderslFCounter;
    console.log(WilderslFCounter);

  };

    mintMyCWILDC = async (noOfToken) => {
    this.setState({ loading: true });

    this.setState({ loading: false });
  };

      mintMyCWILDU = async (noOfToken) => {
    this.setState({ loading: true });

    this.setState({ loading: false });
  };

      mintMyCWILDR = async (noOfToken) => {
    this.setState({ loading: true });

    this.setState({ loading: false });
  };

      mintMyCWILDL = async (noOfToken) => {
    this.setState({ loading: true });

    this.setState({ loading: false });
  };



  changeTokenPrice = (tokenId, newPrice) => {
    this.setState({ loading: true });
    const newTokenPrice = window.web3.utils.toWei(newPrice, "Ether");
    this.state.WildersCContract.methods
      .changeTokenPrice(tokenId, newTokenPrice)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };


  giftWilderscF = (tokenId, receiver) => {
    this.setState({ loading: true });
    this.state.WildersCContract.methods
      .giftToken(tokenId, receiver)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

    giftWildersuF = (tokenId, receiver) => {
    this.setState({ loading: true });
    this.state.WildersUContract.methods
      .giftToken(tokenId, receiver)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

    giftWildersrF = (tokenId, receiver) => {
    this.setState({ loading: true });
    this.state.WildersRContract.methods
      .giftToken(tokenId, receiver)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };

    giftWilderslF = (tokenId, receiver) => {
    this.setState({ loading: true });
    this.state.WildersLContract.methods
      .giftToken(tokenId, receiver)
      .send({ from: this.state.accountAddress })
      .on("confirmation", () => {
        this.setState({ loading: false });
        window.location.reload();
      });
  };


  storeDatabase = async (nftId, nftName, nftImage, nftType) => {
    const userRef = doc(db, "users", this.state.accountAddress);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, {
        nft: arrayUnion({
          id: nftId,
          name: nftName,
          image: nftImage,
          type: nftType,
        })
      });
      } else {
      await setDoc(userRef, {
        nft: [
          {
            id: nftId,
            name: nftName,
            image: nftImage,
            type: nftType,
          }
        ]
      });
    }

    this.setState({ loading: false });
    window.location.reload();

  }

  render() {
    return (
      <div className="w-100">
        {!this.state.metamaskConnected ? (
          <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
        ) : !this.state.contractDetected ? (
          <ContractNotDeployed />
        ) : this.state.loading ? (
          <Loading />
        ) : (
          <>
            <HashRouter basename="/">
              <Navbar state={{ accountAddress: this.state.accountAddress, contractOwner: this.state.contractOwner}} />
              <Route
                path="/"
                exact
                render={() => (
                  <AccountDetails
                    accountAddress={this.state.accountAddress}
                    accountBalance={this.state.accountBalance}
                  />
                )}
              />
              <Route
                path="/mint"
                render={() => (
                  <FormAndPreview
                    mintMyNFT={this.mintMyNFT}
                    mintMyNFTU={this.mintMyNFTU}
                    mintMyNFTR={this.mintMyNFTR}
                    mintMyNFTL={this.mintMyNFTL}

                    mintPrice={this.state.mintPrice}
                    mintPriceWc={this.state.mintPriceWc}
                    mintPriceCWILDC={this.state.mintPriceCWILDC}
                    mintMyCWILDC={this.mintMyCWILDC}

                    mintPriceWu={this.state.mintPriceWu}
                    mintPriceCWILDU={this.state.mintPriceCWILDU}
                    mintMyCWILDU={this.mintMyCWILDU}

                    mintPriceWr={this.state.mintPriceWr}
                    mintPriceCWILDR={this.state.mintPriceCWILDR}
                    mintMyCWILDR={this.mintMyCWILDR}
                    
                    mintPriceWl={this.state.mintPriceWl}
                    mintPriceCWILDL={this.state.mintPriceCWILDL}
                    mintMyCWILDL={this.mintMyCWILDL}
                  />
                )}
              />
              <Route
                path="/my-tokens"
                render={() => (
                  <MyWildersC
                    WildersCContract={this.state.WildersCContract}
                    WildersUContract={this.state.WildersUContract}
                    WildersRContract={this.state.WildersRContract}
                    WildersLContract={this.state.WildersLContract}
                    accountAddress={this.state.accountAddress}
                    WildersC={this.state.WildersC}
                    WildersU={this.state.WildersU}
                    WildersR={this.state.WildersR}
                    WildersL={this.state.WildersL}
                    totalTokensOwnedByAccount={
                      this.state.totalTokensOwnedByAccount
                    }
                    giftWilderscF={this.giftWilderscF}
                    giftWildersuF={this.giftWildersuF}
                    giftWildersrF={this.giftWildersrF}
                    giftWilderslF={this.giftWilderslF}
                  />
                )}
              />
              <Route
                path="/change-price"
                render={() => (
                  <ChangeMintPrice
                    WildersCContract={this.state.WildersCContract}
                    accountAddress={this.state.accountAddress}
                    mintPrice={this.state.mintPrice} />
                )}
              />            
            </HashRouter>
          </>
        )}
      </div>
    );
  }
}

export default App;
