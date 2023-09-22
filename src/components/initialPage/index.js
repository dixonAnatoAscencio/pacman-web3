import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { gameStart } from "../../redux/actions/actions";
import style from "./initialPage.module.css";
import { NavLink } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import PacManGameAbi from "../../blockchain/abi/PacManGame.json";
import { injected } from "../../blockchain/metamaskConnector";

/*
// Ejemplo de función para obtener la cuenta de MetaMask
async function getAccount() {
  if (typeof window !== "undefined" && window.ethereum) {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  }
  return null;
}
*/

const InitialPage = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const { active, account, library, activate, deactivate, chainId } =
  useWeb3React();
  const selectedNetwork = 80001;

  let pancmanGameAddress = "0x6656Bb82C4FDFaC99EA63dF82FAFAb33F0aB3Ca4";
  let pancmanGameContract;

  if (account && library) {
    pancmanGameContract = new library.eth.Contract(PacManGameAbi, pancmanGameAddress).methods;
    console.log("loaded pancmanGameContract", pancmanGameContract.address);
  }

  const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", "false");
      localStorage.removeItem("connector");
      setButtonDisabled(true);
    } catch (ex) {
      console.log(ex);
    }
  }

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(selectedNetwork.toString()) }],
      });
    } catch (switchError) {
      console.log(switchError);

      if (switchError.code === 4902) {
        //await addNetwork(selectedNetwork.toString());
      }
    }
  };

  function getWalletAbreviation(walletAddress) {
    if (walletAddress !== null && walletAddress !== undefined) {
      return walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
    }
    return "";
  }

  useEffect(() => {
    const isWalletConnected = localStorage.getItem("isWalletConnected");
    const connector = localStorage.getItem("connector");
    if (isWalletConnected === "true" && connector === "injected") {
      activate(injected);
    }
  }, [active]);

  async function connectMetamaks() {
    try {
      if (window.ethereum && window.ethereum.networkVersion !== selectedNetwork.toString()) {
        switchNetwork();
      }

      activate(injected, undefined, true).then(
        (res) => {
          localStorage.setItem("isWalletConnected", "true");
          localStorage.setItem("connector", "injected");
          setButtonDisabled(false);
        },
        (err) => {
          console.log("Please install Metamask");
          console.log(err);
          setButtonDisabled(true);
        }
      );
    } catch (ex) {
      console.log("Please install Metamask");
      console.log(ex);
    }
  }

  const isGameStarted = async () => {
    return pancmanGameContract
      .gameStarted()
      .call()
      .then((res) => {
        console.log("res", res);
        return res;
      });
  };

  useEffect(() => {

    if (account && library) {
      isGameStarted().then((res) => {
        console.log("isGameStarted", res);
        if (res) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
      });
    }

  


    /*
    if (window.ethereum && window.ethereum.selectedAddress) {
      setConnected(true);
      setButtonDisabled(false);
    } else {
      setConnected(false);
      setButtonDisabled(true);
    }
    */
  }, []);

  /*
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
  */

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

      <h1 onClick={active ? disconnect : connectMetamaks} style={{ color: "white", cursor: "pointer", padding: "50px" }}>
        {active ? `Connected: ${getWalletAbreviation(account)}` : "Connect Metamask"}
      </h1>
    </div>
  );
};

export default InitialPage;
