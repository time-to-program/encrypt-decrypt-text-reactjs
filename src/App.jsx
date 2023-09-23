import React, { useState } from "react";
import "./App.css";
import CryptoJS from "crypto-js";

const SECRET_PASS = "XkhZG4fW2t2W";

function App() {
  // Define and initialize state variables
  const [text, setText] = useState(""); // User input text
  const [screen, setScreen] = useState("encrypt"); // Screen mode: encrypt or decrypt
  const [encrptedData, setEncrptedData] = useState(""); // Encrypted data
  const [decrptedData, setDecrptedData] = useState(""); // Decrypted data
  const [errorMessage, setErrorMessage] = useState(""); // Error message if any

  // Encrypt user input text
  const encryptData = () => {
    try {
      const data = CryptoJS.AES.encrypt(
        JSON.stringify(text),
        SECRET_PASS
      ).toString();
      setEncrptedData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Encryption failed. Please check your input.");
    }
  };

  // Decrypt user input text
  const decryptData = () => {
    try {
      const bytes = CryptoJS.AES.decrypt(text, SECRET_PASS);
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setDecrptedData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Decryption failed. Please check your input.");
    }
  };

  // Switch between encrypt and decrypt screens
  const switchScreen = (type) => {
    // Clear all data and error message when switching screens
    setText("");
    setEncrptedData("");
    setDecrptedData("");
    setErrorMessage("");
    setScreen(type);
  };

  // Handle button click (Encrypt or Decrypt)
  const handleClick = () => {
    if (!text) {
      setErrorMessage("Please enter some text.");
      return;
    }

    if (screen === "encrypt") {
      encryptData();
    } else {
      decryptData();
    }
  };

  return (
    <div className="container">
      <div>
        {/* Buttons to switch between Encrypt and Decrypt screens */}
        <button
          className={`btn btn-left ${screen === "encrypt" ? "active" : ""}`}
          onClick={() => switchScreen("encrypt")}
        >
          Encrypt
        </button>
        <button
          className={`btn btn-right ${screen === "decrypt" ? "active" : ""}`}
          onClick={() => switchScreen("decrypt")}
        >
          Decrypt
        </button>
      </div>

      <div className="card">
        {/* Textarea for user input */}
        <textarea
          value={text}
          onChange={({ target }) => setText(target.value)}
          name="text"
          type="text"
          placeholder={
            screen === "encrypt" ? "Enter Your Text" : "Enter Encrypted Data"
          }
        />

        {/* Display error message if there's an error */}
        {errorMessage && <div className="error">{errorMessage}</div>}

        {/* Encrypt or Decrypt button */}
        <button
          className={`btn submit-btn ${
            screen === "encrypt" ? "encrypt-btn" : "decrypt-btn"
          }`}
          onClick={handleClick}
        >
          {screen === "encrypt" ? "Encrypt" : "Decrypt"}
        </button>
      </div>

      {/* Display encrypted or decrypted data if available */}
      {encrptedData || decrptedData ? (
        <div className="content">
          <label>{screen === "encrypt" ? "ENCRYPTED" : "Decrypted"} DATA</label>
          <p>{screen === "encrypt" ? encrptedData : decrptedData}</p>
        </div>
      ) : null}
    </div>
  );
}

export default App;
