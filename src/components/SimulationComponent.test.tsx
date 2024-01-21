import React from "react";
import { render, fireEvent, act, screen } from "@testing-library/react";
import SimulationComponent from "./SimulationComponent";
import { matchNames } from "../constants"; 

jest.mock("../constants", () => ({
  teamsAndScores: [
    { name: "Team 1", score: 0 },
    { name: "Team 2", score: 0 },
  ],
  matchNames: ["Match 1", "Match 2"],
}));

describe("SimulationComponent", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should start the simulation when Start button is clicked", () => {
    render(<SimulationComponent />);
    fireEvent.click(screen.getByText("Start"));
    expect(screen.getByText("Finish")).toBeInTheDocument();
    expect(matchNames).toContain(screen.getByText(/Match \d/).textContent);
  });

  it("should increment the score and totalScore every 10 seconds when the simulation is running", () => {
    render(<SimulationComponent />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(screen.getByText(/1 : 0|0 : 1/)).toBeInTheDocument();
    expect(screen.getByText("Total goals: 1")).toBeInTheDocument();
  });

  it("should finish the simulation when Finish button is clicked", () => {
    render(<SimulationComponent />);
    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Finish"));
    expect(screen.getByText("Restart")).toBeInTheDocument();
  });

  it("should restart the simulation when Restart button is clicked", () => {
    render(<SimulationComponent />);
    fireEvent.click(screen.getByText("Start"));
    act(() => {
      jest.advanceTimersByTime(30000); 
    });
    fireEvent.click(screen.getByText("Finish"));
    fireEvent.click(screen.getByText("Restart"));
    expect(screen.getByText("Finish")).toBeInTheDocument();
    expect(screen.getByText("Total goals: 0")).toBeInTheDocument();
  });

});
