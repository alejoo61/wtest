import React, { useState } from "react";

const ChangeMintPrice = (props) => {
  const [newPrice, setnewPrice] = useState(window.web3.utils.fromWei(props.mintPrice.toString(), "Ether"));
  const [priceUpdatedError, setpriceUpdatedError] = useState(false);


  const changePrice = async (e) => {
    e.preventDefault();
    let res = await props.WildersCContract.methods
      .setMintPrice(window.web3.utils.toWei(newPrice.toString(), "Ether"))
      .send({ from: props.accountAddress });

    setpriceUpdatedError(!res);
    setnewPrice(window.web3.utils.fromWei(props.mintPrice.toString(), "Ether"));
    window.location.reload();
  };

  

  return (
    <div>
      <div className="card mt-1">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h5>Change Mint Price Wilders</h5>
        </div>
      </div>
      <div className="p-4 mt-1 border">
        <div className="row">
          <div className="col-md-5">
            <h5>New Price</h5>
            <form onSubmit={changePrice}>
              <div className="form-group">
                <input
                  required
                  type="text"
                  className="form-control"
                  value={newPrice}
                  placeholder="New Price"
                  onChange={(e) => setnewPrice(e.target.value)}
                />
              </div>
              <button className="mt-3 btn btn-outline-primary" type="submit">
                Change Mint Price
              </button>
              {priceUpdatedError ? (
                <div className="alert alert-danger alert-dissmissible mt-4">
                  <button type="button" className="close" data-dismiss="alert">
                    <span>&times;</span>
                  </button>
                  <strong>Error Updating The Price</strong>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default ChangeMintPrice;
