import React, { useState, useEffect } from "react";
import WilderscFNFTImage from "../WilderscFNFTImage/WilderscFNFTImage";
import MyWilderscFNFTDetails from "../MyWilderscFNFTDetails/MyWilderscFNFTDetails";
import WildersuFNFTImage from "../WildersuFNFTImage/WildersuFNFTImage";
import MyWildersuFNFTDetails from "../MyWildersuFNFTDetails/MyWildersuFNFTDetails";
import WildersrFNFTImage from "../WildersrFNFTImage/WildersrFNFTImage";
import MyWildersrFNFTDetails from "../MyWildersrFNFTDetails/MyWildersrFNFTDetails";
import WilderslFNFTImage from "../WilderslFNFTImage/WilderslFNFTImage";
import MyWilderslFNFTDetails from "../MyWilderslFNFTDetails/MyWilderslFNFTDetails";

import Loading from "../Loading/Loading";

const MyWildersC = ({
  WildersCContract,
  WildersUContract,
  WildersRContract,
  WildersLContract,
  accountAddress,
  WildersC,
  WildersU,
  WildersR,
  WildersL,
  totalTokensOwnedByAccount,
  toggleForSale,
  giftWilderscF,
  giftWildersuF,
  giftWildersrF,
  giftWilderslF
}) => {
  const [loading, setLoading] = useState(false);
  const [myWildersC, setMyWildersC] = useState([]);
  const [myWildersU, setMyWildersU] = useState([]);
  const [myWildersR, setMyWildersR] = useState([]);
  const [myWildersL, setMyWildersL] = useState([]);

  useEffect(() => {
    if (WildersC.length !== 0) {
      if (WildersC[0].metaData !== undefined) {
        setLoading(loading);
      } else {
        setLoading(false);
      }
    }
    if (WildersU.length !== 0) {
      if (WildersU[0].metaData !== undefined) {
        setLoading(loading);
      } else {
        setLoading(false);
      }
    }

    if (WildersR.length !== 0) {
      if (WildersR[0].metaData !== undefined) {
        setLoading(loading);
      } else {
        setLoading(false);
      }
    }

    if (WildersL.length !== 0) {
      if (WildersL[0].metaData !== undefined) {
        setLoading(loading);
      } else {
        setLoading(false);
      }
    }    
    const my_WildersC = WildersC.filter(
      (WilderscF) => WilderscF.currentOwner === accountAddress
    );
    const my_WildersU = WildersU.filter(
      (WildersuF) => WildersuF.currentOwner === accountAddress
    );
    const my_WildersR = WildersR.filter(
      (WildersrF) => WildersrF.currentOwner === accountAddress
    );
    const my_WildersL = WildersL.filter(
      (WilderslF) => WilderslF.currentOwner === accountAddress
    );
    setMyWildersC(my_WildersC); 
    setMyWildersU(my_WildersU);
    setMyWildersR(my_WildersR); 
    setMyWildersL(my_WildersL);
  }, [WildersC], [WildersU], [WildersR], [WildersL]);

  return (
    <div>
      <div className="card border-0  bg-transparent mt-1" >
        <div className="card-body align-items-center d-flex justify-content-center">
          <h2 className="text-white  fw-bold"  >
          <span><img src="/img/cuchillos.png" width="100" alt="" /></span> Wilders Comun <span><img src="/img/cuchillos.png" width="100" alt="" /></span>
          </h2>
        </div>
      </div>
      <div className="d-flex flex-wrap mb-1 border-0 me-2">
        {myWildersC.map((WilderscF) => {
          return (
            <div
              key={WilderscF.tokenId.toNumber()}
              className="w-25 p-1 mt-1 border border-info me-2 rounded-3" 
            >
                {!loading ? (
                  <WilderscFNFTImage
                    tokenId={WilderscF.tokenId.toNumber()}
                    WildersCContract={WildersCContract}
                  />
                ) : (
                  <Loading />
                )}
                <MyWilderscFNFTDetails
                  WilderscF={WilderscF}
                  accountAddress={accountAddress}
                  toggleForSale={toggleForSale}
                  giftWilderscF={giftWilderscF}
                />
            </div>
          );
        })}
      </div>

      <div className="card mt-1 border-0 bg-transparent">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h2 className="text-white  fw-bold">
          <span><img src="/img/cuchillos.png" width="100" alt="" /></span> Wilders UnComun<span><img src="/img/cuchillos.png" width="100" alt="" /></span>
           </h2>
        </div>
      </div>
      <div className="d-flex flex-wrap mb-1 border-0 me-2">
        {myWildersU.map((WildersuF) => {
          return (
            <div
              key={WildersuF.tokenId.toNumber()}
              className="w-25 p-1 mt-1 border border-warning me-2 rounded-3" 
            >
                {!loading ? (
                  <WildersuFNFTImage
                    tokenId={WildersuF.tokenId.toNumber()}
                    WildersUContract={WildersUContract}
                  />
                ) : (
                  <Loading />
                )}
                <MyWildersuFNFTDetails
                  WildersuF={WildersuF}
                  accountAddress={accountAddress}
                  toggleForSale={toggleForSale}
                  giftWildersuF={giftWildersuF}
                />
            </div>
          );
        })}
      </div>

      <div className="card mt-1 border-0 bg-transparent">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h2 className="text-white fw-bold">
          <span><img src="/img/cuchillos.png" width="100" alt="" /></span>Wilders Rare You Own<span><img src="/img/cuchillos.png" width="100" alt="" /></span>
          </h2>
        </div>
      </div>
      <div className="d-flex flex-wrap mb-1 border-0 me-2">
        {myWildersR.map((WildersrF) => {
          return (
            <div
              key={WildersrF.tokenId.toNumber()}
              className="w-25 p-1 mt-1 border border-info me-2 rounded-3" 
            >
                {!loading ? (
                  <WildersrFNFTImage
                    tokenId={WildersrF.tokenId.toNumber()}
                    WildersRContract={WildersRContract}
                  />
                ) : (
                  <Loading />
                )}
                <MyWildersrFNFTDetails
                  WildersrF={WildersrF}
                  accountAddress={accountAddress}
                  toggleForSale={toggleForSale}
                  giftWildersrF={giftWildersrF}
                />
            </div>
          );
        })}
      </div>

      <div className="card mt-1 border-0  bg-transparent">
        <div className="card-body align-items-center d-flex justify-content-center">
          <h2 className="text-white fw-bold">
          <span><img src="/img/cuchillos.png" width="100" alt="" /></span>Wilders Legandary<span><img src="/img/cuchillos.png" width="100" alt="" /></span>
          </h2>
        </div>
      </div>
      <div className="d-flex flex-wrap mb-1 border-1  me-2">
        {myWildersL.map((WilderslF) => {
          return (
            <div
              key={WilderslF.tokenId.toNumber()}
              className="w-25 p-1 mt-1 border border-warning me-2 rounded-3" 
            >
                {!loading ? (
                  <WilderslFNFTImage
                    tokenId={WilderslF.tokenId.toNumber()}
                    WildersLContract={WildersLContract}
                  />
                ) : (
                  <Loading />
                )}
                <MyWilderslFNFTDetails
                  WilderslF={WilderslF}
                  accountAddress={accountAddress}
                  toggleForSale={toggleForSale}
                  giftWilderslF={giftWilderslF}
                />
            </div>
          );
        })}
      </div>

      <div className="footer-copyright text-white text-center py-3">
          &copy; {new Date().getFullYear()} Copyright: <a href="https://wildislandnft.com/" className='link-secondary'> WildIsland Game NFT</a>
        </div>

    </div>
  );
};

export default MyWildersC;