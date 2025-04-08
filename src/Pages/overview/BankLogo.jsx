import { useState } from "react";

const BankLogo = ({ logoUri, bankName }) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  const proxyLogoUrl = logoUri
    ? `http://localhost:3000/api/truelayer/bank-logo/${logoUri}`
    : null;

  if (imageError || !proxyLogoUrl) {
    return (
      <div
        className="bank-logo-fallback"
        style={{
          width: "40px",
          height: "40px",
          backgroundColor: "#f0f0f0",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {getInitials(bankName)}
      </div>
    );
  }

  return (
    <img
      src={proxyLogoUrl}
      alt={`${bankName} logo`}
      onError={(e) => {
        console.error("Image failed to load:", e);
        setImageError(true);
      }}
      style={{
        width: "40px",
        height: "40px",
        objectFit: "contain",
      }}
    />
  );
};

export default BankLogo;
