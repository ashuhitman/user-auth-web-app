import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Registration from "./pages/Reistration/Registration";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Registration />}></Route>
      </Routes>
    </div>
  );
}

export default App;
