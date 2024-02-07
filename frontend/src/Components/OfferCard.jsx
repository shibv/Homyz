import React from "react";

function OfferCard(props) {
  return (
    <div
      className={`h-fit p-8 rounded-lg cursor-pointer`}
    >
      <img
        className="w-16 h-16 mx-auto"
        src={props.trendingImg}
        alt="img_trend"
      />
      <p className="text-xs text-blue-grey-700 tracking-wide text-center mt-2">
        {props.trendingName}
      </p>
    </div>
  );
}

export default OfferCard;
