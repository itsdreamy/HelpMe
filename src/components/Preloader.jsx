import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { ColorModeContext } from "../theme";
import {useMode} from "../theme";

const Preloader = ({ loading }) => {
  const [theme, colorMode] = useMode();

  const preloaderColor = colorMode === "dark" ? theme.preloader.dark : theme.preloader.light;

  return (
    <div className="preloader"
    style={{
      backgroundColor: preloaderColor, // Set the background color
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 3,
    }}
>
      <HashLoader color={"#e0e0e0"} loading={loading} size={50} />
    </div>
  );
};

export default Preloader;
