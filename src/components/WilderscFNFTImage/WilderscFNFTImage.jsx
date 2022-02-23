import React from "react";

const WilderscFNFTImage = ({ tokenId, WildersCContract }) => {

  const WilderscF_card = {
    display: 'flex',
    justifyContent: 'center',
    border: `0`,
  };
  const WilderscF_image = {
    width: "200px",
    height: "200px",
  };

  const [image, setImage] = React.useState('');

  const getImageData = async () => {
    let image = await WildersCContract.methods
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
          <div style={WilderscF_card}>
            <img src={image} className='rounded-circle border border-white' style={WilderscF_image} alt='graphic-nft'/>
          </div>
          :
          <div>
          </div>
      }
    </div>
  );
};

export default WilderscFNFTImage;
