// src/components/Preloader.jsx

import React from 'react';
import { BounceLoader } from 'react-spinners';
import ClipLoader from 'react-spinners/ClipLoader';

const Preloader = ({ loading }) => {
  return (
    <div className="preloader">
      <BounceLoader color={"#3498db"} loading={loading} size={50} />
    </div>
  );
};

export default Preloader;
