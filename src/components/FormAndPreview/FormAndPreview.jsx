import React, { Component } from "react";
import mintWildersC from "./Comun.png";
import mintWildersU from "./UnComun.png";
import mintWildersR from "./Rare.png";
import mintWildersL from "./Legendary.png";

const Wilders_image = {
    width: "299px",
    height: "351px",
    justifyContent: 'center',
  };

    const Wilders_card = {
    justifyContent: 'center',
  };

class FormAndPreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mintPrice: window.web3.utils.fromWei(props.mintPrice.toString(), "Ether"),
      mintPriceWc: window.web3.utils.fromWei(props.mintPriceWc.toString(), "Ether"),
      mintPriceCWILDC: window.web3.utils.fromWei(props.mintPriceCWILDC.toString(), "Ether"),
      mintPriceWu: window.web3.utils.fromWei(props.mintPriceWu.toString(), "Ether"),
      mintPriceCWILDU: window.web3.utils.fromWei(props.mintPriceCWILDU.toString(), "Ether"),
      mintPriceWr: window.web3.utils.fromWei(props.mintPriceWr.toString(), "Ether"),
      mintPriceCWILDR: window.web3.utils.fromWei(props.mintPriceCWILDR.toString(), "Ether"),
      mintPriceWl: window.web3.utils.fromWei(props.mintPriceWl.toString(), "Ether"),
      mintPriceCWILDL: window.web3.utils.fromWei(props.mintPriceCWILDL.toString(), "Ether"),
      noOfToken: ''
    };
  }



  callMintMyNFTFromApp = (e) => {
    e.preventDefault();
    this.props.mintMyNFT(
      this.state.mintPriceWc
    );
  };

    callMintMyNFTFromAppU = (e) => {
    e.preventDefault();
    this.props.mintMyNFTU(
      this.state.mintPriceWu
    );
  };

      callMintMyNFTFromAppR = (e) => {
    e.preventDefault();
    this.props.mintMyNFTR(
      this.state.mintPriceWr
    );
  };

      callMintMyNFTFromAppL = (e) => {
    e.preventDefault();
    this.props.mintMyNFTL(
      this.state.mintPriceWl
    );
  };

    callMintMyCWILDC = (e) => {
    e.preventDefault();
    this.props.mintMyCWILDC(
      this.state.noOfToken
    );
  };


      callMintMyCWILDU = (e) => {
    e.preventDefault();
    this.props.mintMyCWILDU(
      this.state.noOfToken
    );
  };


      callMintMyCWILDR = (e) => {
    e.preventDefault();
    this.props.mintMyCWILDR(
      this.state.noOfToken
    );
  };


      callMintMyCWILDL = (e) => {
    e.preventDefault();
    this.props.mintMyCWILDL(
      this.state.noOfToken
    );
  };



  render() {
    return (
      <div className="">
        <br /><br /><br />
        <h1 className="text-white text-center mt-4"> <span><img src="/img/cuchillos.png" alt="" width="100" /></span> Mint <span><img src="/img/cuchillos.png" alt="" width="100" /></span></h1>
        <br /><br /><br /><br />


        <div className="row row-cols-1 row-cols-md-3 g-4">
          <div className="col" style={Wilders_card}>
            <div className="card text-center bg-transparent border-0 w-75" style={Wilders_card}>
              <img
                className="w-30 opacity-75 rounded mx-auto d-block"
                src={mintWildersC}
                style={Wilders_image}
                alt=""
              />
              <div className="card-body " style={Wilders_card}>
                <form onSubmit={this.callMintMyNFTFromApp} className="pt-4 mt-1 text-white">
                  <div className=" text-white">
                    <div>
                      <label htmlFor="price">Mint Wilders NFT Comun</label>
                      <h4>{this.state.mintPrice} BNB</h4>
                    </div>
                    <button
                      id="mintBtn"
                      style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
                      type="submit"
                      className="btn mt-4 btn-block btn-success"
                    >
                      Mint
                    </button>
                    <div className="mt-4">
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center bg-transparent border-0 w-75">
              <img
                className="w-40 opacity-75"
                src={mintWildersU}
                style={Wilders_image}
                alt=""
              />
              <div className="card-body">
                <form onSubmit={this.callMintMyNFTFromAppU} className="pt-4 mt-1">
                  <div className="text-white">
                    <div>
                      <label htmlFor="price">Mint Wilders NFT UnComun</label>
                      <h4>{this.state.mintPriceWu} BNB</h4>
                    </div>
                    <button
                      id="mintBtn"
                      style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
                      type="submit"
                      className="btn mt-4 btn-block btn-success"
                    >
                      Mint
                    </button>
                    <div className="mt-4">
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card text-center bg-transparent border-0 w-75">
              <img
                className="w-40 opacity-75"
                src={mintWildersR}
                style={Wilders_image}
                alt=""
              />
              <div className="card-body">
                <form onSubmit={this.callMintMyNFTFromAppR} className="pt-4 mt-1">
                  <div className="text-white">
                    <div>
                      <label htmlFor="price">Mint Wilders NFT Rare</label>
                      <h4>{this.state.mintPriceWr} BNB</h4>
                    </div>
                    <button
                      id="mintBtn"
                      style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
                      type="submit"
                      className="btn mt-4 btn-block btn-success"
                    >
                      Mint
                    </button>
                    <div className="mt-4">
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>


          <div className="col">
            <div className="card text-center bg-transparent border-0 w-75">
              <img
                className="w-40 opacity-75"
                src={mintWildersL}
                style={Wilders_image}
                alt=""
              />
              <div className="card-body">
                <form onSubmit={this.callMintMyNFTFromAppL} className="pt-4 mt-1">
                  <div className="text-white">
                    <div>
                      <label htmlFor="price">Mint Wilders Legendary</label>
                      <h4>{this.state.mintPriceWl} BNB</h4>
                    </div>
                    <button
                      id="mintBtn"
                      style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
                      type="submit"
                      className="btn mt-4 btn-block btn-success"
                    >
                      Mint
                    </button>
                    <div className="mt-4">
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>




        </div>


        <br /><br /><br /><br /><br />

       







        <div className="footer-copyright text-white text-center py-3">
          &copy; {new Date().getFullYear()} Copyright: <a href="https://wildislandnft.com/" className='link-secondary'> WildIsland Game NFT</a>
        </div>
      </div>

    );
  }
}

export default FormAndPreview;
