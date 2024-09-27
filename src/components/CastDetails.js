import { useEffect, useState } from "react";
import { IMAGE_URL } from "../utils/constants";

const CastDetails = (props) => {
  const { castData } = props;

  const { profile_path, original_name, character } = castData;

  return (
    <div className="">
      <div className="ml-5 mb-8 justify-between">
        <img
          className="h-64 w-48 rounded-lg"
          src={IMAGE_URL + profile_path}
        ></img>
        <p className="text-white">{original_name}</p>
        <p className="w-44 text-white">Character: {character}</p>
      </div>
    </div>
  );
};

export default CastDetails;
