import { createSlice } from "@reduxjs/toolkit";
import { teamsAndScores } from "../../constants";
import getRandomMatchName from "../../helpers/getRandomMatchName";

const initialState = {
  matchName: getRandomMatchName(),
  teamsAndScores: [...teamsAndScores],
  isRunning: false,
  totalScore: 0,
  buttonTitle: "Start",
};

const simulationSlice = createSlice({
  name: "simulation",
  initialState,
  reducers: {
    startSimulation: (state) => {
      state.isRunning = true;
      state.buttonTitle = "Finish";
    },
    finishSimulation: (state) => {
      state.isRunning = false;
      state.buttonTitle = "Restart";
    },
    restartSimulation: (state) => {
      state.teamsAndScores.forEach((team) => {
        team.score = 0;
      });
      state.totalScore = 0;
      state.isRunning = true;
      state.matchName = getRandomMatchName();
      state.buttonTitle = "Finish";
    },

    incrementRandomTeamScore: (state) => {
      if (state.totalScore < 9) {
        const randomIndex = Math.floor(
          Math.random() * state.teamsAndScores.length
        );
        state.teamsAndScores[randomIndex].score += 1;
        state.totalScore += 1;
      }
    },
  },
});

export const {
  startSimulation,
  finishSimulation,
  incrementRandomTeamScore,
  restartSimulation,
} = simulationSlice.actions;

export const simulationReducer = simulationSlice.reducer;
