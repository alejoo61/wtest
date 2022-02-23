import React from "react";

const AccountDetails = ({ accountAddress, accountBalance, balanceLLG }) => {
  return (
    <div>
      <br /><br />
      <div className="display-4 fw-bold text-white text-center"><span><img src="/img/cuchillos.png" alt="" width="100" /></span> My Account <span><img src="/img/cuchillos.png" alt="" width="100" /></span></div>
      <br /><br /><br /><br />
      <br /><br />
      <div className="container text-white">
        <h1 className="display-5">Wild Island NFT</h1>
        <p className="lead">
          Mint Your NFT{" "}
        </p>
        <hr className="my-4" />
        <p className="lead">Account address :</p>
        <h4>{accountAddress}</h4>
        <p className="lead">Account balance :</p>
        <h4>{accountBalance} BNB</h4>
      </div>
      <br /><br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br />
    </div>
  );
};

export default AccountDetails;