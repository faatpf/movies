import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PanelLayout from "src/routes/Panel";
import AuthLayout from "src/routes/Auth";
import "./style.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PanelLayout />} />
          <Route path="/login" element={<AuthLayout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
