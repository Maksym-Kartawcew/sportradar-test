import { configureStore } from "@reduxjs/toolkit";
import { simulationReducer } from "./reducers/simulationSlice";

export const store = configureStore({
  reducer: {
    simulation: simulationReducer,
  },
});
