import { useWeb3React } from "@web3-react/core";
import PacManGameAbi from "../../blockchain/abi/PacManGame.json";
import style from "./leaderboardPage.module.css";
import { useEffect, useState } from "react";
const LeaderboardPage = () => {
  const [rankList, setRankList] = useState([]);

  const { active, account, library, activate, deactivate, chainId } =
    useWeb3React();
  const selectedNetwork = 80001;

  let pancmanGameAddress = "0xC8Ddbc3519a16E366ed7a45ac9A513c1281B02B7";
  let pancmanGameContract;

  if (account && library) {
    pancmanGameContract = new library.eth.Contract(PacManGameAbi, pancmanGameAddress);
  }

  const getPlayersAddresses = async () => {
    return pancmanGameContract.methods
      .getPlayersAddresses()
      .call()
      .then((res) => {
        return res;
      });
  };

  const getPlayersScores = async () => {
    return pancmanGameContract.methods
      .getPlayersScores()
      .call()
      .then((res) => {
        return res;
      });
  };

  useEffect(() => {

    if (account && library) {
      getPlayersAddresses().then((res1) => {
        console.log("getPlayersAddresses", res1);

        getPlayersScores().then((res2) => {
          console.log("getPlayersScores", res2);


          let rankList = [];
          for (let i = 0; i < res2.length; i++) {
            console.log("res1[i]", res1[i]);
            console.log("res2[i]", res2[i]);
            rankList.push({
              address: res1[i],
              score: res2[i],
            });
          }
          
          rankList.sort((a, b) => {
            return b.score - a.score;
          });
          console.log("rankList", rankList);
          setRankList(rankList);
        });
      });





    }
  }, [activate, chainId, account]);

  function getRankEmoji(rank) {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return "";
    }
  }

  return (
    <div className={style.container}>
      <h1>Leaderboard</h1>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Wallet</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rankList.map((row, index) => {
            return (
              <tr key={index}>
                {<td>{index + 1}  {getRankEmoji(index + 1)}</td>}
                <td>{row.address}</td>
                <td>{row.score[index]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
