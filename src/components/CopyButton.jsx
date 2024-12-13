import React, { useState } from "react";
import "../styles/CopyButton.css";
const CopyButton = ({ textToCopy }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); 
      })
      .catch(err => console.error("Failed to copy text: ", err));
  };

  return (
    <button
      className={`copy-button ${isCopied ? "clicked" : ""}`}
      onClick={handleCopy}
    >
      {isCopied ? "Copied!" : "HaryStore"}
    </button>
  );
};

export default CopyButton;
