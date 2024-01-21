# Football Simulation Application

This is a simple application that simulates 3 football matches:
- Germany vs Poland
- Brazil vs Mexico
- Argentina vs Uruguay

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Futher Commands](#further-commands)

## Getting Started

Follow these steps to set up and run the simulation application on your machine:

1. Download the project to your local machine.

2. Install all the required packages by running the following command in your terminal:
    ```bash
    npm install
    ```
3. Start the application by running:
    ```bash
    npm start
    ```
   This command will run the app in development mode and open it in your default web browser at [http://localhost:3000](http://localhost:3000).

## Usage
Once the application is running, you can interact with it using the following features:

- Start, finish, and restart the simulation.
- Each simulation has a random name selected from a predefined list.
- Each simulation runs for 90 seconds, but you can manually finish it before the 90-second mark.
- To make the simulation run faster, you can decrease the `simulationTime` variable in the `src/components/SimulationComponents.tsx` file.
- You can manually finish the simulation at any point before the 90-second mark.
- Goals are randomly scored every 10 seconds, starting from the 10th second and ending at the 90th second.
- When the simulation finishes, you can restart it, and the results will be reset for a new simulation.

## Further Commands

In addition to starting the application, you can use the following commands:

- `npm test`: Launches the test runner.

- `npm run build`: Builds the app for production to the `build` folder, optimizing it for performance. You can deploy this version of the app.

- `npm run eject`: This command is a one-way operation. It allows you to customize the build tool and configuration choices. It's useful if you need more control over the project's configurations.

Please note that `npm run eject` is irreversible, so use it with caution.

You don't have to use `eject` if you're satisfied with the default configuration, as the curated feature set is suitable for most deployments.

Enjoy simulating football matches with this application!
