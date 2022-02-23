import React from "react";

const MyWilderscFNFTDetails = (props) => {
  const {
    tokenId,
    tokenName,
    mintedBy,
    previousOwner,
    numberOfTransfers,
  } = props.WilderscF;

  const [state, setState] = React.useState({
    receiver: ""
  });



  const callGift = (tokenId, receiver) => {
    props.giftWilderscF(tokenId, receiver);
  };

  return (
    <div key={tokenId.toNumber()} className="mt-4 text-white">
      <p>
        <span className="font-weight-bold">Token Id</span> :{" "}
        {tokenId.toNumber()}
      </p>
      <p>
        <span className="font-weight-bold">Name</span> : {tokenName}
      </p>
      <p>
        <span className="font-weight-bold">No. of Transfers</span> :{" "}
        {numberOfTransfers.toNumber()}
      </p>
      {props.accountAddress === mintedBy &&
      props.accountAddress !== previousOwner ? (
        <div className="alert alert-success w-100 text-center m-auto font-weight-bold">
          Minted
        </div>
      ) : (
        <div className="alert alert-warning w-100 text-center m-auto font-weight-bold" role='alert'>Gift</div>
      )}
    

        <div>
        <form
              onSubmit={(e) => {
                e.preventDefault();
                callGift(
                  props.WilderscF.tokenId.toNumber(),
                  state.receiver
                );
              }}
            >
              <div className="form-group mt-4 ">
                <label htmlFor="receiver">
                  <span className="font-weight-bold">Gift Wilder To</span> :
                </label>{" "}
                <input
                  required
                  name="receiver"
                  id="receiver"
                  value={state.receiver}
                  className="form-control w-100"
                  placeholder="Enter Receiver Address"
                  onChange={(e) =>
                    setState({
                      ...state,
                      receiver: e.target.value,
                    })
                  }
                />
              </div>
              <button
                type="submit"
                style={{ fontSize: "0.9rem", letterSpacing: "0.10rem" }}
                className="btn btn-warning mt-0 w-100 font-weight-bold"
              >
                Send Wilder
              </button>
            </form>
        </div>

    </div>
  );
};

export default MyWilderscFNFTDetails;
