import "./App.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import SimulationComponent from "./components/SimulationComponent";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SimulationComponent />
      </div>
    </Provider>
  );
}

export default App;
