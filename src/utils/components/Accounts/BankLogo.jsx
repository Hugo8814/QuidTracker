import { useState } from "react";

import capitalOneLogo from "../../../imgs/banklogos/capital-one-seeklogo.png";
import BankTest from "../../../imgs/banklogos/banktest.svg";

export const bankLogoMap = {
  "ob-capital-one": capitalOneLogo,

  default: BankTest, // Default fallback
};

export const getBankLogo = (providerId) => {
  return bankLogoMap[providerId] || bankLogoMap.default;
};
const BankLogo = ({ providerId, displayName }) => {
  const logoUrl = getBankLogo(providerId);

  if (!providerId) {
    return (
      <div
        className="bank-logo-fallback"
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#0055ff",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#ffffff",
        }}
      >
        {bankDetails.name.split(" ")[0][0]}
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={`${displayName} name logo`}
      className=""
      style={{
        width: "60px",
        height: "60px",
        objectFit: "contain",
      }}
    />
  );
};

export default BankLogo;
