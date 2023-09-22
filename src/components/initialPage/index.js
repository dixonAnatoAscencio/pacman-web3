import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { gameStart } from "../../redux/actions/actions";
import style from "./initialPage.module.css";
import { NavLink } from "react-router-dom";

// Ejemplo de función para obtener la cuenta de MetaMask
async function getAccount() {
  if (typeof window !== "undefined" && window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  }
  return null;
}

const InitialPage = () => {
  const [connected, setConnected] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setConnected(true);
      setButtonDisabled(false);
    } else {
      setConnected(false);
      setButtonDisabled(true);
    }
  }, []);

  const connectButtonOnClick = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const account = await getAccount();
        if (account) {
          console.log("Connected to MetaMask with account:", account);
          setConnected(true);
          setButtonDisabled(false);
          // Realiza acciones adicionales después de la conexión
        } else {
          console.error("No MetaMask account found.");
          setConnected(false);
          setButtonDisabled(true);
        }
      } catch (error) {
        console.error("Error connecting to Metamask:", error);
        setConnected(false);
        setButtonDisabled(true);
      }
    } else {
      console.error("Metamask is not installed or not detected.");
      setConnected(false);
      setButtonDisabled(true);
    }
  };

  const dispatch = useDispatch();

  return (
    <div className={style.container}>
      <NavLink
        onClick={() => {
          if (!buttonDisabled) {
            dispatch(gameStart());
          } else {
            alert("Please connect your wallet to MetaMask before starting the game.");
          }
        }}
        to="/game"
        className={`${style.button} ${buttonDisabled ? style.disabledButton : ""}`}
      >
        {" "}
        START GAME WEB3 PACMAN
      </NavLink>

      <h1 onClick={connectButtonOnClick} style={{ color: "white", cursor: "pointer", padding: "50px" }}>
        {connected ? `Connected to Metamask: ${window.ethereum.selectedAddress}` : "Connect Metamask"}
      </h1>
    </div>
  );
};

export default InitialPage;
