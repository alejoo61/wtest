import React from "react";
import loadingGIF from "./loading.gif";

const Loading = () => {
  return (
    <>
    <div className="container">
      <br /><br /><br />
      <div className="text-white text-center fw-bold">
        <br /><br /><br />
      <h1>Just Wait...</h1>
      </div>
      <br /><br /><br /><br />
      <div>
      <img src={loadingGIF} alt="Loading.."  className="d-block m-auto mt-5" />
      </div>
      <br /><br /><br /><br />
    </div>
    </>
    
  
  );
};

export default Loading;
