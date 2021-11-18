import "./App.css";
import NewData from "./Components/NewData";
import { Routes, Route } from "react-router-dom";
import EditData from "./Components/EditData";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<NewData />}></Route>
        <Route path="/update" exact element={<EditData />}></Route>
      </Routes>
    </div>
  );
}

export default App;
