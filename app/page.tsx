"use client";

import { useState } from "react";

type Hand = "rock" | "paper" | "scissors" | null;
type Result = "win" | "lose" | "draw" | null;

export default function JankenGame() {
  const [playerHand, setPlayerHand] = useState<Hand>(null);
  const [computerHand, setComputerHand] = useState<Hand>(null);
  const [result, setResult] = useState<Result>(null);
  const [score, setScore] = useState({ win: 0, lose: 0, draw: 0 });

  const hands: Hand[] = ["rock", "paper", "scissors"];

  const playGame = (selectedHand: Hand) => {
    // プレイヤーの選択
    setPlayerHand(selectedHand);

    // コンピュータのランダム選択
    const randomIndex = Math.floor(Math.random() * 3);
    const computerSelectedHand = hands[randomIndex];
    setComputerHand(computerSelectedHand);

    // 勝敗判定
    let gameResult: Result = "draw";
    if (selectedHand === computerSelectedHand) {
      gameResult = "draw";
    } else if (
      (selectedHand === "rock" && computerSelectedHand === "scissors") ||
      (selectedHand === "paper" && computerSelectedHand === "rock") ||
      (selectedHand === "scissors" && computerSelectedHand === "paper")
    ) {
      gameResult = "win";
    } else {
      gameResult = "lose";
    }

    setResult(gameResult);

    // スコア更新
    setScore((prev) => ({
      ...prev,
      win: gameResult === "win" ? prev.win + 1 : prev.win,
      lose: gameResult === "lose" ? prev.lose + 1 : prev.lose,
      draw: gameResult === "draw" ? prev.draw + 1 : prev.draw,
    }));
  };

  const resetGame = () => {
    setPlayerHand(null);
    setComputerHand(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        じゃんけんゲーム
      </h1>

      <div className="mb-8 flex gap-4">
        {hands.map((hand) => (
          <button
            key={hand}
            onClick={() => playGame(hand)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            {hand === "rock" && "✊"}
            {hand === "paper" && "✋"}
            {hand === "scissors" && "✌"}
            <span className="ml-2">{hand}</span>
          </button>
        ))}
      </div>

      {playerHand && computerHand && (
        <div className="mb-8 text-center">
          <div className="text-xl mb-4">
            <p className="mb-2">
              あなた: {playerHand}{" "}
              {(playerHand === "rock" && "✊") ||
                (playerHand === "paper" && "✋") ||
                (playerHand === "scissors" && "✌")}
            </p>
            <p>
              コンピュータ: {computerHand}{" "}
              {(computerHand === "rock" && "✊") ||
                (computerHand === "paper" && "✋") ||
                (computerHand === "scissors" && "✌")}
            </p>
          </div>

          {result && (
            <div
              className={`text-2xl font-bold ${
                result === "win"
                  ? "text-green-600"
                  : result === "lose"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {result === "win" && "あなたの勝ち！"}
              {result === "lose" && "あなたの負け！"}
              {result === "draw" && "引き分け！"}
            </div>
          )}
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">スコア</h2>
        <div className="flex gap-4">
          <p className="text-green-600">勝ち: {score.win}</p>
          <p className="text-red-600">負け: {score.lose}</p>
          <p className="text-gray-600">引き分け: {score.draw}</p>
        </div>
      </div>

      {(playerHand || computerHand || result) && (
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          リセット
        </button>
      )}
    </div>
  );
}
