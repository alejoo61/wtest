import React from "react";
import metamaskIcon from "./metamask.svg";

const ConnectToMetamask = ({ connectToMetamask }) => {
  return (
    <div className="jumbotron text-center">
      <h1 className="display-2 fw-bold">
        Wild Island NFT
      </h1>
      <img src="/img/ICONO.png" alt="" />
      <br /><br />
      <hr className="my-4 text-center" />
      <div className="d-grid gap-4 col-2 mx-auto">
        <button
        onClick={connectToMetamask}
        className="btn btn-primary d-flex align-items-center"
        style={{ fontSize: "0.9rem", letterSpacing: "0.14rem" }}
      >
        Connect Metamask{" "}
        <img
          src={metamaskIcon}
          alt="metamask-icon"
          style={{ width: "2rem", marginLeft: "0.5rem" }}
        />
      </button>
      </div>

      <br /><br /><br /><br /><br /><br />

      <div className="footer-copyright  text-center py-3">
          &copy; {new Date().getFullYear()} Copyright: <a href="https://wildislandnft.com/" className='link-secondary'> WildIsland Game NFT</a>
        </div>
      
    </div>
  );
};

export default ConnectToMetamask;
