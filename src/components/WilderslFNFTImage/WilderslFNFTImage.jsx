import React from "react";
import { withRouter } from "react-router-dom";

const WilderslFNFTImage = ({ tokenId, WildersLContract }) => {

  const WilderslF_card = {
    display: 'flex',
    justifyContent: 'center',
    border: '1',
  };
  const WilderslF_image = {
    width: "220px",
    height: "220px",
  };

  const [image, setImage] = React.useState('');

  const getImageData = async () => {
    let image = await WildersLContract.methods
      .getTokenMetaData(tokenId)
      .call();
    setImage(image);
    // console.log(image);
  };

  React.useEffect(() => {
    getImageData();
  }, []);

  return (
    <div>
      {
        (image.substring(image.lastIndexOf('.') + 1, image.length) === 'gif') ?
          <div style={WilderslF_card}>
            <img src={image} className='rounded-circle border border-white' style={WilderslF_image} alt='graphic-nft'/>
          </div>
          :
          <div>
          </div>
      }
    </div>
  );
};

export default WilderslFNFTImage;
