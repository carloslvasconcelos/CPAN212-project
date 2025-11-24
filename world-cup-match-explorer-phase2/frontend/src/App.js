import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MatchesList from "./MatchesList";
import CreateMatch from "./CreateMatch";
import EditMatch from "./EditMatch";


function App() {
  return (
    <Router>
    <div style={{ padding: "20px" }}>
      <h1>World Cup Match Explorer</h1>

    <nav style={{ padding: "20px" }}>
      <Link to="/" style={{ marginRight: "15px" }}>Matches</Link>
      <Link to="/matches/new">Add New Match</Link>
    </nav>

    <Routes>
        <Route path="/" element={<MatchesList />} />
        <Route path="/matches" element={<MatchesList />} />
        <Route path="/matches/new" element={<CreateMatch />} />
        <Route path="/matches/:id/edit" element={<EditMatch />} />
    </Routes>

    </div>
    </Router>
  );
}

export default App;
