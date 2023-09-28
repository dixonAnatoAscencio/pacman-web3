import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { gameStart } from "../../redux/actions/actions";
import style from "./initialPage.module.css";
import { NavLink } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import PacManGameAbi from "../../blockchain/abi/PacManGame.json";
import { injected } from "../../blockchain/metamaskConnector";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


const InitialPage = () => {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [gamePrice, setGamePrice] = useState();

  const { active, account, library, activate, deactivate, chainId } =
    useWeb3React();
  const selectedNetwork = 80001;

  let pancmanGameAddress = "0x36858A3C5D7afCf0416DC13cfb618e3098976Ee9";
  let pancmanGameContract;

  if (account && library) {
    pancmanGameContract = new library.eth.Contract(PacManGameAbi, pancmanGameAddress);
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
    return pancmanGameContract.methods
      .gameStarted()
      .call()
      .then((res) => {
        console.log("res", res);
        return res;
      });
  };

  const getGamePrice = async () => {
    return pancmanGameContract.methods
      .playPrice()
      .call()
      .then((res) => {
        console.log("res", res);
        return res;
      });
  };

  const playGame = async (gamePrice) => {
    return pancmanGameContract.methods
      .play()
      .send({ from: account, value: gamePrice })
      .then((res) => {
        console.log("res", res);
        return res;
      }).catch((ex) => {
        toast.error(ex.message);
        return undefined;
      });
  };

  useEffect(() => {

    if (chainId !== selectedNetwork) {
      switchNetwork();
    }

    if (account && library) {

      isGameStarted().then((res) => {
        console.log("isGameStarted", res);
        if (res === true) {
          setButtonDisabled(false);
        } else {
          setButtonDisabled(true);
        }
      });

      getGamePrice().then((res) => {
        setGamePrice(res);
        console.log("getGamePrice", res);
      }
      );
    }
  }, [activate, chainId, account]);

  const dispatch = useDispatch();

  const handleClick = async (e) => {

    if (account) {

      //dispatch(gameStart());
      //navigate("/game");


      playGame(gamePrice).then((res) => {
        console.log("playGame", res);
        if (res !== undefined) {
          dispatch(gameStart());
          navigate("/game");
        } else {
          e.preventDefault()
          console.log("Please connect your wallet to MetaMask before starting the game.");
          //alert("Please connect your wallet to MetaMask before starting the game.");
        }
      });

    }

  }

  return (
    <div className={style.container}>
      <div><Toaster /></div>
      <div
        onClick={handleClick}
        className={`${style.button} ${buttonDisabled ? style.disabledButton : ""}`}
      >
        {" "}
        START GAME WEB3 PACMAN
      </div>

      <h1 onClick={active ? disconnect : connectMetamaks} style={{ color: "white", cursor: "pointer", padding: "50px" }}>
        {active ? `Connected: ${getWalletAbreviation(account)}` : "Connect Metamask"}
      </h1>
    </div>
  );
};

export default InitialPage;
