import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import MenuLeft from "./components/MenuLeft";


function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <MenuLeft />
          <Home />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
