import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  startSimulation,
  finishSimulation,
  incrementRandomTeamScore,
  restartSimulation,
} from "../redux/reducers/simulationSlice";
import { selectSimulation } from "../redux/selectors";

export interface Team {
  name: string;
  score: number;
}

const simulationTime: number = 1000;

const SimulationComponent: React.FC = () => {
  const dispatch = useDispatch();
  const simulation = useSelector(selectSimulation);
  const { teamsAndScores, isRunning, totalScore, buttonTitle, matchName } =
    simulation;

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (isRunning && totalScore < 9) {
      id = setInterval(() => {
        dispatch(incrementRandomTeamScore());
      }, simulationTime);
    }

    if (totalScore === 9 && isRunning) {
      dispatch(finishSimulation());
    }

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [dispatch, isRunning, totalScore]);

  const handleButtonClick = (): void => {
    if (!isRunning && totalScore === 0) {
      dispatch(startSimulation());
    } else if (isRunning && totalScore < 9) {
      dispatch(finishSimulation());
    } else if (!isRunning && totalScore <= 9) {
      dispatch(restartSimulation());
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "10px" }}>{matchName}</h2>
      <div>
        <button style={{ marginBottom: "10px" }} onClick={handleButtonClick}>
          {buttonTitle}
        </button>
      </div>
      <div>
        {teamsAndScores.map((team: Team, index: number) => {
          if (index % 2 !== 0) return null;

          const nextTeam = teamsAndScores[index + 1];

          return (
            <div key={team.name} style={{ marginBottom: "10px" }}>
              <span>{team.name} vs </span>
              {nextTeam && (
                <span style={{ marginRight: "20px" }}>{nextTeam.name}</span>
              )}
              {team.score} : {nextTeam && nextTeam.score}
            </div>
          );
        })}
      </div>
      <h3>Total goals: {totalScore}</h3>
    </div>
  );
};

export default SimulationComponent;
