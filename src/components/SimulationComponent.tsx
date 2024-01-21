import React, { useState, useEffect, useCallback } from "react";
import { teamsAndScores } from "../constants";
import { matchNames } from "../constants";

export interface Team {
  name: string;
  score: number;
}

//Decrease simulationTime to make the simulation run faster
const simulationTime: number = 10000;

const SimulationComponent: React.FC = () => {
  const [matchName, setMatchName] = useState("");
  const [simulationTeamsAndScores, setSimulationTeamsAndScores] = useState<
    Team[]
  >([...teamsAndScores]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [btnTitle, setBtnTitle] = useState<string>("Start");

  const incrementRandomTeamScore = useCallback((): void => {
    const randomIndex = Math.floor(
      Math.random() * simulationTeamsAndScores.length
    );
    const newTeamsAndScores = [...simulationTeamsAndScores];
    newTeamsAndScores[randomIndex].score += 1;

    setSimulationTeamsAndScores(newTeamsAndScores);
  }, [simulationTeamsAndScores]);

  const getRandomMatchTeamName = (): void => {
    const randomNameIndex = Math.floor(Math.random() * matchNames.length);
    setMatchName(matchNames[randomNameIndex]);
  };

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (isRunning && totalScore < 9) {
      id = setInterval(() => {
        incrementRandomTeamScore();
        setTotalScore((prevScore) => prevScore + 1);
      }, simulationTime);
      setIntervalId(id);
    }

    if (totalScore === 9) {
      setBtnTitle("Restart");
    }

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [incrementRandomTeamScore, isRunning, totalScore]);

  const handleButtonClick = (): void => {
    if (btnTitle === "Start") {
      startSimulation();
    } else if (btnTitle === "Finish") {
      finishSimulation();
    } else if (btnTitle === "Restart") {
      restartSimulation();
    }
  };

  const clearSimulationInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const startSimulation = (): void => {
    getRandomMatchTeamName();
    setIsRunning(true);
    setBtnTitle("Finish");
  };

  const finishSimulation = (): void => {
    clearSimulationInterval();
    setIsRunning(false);
    setBtnTitle("Restart");
  };

  const restartSimulation = (): void => {
    clearSimulationInterval();
    simulationTeamsAndScores.forEach((team) => {
      team.score = 0;
    });
    setTotalScore(0);
    setIsRunning(false);
    setBtnTitle("Finish");
    startSimulation();
  };

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>{matchName}</h2>
      <div>
        <button style={{ marginBottom: "10px" }} onClick={handleButtonClick}>
          {btnTitle}
        </button>
      </div>
      <div>
        {simulationTeamsAndScores.map((team, index) => {
          if (index % 2 !== 0) return null;

          const nextTeam = simulationTeamsAndScores[index + 1];

          return (
            <div key={team.name} style={{ marginBottom: "10px" }}>
              <span>{team.name} vs </span>
              {nextTeam && (
                <span style={{ marginRight: "20px" }}>{nextTeam.name}</span>
              )}
              {team.score} : {nextTeam.score}
            </div>
          );
        })}
      </div>
      <h3>Total goals: {totalScore}</h3>
    </div>
  );
};

export default SimulationComponent;
