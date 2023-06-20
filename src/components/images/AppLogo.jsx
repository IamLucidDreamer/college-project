import React from "react";
import appLogo1 from "../../assets/images/mnnitlogo.png";

const AppLogo = ({
  width = "200px",
  height = "200px",
  classname = "",
  logotType = 1,
}) => {
  switch (logotType) {
    case 1:
      return (
        <img
          src={appLogo1}
          width={width}
          height={height}
          className={classname}
        />
      );
      break;
    case 2:
      return (
        <img
          src={appLogo1}
          width={width}
          height={height}
          className={classname}
        />
      );
      break;
  }
};

export default AppLogo;

// Enum
// 1 colored Logo
// 2 white Logo
